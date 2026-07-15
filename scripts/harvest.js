#!/usr/bin/env node
/**
 * harvest.js — Knowledge Extraction Script for Victor's Second Brain
 *
 * Scans the vault for evidence of undocumented knowledge:
 *   • Lesson-language fingerprints in daily notes and DEV_NOTES files
 *   • Unprocessed clippings with no corresponding Resource note
 *   • Queued items in MOC pages
 *
 * Outputs a ready-to-paste context prompt that turns your LLM into an
 * aggressive knowledge extraction interviewer in-chat. No API required.
 *
 * Usage:
 *   node scripts/harvest.js                    full extraction prompt (default)
 *   node scripts/harvest.js --dry-run          show candidates found, no prompt
 *   node scripts/harvest.js --quick            max 3 candidates
 *   node scripts/harvest.js --days=7           scan last 7 days of dailies (default: 14)
 *   node scripts/harvest.js --focus=Momentum   only that project's DEV_NOTES
 *   node scripts/harvest.js --json             JSON output of candidates
 *   node scripts/harvest.js --record "1,2,3"   mark those candidates as harvested
 */

'use strict';

const fs   = require('fs');
const path = require('path');

// ─────────────────────────────────────────────────────────────────
// PATHS
// ─────────────────────────────────────────────────────────────────
const VAULT_ROOT    = path.resolve(__dirname, '..');
const SESSIONS_DIR  = path.join(VAULT_ROOT, '06-Agent-Sessions');
const HISTORY_FILE  = path.join(SESSIONS_DIR, 'harvest-history.json');
const LAST_RUN_FILE = path.join(SESSIONS_DIR, 'harvest-last-run.json');

const DIRS = {
  daily:     path.join(VAULT_ROOT, '05-Daily'),
  projects:  path.join(VAULT_ROOT, '01-Projects'),
  resources: path.join(VAULT_ROOT, '03-Resources'),
  clippings: path.join(VAULT_ROOT, 'Clippings'),
};

// ─────────────────────────────────────────────────────────────────
// FINGERPRINTS
// Language patterns that signal undocumented knowledge in your writing.
// Higher weight = stronger signal. Tuned to Victor's writing style.
// ─────────────────────────────────────────────────────────────────
const FINGERPRINTS = [
  // Explicit lesson signals (weight 5) ─────────────────────────
  { rx: /\b(lesson|key insight|key takeaway|key learning)[:]/i, label: 'explicit',     w: 5 },
  { rx: /I need to (remember|document|note this)/i,             label: 'explicit',     w: 5 },
  { rx: /I (wish I|should'?ve?) (knew?|known|documented)/i,     label: 'regret',       w: 5 },
  { rx: /never (do|use|rely on|build) this again/i,             label: 'rule',         w: 5 },
  { rx: /this further proves/i,                                  label: 'insight',      w: 5 },

  // Trap + solution signals (weight 4) ──────────────────────────
  { rx: /the (fix|solution) (is|was|here)/i,                    label: 'solution',     w: 4 },
  { rx: /the (trap|problem|issue|mistake) (is|was)/i,           label: 'trap',         w: 4 },
  { rx: /I'?ve come to realize/i,                               label: 'insight',      w: 4 },
  { rx: /this (pattern|trap|mistake) (appeared|keeps|showed)/i, label: 'pattern',      w: 4 },
  { rx: /\bnever (do|use|rely on|trust)\b/i,                    label: 'rule',         w: 4 },
  { rx: /\balways (do|use|make sure|verify|check)\b/i,          label: 'rule',         w: 4 },
  { rx: /I (figured|worked) (out|it)/i,                         label: 'discovery',    w: 4 },
  { rx: /this (is|was) (terrible|awful|broken) because/i,       label: 'critique',     w: 4 },
  { rx: /I'?ve realized/i,                                      label: 'insight',      w: 4 },

  // Discovery + critique signals (weight 3) ─────────────────────
  { rx: /turns? out/i,                                          label: 'discovery',    w: 3 },
  { rx: /I realized/i,                                          label: 'insight',      w: 3 },
  { rx: /I (learned|learnt) that/i,                             label: 'discovery',    w: 3 },
  { rx: /I found out/i,                                         label: 'discovery',    w: 3 },
  { rx: /bad (ux|ui|experience)/i,                              label: 'critique',     w: 3 },
  { rx: /that'?s (bad|terrible|wrong|off|broken)/i,             label: 'critique',     w: 3 },
  { rx: /good (fix|pattern|approach|ux|that)/i,                 label: 'positive',     w: 3 },
  { rx: /key (insight|learning|lesson)/i,                       label: 'explicit',     w: 3 },
  { rx: /I'?m (starting to see|starting to realize)/i,          label: 'insight',      w: 3 },

  // Observations + musings (weight 2) ───────────────────────────
  { rx: /I noticed (that\s?)?/i,                                label: 'observation',  w: 2 },
  { rx: /I don'?t (get|understand) (why|how|what)/i,            label: 'confusion',    w: 2 },
  { rx: /I was (subconsciously|unknowingly)/i,                  label: 'insight',      w: 2 },
  { rx: /something (worth noting|worth remembering)/i,          label: 'observation',  w: 2 },
  { rx: /I'?m (thinking|wondering) (if|whether|about)/i,        label: 'musing',       w: 2 },
];

// ─────────────────────────────────────────────────────────────────
// CLI ARGS
// ─────────────────────────────────────────────────────────────────
const args      = process.argv.slice(2);
const DRY_RUN   = args.includes('--dry-run');
const JSON_OUT  = args.includes('--json');
const QUICK     = args.includes('--quick');
const daysArg   = args.find(a => a.startsWith('--days='));
const DAYS_BACK = daysArg ? parseInt(daysArg.split('=')[1], 10) : 14;
const focusArg  = args.find(a => a.startsWith('--focus='));
const FOCUS     = focusArg ? focusArg.split('=')[1].toLowerCase() : null;
const MAX_CANDS = QUICK ? 3 : 7;

// ─────────────────────────────────────────────────────────────────
// ENSURE SESSIONS DIR EXISTS
// ─────────────────────────────────────────────────────────────────
try {
  if (!fs.existsSync(SESSIONS_DIR)) fs.mkdirSync(SESSIONS_DIR, { recursive: true });
} catch (e) {
  console.error('Warning: could not create sessions directory:', e.message);
}

// ─────────────────────────────────────────────────────────────────
// HISTORY — tracks which candidates have already been extracted
// ─────────────────────────────────────────────────────────────────
let history = { harvestedHashes: [], lastRun: '' };
try {
  if (fs.existsSync(HISTORY_FILE)) {
    history = JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf8'));
  }
} catch {
  // start fresh
}

/** Lightweight, consistent hash of a candidate text for dedup across runs */
function hashText(text) {
  const s = text.slice(0, 120).toLowerCase().replace(/\s+/g, ' ').trim();
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return Math.abs(h).toString(36);
}

function isAlreadyHarvested(candidate) {
  return (history.harvestedHashes || []).includes(hashText(candidate.text));
}

// ─────────────────────────────────────────────────────────────────
// --record HANDLER — mark candidates from last run as done
// ─────────────────────────────────────────────────────────────────
if (args.includes('--record')) {
  const idxArg = args[args.indexOf('--record') + 1];
  if (!idxArg) {
    console.error('\nError: --record requires comma-separated numbers e.g. --record "1,2,3"\n');
    process.exit(1);
  }

  let lastRun = { candidates: [] };
  try {
    if (fs.existsSync(LAST_RUN_FILE)) {
      lastRun = JSON.parse(fs.readFileSync(LAST_RUN_FILE, 'utf8'));
    }
  } catch {
    console.error('\nError: No last run found. Run harvest.js first to generate candidates.\n');
    process.exit(1);
  }

  const indices  = idxArg.split(',').map(n => parseInt(n.trim(), 10) - 1).filter(n => !isNaN(n));
  const toMark   = indices.map(i => lastRun.candidates[i]).filter(Boolean);

  if (!toMark.length) {
    console.error('\nNo matching candidates in last run. Check your numbers.\n');
    process.exit(1);
  }

  const newHashes = toMark.map(c => hashText(c.text));
  history.harvestedHashes = [...new Set([...(history.harvestedHashes || []), ...newHashes])];
  history.lastRun = getTodayString();

  try {
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2), 'utf8');
  } catch (e) {
    console.error('Error saving history:', e.message);
    process.exit(1);
  }

  // Write session log
  const logPath = path.join(SESSIONS_DIR, `harvest-${getTodayString()}.md`);
  const logContent = [
    `# Harvest Session — ${getTodayString()}`,
    `> **One-line Summary**: Knowledge extraction session — ${toMark.length} candidate(s) marked as harvested.`,
    '',
    `- **Date**: ${getTodayString()}`,
    `- **Harvested Candidates**:`,
    ...toMark.map(c => `  - \`${c.type}\` from [[${c.source}]]: "${c.text.slice(0, 80)}..."`),
    '',
    '---',
    '*Generated by harvest.js — [[03-Resources/Tools/Vault-Librarian-Interviewer]]*',
  ].join('\n');

  try {
    fs.writeFileSync(logPath, logContent, 'utf8');
  } catch (e) {
    console.error('Warning: could not write session log:', e.message);
  }

  console.log(`\n✅ Harvested ${toMark.length} candidate(s).`);
  console.log(`   Log saved → 06-Agent-Sessions/harvest-${getTodayString()}.md\n`);
  process.exit(0);
}

// ─────────────────────────────────────────────────────────────────
// FILE HELPERS
// ─────────────────────────────────────────────────────────────────
function safeRead(filepath) {
  try { return fs.readFileSync(filepath, 'utf8'); }
  catch { return null; }
}

function safeReadDir(dir) {
  try { return fs.readdirSync(dir); }
  catch { return []; }
}

function getTodayString() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function getDateString(daysAgo) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

// ─────────────────────────────────────────────────────────────────
// FINGERPRINT ENGINE
// ─────────────────────────────────────────────────────────────────

/** Score a text passage against all fingerprints. Returns { weight, labels }. */
function scorePassage(text) {
  const labels = [];
  let weight   = 0;
  for (const fp of FINGERPRINTS) {
    if (fp.rx.test(text)) {
      labels.push(fp.label);
      weight += fp.w;
    }
  }
  return { labels, weight };
}

/**
 * Extract candidate passages from markdown content.
 * Each passage is a line + one line of surrounding context.
 * Skips structural, metadata, and trivially short lines.
 */
function extractPassages(content) {
  const lines    = content.split('\n');
  const passages = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip non-content lines
    if (!line || line.length < 20)                             continue;
    if (line.startsWith('#'))                                  continue;
    if (line.startsWith('```') || line === '---')              continue;
    if (line.startsWith('**Tags:**'))                          continue;
    if (line.startsWith('> **One-line'))                       continue;
    if (/^-\s\[[\sx]\]/.test(line))                           continue; // checklist items (MOC scanner handles these)
    if (/^\|/.test(line))                                      continue; // table rows
    if (/^(create table|index on|alter table)/i.test(line))   continue; // SQL

    // Context window: one line before + current line + one line after
    const context = [
      lines[i - 1]?.trim() || '',
      line,
      lines[i + 1]?.trim() || '',
    ].filter(l => l && !l.startsWith('#') && !l.startsWith('```')).join(' ');

    passages.push({ primary: line, context, lineNumber: i + 1 });
  }

  return passages;
}

// ─────────────────────────────────────────────────────────────────
// SCANNER 1 — MOC Queue (highest priority)
// Finds unchecked items in "Queued", "Pending", "TODO" sections
// of any MOC-*.md file in 03-Resources/
// ─────────────────────────────────────────────────────────────────
function scanMOCQueue() {
  const candidates = [];

  function walkDir(dir, relBase) {
    let entries;
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); }
    catch { return; }

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relPath  = `${relBase}/${entry.name}`;

      if (entry.isDirectory()) {
        walkDir(fullPath, relPath);
        continue;
      }

      if (!entry.name.startsWith('MOC') || !entry.name.endsWith('.md')) continue;

      const content = safeRead(fullPath);
      if (!content) continue;

      const lines = content.split('\n');
      let inQueueSection = false;

      for (const line of lines) {
        // Enter queue section
        if (/^#+\s.*(queue|queued|pending|to[\s-]?do)/i.test(line)) {
          inQueueSection = true;
          continue;
        }
        // Exit at next heading
        if (inQueueSection && /^#+\s/.test(line)) {
          inQueueSection = false;
          continue;
        }
        if (!inQueueSection) continue;

        // Match: - [ ] **Label**: description
        const match = line.match(/^-\s\[\s\]\s+\*\*(.+?)\*\*(.*)$/);
        if (!match) continue;

        const label       = match[1].trim();
        const description = match[2].replace(/^[:\s–—-]+/, '').trim();
        const text        = description ? `${label}: ${description}` : label;

        candidates.push({
          type:      'queue_follow_up',
          typeLabel: 'Queue Follow-up',
          source:    relPath,
          text,
          weight:    7, // highest priority — already identified gap
          labels:    ['queued'],
        });
      }
    }
  }

  walkDir(DIRS.resources, '03-Resources');
  return candidates;
}

// ─────────────────────────────────────────────────────────────────
// SCANNER 2 — Unprocessed Clippings
// A clipping is "processed" if any 03-Resources file references
// it by filename or title. Otherwise it's raw material.
// ─────────────────────────────────────────────────────────────────

/** Collect all text from 03-Resources into a searchable string array */
function buildResourceIndex() {
  const texts = [];

  function walkDir(dir) {
    let entries;
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); }
    catch { return; }

    for (const entry of entries) {
      if (entry.isDirectory()) {
        walkDir(path.join(dir, entry.name));
      } else if (entry.name.endsWith('.md')) {
        const content = safeRead(path.join(dir, entry.name));
        if (content) texts.push(content.toLowerCase());
      }
    }
  }

  walkDir(DIRS.resources);
  return texts;
}

function scanClippings() {
  const candidates    = [];
  const clippingFiles = safeReadDir(DIRS.clippings).filter(
    f => f.endsWith('.md') && f !== '.gitkeep' && !f.startsWith('.')
  );
  if (!clippingFiles.length) return [];

  const resourceTexts = buildResourceIndex();

  for (const file of clippingFiles) {
    const baseName = path.basename(file, '.md');
    const content  = safeRead(path.join(DIRS.clippings, file));
    if (!content) continue;

    // Check if any resource file references this clipping
    const searchTerms = [
      baseName.toLowerCase(),
      baseName.toLowerCase().replace(/-/g, ' '),
    ];
    const isReferenced = resourceTexts.some(rt =>
      searchTerms.some(term => rt.includes(term))
    );
    if (isReferenced) continue;

    // Pull title from frontmatter > first heading > filename
    const titleMatch =
      content.match(/^title:\s*(.+)$/m) ||
      content.match(/^#\s+(.+)$/m);
    const title = titleMatch
      ? titleMatch[1].replace(/[*_`]/g, '').trim()
      : baseName.replace(/-/g, ' ');

    candidates.push({
      type:      'clipping_distill',
      typeLabel: 'Clipping Distillation',
      source:    `Clippings/${file}`,
      text:      title,
      weight:    5,
      labels:    ['unprocessed'],
    });
  }

  return candidates;
}

// ─────────────────────────────────────────────────────────────────
// SCANNER 3 — DEV_NOTES across all (or focused) projects
// High threshold (weight >= 4) — dev notes are dense, need signal
// ─────────────────────────────────────────────────────────────────
function scanDevNotes() {
  const candidates = [];
  const projectDirs = safeReadDir(DIRS.projects).filter(
    d => !d.startsWith('.') && !d.endsWith('.md')
  );

  for (const proj of projectDirs) {
    if (FOCUS && !proj.toLowerCase().includes(FOCUS)) continue;

    const devNotesPath = path.join(DIRS.projects, proj, 'Docs', 'DEV_NOTES.md');
    const content      = safeRead(devNotesPath);
    if (!content) continue;

    const relPath  = `01-Projects/${proj}/Docs/DEV_NOTES.md`;
    const passages = extractPassages(content);

    for (const passage of passages) {
      const { labels, weight } = scorePassage(passage.context);
      if (weight < 4) continue; // strict threshold for high-volume files

      candidates.push({
        type:      'depth_probe',
        typeLabel: 'Depth Probe',
        source:    relPath,
        text:      passage.primary,
        weight,
        labels,
      });
    }
  }

  return candidates;
}

// ─────────────────────────────────────────────────────────────────
// SCANNER 4 — Daily Notes (last N days)
// Lower threshold (weight >= 3) — daily notes are shorter + casual
// ─────────────────────────────────────────────────────────────────
function scanDailyNotes() {
  const candidates = [];

  for (let i = 0; i <= DAYS_BACK; i++) {
    const dateStr  = getDateString(i);
    const filepath = path.join(DIRS.daily, `${dateStr}.md`);
    const content  = safeRead(filepath);
    if (!content) continue;

    const relPath  = `05-Daily/${dateStr}.md`;
    const passages = extractPassages(content);

    for (const passage of passages) {
      const { labels, weight } = scorePassage(passage.context);
      if (weight < 3) continue;

      candidates.push({
        type:      'depth_probe',
        typeLabel: 'Depth Probe',
        source:    relPath,
        text:      passage.primary,
        weight,
        labels,
      });
    }
  }

  return candidates;
}

// ─────────────────────────────────────────────────────────────────
// DEDUP + RANK
// Priority order: queue_follow_up > clipping_distill > depth_probe
// Secondary sort: weight descending
// ─────────────────────────────────────────────────────────────────
function deduplicateAndRank(all) {
  const seenKeys = new Set();

  const unique = all.filter(c => {
    if (isAlreadyHarvested(c)) return false;
    const key = c.text.slice(0, 80).toLowerCase().replace(/\s+/g, ' ').trim();
    if (seenKeys.has(key)) return false;
    seenKeys.add(key);
    return true;
  });

  const typeOrder = { queue_follow_up: 10, clipping_distill: 6, depth_probe: 0 };

  unique.sort((a, b) => {
    const td = (typeOrder[b.type] || 0) - (typeOrder[a.type] || 0);
    return td !== 0 ? td : b.weight - a.weight;
  });

  return unique.slice(0, MAX_CANDS);
}

// ─────────────────────────────────────────────────────────────────
// PROMPT BUILDERS
// ─────────────────────────────────────────────────────────────────

/** Build the drill question block for one candidate */
function buildCandidateBlock(c, index, total) {
  const clean = c.text.replace(/\*+/g, '').replace(/\[\[.*?\]\]/g, '').trim();
  const short = clean.length > 180 ? clean.slice(0, 177) + '...' : clean;
  const fname = path.basename(c.source, '.md');

  const drills = {
    depth_probe: [
      `Victor wrote in [[${c.source}]]:`,
      `"${short}"`,
      ``,
      `Drill questions:`,
      `→ What's the generalizable rule? Not what happened — the principle behind it.`,
      `→ Does this apply to Tempire or future projects too, or is it project-specific?`,
      `→ What would you name this as a permanent skill note in 03-Resources/Skills/?`,
    ],
    clipping_distill: [
      `Unprocessed clipping in vault: [[${fname}]]`,
      `Title: "${short}"`,
      ``,
      `Drill questions:`,
      `→ What's your actual synthesis — not the article's summary, yours?`,
      `→ How would you apply this to a current project right now?`,
      `→ Is there one rule worth a permanent note? What's the title and one-line summary?`,
    ],
    queue_follow_up: [
      `Queued lesson in [[${c.source}]]:`,
      `"${short}"`,
      ``,
      `Drill questions:`,
      `→ Walk me through this. What happened, specifically?`,
      `→ What's the one-sentence rule you'd give Antigravity to prevent this in future projects?`,
      `→ Tell me what happened — I'll propose the note title after your first answer.`,
    ],
  };

  const lines = drills[c.type] || drills.depth_probe;

  return [
    `### [${index + 1}/${total}] ${c.typeLabel.toUpperCase()}`,
    `**Source:** [[${c.source}]]   **Signal:** ${c.weight}   **Labels:** ${c.labels.join(', ')}`,
    ``,
    ...lines,
  ].join('\n');
}

/** Assemble the full LLM prompt from ranked candidates */
function buildFinalPrompt(candidates) {
  const today = getTodayString();
  const SEP   = '─'.repeat(64);

  const header = [
    '═'.repeat(64),
    `  🌾  HARVEST SESSION — ${today}`,
    `  ${candidates.length} candidate(s) queued for extraction`,
    '═'.repeat(64),
  ].join('\n');

  const roleBlock = [
    `## YOUR ROLE`,
    ``,
    `You are Victor's extraction agent — not his assistant, his interviewer.`,
    `Your job is to turn raw experience and observations from the vault into`,
    `permanent atomic notes in 03-Resources/Skills/ using the vault skill format.`,
    ``,
    `## RULES — none of these are optional`,
    ``,
    `1. **One candidate at a time.** Don't mention the others exist. Fully`,
    `   exhaust the current one before moving on.`,
    ``,
    `2. **Refuse vague answers.** If Victor says "yeah there was an issue with X":`,
    `   → "What specifically caused it? What's the one-sentence rule for your future self?"`,
    `   Never accept surface-level answers. Drill until you have something draftable.`,
    ``,
    `3. **Propose the note title in your FIRST follow-up.** Not at the end.`,
    `   As soon as you understand the shape of the lesson, name it.`,
    ``,
    `4. **Your default state is creating.** Say:`,
    `   "This sounds like [Proposed-Note-Name].md — drafting it now unless you say stop."`,
    `   Victor's job is to redirect or refine, not to initiate.`,
    ``,
    `5. **Draft the note inline** when you have enough. Use this exact format:`,
    ``,
    `   # Lesson: [Title]`,
    `   > **One-line Summary**: [one sentence]`,
    `   ## The Trap`,
    `   ## The Fix`,
    `   ## Code Pattern / Prompt Template`,
    `   ## Where This Appeared`,
    `   - [[source file]]`,
    `   ## Related`,
    `   - [[related note]]`,
    `   **Tags:** #lesson #[relevant tags]`,
    ``,
    `6. **After drafting:** Ask "Anything to add or change before I finalize?"`,
    `   Then move to the next candidate.`,
    ``,
    `7. **Cross-project check:** If a lesson from Momentum also applies to Tempire`,
    `   or future projects, say it explicitly in the draft's Related section.`,
    ``,
    `8. **If Victor says "I don't remember":** Point to the exact source file and`,
    `   the line you're referencing. Ask him to open it. Don't let him off.`,
    `   The observation exists in writing — your job is to extract the principle from it.`,
  ].join('\n');

  const candidatesSection = candidates
    .map((c, i) => buildCandidateBlock(c, i, candidates.length))
    .join(`\n\n${SEP}\n\n`);

  const footer = [
    '═'.repeat(64),
    `## START`,
    ``,
    `Begin with candidate [1]. Ask your first question now.`,
    `Do not acknowledge or mention the other ${candidates.length - 1} candidate(s) until [1] is done.`,
    ``,
    `When all candidates are exhausted, tell Victor to run:`,
    `  node scripts/harvest.js --record "${candidates.map((_, i) => i + 1).join(',')}"`,
    ``,
    `This marks them as harvested so they won't appear in the next session.`,
    '═'.repeat(64),
  ].join('\n');

  return [
    header, '',
    roleBlock, '',
    `## CANDIDATES`, '',
    SEP, '',
    candidatesSection, '',
    footer,
  ].join('\n');
}

// ─────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────
function run() {
  // Collect candidates from all scanners (priority order matters for dedup)
  const all = [
    ...scanMOCQueue(),
    ...scanClippings(),
    ...scanDevNotes(),
    ...scanDailyNotes(),
  ];

  const candidates = deduplicateAndRank(all);

  // ── JSON ──────────────────────────────────────────────────────
  if (JSON_OUT) {
    console.log(JSON.stringify(candidates, null, 2));
    return;
  }

  // ── DRY RUN ───────────────────────────────────────────────────
  if (DRY_RUN) {
    const SEP = '─'.repeat(60);
    console.log(`\n🌾 HARVEST DRY RUN — ${getTodayString()}`);
    console.log(`   Days: ${DAYS_BACK}  |  Max: ${MAX_CANDS}  |  Focus: ${FOCUS || 'all projects'}\n`);
    console.log(`   Raw candidates : ${all.length}`);
    console.log(`   After filtering: ${candidates.length}\n`);
    console.log(SEP);

    if (!candidates.length) {
      console.log('\n   Nothing to harvest. Vault looks clean.\n');
    } else {
      candidates.forEach((c, i) => {
        const preview = c.text.length > 90 ? c.text.slice(0, 87) + '...' : c.text;
        console.log(`\n   [${i + 1}] ${c.typeLabel} (weight: ${c.weight})`);
        console.log(`       Source : ${c.source}`);
        console.log(`       Text   : "${preview}"`);
        console.log(`       Labels : ${c.labels.join(', ')}`);
      });
    }

    console.log(`\n${SEP}`);
    console.log('\n   Run without --dry-run to generate the extraction prompt.\n');
    return;
  }

  // ── NO CANDIDATES ─────────────────────────────────────────────
  if (!candidates.length) {
    console.log('\n✅ Nothing to harvest right now.\n');
    console.log('   Possible reasons:');
    console.log('   • All recent observations are already documented');
    console.log('   • All clippings have been processed');
    console.log('   • Daily notes from the last 14 days have no strong lesson signals\n');
    console.log('   To generate more candidates:');
    console.log('   • Write detailed notes after sessions (use lesson-language)');
    console.log('   • Add to DEV_NOTES.md during testing ("I noticed...", "Bad UX:")');
    console.log('   • Add queued items to MOC files: - [ ] **Lesson Name**: description\n');
    return;
  }

  // ── SAVE LAST RUN (needed for --record) ──────────────────────
  try {
    fs.writeFileSync(
      LAST_RUN_FILE,
      JSON.stringify({ date: getTodayString(), candidates }, null, 2),
      'utf8'
    );
  } catch (e) {
    console.error('Warning: could not save last run state:', e.message);
  }

  // ── PRINT PROMPT ──────────────────────────────────────────────
  const prompt = buildFinalPrompt(candidates);
  const RULER  = '═'.repeat(66);

  console.log(`\n${RULER}`);
  console.log('  HARVEST — paste everything below this line into your agent');
  console.log(`${RULER}\n`);
  console.log(prompt);
  console.log(`\n${RULER}\n`);
}

run();

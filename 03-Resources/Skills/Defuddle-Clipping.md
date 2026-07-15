# Defuddle Web Ingestion (Skill Guide)

> **One-line Summary**: Guide and command reference for using the defuddle CLI tool to ingest web clippings into the Second Brain vault.

---

## 1. Introduction to Defuddle
`defuddle` is an open-source library and command-line utility designed to extract clean, readable main content from web pages by stripping out headers, footers, sidebars, ads, and navigation menus. It is the primary engine used to convert web URLs or clippings into clean Markdown format for ingestion into Victor's Second Brain vault.

---

## 2. Global Installation
The CLI is installed globally using Node Package Manager (npm):
```bash
npm install -g defuddle
```

To verify installation and check the current active version:
```bash
which defuddle && defuddle --version
```

---

## 3. Basic Commands & Usage

### A. Extract Content from a Live URL
To parse any webpage and convert it directly to clean markdown:
```bash
defuddle parse https://example.com/article --markdown
```

### B. Output Options
- `--markdown` (default output type in our workflow): Converts HTML to standard Obsidian-friendly markdown.
- `--html`: Outputs cleaned HTML.
- `--json`: Outputs structured JSON containing article text, title, author, date, and other rich metadata.

---

## 4. Integration with Second Brain Ingestion Pipeline
When ingesting new web resources or processing browser clips:
1. **Source:** Web Clipper saves a clip into the [Clippings](file:///home/redmane/Documents/SecondBrain/Clippings) folder.
2. **Extraction:** Use `defuddle` to clean the raw source or pull transcript files for video clips:
   ```bash
   defuddle parse <url> --markdown > 03-Resources/Saved-Threads/<note-name>.md
   ```
3. **Refining:** Update the file header with a `> **One-line Summary**` and format wikilinks to relevant concept or project notes.

**Tags**: #skill #defuddle #ingest #clipping #documentation

## Related
- [[03-Resources/Clippings-Ingest-Log|Clippings Ingest Log]]
- [[03-Resources/Vault-LLM-Wiki-Patterns|Vault LLM Wiki Patterns]]
- [[AGENTS|AGENTS.md]]


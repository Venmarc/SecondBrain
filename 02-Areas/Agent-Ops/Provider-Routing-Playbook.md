# Provider Routing Playbook

> **One-line Summary**: Route delegated work by proven task fit, latency, reliability, and marginal cost—not catalog size or context window. Default children to Nous Step 3.7 Flash Free; reserve shared OpenCodeGo capacity for explicitly justified execution or reasoning cards.

**Updated:** 2026-08-26  
**Status:** Operational policy; availability still requires a canary before consequential dispatches.

---

## The core correction

A model being listed, accepting one tiny completion, or advertising a huge context window does **not** prove it is a good worker.

Track six separate states:

1. **Listed** — appears in a provider catalog.
2. **Accessible** — the credential can call it.
3. **Zero-marginal-cost** — does not consume subscription quota or monthly credits.
4. **Responsive** — completes a canary inside the lane's latency ceiling.
5. **Capable** — has passed a representative task for the intended role.
6. **Reliable** — repeats that performance without truncation, tool failures, or rate-limit collapse.

Only models proven at states 5–6 belong in automatic routing. A 1M-token context is storage capacity, not intelligence, planning quality, instruction adherence, or tool competence.

---

## Current routing table

| Lane | Cost/risk | Proven use | Do not assume | Dispatch policy |
|---|---|---|---|---|
| `nous / stepfun/step-3.7-flash:free` | Zero marginal cost; 262k context | Fast canary passed 2026-08-26; Victor rates Step 3.7 Flash as good | Complex autonomous coding quality is not yet fully benchmarked | **Default delegated worker.** Use for bounded research, inspection, review, summaries, and low/medium-risk cards. |
| `opencode-go / ox-alpha-free` | Free/unlimited route reported active | Live Hermes probe passed 2026-08-26; current interactive default | Long autonomous tool-loop reliability | Use for interactive management and bounded reasoning; canary before long delegation. |
| `opencode-go / glm-5.2` | Shared borrowed subscription; unknown provider rate limits; potentially slow | Victor trusts reasoning quality | Cheapness, speed, or unlimited quota | Explicit override for hard reasoning only. One worker at a time. |
| `opencode-go / mimo-v2.5-pro` | Shared borrowed subscription; consumes provider allowance | Reported strong at executing a hole-free plan | Planning quality | Explicit override only after a reviewed implementation plan exists. |
| `opencode-go / deepseek-v4-flash` | Shared borrowed subscription | Previously useful general lane | Current quota economics | Reserve; do not route automatically. |
| `nvidia / stepfun-ai/step-3.7-flash` | Free; contention possible | Previously responsive and Step family trusted | Stable latency under load | Fallback when Nous Step is unavailable; sequential calls only. |
| `nvidia / z-ai/glm-5.2` | Free; can be slow | One of Victor's roughly five useful NVIDIA models | Fast turnaround | Hard-reasoning fallback with generous timeout; never parallel burst. |
| `nvidia / minimaxai/minimax-m3` | Free | One of Victor's useful NVIDIA models | Consistent quality across coding tasks | Candidate for bounded execution/review after representative benchmark. |
| `ai-gateway / *:free` | Some are truly zero-dollar; other accessible models consume the $5 monthly credit at provider rates | Victor reports roughly 4–6 genuine zero-cost models and about 20 accessible/free-tagged modes | That `:free`, accessible, or catalog-listed means zero credit usage | No automatic use until model-by-model billing class and rate limits are verified. |
| `nous / meituan/longcat-2.0:free` | Zero-dollar; 1M context | Accessibility/context only | Intelligence, instruction following, coding quality, tool reliability | Context-heavy extraction candidate only; benchmark before agent work. |
| `nous / upstage/solar-pro4:free`, `tencent/hy3:free`, `poolside/laguna-s-2.1:free` | Zero-dollar | Accessible in prior audit | General quality | Experimental; no automatic routing. |
| `agy / Gemini variants` | OAuth lane; bridge/tool behavior uncertain | Vision and reasoning reported working | Multi-tool loops, writes, web, and autonomous execution | Read-only/image analysis until write/tool-loop capability is explicitly verified. |
| Copilot | Severe rate-limit concerns | Legacy models were callable | Usable autonomous throughput | Excluded from delegation until re-probed. |
| AgentRouter frontier models | Paid/premium | High intelligence | Cost efficiency | Manager-only escalation; never routine workers. |

---

## Dispatch algorithm

1. **Classify the card** as inspection, synthesis, planning, execution, review, vision, or long-context extraction.
2. **Set the budget before choosing a model:** wall time, max iterations, concurrency, cost class, and acceptable fallback.
3. **Choose the cheapest proven lane for that role**, not the biggest model or context window.
4. **Run a canary** when the lane has not succeeded recently: exact short response for availability, then a representative micro-task for capability.
5. **Dispatch one bounded card.** Never give a free/slow model an entire multi-hour mission.
6. **Watch progress evidence:** API-call count, current tool, transcript timestamp, artifacts, and commit movement.
7. **Abort and reroute** on repeated 429/5xx, no transcript progress, truncation, or two failed tool loops. Do not let a worker consume its full budget while obviously stuck.
8. **Verify independently.** A worker's summary is a claim.
9. **Record the result** as route telemetry: model/provider, role, duration, iterations, outcome, failure class, and whether the fallback was used.

---

## Default budgets

| Card type | Wall time | Iterations | Concurrency | Default lane |
|---|---:|---:|---:|---|
| Inspection / extraction / review | 10 min | 20 | Up to 2 | Nous Step 3.7 Free |
| Bounded implementation card | 20 min | 30 | 1 per repo lane | Nous Step 3.7 Free; Mimo only by explicit override |
| Hard reasoning / architecture | 20 min | 25 | 1 | GLM 5.2 only by explicit override |
| Whole-project orchestration | Forbidden as one child | — | — | Parent manager decomposes into cards |

A timeout is not proof the model is bad. It is proof the **route-card-budget combination** failed.

---

## Provider facts still needing measurement

- Exact Vercel zero-dollar model IDs versus models that spend the $5 monthly credit.
- Vercel free-tier request/token rate limits and reset behavior.
- Representative task quality for Nous LongCat, Solar, HY3, and Laguna.
- AGY file-write, terminal, web, and multi-tool-loop behavior.
- NVIDIA MiniMax M3 quality and latency under realistic card prompts.
- Borrowed OpenCodeGo plan pricing/rate limits; until known, treat every non-free call as scarce.

Do not fill these gaps with catalog metadata or one-token probes.

**Tags:** #hermes #routing #providers #delegation #cost-control

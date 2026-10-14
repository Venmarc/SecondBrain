> **One-line Summary**: Clerk hosted/custom auth cards can render dark-on-dark text — fix theme/appearance variables so the card matches Momentum/Ledger surfaces.

# Clerk Auth Card Contrast

**Observed:** 2026-07-09 on Momentum auth pages. Card and text both dark → invisible copy; auth still functions.

## Symptom

Looks like a "face smeared with charcoal" — inputs/labels unreadable on dark app chrome.

## Likely causes

- Clerk `appearance` not aligned with app dark theme tokens.
- Default card background + default text color both landing in the same luminance band.
- Mismatch between app `globals.css` theme and Clerk isolated shadow DOM styles.

## Fix direction (when scheduled)

1. Set Clerk `appearance.variables` / `elements` for card background, text, input, and primary button to match the current Momentum or Ledger project documents.
2. Test sign-in/sign-up on real device, not only desktop devtools.
3. Prefer branded auth phase only after contrast baseline is correct.

## Projects

- **Momentum** — active blocker after Phase 0 landing work.
- **Ledger** — apply same pattern in Phase 0 auth setup.

## Related

- Historical source: daily note `2026-07-09` (deleted during the 2026-10-14 cleanup).
- [[01-Projects/Momentum/Momentum|Momentum hub]]

**Tags:** #skill #clerk #auth #momentum #ledger #a11y

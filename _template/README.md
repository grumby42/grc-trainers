# _template — starting a new GRC trainer

*`csf-board-ask/` is the template. Copy its architecture, not its content.*

Each trainer is assembled from `src/` and a pared data file:

```
src/shell.html     styles + layout + mode containers (reuse as-is)
src/app.js         walkthrough renderer, four-question layer, views, meters, rail (reuse)
src/exercises.js   generator; data-driven reps reuse as-is, authored pools are per case
src/log.js         workpaper log + About page (reuse; edit LOG_EXAMPLE / credits)
src/content.js     THE CASE: steps, questions, profile rows, refs (rebuild per case)
case.json          which CSF / 800-53 IDs and ATT&CK techniques to pull from OSCAL / CTID
```

## How to start one

1. **Read [`../TRAINER_SPEC.md`](../TRAINER_SPEC.md) first**, especially §B (the fact-check
   bar) and the licensing rule. Read the routing table in [`../CURRICULUM.md`](../CURRICULUM.md) §3.
2. **Source before you build.** Fetch and read at least 2 primaries for the ask type,
   and pay down the relevant items in CURRICULUM §5 (source debt).
3. `cp -r ../csf-board-ask ../<slug>`. Then rewrite `content.js` and `case.json`, and
   delete the old `index.html`.
4. Run `../_build/pare.py`. It refuses IDs that aren't in the catalog. Then run
   `../_build/build.py --prefix GRCT`, then `node --check` on the extracted script.
5. **Rebuild per case:**
   - the step array (route through modules M0–M9, or say in the README why a module is skipped);
   - the ask-specific bias traps;
   - the Control Owner views;
   - `TESTS.md`, `LAB.md` and the credits.
6. Run the **pre-ship checklist** (TRAINER_SPEC §B), plus a browser smoke test from
   `file://` at desktop and phone widths.

## Promotion to a shared shell

Once trainer #2 exists, factor `app.js`, `exercises.js` (the data-driven part),
`log.js` and `shell.html` into `_template/` and have each case's build import them.
Until then, `csf-board-ask/src/` is the source of truth.

---

*Generated 2026-10-16T16:33Z.*

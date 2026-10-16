# TRAINER_SPEC — the GRC Trainers build contract

Every trainer in this repo meets this spec. It is a sibling of the
[`dfir-trainers` spec](https://github.com/grumby42/dfir-trainers/blob/main/TRAINER_SPEC.md)
and keeps the same shape, with the content recast for **governance, risk and
compliance engagements**. The curriculum it teaches, and the research behind it,
are in **[`CURRICULUM.md`](CURRICULUM.md)**.

The shell is reusable. The per-case work is the content and, above all, the
fact-check. **Reference implementation (planned):** `csf-board-ask/`, a
management asks "are we aligned to NIST CSF 2.0?" case. NIST's primaries for it
are free and have already been read.

If a trainer can't meet a **MUST** here, it doesn't ship.

---

## A. Template contract (structure)

Every trainer MUST contain:

- **One self-contained offline HTML file** (`index.html`) built from vanilla JS
  data arrays and render functions. No external dependencies, no network calls,
  no telemetry. It must run from `file://`.

- **Three modes:**
  1. **Engagement walkthrough.** The ask lands, then scope, request list,
     document review, interviews, testing, findings, risk, remediation, report,
     monitor. Every step carries the **four-question reasoning layer**:
     - **Criteria.** *What am I looking for?* Name the requirement and cite the
       framework and control ID.
     - **Source.** *Where am I looking for it?* Name the assessment object
       (document, person, mechanism or activity) and the method (**examine**,
       **interview** or **test**).
     - **Sufficiency.** *How do I know it's what I need?* Judge relevance,
       reliability, period and corroboration. Set depth (basic, focused or
       comprehensive) and coverage (basic sample, focused sample or sufficiently
       large sample). Then make the call: enough, or what more you need.
     - **Alignment.** *How do I make it conform?* State the conclusion (meets,
       gap or exception), the finding, the risk rating and the remediation,
       mapped back to the control.
  2. **Exercise generator.** Randomized reps grounded in real, current framework
     text:
     - classify an ask;
     - write a scope statement;
     - pick the evidence for a control;
     - make a sufficiency call;
     - make a depth and coverage call;
     - design an interview;
     - spot a design gap versus an operating failure versus an evidence gap;
     - write a finding;
     - rate a risk;
     - draft a POA&M line;
     - crosswalk two frameworks;
     - translate a finding for an executive audience;
     - spot the bias.
  3. **Workpaper log.** A fixed-schema, fillable form with JSON and TSV export, so
     two assessors' workpapers stay comparable. Its fields are:
     - control ID and framework references;
     - requirement;
     - method (E, I or T);
     - depth and coverage;
     - objects, interviewee role and evidence reference;
     - period;
     - result and exception;
     - finding;
     - current rating (as observed) and target residual rating;
     - treatment, owner, milestone and closure evidence.

- **Evolving framework meters** that light up as the engagement progresses:
  - **Engagement lifecycle**: Intake, Scope, Fieldwork, Analysis, Remediate, Report, Monitor.
  - **CSF 2.0 Profile** (CSWP 29's five steps): Scope, Gather inputs, Current/Target, Gap analysis + action plan, Implement & update.
  - **RMF step**: Prepare through Monitor.
  - **Assessment method**: Examine, Interview and Test, with depth and coverage.
  - **CSF Tier read**: Partial, Risk Informed, Repeatable, Adaptive.

  Each case shows only the meters that apply to it. An ISO case swaps the RMF
  meter for an audit-stage meter (Stage 1, Stage 2, Close).

- **CISM domain tag** on every walkthrough step and exercise. It uses the new
  outline that takes effect 2026-11-03 (D1 18%, D2 20%, D3 33%, D4 29%), so the
  trainer doubles as CISM practice. The mapping is in `CURRICULUM.md` §7.

- **Primary content, not synthesis.** Criteria and assessment procedures come
  from the **NIST OSCAL catalog**, pared into the trainer's data arrays at build
  time. That catalog holds the SP 800-53 Rev 5.2.0 controls, the SP 800-53A
  assessment objectives and methods, the CSF 2.0 core and SP 800-171r3. The
  source is CC0, and the oscal-content commit hash is recorded. The trainer
  still runs offline: data is baked in, never fetched at runtime.

- **Bias & independence thread.** It has three parts:
  - **Bias checks** at the moments bias bites. Examples: "the policy exists, so
    the control works"; anchoring on last year's report; adopting management's
    narrative; letting the auditee pick the sample; scope drift in either
    direction.
  - A **competing-explanations gate** for every exception. Is it a design gap,
    an operating failure, an evidence gap, or a scope or criteria mismatch?
  - A **bias watchlist.**

  The rule throughout: *notice it, note it, seek disconfirming evidence, and
  never lean on it.*

- **Assessor ⇄ Control Owner toggle** on every phase. It shows how the auditee
  sees the same request: what they'll hand over, what they'll over-explain, and
  what a reasonable pushback looks like. It is framed as **plausible
  perspective, not a script of what a real person would say**. There is also an
  optional **Threat lens**, which asks whether this control would actually
  interrupt the relevant ATT&CK behavior. SANS SEC566 uses ATT&CK to assess
  control effectiveness, and this lens links back to `dfir-trainers`. Its data
  comes from the CTID Mappings Explorer 800-53 ↔ ATT&CK files (Apache-2.0).

- **Engagement Lead persona.** The lead tasks you, asks pointed questions
  ("what decision does this inform?", "who picked that sample?", "is that
  corroborated?"), and asks for a **status memo** at each gate. The
  stakeholders who act as interview NPCs (owner, operator, executive) are
  fictional.

- **Build stamping.** Set a `BUILD_ID` constant of the form
  `GRCT-YYYYMMDD-HHMMZ` and a `STAMP_UTC` constant. Show both in the app and
  repeat them in the trainer's README. The prefix is provisional until you
  confirm it.

- **Keyboard navigation:** `←` / `→` through the walkthrough.

- **Build-a-lab guide** (`LAB.md`). A free, mostly local practice kit that lets
  you run the case's artifacts yourself. Examples: export the CSF 2.0 Reference
  Tool, fill in a synthetic Current and Target Profile, and run a
  free-tier benchmark scan against your own VM. Fidelity tiers must be honest.
  The **boundary** is clear: no real organization's data, and synthetic
  workpapers only.

---

## B. Fact-check rigor bar (non-negotiable — before shipping)

- **At least 2 independent primary sources**, fetched and read during the build
  session. Not recalled from model memory, and not summarized second-hand.
  *Primary* means the issuing body's own text: NIST, the PCI SSC, AICPA, HHS,
  DoD, ISACA or ISC2 outlines, CSA. ISO standards are paywalled. Cite only what
  a free, authoritative page states, and never reproduce ISO clause text.

- **No hallucinated, fabricated or guessed facts.** Every claim about a
  framework or a methodology must trace to a cited source.

- **Four-way provenance labeling** on claims that aren't plain source facts:
  - *framework-text fact*: stated in the issuing body's publication;
  - *outline / course fact*: from a certification outline or course syllabus
    (label it as such; it describes what is taught, not what the requirement is);
  - *practitioner inference*: reasoned judgment, such as the Control Owner view
    or a sufficiency heuristic;
  - *synthetic training data*: invented for the trainer. All org profiles,
    evidence, interview transcripts and workpapers fall here.

- **Control IDs verified** against the current catalog (CSF 2.0 subcategories,
  800-53 Rev. 5, CIS v8.1 safeguards, PCI DSS requirement numbers, TSC
  criteria). Never assume an ID from the control's name. This is the GRC version
  of the ATT&CK-ID rule.

- **Version-pinned.** Every framework is cited with its version and date. Any
  framework that changes (CMMC, PCI DSS, the HIPAA Security Rule, the
  certification outlines) is re-checked at build time and stamped "as of".

- **No fabricated numbers.** Use no invented sample sizes, thresholds,
  percentages or regulatory deadlines. If a primary source doesn't give the
  number, the trainer teaches the *reasoning* and says the number is
  engagement-specific.

- **License-compatible embedding only.** Third-party content placed inside
  `index.html` must be public domain, CC0, or permissive (MIT, BSD or Apache-2.0)
  with its notices kept. NC, ND, AGPL and proprietary content (CIS Controls,
  SCF, CSA CCM/CAIQ, Open FAIR, ISACA, IIA and AICPA text) is **cited and linked
  by ID or title only**. The tiered list is in `CURRICULUM.md` §6.

- **No real organizations.** Use fictional companies, `example.com` /
  `example.org` domains, and RFC 5737 IPs in any technical evidence.

- **Not legal or audit-opinion advice.** The trainer teaches practice. It does
  not issue attestations or legal interpretations.

- **Adversary-review test:** *could a seasoned auditor, QSA or C3PAO assessor
  poke holes in this?* If yes, fix it before shipping.

### Pre-ship checklist (copy into the PR / commit notes)

- [ ] At least 2 primary sources fetched and read this session; URLs listed in the README
- [ ] Every framework and methodology claim traceable to a source
- [ ] Non-source claims labeled (outline/course / inference / synthetic)
- [ ] All control IDs verified against the current catalog; framework versions pinned
- [ ] No invented sample sizes, thresholds or deadlines
- [ ] Embedded third-party content is PD/CC0/permissive only; `THIRD_PARTY_NOTICES.md` lists each item with its license; OSCAL commit hash recorded
- [ ] Every step and exercise carries a CISM domain tag (2026-11-03 outline)
- [ ] Zero real orgs or people; all evidence synthetic and marked
- [ ] Control Owner view framed as perspective, not a script
- [ ] Every item in `CURRICULUM.md` §5 source debt that this case touches is paid or labeled
- [ ] Credits-first README + non-affiliation statement present
- [ ] `TESTS.md` present (test procedures, evolve-to-monitoring, baseline/tune, trends)
- [ ] `BUILD_ID` + `STAMP_UTC` set and consistent between the app and the README
- [ ] JS validated (`node --check` on the extracted script) and the page opens from `file://`
- [ ] Adversary-review pass done

---

## C. Credit & licensing (every trainer)

- **Credits-first README.** Before anything else, name the issuing bodies and the
  course or outline authors whose structure informed the case, and link their
  work.

- **Explicit non-affiliation statement:** "not affiliated with, sponsored by, or
  endorsed by NIST, ISACA, ISC2, ISO, AICPA, the PCI SSC, CSA, SANS, PECB, BSI…"
  List every party the trainer names.

- **MIT `LICENSE`**, `Copyright (c) <year> Theodore "Ted" Gransbury`. The root
  LICENSE covers every trainer unless a trainer adds its own.

- **A `TESTS.md` appendix per trainer.** This is the GRC counterpart of
  `DETECTIONS.md`. It gives starter **test procedures** in tool-agnostic
  pseudocode. Each procedure states:
  - the objective;
  - the criteria (control ID);
  - the method (E, I or T) and its objects;
  - the evidence;
  - the depth and coverage;
  - what passes;
  - common exceptions.

  Anchor each one against the published assessment procedure where one exists
  (800-53A, the PCI DSS testing procedures, the CSF Reference Tool). Then cover
  *how to evolve it into continuous monitoring* (a KCI or KRI), *how to
  baseline and tune it*, and *the trend signals to watch*: rising exceptions, a
  stale review date, first-seen out-of-policy configurations, POA&M aging. The
  goal is to teach test design, not to ship copy-paste checklists.

- **Git author:** `Ted Gransbury <tgransbury@gmail.com>`. End every commit with
  the current session's `Co-Authored-By` / `Claude-Session` trailer.

---

## D. Repo structure

```
grc-trainers/
├── README.md          index: what each trainer is, who it's for, the standard
├── TRAINER_SPEC.md    this file
├── CURRICULUM.md      research, crosswalk, MVP modules, source debt
├── LICENSE            MIT, covers all trainers
├── THIRD_PARTY_NOTICES.md  embedded-source licenses (NIST CC0, CTID Apache-2.0, …)
├── .gitignore
├── _build/            OSCAL/CTID → data-array generator (pinned commits)
├── _template/         how to start a new trainer from the reference build
├── csf-board-ask/     index.html · README.md · TESTS.md · LAB.md   (reference impl, planned)
├── soc2-readiness/    (planned) client ask: customer demands a SOC 2 report
├── vendor-review/     (planned) TPRM: assess a SaaS supplier (CAIQ + SOC 2 report)
├── iso27001-ia/       (planned) internal audit before Stage 2
└── cui-readiness/     (planned) 800-171 / CMMC gap for a DoD contract
```

- One subfolder per trainer, named with a short case slug.
- Each trainer folder MUST have `index.html`, `README.md`, `TESTS.md` and `LAB.md`,
  plus the sources that rebuild it: `src/` and `case.json`. A `lab/` folder holds any
  synthetic-data generator.
- The repo root MUST have `THIRD_PARTY_NOTICES.md`, carrying the NIST CC0
  statement, the CTID Apache-2.0 notice (with a full license copy in
  `LICENSES/`), and the notice for any other source actually embedded (for
  example, ComplianceAsCode's BSD-3 notice if a trainer embeds its content).
- `_build/` holds the script that pares the OSCAL and CTID JSON into data
  arrays. It runs offline against a pinned commit.
- GitHub Pages serves each trainer at `/<slug>/`.
- Every planned case must route through the ten modules M0–M9 in
  `CURRICULUM.md`. A case that skips a module must say why in its README.

---

*Spec generated 2026-10-16T16:33Z · spec build `GRCT-20261016-1633Z` (provisional prefix) · modeled on `dfir-trainers` reference build `HUNT-20261015-2250Z`.*

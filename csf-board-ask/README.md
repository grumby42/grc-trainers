# csf-board-ask — "Are we aligned to NIST CSF 2.0?"

*Reference trainer for the GRC Trainers line. A management ask, worked end to end:
intake → scope → request list → document review → interview → test and sample →
supplier review → findings → risk → POA&M → board report.*

**Build:** `GRCT-20261016-1713Z` (provisional prefix) · **STAMP_UTC:** `2026-10-16T17:13Z`

---

## Credits

This trainer stands on public work by:

- **NIST.** [CSF 2.0 (CSWP 29)](https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.29.pdf);
  SP 800-53 Rev 5.2.0 controls and SP 800-53A Rev 5.2.0 assessment procedures; the
  CSF 2.0 core. All three are published in machine-readable form by the **NIST OSCAL team** in
  [usnistgov/oscal-content](https://github.com/usnistgov/oscal-content). Also NIST's
  [assessment-cases guidance](https://csrc.nist.gov/Projects/risk-management/about-rmf/assess-step/assessment-cases-overview)
  on depth and coverage, the [OSCAL POA&M example](https://github.com/usnistgov/oscal-content/tree/main/examples/poam),
  and [IR 8286 Rev. 1](https://csrc.nist.gov/pubs/ir/8286/r1/final).
- **U.S. GAO.** [Yellow Book glossary](https://gaoinnovations.gov/yellowbook/glossary.html)
  definitions of criteria, condition, cause, effect, sufficiency and appropriateness
  ([GAO-24-106786](https://www.gao.gov/products/gao-24-106786)).
- **MITRE Center for Threat-Informed Defense.** [Mappings Explorer](https://github.com/center-for-threat-informed-defense/mappings-explorer),
  800-53 Rev 5 ↔ ATT&CK "mitigates" mappings.
- **Practitioner sources, linked and not reproduced:** ISACA Journal
  ([The Interview as an Audit Tool](https://www.isaca.org/resources/isaca-journal/issues/2016/volume-4/the-interview-as-an-audit-tool-during-an-it-audit)),
  IIA ([Plan for Effective Interviews](https://internalauditor.theiia.org/en/articles/2023/june/plan-for-effective-interviews/)),
  Linford & Co ([SOC review guidance](https://linfordco.com/blog/soc-review-guidance-soc-1-soc-2-reports/),
  [bridge letters](https://linfordco.com/blog/gap-bridge-letter/)), FedRAMP
  ([POA&M guide](https://fedramp.gov/assets/resources/documents/CSP_POAM_Template_Completion_Guide.pdf)),
  and AICPA ([DC 200](https://www.aicpa-cima.com/resources/download/get-description-criteria-for-your-organizations-soc-2-r-report)).

**Not affiliated with, sponsored by, or endorsed by** NIST, GAO, MITRE, ISACA, ISC2,
IIA, AICPA, FedRAMP, Linford & Co, Bitsight, or any organization named here.
*Tarnwick Air Cargo* and everyone in it are fictional. This is training,
not audit, attestation or legal advice.

---

## What it teaches

The same four questions at every step:

| Question | Where the answer comes from |
|---|---|
| **Criteria**: what am I looking for? | CSF 2.0 outcome text plus the 800-53A objective labels, both verbatim from OSCAL, plus the agreed target |
| **Source**: where am I looking for it? | 800-53A's own assessment objects for examine, interview and test; independent populations |
| **Sufficiency**: how do I know it's what I need? | GAO sufficiency (quantity) and appropriateness (relevance, validity, reliability); NIST depth and coverage |
| **Alignment**: how do I make it conform? | GAO finding elements, then risk against appetite, then an OSCAL-shaped POA&M, then the board decision |

**Three modes:**

1. **Engagement walkthrough.** 15 steps, each showing the Assessor view, a Control Owner
   view and a Threat lens (CTID data). It also has framework meters (engagement
   lifecycle, CSF Profile step, method, depth, coverage, tier read), a live Current
   Profile, open questions, bias checks, a competing-explanations gate, and CISM tags.
2. **Exercise generator.** 13 rep types. Four draw directly on NIST's data (method,
   assessment objects, outcome text, objective-to-control), so their answer keys
   come from the catalog. Eight are authored scenario pools (plus a mixed mode): classify the ask, sufficiency,
   competing explanations, GAO finding elements, bias, coverage, board translation and POA&M checks.
3. **Workpaper log.** A fixed schema with JSON and TSV export. The risk and remediation
   fields use OSCAL's allowed values, verified against the OSCAL metaschema.

**CISM:** every step and rep carries a tag for the outline that takes effect 2026-11-03 (D1 18% · D2 20% · D3 33% · D4 29%).

## Provenance labels (in-app)

| Label | Meaning |
|---|---|
| `framework text` | NIST / GAO, public domain. Verbatim in the NIST panels and quotes. |
| `outline / course` | From a practitioner or course source. Cite only. |
| `inference` | Practitioner judgment, including **all CSF ↔ 800-53 pairings** (trainer selections). |
| `synthetic` | Invented: the organization, people, documents, accounts, numbers. |

## Known limits (read before relying on it)

- **The CSF ↔ 800-53 pairings are not from NIST's official mapping.** OLIR #186
  (CSF 2.0 ↔ SP 800-53 Rev 5.2.0) wasn't downloadable from the build environment.
  Verify the 9 CSF → 800-53 pairings (GV.OC-03 has none) against NIST's [CSF 2.0 informative references](https://www.nist.gov/cyberframework/csf-20-informative-references) (CSF 2.0 → SP 800-53 Rev 5.2.0, catalog referenceId 186):
  GV.RM-01/02 → PM-9 · GV.PO-02 → AC-1 · GV.SC-07 → SR-6 · GV.OV-01 → CA-7 ·
  ID.AM-01 → CM-8 · ID.RA-01 → RA-5 · ID.IM-01 → CA-5 · PR.AA-05 → AC-2.
- **Sample sizes** in the case are this engagement's choice. NIST defines coverage levels, not counts.
- **SOC 2 report reading** is practitioner-sourced. AICPA DC 200 (free account) was not read.
- **CISM subtopic placement** is pending ISACA's detailed 2026 outline. Domains and weights are verified.

## Files

| File | What |
|---|---|
| `index.html` | The trainer. Single file, offline, runs from `file://`. No network calls, no telemetry. |
| `TESTS.md` | Test procedures as pseudocode, plus how to evolve each into monitoring |
| `LAB.md` | Free practice lab, with fidelity tiers and boundary |
| `lab/make_lab_data.py` | Synthetic dataset generator for the lab (with an answer key) |
| `case.json` | The CSF and 800-53 IDs this case pulls from OSCAL |
| `src/` | Shell, content and app sources; `../_build/build.py` assembles `index.html` |

## Rebuild

```bash
# pinned sources: oscal-content @ 78650f0 (2026-05-13), mappings-explorer @ a85e55a (2026-10-04)
python3 -I ../_build/pare.py --oscal <oscal-content> --ctid <mappings-explorer> \
  --case case.json --out data.json
python3 -I ../_build/build.py --case-dir . --data data.json --prefix GRCT
node --check _script_check.js   # build.py writes this file (gitignored); then open index.html from file://
```

## Sources

The full research crosswalk is in [`../CURRICULUM.md`](../CURRICULUM.md). The build contract is
[`../TRAINER_SPEC.md`](../TRAINER_SPEC.md).

---

*README generated 2026-10-16T17:13Z · build `GRCT-20261016-1713Z`.*

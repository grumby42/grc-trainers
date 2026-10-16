# CURRICULUM — the GRC Trainers minimum viable curriculum

This is the research behind **[`TRAINER_SPEC.md`](TRAINER_SPEC.md)**. I fetched and read 18
course pages, certification outlines and framework sources on 2026-10-16. Then I crosswalked
them and cut the overlap down to the smallest module set that still covers
the job end to end.

The job is to take a **client ask** or an **internal / management ask**,
and then to scope it, interview, review evidence, analyze, remediate and report.
At every step you should be able to answer four questions:

1. **What am I looking for?** The requirement, or the *criteria*.
2. **Where am I looking for it?** The *source*: documents, people, systems.
3. **How do I know it's what I need?** Whether the evidence is relevant, reliable, sufficient and in period.
4. **How do I make it align?** Remediation mapped back to the framework.

---

## 1. What the market teaches, and what it skips

The fetched outlines converge on a common core of frameworks, risk assessment, policy,
auditing and reporting. They are thin on **practitioner fieldwork**, which is the part
you asked to be trained on.

| Skill | Named explicitly in | Absent or only implied in |
|---|---|---|
| Scoping | ISC2 CGRC D2; SANS LDR519 S4; PECB 27001 LI D1; BSI LA D1; AICPA SOC 2 (planning) | Simply Cyber, IBM, KSU, Cybrary (implied), AUD507, SEC566 |
| **Interviews / walkthroughs** | **CGRC 5.2 and 7.3; LDR519 S4. No other source.** | Every online course; PECB and BSI agendas (implied only) |
| Document review | BSI LA D2; LDR519 S4; NIST SP 800-53A (*examine*) | Most online courses |
| Evidence / testing | CISA D1B; CGRC 5.2; LDR519 S4; AUD507; SEC566; PECB LA D3; AICPA | KSU |
| **Sampling** | **CISA D1B ("testing and sampling"); NIST 800-53A coverage levels.** | **Every course outline fetched** |
| **Gap analysis** | **SEC566 S1 (CSAT lab); LDR514 S2; CSF 2.0 Profiles; CRISC T12** | **Every online course** (GRC Mastery capstone implies it) |
| Risk assessment / register | CRISC D2; LDR519 S1–S5; SEC566 S5 (CIS-RAM); GRC Mastery M2; Cybrary | AICPA |
| **POA&M / corrective action** | **CGRC 4.3 (POA&M named); CSF 2.0 Profile step 4; PECB LI and LA D4; CRISC T13/T15** | **Every online course** (Cybrary "Risk Mitigation" is closest) |
| Policy writing | SANS LDR514 S3 (hands-on); Simply Cyber M5 lab; KSU 2.4; PECB LI D2 | AUD507, SEC566, AICPA |
| Reporting to management | CRISC 3C; CISM T9/T28; LDR519 S5; LDR514; PECB LA D4 | Simply Cyber, IBM |
| Third-party risk | GRC Mastery M9; Cybrary; IBM M2; LDR519 S3; SEC566 Control 15; CISM T17/T18; CSA CAIQ | KSU |

**Takeaway.** The five bolded rows are where this trainer adds value over what you can buy.
Every module below has to drill them.

---

## 2. Minimum viable curriculum (10 modules + 2 threads)

The spine is the **NIST CSF 2.0 Organizational Profile cycle**: scope, gather inputs,
create the Current and Target Profiles, run a gap analysis, build a prioritized action
plan, then implement and update. The cycle is cross-checked against the RMF steps,
ISO 19011-style audit stages and the CGRC domains. The match is close enough that
one lifecycle serves audits, assessments, readiness work and vendor reviews.

| # | Module | You leave able to… | Strongest sources |
|---|---|---|---|
| **M0** | **Intake & triage the ask** | Classify the ask (assurance, readiness, certification support, risk decision, vendor review, policy). Name the sponsor, the **decision it informs**, the driver (contract, regulator, customer, board) and the deadline. Write the engagement objective in one sentence. | CRISC T1; CISA T1; LDR519 S1 ("Initiate") |
| **M1** | **Context & scoping** | Draw the system or organizational boundary. Identify data types and impact level, in-scope and out-of-scope items, inherited controls, third parties in the boundary and the assessment period. Produce a **scope statement** and an **assumptions list**. | CGRC D2; CSF 2.0 Profile step 1; RMF Prepare/Categorize; PECB LI D1; LDR519 S4; BSI LA D1 |
| **M2** | **Framework selection & crosswalk** | Choose the authoritative framework for the driver. Map secondary frameworks to it (CSF 2.0 informative references, CIS ↔ NIST/ISO/PCI, CCM). Build one **control list**, not five. | LDR519 S2; SEC566 S4 (GRC mapping); CSF 2.0 informative references; CSA CCM |
| **M3** | **Request list & document review** (*examine*) | Write a request list traced to controls. Judge a policy or procedure: approved, owned, dated, reviewed, scoped and enforceable. Tell policy from standard from procedure. | NIST 800-53A examine method; BSI LA D2; LDR519 S4; LDR514 S3; CISSP 1.6 |
| **M4** | **Interviews & walkthroughs** (*interview*) | Pick interviewees by role (owner, operator, management). Sequence the questions from open, to walkthrough, to "show me." Corroborate every claim with examine or test evidence. Record what was said, by whom and when. | NIST 800-53A interview method; CGRC 5.2 and 7.3; LDR519 S4; BSI LA D2 (auditing top management) |
| **M5** | **Testing, evidence & sampling** (*test*) | Separate design effectiveness from operating effectiveness. Choose depth (basic, focused, comprehensive) and coverage (basic sample, focused sample, sufficiently large sample). The assessor picks the sample, not the auditee. Validate technical evidence (configs, logs, scans). | NIST 800-53A depth/coverage; CISA D1B; AICPA SOC 2 (design and operating effectiveness); AUD507; SEC566; PECB LA D3 |
| **M6** | **Findings & gap analysis** | Compare Current with Target. Write a finding with condition, criteria, cause, effect and recommendation. Separate a *design gap* from an *operating failure* from an *evidence gap*. Grade ISO nonconformities. | CSF 2.0 Profile step 4; SEC566 S1 (CSAT); LDR514 S2; CRISC T12; PECB LA D4; BSI LA D4 |
| **M7** | **Risk assessment & register** | Build risk scenarios. Rate likelihood and impact, inherent and residual risk, against appetite and tolerance. Maintain a **risk register**. Pick a treatment: accept, mitigate, transfer or avoid. | CRISC D2/D3 (T4, T6, T9); LDR519 S5; SEC566 S5 (CIS-RAM); GRC Mastery M2/M11 (FAIR) |
| **M8** | **Remediation, POA&M & policy** | Write POA&M / corrective-action lines with owner, milestone, compensating control, closure evidence. Update the SoA and policies. **Validate closure**; a status change alone doesn't close an item. | CGRC 4.3/5.4/7.2; CRISC T13/T15; CISA T5; PECB LI D4 and LA D4; LDR514 S3 |
| **M9** | **Reporting & continuous monitoring** | Write for two audiences: an executive one-pager (risk posture, decision needed) and a technical findings register. Choose KRIs, KCIs and KPIs. Know what triggers reassessment: change, new driver, incident. | CRISC 3C (heatmaps, scorecards, dashboards); CISM T9/T10/T28; LDR519 S5; CGRC 6–7; RMF Authorize/Monitor |
| **T1** | *Thread: third-party / vendor risk* | Apply M1–M9 to a supplier: tiering, questionnaire (CAIQ), review of an assurance report, contract security requirements, ongoing monitoring. | GRC Mastery M9; CISM T17/T18; SEC566 Control 15; CSA CAIQ; AICPA SOC 2 |
| **T2** | *Thread: bias & independence* | Spot checkbox thinking ("the policy exists, so the control works"), anchoring on last year's report, narrative capture by management, auditee-picked samples, and scope drift. | *Practitioner inference*, which needs primary sourcing at build time (see §5) |

**What was cut, and why.** Deep technical auditing (AUD507 Windows, Linux, cloud and web)
is a separate skill. M5 teaches how to judge technical evidence, not how to produce it.
Leadership, negotiation and team management (LDR512, LDR514 S4) and career modules are
outside the scope of responding to an ask. Law-by-law surveys (GDPR, GLBA and others) are
handled as framework *inputs* in M2, not taught one by one.

---

## 3. Ask → module routing (the four questions, per ask type)

| Ask (client or internal) | Looking for | Looking where | Enough when… | Aligning by… |
|---|---|---|---|---|
| "Customer wants our SOC 2 report" | Trust Services Criteria in scope; controls that meet them | Policies, system description, control owners, ticketing/IAM/change logs | Design is documented **and** operating evidence covers the period | Readiness gap list → POA&M → Type I then Type II |
| "Board: are we aligned to CSF 2.0?" | Current vs Target outcomes at the subcategory level | Risk register, policies, leadership interviews, metrics | Each target outcome has corroborated evidence or a rated gap | Tiered roadmap and action plan; executive one-pager |
| "Assess this SaaS vendor" | Security requirements proportional to the data and access you'll grant | CAIQ, SOC 2 report, contract, sub-processor list | Assurance covers the services you buy, in period, with exceptions read | Contract clauses, compensating controls, accept/reject decision |
| "Internal audit before ISO Stage 2" | Clauses 4–10 conformance + SoA'd Annex A controls | ISMS docs, management review, internal audit records, samples | Each clause has audit-trail evidence; nonconformities graded | Corrective-action plans with root cause; re-verify |
| "Are we ready for a DoD contract (800-171 / CMMC)?" | In-scope requirements for the CUI boundary | SSP, network diagrams, POA&M, config evidence | *Build-time: confirm current CMMC rule and assessment requirements from DoD primary sources* | SSP + POA&M under the program's closure rules |

*This routing table is my synthesis. The rows are shaped by the sources in §4, but the
"Enough when…" column is* practitioner inference *until each case's build sources it.*

---

## 4. Sources fetched (2026-10-16)

**Certification outlines**
- ISACA CRISC: https://www.isaca.org/credentialing/crisc/crisc-exam-content-outline
- ISACA CISA: https://www.isaca.org/credentialing/cisa/cisa-exam-content-outline
- ISACA CISM: https://www.isaca.org/credentialing/cism/cism-exam-content-outline. A new outline takes effect **2026-11-03** with weights 18/20/33/29 ([press release](https://www.isaca.org/about-us/newsroom/press-releases/2026/isaca-updates-cism-exam-content-outline-factoring-in-todays-technologies-security-responsibilities)).
- ISC2 CGRC (effective 2024-06-15): https://www.isc2.org/certifications/cgrc/cgrc-certification-exam-outline, with weights from the official PDF
- ISC2 CISSP Domain 1: https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline

**Framework primaries**
- NIST CSF 2.0 (CSWP 29): https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.29.pdf and the [release notice](https://www.nist.gov/news-events/news/2024/02/nist-releases-version-20-landmark-cybersecurity-framework)
- NIST SP 800-37 Rev. 2 / RMF: https://csrc.nist.gov/projects/risk-management/about-rmf
- NIST 800-53A assessment methods, depth and coverage: https://csrc.nist.gov/Projects/risk-management/about-rmf/assess-step/assessment-cases-overview
- NIST free RMF courses: https://csrc.nist.gov/projects/risk-management/rmf-training

**Practitioner courses**
- SANS LDR519 GRC: https://www.sans.org/cyber-security-courses/cybersecurity-governance-risk-compliance
- SANS AUD507: https://www.sans.org/course/auditing-networks-perimeters-systems
- SANS SEC566: https://www.sans.org/cyber-security-courses/implementing-auditing-security-frameworks-controls/
- SANS LDR514: https://www.sans.org/cyber-security-courses/security-strategic-planning-policy-leadership/
- SANS LDR512: https://www.sans.org/cyber-security-courses/security-leadership-essentials-managers/
- PECB ISO/IEC 27001 Lead Implementer: https://pecb.com/pdf/brochures/iso-iec-27001-lead-implementer-en.pdf
- PECB ISO/IEC 27001 Lead Auditor: https://pecb.com/pdf/brochures/iso-iec-27001-lead-auditor-en.pdf
- BSI CQI/IRCA 27001:2022 Lead Auditor (agenda PDF on bsigroup.com)
- Simply Cyber, The Definitive GRC Analyst Program: https://academy.simplycyber.io/p/the-definitive-grc-analyst-program
- GRC Mastery: https://grcmastery.teachable.com/courses/2151860
- IBM, Cybersecurity Compliance Framework, Standards & Regulations (Coursera): https://www.coursera.org/learn/cybersecurity-compliance-framework-standards-regulations
- KSU, The GRC Approach to Managing Cybersecurity (Coursera): https://www.coursera.org/learn/grc-approach-to-managing-cybersecurity
- Cybrary GRC Analyst path: https://www.cybrary.it/career-path/grc-analyst
- AICPA & CIMA, SOC 2 and SOC 3 Planning, Executing, and Reporting: https://www.aicpa-cima.com/cpe-learning/course/soc-2-and-soc-3-planning-executing-and-reporting
- CSA, Introduction to CSA Tools: https://training.cloudsecurityalliance.org/introduction-to-csa-tools-v2

**Couldn't verify:** LinkedIn Learning GRC content (the site blocks fetching, and you have
access through work, so check it yourself). SANS LDR419 is retired per SANS's 2024 blog and was not fetched.
CISSP domain weights. AUD507's day count. CRISC task text for T12 and T17 came back
truncated, so check the exact wording on ISACA's page before quoting it. Course outlines were read through a
summarizing fetch, so they are close to the source but not verbatim.

---

## 5. Source debt (must be paid before a trainer ships)

Status as of the second research pass (2026-10-16). **Paid** means at least two
sources were fetched and read, with at least one of them primary.

| Item | Status | What paid it, or what's still needed |
|---|---|---|
| Finding structure (criteria / condition / cause / effect) | **Paid** | GAO Yellow Book 2024 (GAO-24-106786) plus its online glossary *(primary, public domain)*. A worked real example is the USAID OIG FISMA audit A-IAF-24-002-C. The 2024 paragraph numbers are still unverified, so cite the glossary, not paragraph numbers. |
| Interview technique | **Paid at the method level** | NIST 800-53A §2.4.2 *(primary)*. ISACA Journal 2016 v4, "The Interview as an Audit Tool" *(practitioner, cite-only)*. IIA "Plan for Effective Interviews", 2023 *(cite-only)*. |
| POA&M fields and closure | **Paid** | FedRAMP POA&M Template Completion Guide v2.2 and GSA CIO-IT Sec-09-44 Rev 8 *(both primary, US government)*, plus the NIST CSRC glossary. |
| Gap analysis method | **Paid** | NIST SP 1301, *CSF 2.0 Quick-Start Guide: Organizational Profiles* (includes an Excel template and a worked PR.PS-01 example) and CSWP 29. |
| Executive risk reporting | **Paid** | NIST IR 8286 Rev. 1 and IR 8286C Rev. 1 (2025-12-18; these supersede the 2020 originals) *(primary)*. ISACA articles and podcasts *(cite-only)*. |
| Sample sizes by control frequency | **Partly paid** | Only free source: a Temple University MIS 5201 slide deck, which gives a frequency table. Label it *outline / course fact — a heuristic, not a standard*. The authoritative guides (ISACA, IIA, AICPA) are paywalled. |
| Assessor independence / auditee-picked samples | **Open** | ISACA ITAF or the IIA Global Internal Audit Standards (the free-download path is unconfirmed). Label it *practitioner inference* until one of these is read. |
| SOC 2 report reading (exceptions, carve-outs, CUECs, bridge letters) | **Partly paid** | AICPA DC 200 *(primary; requires a free account, which you can register for)*. Linford & Co and Bitsight explainers *(practitioner and vendor, cite-only)*. |
| CMMC / 800-171 rule status, PCI DSS version, HIPAA Security Rule | **Open, by design** | Re-check at each build. OSCAL already provides 800-171r3 with 422 assessment objectives. |

---

## 6. Integration library: what we can build *in* versus only point *to*

This works the same way the DFIR trainers handle vendor reports. Embedding needs a license
that is compatible with an MIT single-file trainer. Anything licensed NC, ND, AGPL or
proprietary can be **cited and linked** but never embedded. The reason: MIT lets anyone
reuse the whole file commercially, an NC term forbids that, and an ND term forbids the
reformatting a trainer requires.

### Tier 1 — Embed (public domain / CC0)

| Resource | What it gives the trainer | Verified |
|---|---|---|
| **NIST OSCAL content** ([usnistgov/oscal-content](https://github.com/usnistgov/oscal-content), commit `78650f0`, 2026-05-13) | **SP 800-53 Rev 5.2.0 controls *plus* SP 800-53A Rev 5.2.0 assessment procedures**: 3,715 assessment objectives and 2,931 method entries (examine / interview / test), as JSON. Also the LOW, MODERATE and HIGH baselines, the CSF 2.0 catalog, SP 800-171r3, and example SSP, SAP, SAR and **POA&M** files. | **I checked it this session:** license is CC0 plus US public domain; counts confirmed by parsing the JSON |
| GAO Yellow Book 2024 | Definitions of the finding elements; the reporting standard | GAO copyright page fetched |
| NIST SP 1301, CSWP 29, IR 8286r1 / 8286C r1 | Profile and gap-analysis method, the template, risk-register roll-up | Fetched |
| FedRAMP and GSA POA&M guides | POA&M field definitions; deviation and closure rules | Fetched. US government work, but no explicit license statement, so confirm |
| CISA Tabletop Exercise Packages | Scenario kits with After Action Report templates | Fetched. CISA calls them customizable |
| USAID OIG FISMA report A-IAF-24-002-C | Real findings plus management responses, used as a **findings and POA&M drill seed** | Fetched. Written by a contractor, so paraphrase rather than copy verbatim |
| [getprobo/awesome-compliance](https://github.com/getprobo/awesome-compliance) | A further-reading panel | CC0 |

### Tier 2 — Embed with conditions

| Resource | Use | Condition |
|---|---|---|
| [CTID Mappings Explorer](https://github.com/center-for-threat-informed-defense/mappings-explorer) v1.1.0 | **The Threat-lens data:** 800-53 Rev 5 ↔ ATT&CK with a written rationale for each entry | Apache-2.0, so keep the NOTICE. Use **only the 800-53 files**; the CIS and CCM files carry those vendors' text. The ATT&CK terms page was unverified |
| [ComplianceAsCode/content](https://github.com/ComplianceAsCode/content) | Ties a requirement (800-171, PCI DSS 4, HIPAA) to the actual technical check, for M5 test drills | BSD-3, so keep the notice. Skip the CIS-benchmark profiles |

### Tier 3 — Cite and link only

- **CIS Controls v8.1** (CC BY-NC-ND 4.0): cite the safeguard IDs and never their text.
- **Secure Controls Framework** (CC BY-ND 4.0).
- **CSA CCM / CAIQ v4.1** (free for internal use; a commercial or customized use needs a license).
- **Open FAIR** (non-commercial license that explicitly excludes training tools). Teach frequency × magnitude in your own words.
- **Practitioner material:**
  - ISACA Journal and @ISACA articles, IIA articles and podcasts.
  - Linford & Co and Bitsight explainers on reading SOC reports.
  - The Louisiana Legislative Auditor's guide to writing findings.
  - The NIGC elements-of-a-finding guide.
  - The SIUE SOC review checklist: model your own checklist on it.
  - Hart-Fanta, *The Art of the Finding*: explicitly no reproduction.
- **Curated list:** Arudjreis/awesome-security-GRC (it has no LICENSE file).

### Lab targets for `LAB.md` (self-host, don't embed)

| Tool | License | Note |
|---|---|---|
| CISO Assistant (community) | AGPLv3; the `enterprise/` folder is commercial | Ships 220+ frameworks. Best all-round practice target |
| Probo | MIT | Also embeddable |
| Comp AI | AGPL-3.0 | |
| Eramba Community | Custom license, no redistribution | Needs outbound access to Eramba's support server |
| Gapps | AGPL-3.0 + Commons Clause | |
| OpenGRC | Elastic License 2.0 | Alpha |

**Build pipeline implication:** each trainer's data arrays are **generated at build time from the
OSCAL JSON**. The build records the oscal-content commit hash in the README and in-app, so every
800-53A objective shown traces to a specific NIST release. That gives the trainer what the DFIR
trainers get from vendor reports: real, citable primary content, not synthesis.

---

## 7. CISM alignment — new outline (effective 2026-11-03)

**Verified:**
- Same four domains, weighted 18 / 20 / 33 / 29.
- Two content areas are added: **enterprise architecture** and **information security architecture**.
- More emphasis on strategy and program development.

All three come from ISACA's 2026-09-10 press release. **Not yet verified:** the subtopic-level detail. It
is in an ISACA support article that won't render for a fetch tool, and ISACA's outline page still shows the
current version until the switch. Re-fetch that page after 2026-11-03. Until then, the mapping below
uses the **current** subtopics, which carry forward, and treats the architecture placement as pending.

| CISM domain (new weight) | Trainer modules | Current-outline subtopics drilled |
|---|---|---|
| **D1 Governance (18%)** | M0, M2, M9 (executive reporting) | Legal / regulatory / contractual requirements; roles; governance frameworks; strategy and business case |
| **D2 Risk Management (20%)** | M6, M7, M1 (categorization) | Control deficiency analysis; risk assessment; treatment options; ownership; monitoring and reporting |
| **D3 Program (33%)** | M3, M4, M5, M8, M9, T1 | Policies, procedures and guidelines; control design and selection; **testing and evaluation**; metrics; **management of external services**; communications and reporting |
| **D4 Incident Management (29%)** | *Not in GRC trainer scope.* **Cross-link to `dfir-trainers`**, plus CISA TTX packages for readiness, BIA, BCP and DRP drills | IRP, BIA, BCP, DRP; testing and evaluation; post-incident review |
| *New: enterprise and security architecture* | M1 (boundary, data flows, inherited controls) and M2 (control selection) | *Pending: the placement is my inference until the new outline's subtopics are fetched* |

Every walkthrough step and exercise carries a **CISM domain tag**, so the trainer doubles as
CISM fieldwork practice. That matters most for D3, the heaviest domain at 33%, which is also
the domain where the GRC fieldwork modules are concentrated.

ISACA's official **free 10-question CISM quiz** is the only free first-party practice resource:
https://www.isaca.org/credentialing/cism/prepare-for-the-cism-exam. The free third-party practice sets
that were checked were low quality, so don't use them as seeds.

---

*Curriculum generated 2026-10-16T16:33Z · spec build `GRCT-20261016-1633Z` (provisional prefix).*

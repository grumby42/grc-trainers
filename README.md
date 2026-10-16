# GRC Trainers

Interactive, **single-file, fully offline** HTML trainers that walk you through real
**governance, risk and compliance engagements** turn by turn. Each one starts with a
client or management ask and ends with the decision it informs: scoping, request lists,
document review, interviews, testing and sampling, findings, risk, remediation and
reporting.

Companion to [`dfir-trainers`](https://github.com/grumby42/dfir-trainers): that repo
works incidents from the incident-response side, and this one works the control and
governance side.

Each trainer is built to a shared template and a strict fact-check standard (see
**[`TRAINER_SPEC.md`](TRAINER_SPEC.md)**). Framework and assessment text is **embedded
verbatim from NIST's public-domain OSCAL catalogs**, not paraphrased. Every organization,
person and piece of evidence is **synthetic**. Credit for the frameworks belongs to the
bodies that wrote them.

Open any trainer's `index.html` in a modern browser. There's no install, no dependencies,
no network calls and no telemetry.

---

## Trainers

| Trainer | Ask | Status |
|---|---|---|
| **[CSF 2.0 Board Ask](csf-board-ask/)** | Management asks "are we aligned to NIST CSF 2.0?". Scope a Profile, test 10 outcomes, report to the board | ✅ Reference build |
| SOC 2 readiness | Client ask: a customer demands a SOC 2 report | Planned |
| Vendor review | TPRM: assess a SaaS supplier (CAIQ + SOC 2 report) | Planned |
| ISO 27001 internal audit | Internal audit before Stage 2 | Planned |
| CUI readiness | 800-171 / CMMC gap for a DoD contract | Planned |

## Who these are for

GRC analysts and consultants, IT and security auditors, security program managers,
MSSP/MDR service-delivery leads who field compliance asks, and anyone preparing for
**CISM** (tagged to the outline that takes effect 2026-11-03), **CRISC**, **CISA** or **CGRC**.

These teach **how to reason through an engagement**: what you're looking for, where to
find it, how you know it's enough, and how to get to conformance. They aren't a
substitute for an audit methodology or legal advice. Each trainer ships a `LAB.md` for
hands-on practice with synthetic data.

## Building new trainers

New trainers must meet [`TRAINER_SPEC.md`](TRAINER_SPEC.md). The research behind the
curriculum (18 course and certification outlines crosswalked down to 10 modules) and the
licensing tiers for what can be embedded are in [`CURRICULUM.md`](CURRICULUM.md).
[`_template/`](_template/) explains how to start a new trainer from the reference build,
and `_build/` holds the OSCAL → data → `index.html` pipeline.

## License

Code and original content: **MIT** (see [`LICENSE`](LICENSE)). Embedded third-party data
keeps its own terms (see [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md)): NIST OSCAL
content (CC0 / U.S. public domain), MITRE CTID mappings (Apache-2.0), and GAO definitions
(U.S. Government work). Not affiliated with, sponsored by, or endorsed by any party named
in a trainer.

---

*Index generated 2026-10-16T16:33Z · reference build `GRCT-20261016-1633Z`.*

# LAB — csf-board-ask, hands-on practice

A free, mostly local way to practice the fieldwork the trainer walks through. The
fidelity tiers below are honest about what each one exercises.

> **Boundary.** Use synthetic data, or your own household or lab environment only.
> Never use a real employer's or client's data in practice files. Never scan a network
> you don't own or have written permission to test.

| Tier | Time | What you practice | Fidelity |
|---|---|---|---|
| 1 · Paper profile | ~1 h | Scope, Current and Target Profile, gap analysis | High for the *method*; no evidence handling |
| 2 · Synthetic fieldwork | 2–3 h | Populations, sampling, joins, exceptions, findings, POA&M | High for *test design*; the data is synthetic |
| 3 · GRC platform | 2–4 h | Running an assessment in a real GRC tool | Realistic workflow; synthetic content |
| 4 · Extend the trainer | open | Pulling new controls and procedures from OSCAL | Exact NIST text |

---

## Tier 1 · Paper profile (CSF 2.0)

1. Download NIST's free **Organizational Profiles quick-start guide** and its template:
   [SP 1301](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.1301.pdf).
2. Choose a subject you can legitimately assess: your home network, a volunteer
   organization (with permission), or a fully fictional one.
3. Write a one-sentence objective (step S0), a scope statement and assumptions (S1),
   and 10 target outcomes (S2).
4. Rate Current against Target for each outcome and write one finding using GAO's four elements.

## Tier 2 · Synthetic fieldwork (the case, reproduced)

```bash
python3 -I lab/make_lab_data.py --out ./labdata --seed 42
```

This writes five CSVs: HR separations, contractor end dates, a directory account export,
a CMDB export, and 30 days of network observations. Every value is synthetic, and the MAC
addresses come from the RFC 7042 documentation range.

1. **T-AC2-01** (see `TESTS.md`). Design your sample first and write it down. Then join
   the populations to `ad_accounts.csv` and report exceptions by stratum.
2. **T-CM8-01.** Reconcile `cmdb_export.csv` against `nac_observed_30d.csv`, then
   classify the unmatched and stale devices.
3. Write the findings, rate the risks (on a scale you define first), and fill in the
   trainer's **Workpaper log**. Export the TSV.
4. **Check yourself:** regenerate with `--answers` and compare against `answer_key.json`.
   Use a new seed for each attempt.

Use any tool you like: a spreadsheet, Python, SQL, PowerShell. The skill being
practiced is the test design, not the tool.

## Tier 3 · A real GRC platform (self-hosted, free)

| Tool | License | Notes |
|---|---|---|
| [CISO Assistant (community)](https://github.com/intuitem/ciso-assistant-community) | AGPLv3; the `enterprise/` folder is commercial | Ships a NIST CSF 2.0 library among many others. Docker Compose. |
| [Probo](https://github.com/getprobo/probo) | MIT | Open-source compliance platform |

Load the CSF 2.0 framework, create an assessment for the fictional Tarnwick, and
re-enter the 10 outcomes with the evidence and findings from Tier 2. Then compare the
tool's output to the trainer's board one-pager.

*Don't import the tools' framework libraries into MIT-licensed trainer code. Use them
only as lab targets.*

## Tier 4 · Extend the trainer from OSCAL

```bash
git clone --depth 1 https://github.com/usnistgov/oscal-content
git clone --depth 1 https://github.com/center-for-threat-informed-defense/mappings-explorer
# add CSF IDs / 800-53 controls to case.json, then:
python3 -I ../_build/pare.py --oscal oscal-content --ctid mappings-explorer --case case.json --out data.json
```

The build script refuses IDs that aren't in the catalog (`do not guess`), and refuses
preferred ATT&CK techniques that CTID doesn't map.

---

*Generated 2026-10-16T16:33Z · build `GRCT-20261016-1633Z`.*

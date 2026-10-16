# TESTS — csf-board-ask

Starter **test procedures** for the six controls this case exercises. They are written
in tool-agnostic pseudocode, so the lesson is test *design* rather than a checklist to copy.

Each procedure is anchored to NIST's published 800-53A procedure, which is embedded
verbatim in the trainer. After the test itself, each section covers how to **evolve**
it into continuous monitoring, how to **baseline and tune** it, and the **trend
signals** to watch.

> **Rules for every procedure here:**
> - Pull populations from a system of record that is independent of the control owner.
> - The assessor selects the sample.
> - Use organization-defined values (the `[Assignment: …]` parameters) as the
>   thresholds. Where none is defined, that absence is itself a finding.
> - No sample sizes or thresholds below are standards. NIST defines coverage
>   *levels*, not counts.

---

## T-AC2-01 · Access removed on departure (PR.AA-05 · AC-2)

**Objective.** Accounts are disabled per procedure and aligned with termination.
Anchors: **AC-02f.[04]**, **AC-02l.[01]**.

**Method / objects.**
- **Examine:** termination procedure; list of recently disabled accounts.
- **Interview:** account managers.
- **Test:** the account-management process against independent populations.

```text
POP_E := HR.separations(period)                  # employees
POP_C := Procurement.contract_end_dates(period)  # contractors — separate stratum
S     := random_sample(POP_E, n_basic) ∪ focused(POP_C)   # assessor picks
for p in S:
    a := Directory.account(p.id)
    if a.enabled:                         EXCEPTION(p, "still enabled", a.last_logon)
    elif bus_days(p.end, a.disabled) > ODP.disable_window:
                                          EXCEPTION(p, "late", delta)
    if a.last_logon > p.end:              ESCALATE_TO_IR(p)   # assessor ≠ investigator
REPORT by stratum; never pool strata
```

**Common exceptions.**
- A population nobody owns, such as contractors, interns or service accounts.
- An HR feed that misses rehires and transfers.
- Accounts in SaaS platforms that sit outside SSO.

**Evolve → monitoring.** Run the same join daily as a KCI: *count of accounts whose
owner's end date has passed and that are still enabled*. Join every IdP and every
non-SSO SaaS export.

**Baseline / tune.** Measure the current disable-delay distribution over a period you choose (a heuristic, not a standard).
Set the alert threshold at the organization-defined window, not at the observed average.
Allow-list only documented exceptions, each with an expiry.

**Trends.**
- **Spike:** a new hiring agency or a new SaaS app outside SSO.
- **First-seen:** a stratum that has never appeared before.
- **Drop to zero:** check that the feed hasn't broken before you celebrate.

---

## T-CM8-01 · Inventory completeness (ID.AM-01 · CM-8)

**Objective.** The inventory includes all components and accurately reflects the system.
Anchors: **CM-08a.01**, **CM-08a.02**, **CM-08b.**

```text
INV := CMDB.active()
OBS := union(DHCP.leases(window), NAC.seen(window), EDR.agents(), MDM.devices())
UNMATCHED := OBS − INV        # → classify: vendor-managed, printer, BYOD, unknown
STALE     := INV − OBS        # → retired? offline? mis-recorded?
RESULT: variance = |UNMATCHED| / |OBS| ; list every unknown for follow-up
```

This is a full reconciliation, not a sample. A sample drawn from the list can't
reveal what the list is missing.

**Common exceptions.**
- Vendor-managed fleets that are tracked in the vendor's tooling only.
- Label and IoT printers.
- Duplicate records after a hardware refresh.

**Evolve → monitoring.** Run the reconciliation on a schedule. Track variance as a KRI
reported to the CA-7 audience.

**Baseline / tune.** Agree a variance tolerance with the owner. Have unknowns
auto-create tickets.

**Trends.**
- Rising **unknown** count.
- **Stale** records growing, which means decommissioning isn't updating the CMDB.

---

## T-RA5-01 · Scanner coverage (ID.RA-01 · RA-5)

**Objective.** Systems are scanned at the defined frequency and results are analyzed.
Anchors: **RA-05a.[02]**, **RA-05c.**, **RA-05d.**

```text
TARGETS := Scanner.target_list()
GAP     := reconciled_inventory(T-CM8-01) − TARGETS
AGE     := for v in Findings(severity ≥ ODP.threshold): now − v.first_seen
RESULT: coverage = |TARGETS ∩ INV| / |INV| ; overdue = count(AGE > ODP.response_time)
```

**Common exceptions.**
- A scanner fed from an incomplete CMDB.
- Authenticated scans failing silently on expired credentials.

**Evolve → monitoring.** Watch the coverage ratio against the reconciled inventory,
not against the scanner's own target list.

**Trends.**
- Coverage dropping after a network change.
- A rising share of scans that fall back to unauthenticated.

---

## T-AC1-01 · Policy currency (GV.PO-02 · AC-1)

**Objective.** The policy is reviewed and updated at the defined frequency, by a
designated official, with a scope that matches operations.
Anchors: **AC-01b.**, **AC-01c.01[01]**, **AC-01a.01(a)[02]**.

```text
for doc in PolicyRepo.controlled_copies():
    CHECK doc.approver is a current, designated official
    CHECK doc.last_review within ODP.review_frequency
    CHECK doc.scope covers every population found in testing (e.g., contractors)
    CHECK procedures exist AND are approved (not "DRAFT")
```

**Evolve → monitoring.** Keep a policy register with next-review dates and report
overdue items monthly.

**Trends.** An overdue count that grows after reorganizations or staff departures.

---

## T-SR6-01 · Supplier assurance is current (GV.SC-07 · SR-6)

**Objective.** Supplier risks are assessed and reviewed at the defined frequency,
over the course of the relationship. Anchor: **SR-06**.

```text
for v in Suppliers.critical():
    R := v.latest_assurance()            # e.g., SOC 2 Type II
    CHECK months_since(R.period_end) ≤ ODP.max_age  OR bridge_letter_present
    CHECK services_in_use ⊆ R.scope ; note carve-outs
    for c in R.CUECs: MAP c → our control → our latest test result
```

The CUEC row is where supplier risk feeds back into your own findings.

**Evolve → monitoring.** Keep a supplier register with assurance expiry dates, and
re-tier suppliers on access changes.

**Trends.**
- Assurance reports aging past tolerance.
- New suppliers onboarded without a tier assigned.

---

## T-CA5-01 · POA&M hygiene (ID.IM-01 · CA-5)

**Objective.** A POA&M exists and is updated at the defined frequency.
Anchors: **CA-05a.**, **CA-05b.**

```text
for item in POAM.items():
    CHECK item.owner AND item.milestones[*].date AND item.closure_evidence_defined
    CHECK item.risk.status ∈ OSCAL{open, investigating, remediating,
                                   deviation-requested, deviation-approved, closed}
    if item.risk.status == closed: CHECK closure evidence artifact exists (retest)
    if remediation.type == accept: CHECK authorized_by, rationale, deadline
AGING := count(milestone.date < today AND not done)
```

**Evolve → monitoring.** Report POA&M items past due as a board-level metric.

**Trends.** Items whose milestones are re-dated repeatedly. Never delete those
entries; log the change instead (FedRAMP/GSA POA&M guidance, practitioner).

**Independence.** Rate the organization's own tracker, not a POA&M you helped
draft (self-review threat).

---

## T-PM9-01 · Appetite and strategy exist and are agreed (GV.RM-01/02 · PM-9)

**Objective.** A risk management strategy exists, is implemented consistently and is
reviewed at the defined frequency. Anchors: **PM-09a.01**, **PM-09b.**, **PM-09c.**.
PM-9's guidance includes an expression of risk tolerance.

```text
DOC := RiskStrategy.current()            # examine object
CHECK DOC exists AND approved_by ∈ {governing body or delegate}
CHECK DOC contains appetite AND tolerance statements (measurable where possible)
CHECK last_review within ODP.frequency
INTERVIEW strategy owner: how are ratings compared to tolerance in practice?
SAMPLE 2–3 recent risk decisions → were they judged against the tolerance?
```

**Evolve → monitoring.** Track the share of register entries that carry an explicit
in-tolerance or out-of-tolerance flag.

**Trends.** Many risks rated with nothing to compare them against usually means the
statement has fallen out of use.

---

## T-CA7-01 · Monitoring metrics defined and reported (GV.OV-01 · CA-7)

**Objective.** Metrics, monitoring frequencies and status reporting to defined roles
exist. Anchors: **CA-07a.**, **CA-07b.[01]**, **CA-07g.[01]**. CA-7 is a
*system-level* control. Using it to structure board metrics is an adaptation.

```text
M := MonitoringStrategy.metrics()
CHECK each metric has: definition, data source, frequency, owner, threshold (ODP)
CHECK reports reached ODP.roles at ODP.frequency (examine last N reports)
TEST  recompute one reported metric from source data → matches?
```

**Trends.** A metric that never moves usually means its feed is broken. A metric
recomputed differently from what was reported is a reliability finding in its own
right.

---

## Follow-up · Contract obligations met, not just understood (GV.OC-03)

This cycle rated GV.OC-03 partial: there's a register, but fulfilment wasn't
tested. Next cycle, take each airline contract security clause in the register,
map it to the control that satisfies it, and use that control's latest test result.
A clause whose control failed (F-01, for example) becomes a contract-risk item for
legal.

---

*Generated 2026-10-16T17:13Z · build `GRCT-20261016-1713Z`. Objective labels are
verbatim from NIST SP 800-53A Rev 5.2.0 (OSCAL, CC0). OSCAL status values were
verified against the OSCAL assessment-common metaschema.*

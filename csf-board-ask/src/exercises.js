/* ===== EXERCISE GENERATOR =====
   Data-driven reps draw their answer keys from NIST's OSCAL text (verbatim).
   Authored reps are synthetic scenarios; their answers are practitioner inference. */

const EX_AUTHORED = {
  classify: {name: "Classify the ask", cism: [1], items: [
    {q: "\"Our biggest customer sent a 200-question security questionnaire. Due Friday.\"", a: "Vendor review (we are the vendor)", d: ["Assurance", "Policy", "Risk decision"], fb: "You're the supplier being assessed. Answer from evidence, and don't promise controls you can't show."},
    {q: "\"An auditor arrives in March for our first ISO 27001 certification. Are we going to pass?\"", a: "Readiness", d: ["Assurance", "Vendor review", "Policy"], fb: "This is preparing for an outside assessor: a gap analysis against the standard, then fixes, then an internal audit."},
    {q: "\"Should we buy cyber insurance or spend the money on MFA everywhere?\"", a: "Risk decision", d: ["Assurance", "Readiness", "Policy"], fb: "It's a choice between treatments (transfer versus mitigate). Deliver options with risk reduction and cost."},
    {q: "\"Can you confirm the quarterly access reviews actually happened last year?\"", a: "Assurance", d: ["Readiness", "Risk decision", "Policy"], fb: "It's a yes/no about whether something is true. Test it against evidence for the period."},
    {q: "\"Legal says we need an AI acceptable-use rule before the rollout next month.\"", a: "Policy", d: ["Assurance", "Vendor review", "Readiness"], fb: "This is policy work: drafting, approval, communication, then the enforcement mechanism."},
    {q: "\"The new CRM vendor wants admin access to our tenant. OK?\"", a: "Vendor review", d: ["Policy", "Assurance", "Readiness"], fb: "This is third-party risk, sized to the access being granted. Check their assurance, the contract terms, and the least-privilege alternative."}
  ]},
  suff: {name: "Sufficiency call", cism: [3], items: [
    {q: "The control owner shows you one change ticket with an approval and says \"all changes are approved.\"", a: "Insufficient: testimony plus one owner-selected example", d: ["Sufficient: documented approval seen", "Sufficient if the ticket is recent"], fb: "One self-selected item can't support a claim about a whole population. Sample the change log yourself."},
    {q: "You reperformed the quarterly access review for 2 of 4 quarters from system exports. Both match the signed reviews.", a: "Sufficient for those quarters; the conclusion covers only what was tested", d: ["Sufficient for the full year", "Insufficient: must test all 4"], fb: "Say exactly what the evidence covers. Extend coverage if the objective needs the whole year."},
    {q: "The SOC 2 Type II report's period ended 14 months ago. There's no bridge letter.", a: "More needed: the newer report, plus a bridge letter only for any short gap after its period", d: ["Sufficient: the opinion was clean", "Sufficient once the vendor sends a bridge letter for the 14 months"], fb: "A clean opinion covers <i>that</i> period. A bridge letter is management's assertion, typically for a short gap of about three months or less (Linford &amp; Co, practitioner), so it can't stand in for 14 months of untested operation."},
    {q: "The policy PDF says \"approved 2026-01\" and names an official. You haven't confirmed the approval anywhere else.", a: "Sufficient for the document conclusion, if the copy came from the controlled repository", d: ["Insufficient: need board minutes", "Sufficient for the operating conclusion too"], fb: "This is document-level evidence for document-level criteria. It says nothing about whether the policy is followed."},
    {q: "A screenshot shows MFA enforced. It's undated, and the owner sent it.", a: "Weak: not reliable on its own. Observe it live, or get a dated config export.", d: ["Sufficient: it shows the setting", "Sufficient if the owner signs it"], fb: "GAO's appropriateness test includes reliability. Undated, owner-provided images are easy to stage and hard to place in time."},
    {q: "You reconciled the full CMDB against 30 days of NAC records and found 3% unknown devices.", a: "Sufficient to conclude on completeness at this depth", d: ["Insufficient: need 90 days", "Insufficient: must physically find every device"], fb: "A full reconciliation against an independent source supports a completeness conclusion. Record the observation window as a limit."}
  ]},
  explain: {name: "Competing explanations", cism: [2, 3], items: [
    {q: "Terminated employees are disabled on time, but terminated contractors aren't. No contractor procedure exists.", a: "Design gap", d: ["Operating failure", "Evidence gap", "Scope mismatch"], fb: "No process covers that population. People can't follow what doesn't exist."},
    {q: "The procedure is approved and clear. In 3 of 25 samples, the approver skipped the approval step.", a: "Operating failure", d: ["Design gap", "Evidence gap", "Scope mismatch"], fb: "The design exists and isn't always followed. Look for a cause: workload, tooling, training."},
    {q: "Patches show as missing in the report, but the hosts show them installed. The scanner's credentials expired.", a: "Evidence gap", d: ["Operating failure", "Design gap", "Scope mismatch"], fb: "The control may be fine. The evidence source is broken, so fix the evidence before you write the finding."},
    {q: "The test failed on dev servers. The agreed scope was production only.", a: "Scope mismatch", d: ["Operating failure", "Design gap", "Evidence gap"], fb: "You tested outside the criteria you agreed. Re-test in scope, and optionally note the observation."},
    {q: "The standard requires quarterly restore tests. The backup procedure has no restore-test step, no one is assigned to it, and none has ever been done.", a: "Design gap", d: ["Operating failure", "Evidence gap", "Scope mismatch"], fb: "The required activity was never built into the process. If the procedure included it and people skipped it, that would be an operating failure."},
    {q: "Logs show no reviews in July. The reviewer says they did them on paper, which was then shredded.", a: "Evidence gap", d: ["Operating failure", "Design gap", "Scope mismatch"], fb: "It's an evidence gap that may hide an operating failure. Without retained evidence the review can't be relied on. Recommend retention."}
  ]},
  elements: {name: "Finding elements (GAO)", cism: [2], items: [
    {q: "\"The policy requires quarterly access reviews for privileged accounts.\"", a: "Criteria", d: ["Condition", "Cause", "Effect"], fb: "The required or desired state."},
    {q: "\"No privileged access reviews were performed in Q2 or Q3 2026.\"", a: "Condition", d: ["Criteria", "Cause", "Effect"], fb: "A situation that exists, determined during the engagement."},
    {q: "\"The review task was assigned to a role that was vacant from April to October.\"", a: "Cause", d: ["Condition", "Criteria", "Effect"], fb: "Why condition and criteria differ. The recommendation should target this."},
    {q: "\"As a result, unauthorized changes to production systems by former administrators could have gone undetected.\"", a: "Effect", d: ["Cause", "Condition", "Criteria"], fb: "GAO's effect, or potential effect: the outcome or consequence of the difference between condition and criteria. (\"Two former admins kept rights for five months\" would be the <i>condition</i>, which is the observed situation.)"},
    {q: "\"Contract clause 12.4 requires notification within 72 hours.\"", a: "Criteria", d: ["Effect", "Condition", "Cause"], fb: "Contracts are among GAO's listed sources of criteria."},
    {q: "\"No owner was assigned when the monitoring tool was migrated.\"", a: "Cause", d: ["Effect", "Criteria", "Condition"], fb: "This explains the gap, so fix it at the cause."}
  ]},
  bias: {name: "Spot the bias", cism: [3], items: [
    {q: "\"The last audit was clean, so I'll test less this year.\"", a: "Anchoring on prior results", d: ["Halo effect", "Availability"], fb: "Conditions change. Set depth from current risk and changes, not last year's result."},
    {q: "\"They're a big-name vendor; their security is obviously fine.\"", a: "Halo effect", d: ["Anchoring on prior results", "Closure optimism"], fb: "Read their assurance scope, period, carve-outs and CUECs."},
    {q: "\"After that ransomware story, everything is rated High.\"", a: "Availability", d: ["Halo effect", "Metric comfort"], fb: "Rate from your observed conditions and an agreed scale."},
    {q: "\"Scanning shows 100%, so coverage is good.\"", a: "Metric comfort", d: ["Availability", "Narrative capture"], fb: "100% of what? Check the denominator against an independent inventory."},
    {q: "\"The owner was so confident I didn't think a test was needed.\"", a: "Narrative capture", d: ["Metric comfort", "Anchoring on prior results"], fb: "Confidence isn't evidence. Corroborate with examine or test."},
    {q: "\"Status says closed, so the finding is remediated.\"", a: "Closure optimism", d: ["Halo effect", "Availability"], fb: "Closure needs evidence, ideally a retest."}
  ]},
  coverage: {name: "Coverage call (NIST terms)", cism: [3], items: [
    {q: "A routine control with one uniform population and no red flags. You want a representative look.", a: "Basic sample", d: ["Focused sample", "Sufficiently large sample"], fb: "NIST: a basic sample is representative."},
    {q: "Employees pass, but the interview showed contractors go through a different, untracked path.", a: "Focused sample", d: ["Basic sample", "Sufficiently large sample"], fb: "A focused sample extends the basic one to include other important objects, here the contractor stratum."},
    {q: "Prior exceptions, high impact, and the board will rely on your conclusion for a funding decision.", a: "Sufficiently large sample", d: ["Basic sample", "Focused sample"], fb: "This extends the focused sample further for higher assurance. Document why."},
    {q: "You're testing a list's completeness (is anything missing?).", a: "Full reconciliation against an independent source", d: ["Basic sample", "Focused sample"], fb: "No sample drawn from a list can show what's missing from it. Compare the whole list against another view. Note that a census is outside NIST's three sample terms; it's your coverage choice, and yours to justify."}
  ]},
  board: {name: "Translate for the board", cism: [1], items: [
    {q: "Finding: AC-2 contractor stratum, 6/9 exceptions, AC-02f.[04] not met.", a: "\"Former contractors keep access after they leave. We've started a weekly check, and an automated fix lands by Nov 30.\"", d: ["\"AC-2 has a 67% exception rate in a focused sample.\"", "\"Minor IAM hygiene issues were noted.\""], fb: "Business consequence, interim action, date. Control IDs belong in the appendix."},
    {q: "No risk appetite statement exists.", a: "\"We can't tell you which risks are acceptable, because the board hasn't set an appetite. Here's a draft to approve.\"", d: ["\"GV.RM-02 is a gap.\"", "\"Risk is generally well managed.\""], fb: "Turn the gap into a decision the board can take."},
    {q: "Inventory variance 12%; the scanner is fed from the inventory.", a: "\"About 1 in 8 devices on our networks isn't in the inventory, so the scanner never looks at it. Completing the inventory, and pointing the scanner at it, fixes both.\"", d: ["\"CM-8 objective CM-08a.02 is unmet.\"", "\"Asset management needs attention.\""], fb: "Quantified, plain-language, and linked to its consequence."}
  ]},
  poam: {name: "POA&M line check", cism: [2, 3], items: [
    {q: "\"Fix contractor offboarding — IT — ASAP.\"", a: "Missing dated milestones and closure evidence", d: ["Complete", "Missing only a risk rating"], fb: "\"ASAP\" is not a milestone. Add dated tasks and state what proves closure."},
    {q: "\"R-3 accepted by CFO, 2026-10-30, until 2027-06-30, rationale attached, revisit when appetite approved.\"", a: "Complete for an acceptance", d: ["Invalid: risks can't be accepted", "Missing a mitigation plan"], fb: "Acceptance is a legitimate remediation type (NIST's OSCAL POA&amp;M example includes one) when it's authorized, dated and reasoned."},
    {q: "\"Inventory fix — Infra lead — M1 2026-12-01, M2 2027-03-31 — closure: status set to Closed.\"", a: "Weak closure criterion", d: ["Complete", "Missing owner"], fb: "Closure evidence should be an artifact, for example a re-reconciliation under the agreed variance. A status change isn't evidence."},
    {q: "\"Scanner scope — Security Eng — M1 2026-11-15 import MDM device list — closure: next scan's target list contains every device in the reconciled inventory.\"", a: "Complete", d: ["Missing owner", "Missing milestones"], fb: "It has an owner, a dated milestone, and a closure test on set membership (targets ∩ inventory = inventory), not a count. A count can match while the wrong devices are scanned."},
    {q: "\"Scanner scope — Security Eng — M1 2026-11-15 — closure: next scan target count ≥ inventory count.\"", a: "Weak closure criterion", d: ["Complete", "Missing owner"], fb: "Count parity is the \"100% of what?\" trap. Matching totals can hide missing devices. Test membership, not counts."}
  ]}
};

const EX_TYPES = [
  {id: "method", name: "Which 800-53A method lists this object?", data: true, cism: [3]},
  {id: "where", name: "Where would you look? (examine objects)", data: true, cism: [3]},
  {id: "outcome", name: "Name the CSF 2.0 outcome", data: true, cism: [1, 2]},
  {id: "objective", name: "Which control does this objective test?", data: true, cism: [3]},
  ...Object.entries(EX_AUTHORED).map(([id, v]) => ({id, name: v.name, data: false, cism: v.cism})),
  {id: "mixed", name: "Mixed — all types", data: true, cism: [1, 2, 3]}
];

let exRight = 0, exTotal = 0;

function dataRep(type) {
  const ctrls = Object.values(DATA.sp80053);
  if (type === "method") {
    for (let tries = 0; tries < 50; tries++) {
      const c = pick(ctrls), ms = Object.keys(c.methods).filter(m => c.methods[m].length);
      if (!ms.length) continue;
      const m = pick(ms), obj = pick(c.methods[m]);
      if (ms.filter(x => c.methods[x].includes(obj)).length > 1) continue;
      return {q: `For <b>${esc(c.id)} ${esc(c.title)}</b>, NIST 800-53A lists this assessment object under which method?<br><i>"${esc(obj)}"</i>`, a: m, d: ["EXAMINE", "INTERVIEW", "TEST"].filter(x => x !== m), fb: `800-53A lists it under ${m} for ${esc(c.id)}. Examine applies to documents, activities and mechanisms; interview to people; test to mechanisms and activities.`, prov: "fw"};
    }
  }
  if (type === "where") {
    const withEx = ctrls.filter(c => (c.methods.EXAMINE || []).length >= 3);
    const c = pick(withEx), others = shuffle(withEx.filter(x => x !== c)).slice(0, 2);
    const obj = pick(c.objectives.filter(o => o.label && o.label !== c.id).concat(c.objectives.length === 1 ? c.objectives : []));
    const show = x => x.methods.EXAMINE.slice(0, 3).join("; ");
    return {q: `Objective <b>${esc(obj.label)}</b>: "${esc(obj.text)}"<br>Which set of documents does 800-53A point you to?`, a: show(c), d: others.map(show), fb: `These are the first examine objects NIST lists for ${esc(c.id)} ${esc(c.title)}.`, prov: "fw"};
  }
  if (type === "outcome") {
    const ids = Object.keys(DATA.csf), id = pick(ids);
    return {q: `Which CSF 2.0 subcategory says:<br><i>"${esc(DATA.csf[id].text)}"</i>`, a: id, d: shuffle(ids.filter(x => x !== id)).slice(0, 3), fb: `${id}, verbatim from the CSF 2.0 core.`, prov: "fw"};
  }
  if (type === "objective") {
    const c = pick(ctrls), obj = pick(c.objectives.filter(o => o.label && o.label !== c.id).concat(c.objectives.length === 1 ? c.objectives : []));
    const lab = x => `${x.id} ${x.title}`;
    return {q: `Determine if: <i>"${esc(obj.text)}"</i><br>Which SP 800-53 control is this objective from?`, a: lab(c), d: shuffle(ctrls.filter(x => x !== c)).slice(0, 3).map(lab), fb: `It's ${esc(obj.label)}, under ${esc(lab(c))}.`, prov: "fw"};
  }
}

function newRep() {
  let type = $("exType").value || "mixed";
  if (type === "mixed") type = pick(EX_TYPES.filter(t => t.id !== "mixed")).id;
  const meta = EX_TYPES.find(t => t.id === type);
  let item;
  if (meta.data) item = dataRep(type);
  else { const it = pick(EX_AUTHORED[type].items); item = Object.assign({prov: "inf"}, it); }
  const opts = shuffle([{t: item.a, ok: true}, ...item.d.map(t => ({t, ok: false}))]);
  $("exHost").innerHTML = `<div class="card"><div class="phase">${esc(meta.name)} <span class="cism" style="color:var(--purple)">CISM ${meta.cism.map(d => "D" + d).join(" · ")}</span> ${prov(item.prov)}${meta.data ? "" : prov("syn")}</div>
    <div style="margin:8px 0 10px;font-size:14px">${item.q}</div>
    ${opts.map((o, k) => `<button class="opt" data-ex="${k}">${esc(o.t)}<span class="mk"></span></button>`).join("")}
    <div class="fb" id="exFb"></div></div>`;
  $("exHost").querySelectorAll(".opt").forEach((b, k) => b.onclick = () => {
    if ($("exFb").classList.contains("show")) return;
    exTotal++; if (opts[k].ok) exRight++;
    $("exHost").querySelectorAll(".opt").forEach((x, kk) => { if (opts[kk].ok) { x.classList.add("correct"); x.querySelector(".mk").textContent = "✓"; } });
    if (!opts[k].ok) { b.classList.add("wrong"); b.querySelector(".mk").textContent = "✗"; }
    $("exFb").className = "fb show " + (opts[k].ok ? "ok" : "no");
    $("exFb").innerHTML = item.fb;
    $("exScore").textContent = `${exRight}/${exTotal} this session`;
  });
}
$("exType").innerHTML = EX_TYPES.map(t => `<option value="${t.id}" ${t.id === "mixed" ? "selected" : ""}>${esc(t.name)}${t.data ? " · NIST data" : ""}</option>`).join("");
$("exNew").onclick = newRep;
$("exType").onchange = newRep;

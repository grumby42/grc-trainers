/* ===== CASE CONTENT — csf-board-ask =====
   Everything about Tarnwick Air Cargo (people, systems, numbers, documents) is
   SYNTHETIC. NIST and GAO text is pulled verbatim from DATA (built from OSCAL / GAO).
   Provenance codes: fw = framework text, oc = outline/course/practitioner, inf = inference, syn = synthetic. */

const LEAD = {name: "Ines Vargas", init: "IV", role: "GRC Engagement Lead"};
const ORG = "Tarnwick Air Cargo";

const LIFE = ["Intake", "Scope", "Fieldwork", "Analysis", "Remediate", "Report", "Monitor"];
const PROFILE = ["Scope", "Gather inputs", "Current / Target", "Gap analysis + action plan", "Implement & update"];

const QS = [
  {id: "q1", t: "What decision does the board answer inform?"},
  {id: "q2", t: "Profile scope: whole org, or IT only?"},
  {id: "q3", t: "Who sets the Target Profile?"},
  {id: "q4", t: "Is the access control policy current and in force?"},
  {id: "q5", t: "Do accounts actually get disabled when people leave?"},
  {id: "q6", t: "Is the asset inventory complete enough to be a population?"},
  {id: "q7", t: "Is the vulnerability scanner seeing everything?"},
  {id: "q8", t: "Is Plovertrack's assurance current and in scope?"},
  {id: "q9", t: "What is the organization's risk appetite?"},
  {id: "q10", t: "Who owns each fix, by when, and how is closure proven?"},
  {id: "q11", t: "What does the board actually hear?"}
];

const PROFILE_ROWS = ["GV.OC-03", "GV.RM-01", "GV.RM-02", "GV.PO-02", "GV.SC-07", "GV.OV-01", "ID.AM-01", "ID.RA-01", "ID.IM-01", "PR.AA-05"];

const REF = {
  csf: {t: "NIST CSWP 29 — CSF 2.0", u: "https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.29.pdf"},
  sp1301: {t: "NIST SP 1301 — CSF 2.0 Quick-Start: Organizational Profiles", u: "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.1301.pdf"},
  a53: {t: "NIST SP 800-53A Rev. 5 PDF (methods, depth, coverage; in-app objectives come from the later 5.2.0 OSCAL release)", u: "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-53Ar5.pdf"},
  cases: {t: "NIST — Assessment cases overview (depth & coverage values)", u: "https://csrc.nist.gov/Projects/risk-management/about-rmf/assess-step/assessment-cases-overview"},
  oscal: {t: "NIST OSCAL content (800-53 Rev 5.2.0 + 800-53A, CSF 2.0)", u: "https://github.com/usnistgov/oscal-content"},
  gao: {t: "GAO Yellow Book glossary (criteria, condition, cause, effect; sufficiency; appropriateness)", u: "https://gaoinnovations.gov/yellowbook/glossary.html"},
  yb: {t: "GAO-24-106786 — Government Auditing Standards, 2024 revision", u: "https://www.gao.gov/products/gao-24-106786"},
  olir: {t: "NIST — CSF 2.0 informative references (lists 'CSFv2.0-to-SP-800-53-Rev-5-2-0', catalog referenceId 186): verify pairings here", u: "https://www.nist.gov/cyberframework/csf-20-informative-references"},
  ir8286: {t: "NIST IR 8286 Rev. 1 — Integrating Cybersecurity and ERM", u: "https://csrc.nist.gov/pubs/ir/8286/r1/final"},
  ctid: {t: "MITRE CTID Mappings Explorer — 800-53 Rev 5 ↔ ATT&CK", u: "https://github.com/center-for-threat-informed-defense/mappings-explorer"},
  isacaInt: {t: "ISACA Journal — The Interview as an Audit Tool (2016 v4)", u: "https://www.isaca.org/resources/isaca-journal/issues/2016/volume-4/the-interview-as-an-audit-tool-during-an-it-audit"},
  iiaInt: {t: "IIA — Plan for Effective Interviews (2023)", u: "https://internalauditor.theiia.org/en/articles/2023/june/plan-for-effective-interviews/"},
  linford: {t: "Linford & Co — SOC review guidance (practitioner)", u: "https://linfordco.com/blog/soc-review-guidance-soc-1-soc-2-reports/"},
  bridge: {t: "Linford & Co — What are bridge (gap) letters (practitioner)", u: "https://linfordco.com/blog/gap-bridge-letter/"},
  bitsight: {t: "Bitsight — How to review a vendor's SOC 2 report (vendor guide)", u: "https://www.bitsight.com/guides/how-to-review-vendor-soc-2-report-2026"},
  dc200: {t: "AICPA — SOC 2 Description Criteria DC 200 (free account)", u: "https://www.aicpa-cima.com/resources/download/get-description-criteria-for-your-organizations-soc-2-r-report"},
  fedramp: {t: "FedRAMP — POA&M Template Completion Guide", u: "https://fedramp.gov/assets/resources/documents/CSP_POAM_Template_Completion_Guide.pdf"},
  poamEx: {t: "NIST OSCAL — example POA&M (risk / remediation / milestone model)", u: "https://github.com/usnistgov/oscal-content/tree/main/examples/poam"},
  cism: {t: "ISACA — CISM outline update effective 2026-11-03", u: "https://www.isaca.org/about-us/newsroom/press-releases/2026/isaca-updates-cism-exam-content-outline-factoring-in-todays-technologies-security-responsibilities"},
  sec566: {t: "SANS SEC566 (uses ATT&CK to assess control effectiveness)", u: "https://www.sans.org/cyber-security-courses/implementing-auditing-security-frameworks-controls/"},
  dfir: {t: "dfir-trainers — incident-side companion", u: "https://github.com/grumby42/dfir-trainers"}
};

/* Step schema:
   mod, life (index), prof (index), method, depth, coverage, tier, cism[], title, lead{msg,tag},
   scene, concept{lbl,html,prov}, evid[{app,title,pre}], nist{csf[],sp[],hl[],showMethods},
   four{cri,src,suf,ali} each {t,prov,(v,vt)}, owner[{l,t}], threat{ctrl,note},
   bias{name,trap,ct,prov}, gate{q,rows[[hyp,for,against,verdict]]}, dec{q,opts[{t,ok,fb}]},
   take, refs[], fx{prof{},close[],open[]} */

const S = [
/* ---------------- S0 INTAKE ---------------- */
{
  mod: "M0", life: 0, prof: 0, method: "—", depth: "—", coverage: "—", tier: "not yet read", cism: [1],
  title: "The ask lands",
  lead: {msg: "Before you open a single framework, tell me in one sentence what this engagement is for. Not what the CEO typed. What decision is someone going to make with your answer?", tag: "intake"},
  scene: `<p>You're a GRC consultant. <strong>${ORG}</strong> (air-cargo ground handling and freight forwarding at three regional airport sites, about 400 staff plus seasonal contractors) has engaged your firm to answer a board question. You don't operate any of their controls, which is what lets you assess them. This lands in your inbox Monday morning.</p>`,
  evid: [{app: "Mail", title: "FW: board question", pre:
`<span class="c">From:</span> CEO
<span class="c">To:</span> you
<span class="c">Subj:</span> FW: board question

You're engaged — can we get an answer on this before the
Q4 board meeting (6 weeks)?

<span class="c">&gt; From: Audit &amp; Risk Committee chair</span>
<span class="c">&gt;</span> After what happened at [peer company] last month I'd like
<span class="c">&gt;</span> management to tell us whether we're <span class="hi">"aligned to NIST CSF 2.0"</span>
<span class="c">&gt;</span> and what it would take to close any gaps. Budget season
<span class="c">&gt;</span> is in January.`}],
  concept: {lbl: "Classify the ask", prov: "inf", html: `Asks come in a few shapes: <b>assurance</b> (tell me if X is true), <b>readiness</b> (get us ready for an outside assessor), <b>a risk decision</b> (help me decide whether to accept, fund or fix something), a <b>vendor review</b>, or <b>policy</b> work. This one is worded as an assurance question ("are we aligned?"), but the trigger and the timing make it a <b>risk-and-budget decision</b>. That reading changes what you deliver: a prioritized gap list with costs and owners, not a pass or fail. Note too that CSF 2.0 gives you Profiles and Tiers to describe posture against outcomes the organization selects. It doesn't define a pass/fail test called "aligned", so part of your job is agreeing what that word will mean (S2).`},
  nist: {csf: ["GV.OV-01", "GV.RM-01"], sp: [], hl: []},
  four: {
    cri: {t: "Nothing to test yet. The criteria for <i>this step</i> come from the asker: the decision (January budget) and the audience (Audit &amp; Risk Committee). CSF 2.0 itself states the oversight outcome the board is reaching for: <b>GV.OV-01</b>, strategy outcomes reviewed to adjust direction.", prov: "fw"},
    src: {t: "The CEO and the committee chair. Ask the CEO two things: is a written answer expected, and is a budget request welcome?", prov: "inf"},
    suf: {t: "You have enough to write the objective. You do <i>not</i> yet have enough to scope it.", v: "more", vt: "need scope", prov: "inf"},
    ali: {t: `Objective, one sentence: <i>"Give the Audit &amp; Risk Committee a prioritized view of where ${ORG}'s cybersecurity outcomes fall short of an agreed CSF 2.0 Target Profile, with owners and costed actions, to inform the January budget."</i>`, v: "na", vt: "objective set", prov: "syn"}
  },
  owner: [
    {l: "How the CEO hears it", t: "\"Can you make this go away before the board meeting?\" A yes/no answer is tempting for them. Reasonable pushback: a single word can't carry this; a one-page view with three decisions can."},
    {l: "What they'll hand over", t: "The forwarded email. Probably no prior assessment exists. Ask anyway."}
  ],
  threat: {ctrl: null, note: "No control is in play yet. The peer company's incident is the <i>emotional</i> driver of the ask. Note it, and don't let it set the scope (see the bias check)."},
  bias: {name: "Availability / recency", prov: "inf", trap: "The peer ransomware event makes ransomware controls feel like the whole question, so you're tempted to scope down to backups and EDR.", ct: "Counter: the committee asked about CSF 2.0 alignment. Write the peer event into the context, and scope from the framework and the business, not the headline."},
  dec: {q: "What do you send the CEO today?", opts: [
    {t: "\"Yes, we're mostly aligned. I'll confirm the details later.\"", ok: false, fb: "That is an answer with no evidence behind it, and the board will hold you to it. Never pre-commit a conclusion at intake."},
    {t: "A two-line reply: the one-sentence objective, plus a request for 30 minutes to agree scope and who sets the target.", ok: true, fb: "Right. You've restated the decision, shown how you'll get there, and opened the scope conversation. Six weeks is enough if scope is settled this week."},
    {t: "Download the CSF 2.0 core and start testing all 106 subcategories.", ok: false, fb: "That is effort without aim. CSF 2.0 has 106 active subcategories; six weeks of fieldwork can't evidence all of them, and the board didn't ask for that."}
  ]},
  take: "Every engagement starts by naming the decision the answer will inform. A one-sentence objective is your scope test for everything that follows.",
  refs: [REF.csf, REF.cism],
  fx: {open: ["q1", "q2", "q3"], close: ["q1"]}
},
/* ---------------- S1 SCOPE ---------------- */
{
  mod: "M1", life: 1, prof: 0, method: "Interview", depth: "basic", coverage: "—", tier: "not yet read", cism: [1, 2],
  title: "Scope the Profile",
  lead: {msg: "Write me a scope statement and a list of assumptions. If it isn't written down, the scope will move under you in week four.", tag: "scope"},
  scene: `<p>In the scoping meeting the CEO says "everything." The CFO says "just IT." Operations points out that the ramp handheld scanners and the warehouse label printers are run by an outside vendor. Legal mentions that two airline customer contracts carry security clauses.</p>`,
  concept: {lbl: "CSF 2.0 Profile, step 1", prov: "fw", html: `CSF 2.0 (CSWP 29) describes building an Organizational Profile in steps. The first is to <b>scope the Profile</b>: document the high-level facts and assumptions it rests on. Then gather inputs, create the Current and Target Profiles, analyze the gaps and build an action plan, then implement it and update the Profile. This trainer follows that cycle; watch the <i>CSF Profile step</i> meter.`},
  evid: [{app: "Draft", title: "scope-statement-v0.2.docx (your draft)", pre:
`<span class="b">SCOPE</span>   ${ORG} — all three sites; corporate IT, warehouse
        systems, and <span class="hi">vendor-managed devices on our networks</span>
<span class="b">PERIOD</span>  Evidence covering 2026-04-01 → 2026-09-30
<span class="b">OUT</span>     Airline-owned systems at gates; customers' own portals
<span class="b">FOCUS</span>   10 CSF 2.0 subcategories (agreed with CEO/CFO — see S2)
<span class="b">ASSUMES</span> HR + procurement records are the system of record for
        who should have access; legal's contract register is current
<span class="c">— synthetic —</span>`}],
  nist: {csf: ["GV.OC-03"], sp: [], hl: []},
  four: {
    cri: {t: "<b>GV.OC-03</b>: legal, regulatory and contractual requirements are understood and managed. The airline contract clauses are part of what \"aligned\" has to mean here.", prov: "fw"},
    src: {t: "<b>Interview</b> legal (the contract register), operations (the vendor-managed estate), the CFO (budget constraints). <b>Examine</b> the contract register itself.", prov: "inf"},
    suf: {t: "Legal produces a contract-obligations register, reviewed quarterly and owned by counsel. That's enough to show the obligations are <i>understood</i>. It isn't enough to show they're being <i>met</i>. Nobody has tested the airline security clauses against operations, and later findings may bear on them.", v: "more", vt: "understood, not tested", prov: "inf"},
    ali: {t: "Vendor-managed devices on TAC networks go <b>in scope</b>: they're your risk even when they aren't your asset. GV.OC-03 is rated <b>partial</b>: managed on paper, and its fulfilment is out of this cycle's testing. Say so in the limits.", v: "more", vt: "partial", prov: "syn"}
  },
  owner: [
    {l: "CFO's view", t: "\"Scope creep costs money.\" That's fair. Reply with a fixed list of 10 subcategories and a fixed evidence period. That gives a bounded scope with stated limits."},
    {l: "Operations' view", t: "\"The handhelds are the vendor's problem.\" Pushback: if they sit on your network, they're inside your attack surface and inside your Profile."}
  ],
  threat: {ctrl: null, note: "Out-of-scope devices on in-scope networks are a classic blind spot. Hold that thought until the inventory step."},
  bias: {name: "Scope drift (both directions)", prov: "inf", trap: "Shrinking to \"just IT\" because it's easier to evidence, or swelling to \"everything\" because the CEO said so.", ct: "Counter: tie every in-scope or out-of-scope call to the objective from S0, and write each one down with its reason."},
  dec: {q: "The ramp handhelds are vendor-managed. In or out?", opts: [
    {t: "Out. They aren't our assets.", ok: false, fb: "Ownership isn't the test. They connect to TAC networks and carry TAC shipment data. Excluding them hides risk from the board."},
    {t: "In, as devices on our network. The vendor's own controls are assessed through supplier review (GV.SC-07).", ok: true, fb: "Right. In scope as connected assets, with the vendor's side handled as supplier risk. That split shows up again at S7 and S9."},
    {t: "Defer the decision until fieldwork.", ok: false, fb: "Scope you defer gets decided by whoever is loudest in week four. Decide now, write it down, and revisit only through a documented change."}
  ]},
  take: "A scope statement holds three things: what's in, what's out and why, and the assumptions you're relying on. Write each assumption so you can test it later; HR records being complete turns out to matter.",
  refs: [REF.csf, REF.sp1301],
  fx: {prof: {"GV.OC-03": "p"}, close: ["q2"]}
},
/* ---------------- S2 TARGET / FRAMEWORK ---------------- */
{
  mod: "M2", life: 1, prof: 2, method: "—", depth: "—", coverage: "—", tier: "Target: Repeatable (3) — proposed", cism: [1, 3],
  title: "Choose the target and the crosswalk",
  lead: {msg: "Who decides what 'aligned' means? Not you. Get the target agreed by someone who owns the risk, or the board will argue with your gaps.", tag: "framework"},
  scene: `<p>CSF 2.0 states <i>outcomes</i>, not controls. To test an outcome you need something testable underneath it. You choose SP 800-53 Rev 5 controls with their 800-53A assessment procedures as the "how to test" layer under each CSF outcome.</p>`,
  concept: {lbl: "Crosswalks are many-to-many, so verify the pairings", prov: "inf", html: `NIST's CSF 2.0 informative-references page lists an official CSF 2.0 → SP 800-53 Rev 5.2.0 reference (catalog referenceId 186). <b>This trainer does not embed it.</b> The download wasn't reachable from the build environment. So every pairing you see here is labeled <span class="prov inf">inference</span> (a trainer selection) and should be checked against OLIR #186 before you rely on it at work. The CSF text and the 800-53 and 800-53A text on each step <i>are</i> verbatim from NIST's OSCAL catalog.`},
  evid: [{app: "Sheet", title: "target-profile-v1.xlsx (agreed with CEO + CFO)", pre:
`<span class="b">ID         Target (one line)                              800-53 test layer</span>
GV.OC-03   obligations register owned + reviewed          (interview/examine)
GV.RM-01   risk objectives agreed by the committee        PM-9
GV.RM-02   written appetite + tolerance statements        PM-9
GV.PO-02   policies reviewed on a defined cycle           AC-1 (as exemplar)
GV.SC-07   critical suppliers assessed + monitored        SR-6
GV.OV-01   committee reviews outcomes ≥ annually          CA-7
ID.AM-01   one reconciled hardware inventory              CM-8
ID.RA-01   all in-scope assets scanned                    RA-5
ID.IM-01   findings tracked to closure                    CA-5
PR.AA-05   access removed <span class="hi">≤1 business day</span> after      AC-2
           end date (employees + contractors)
<span class="b">Org-defined values agreed here</span> (become test thresholds):
  disable window = 1 business day · CA-5 update = monthly
  vuln response times = <span class="r">not yet defined</span> (left open)
<span class="c">Tier read target: Repeatable (3) — proposed by management — synthetic</span>`}],
  nist: {csf: ["GV.RM-01"], sp: [], hl: []},
  four: {
    cri: {t: "CSWP 29: the <b>Target Profile</b> holds the outcomes the organization has selected and prioritized. The <b>Tiers</b> (Partial, Risk Informed, Repeatable, Adaptive) describe how rigorous its risk governance and management practices are.", prov: "fw"},
    src: {t: "The CEO and CFO, who own the risk and the budget. You <i>propose</i> the target; they <i>select</i> it.", prov: "inf"},
    suf: {t: "A signed-off target sheet. An email that says \"sounds good\" isn't enough; you need the named approvers and the date.", v: "ok", vt: "agreed", prov: "syn"},
    ali: {t: "Ten outcomes, each with a one-line target and a named 800-53 test layer. Proposed tier read: <b>Repeatable (3)</b>. Where a control has an <code>[Assignment: organization-defined …]</code> value you'll test against (the disable window, for example), management sets it <i>now</i>. You don't invent it at fieldwork. Values left undefined become findings.", v: "na", vt: "target set", prov: "syn"}
  },
  owner: [{l: "Executive view", t: "\"Just use the full framework.\" Pushback: a target means a <i>selection</i> of outcomes, with priorities. All 106 subcategories at once isn't a target, it's a backlog."}],
  threat: {ctrl: null, note: "Which outcomes went into the target is itself a risk decision. If nothing in it touches detection (DE), say so in the report."},
  bias: {name: "Copy-paste targets", prov: "inf", trap: "Taking a generic \"best practice\" profile as the target because it looks authoritative.", ct: "Counter: CSF 2.0 says the organization selects and prioritizes outcomes. Ask what <i>this</i> business needs, then cite the source of each target line."},
  dec: {q: "Management wants Tier 4 (Adaptive) \"because we should aim high.\" You…", opts: [
    {t: "Accept it. Ambition is good.", ok: false, fb: "A target the organization can't fund makes every gap look like failure, and it isn't a decision anyone can make in January."},
    {t: "Recommend Repeatable (3) for now, record Adaptive as a stated long-term direction, and let the owners decide.", ok: true, fb: "Right. You advise and they select. The tier names come from CSWP 29; the choice is a business judgment, and it's labeled that way."},
    {t: "Set the tier yourself. You're the expert.", ok: false, fb: "If the assessor picks the target and then measures against it, the gaps lose credibility. Keep the roles separate."}
  ]},
  take: "Know what is NIST's text and what is your pairing of it. The outcome and the control text are verbatim from NIST; the line connecting them is your choice, so check it against OLIR.",
  refs: [REF.csf, REF.olir, REF.oscal],
  fx: {close: ["q3"], open: ["q4", "q5", "q6", "q7", "q8", "q9"]}
},
/* ---------------- S3 REQUEST LIST ---------------- */
{
  mod: "M3", life: 2, prof: 1, method: "Examine (planned)", depth: "—", coverage: "—", tier: "Target: Repeatable (3)", cism: [3],
  title: "Build the request list from NIST's assessment objects",
  lead: {msg: "Every line on your request list should trace to an objective. If you can't say which objective a document answers, don't ask for it.", tag: "request list"},
  scene: `<p>800-53A doesn't leave "where do I look" to guesswork. Every procedure lists <b>assessment objects</b> for each method: the documents to <i>examine</i>, the roles to <i>interview</i>, and the mechanisms to <i>test</i>. The NIST panel below is open on this step. Read the AC-2 object lists at the bottom. That's your request list, almost word for word. (On later steps the panel starts collapsed. Click it to open.)</p>`,
  concept: {lbl: "Three methods, applied to assessment objects", prov: "fw", html: `NIST 800-53A has three assessment methods. <b>Examine</b>: specifications, mechanisms, activities. <b>Interview</b>: individuals or groups. <b>Test</b>: mechanisms and activities. Each is applied with a <b>depth</b> (basic, focused, comprehensive) and a <b>coverage</b> (basic sample, focused sample, sufficiently large sample).`},
  evid: [{app: "Sheet", title: "request-list-v1 (PBC: prepared by client)", pre:
`<span class="b">#   Request                                        Traces to</span>
R01 Access control policy + procedures —          AC-01a.[01], AC-01c.01[01]
    controlled copies from the policy repository
R02 Personnel termination + transfer procedures    AC-02l.[01], AC-02l.[02]
R03 Active accounts w/ associated individual (AD)  AC-02d.01
R04 Recently disabled accounts + disable dates     AC-02f.[04]
R05 HR separations 2026-04-01→09-30 (full pop.)    AC-02l.[01] <span class="hi">← you pull, not IT</span>
R06 Contractor end dates (procurement)             AC-02l.[01] <span class="hi">← you pull, not IT</span>
R07 Hardware inventory export (CMDB)               CM-08a.01, CM-08a.02
R08 Scanner targets + last 3 scan summaries        RA-05a.[02], RA-05c.
R09 Supplier assessment records, top 5 vendors     SR-06
R10 Risk mgmt strategy / appetite statement        PM-09a.01
<span class="c">— synthetic —</span>`}],
  nist: {csf: ["PR.AA-05"], sp: ["ac-2"], hl: ["AC-02l.[01]", "AC-02f.[04]", "AC-02j."], showMethods: true, open: true},
  four: {
    cri: {t: "Each request maps to an 800-53A objective label, for example <b>AC-02l.[01]</b>: account management processes are aligned with personnel termination processes.", prov: "fw"},
    src: {t: "800-53A's <b>examine</b> objects for AC-2 include the personnel termination policy, the list of active accounts with the individual associated with each, and the list of recently disabled accounts. Copy them across.", prov: "fw"},
    suf: {t: "A request list is a plan, not evidence. It's sufficient when every objective you'll test has at least one object behind it.", v: "ok", vt: "plan complete", prov: "inf"},
    ali: {t: "R05 and R06 are <b>populations</b>. You pull them from the systems of record (HR, procurement), not from the team whose control you're testing.", v: "na", vt: "planned", prov: "inf"}
  },
  owner: [{l: "IT Ops' view", t: "\"That's a lot of requests.\" Reasonable. Group them by owner, give deadlines, and explain that each one traces to a specific objective. That cuts down on the \"why do you need this?\" back-and-forth."}],
  threat: {ctrl: "AC-02", note: "CTID maps AC-2 to a large number of ATT&amp;CK techniques (the count is below). That breadth is one reason this control earns depth in the plan."},
  bias: {name: "Convenience sourcing", prov: "inf", trap: "Asking the control owner for the population you'll sample from (\"send me the leavers list\").", ct: "Counter: populations come from an independent system of record. The owner sends you <i>their</i> evidence; HR and procurement tell you who <i>should</i> have been processed."},
  dec: {q: "Who should provide R05 (the HR separations list)?", opts: [
    {t: "IT Operations. They process the terminations.", ok: false, fb: "That's the control owner supplying the population their own control is tested against. A missing leaver would be missing from both lists."},
    {t: "HR, pulled directly by you or by HR for you.", ok: true, fb: "Right. The system of record for \"who left\" is HR. Procurement covers contractors, which is R06. Keep both."},
    {t: "Either. They'll match.", ok: false, fb: "\"They'll match\" is the conclusion you're testing, not something you can assume going in."}
  ]},
  take: "Look for answers in the assessment objects NIST lists for each method. Build the request list from them, and source populations independently of the control owner.",
  refs: [REF.a53, REF.cases, REF.oscal]
},
/* ---------------- S4 DOCUMENT REVIEW ---------------- */
{
  mod: "M3", life: 2, prof: 2, method: "Examine", depth: "focused (Study)", coverage: "basic", tier: "Target: Repeatable (3)", cism: [1, 3],
  title: "Examine the policy",
  lead: {msg: "A policy existing tells me nothing. Is it approved, owned, current, and does anyone follow it? Show me where each of those is evidenced.", tag: "examine"},
  scene: `<p>R01 arrives: an access control policy PDF and a "procedures" Word document.</p>`,
  evid: [{app: "PDF", title: "TAC-ISP-04 Access Control Policy.pdf — page 1", pre:
`<span class="b">TAC-ISP-04  Access Control Policy           v2.1</span>
Owner ............ Chief Information Security Officer
Approved by ...... <span class="hi">K. Osei, CISO</span>   <span class="c">(left company 2025-02)</span>
Approved ......... <span class="hi">2022-03-14</span>
Next review ...... <span class="r">2023-03</span>
Scope ............ All TAC employees
                   <span class="r">(contractors not mentioned)</span>
§6 Termination ... Accounts disabled upon HR notification.
<span class="c">— synthetic —</span>`},
  {app: "DOCX", title: "Access Procedures.docx — header", pre:
`<span class="r">DRAFT — DO NOT DISTRIBUTE</span>     last modified 2024-11-02
Status: never approved
<span class="c">— synthetic —</span>`}],
  nist: {csf: ["GV.PO-02"], sp: ["ac-1"], hl: ["AC-01a.[01]", "AC-01a.01(a)[02]", "AC-01b.", "AC-01c.01[01]", "AC-01a.[03]"], showMethods: true},
  four: {
    cri: {t: "<b>GV.PO-02</b>: policy is reviewed, updated, communicated and enforced. Tested through <b>AC-01c.01[01]</b> (policy reviewed and updated at the organization-defined frequency), <b>AC-01b.</b> (an official is designated) and <b>AC-01a.01(a)[02]</b> (the policy addresses scope).", prov: "fw"},
    src: {t: "<b>Examine</b> the policy and procedure documents. These are the objects 800-53A lists first for AC-1.", prov: "fw"},
    suf: {t: "Applying GAO's terms: the documents are <i>relevant</i>, and they're <i>reliable</i> only if they're the controlled copies. R01 asked for copies from the policy repository, so confirm that's where these came from, and ask once, in writing, whether a newer version exists. With those two checks, they're <i>sufficient</i> for a document-level conclusion.", v: "ok", vt: "sufficient for doc conclusion", prov: "inf"},
    ali: {t: "Several problems: review overdue by more than 3 years; the approver has left the company; contractors are missing from scope; the procedures were never approved. <b>GV.PO-02 → gap.</b> Note: this says nothing yet about whether accounts <i>actually</i> get disabled.", v: "bad", vt: "gap", prov: "syn"}
  },
  owner: [
    {l: "What they'll say", t: "\"Everyone knows the process. The document is just paperwork.\""},
    {l: "Reasonable pushback", t: "\"Then the process should be easy to show me working. That's the next step. The document gap stands either way, because the criteria say the policy is <i>reviewed and updated</i>.\""}
  ],
  threat: {ctrl: null, note: "CTID maps no ATT&amp;CK techniques to AC-1, and that's expected. Policy controls work <i>through</i> operational controls like AC-2. This is why a policy gap matters most where it explains an operational failure."},
  bias: {name: "\"It exists, so it works\"", prov: "inf", trap: "Ticking the policy box because a PDF exists with a version number and a signature block.", ct: "Counter: read the metadata. Approved by whom, when, next review, scope. Then remember that a current document still says nothing about operation."},
  dec: {q: "The policy's scope says 'employees' and never mentions contractors. What do you do with that?", opts: [
    {t: "Ignore it. It's a wording issue.", ok: false, fb: "Scope language decides who the control applies to. If contractors are out of the policy, they may be out of the process. That's a hypothesis worth testing."},
    {t: "Note it as a document finding, and turn it into a testing hypothesis: are contractor accounts handled differently?", ok: true, fb: "Right. Document review sets up your testing. S6 checks this hypothesis directly."},
    {t: "Rewrite the policy now so the gap goes away.", ok: false, fb: "The assessor doesn't fix the thing being assessed mid-fieldwork. Record it; remediation comes at S12, owned by management."}
  ]},
  take: "Document review answers whether the control is designed and governed, never whether it operates. Use it to generate hypotheses for testing.",
  refs: [REF.a53, REF.gao, REF.oscal],
  fx: {prof: {"GV.PO-02": "g"}, close: ["q4"]}
},
/* ---------------- S5 INTERVIEW ---------------- */
{
  mod: "M4", life: 2, prof: 2, method: "Interview", depth: "focused", coverage: "basic", tier: "Target: Repeatable (3)", cism: [3],
  title: "Interview the control owner",
  lead: {msg: "Open questions first, then a walkthrough, then 'show me.' And everything you hear is a claim until a document or a test backs it up.", tag: "interview"},
  scene: `<p>800-53A's interview objects for AC-2 include personnel with account management responsibilities and system/network administrators (the full list is in the NIST panel). You book 30 minutes with <strong>Tom Brandt</strong>, IT Operations Manager.</p>`,
  evid: [{app: "Notes", title: "interview-AC2-tbrandt-2026-10-08.txt", pre:
`<span class="c">Interviewee: T. Brandt (IT Ops Mgr) · Interviewer: you · 30 min</span>
Q (open) Walk me through what happens when someone leaves.
A  HR opens a ticket on their last day; we disable AD the same
   day. "Same day, every time."
Q (walkthrough) Show me the last one you processed.
A  [shows ticket INC-40882 → AD disabled same day]  <span class="g">✓ seen</span>
Q  And contractors?
A  "Same thing — their manager emails us."
Q  Is that email tracked anywhere?
A  "...it goes to the shared inbox. We're good about it."
<span class="hi">CLAIMS TO CORROBORATE:</span> (1) employees same day
                      <span class="hi">(2) contractors via manager email</span>
<span class="c">— synthetic —</span>`}],
  concept: {lbl: "Corroboration", prov: "inf", html: `800-53A lists <b>interview</b> objects next to <b>examine</b> and <b>test</b> objects for the same objective. The trainer reads that as a design cue: what you hear is one input, and the other two methods are how you corroborate it. Plan the corroboration before you leave the room. For interview <i>technique</i> (preparing from documents, setting a purpose, mixing open, probing and closed questions), see the ISACA Journal (2016) and IIA (2023) pieces linked below <span class="prov oc">practitioner</span>.`},
  nist: {csf: ["PR.AA-05"], sp: ["ac-2"], hl: ["AC-02l.[01]", "AC-02f.[04]", "AC-02h.01"], showMethods: true},
  four: {
    cri: {t: "<b>AC-02l.[01]</b>: account management processes are aligned with personnel termination processes. <b>AC-02f.[04]</b>: accounts are disabled in accordance with the organization-defined policy and procedures.", prov: "fw"},
    src: {t: "<b>Interview</b> the account manager (an 800-53A interview object). The single walkthrough item he showed you counts as one observed instance, not a test.", prov: "inf"},
    suf: {t: "<i>Not sufficient.</i> One self-selected example plus testimony. The contractor path runs through an untracked inbox, and you have no record to sample from it.", v: "more", vt: "corroborate", prov: "inf"},
    ali: {t: "Two testable claims, each with a test design: (1) employees disabled same day, tested against HR's list; (2) contractors via manager email, tested against procurement's list.", v: "na", vt: "hypotheses", prov: "inf"}
  },
  owner: [
    {l: "How Tom hears your questions", t: "As an accusation, especially \"is that tracked anywhere?\" Keep it neutral: you're testing a process, not a person."},
    {l: "What Tom will over-explain", t: "The employee path, because it works and he's proud of it. The contractor path gets one sentence. That gap in detail tells you something."}
  ],
  threat: {ctrl: "AC-02", note: "If contractor accounts stay enabled after the contract ends, that's the condition behind <b>T1078 Valid Accounts</b>, one of the techniques CTID maps AC-2 as mitigating (listed below)."},
  bias: {name: "Narrative capture", prov: "inf", trap: "Tom is confident, credible and helpful, and \"same day, every time\" becomes your working conclusion.", ct: "Counter: write claims in a separate block and plan the corroborating test for each one before the meeting ends. Confidence is not evidence."},
  dec: {q: "Tom offers to send you 'a few good examples' of contractor offboarding. You…", opts: [
    {t: "Accept them. That saves time.", ok: false, fb: "That's an auditee-selected sample. The examples will be good ones; that's why they were picked."},
    {t: "Thank him, and select contractor items yourself from procurement's end-date list.", ok: true, fb: "Right. The assessor picks the sample from an independent population."},
    {t: "Skip contractors. There are only a few.", ok: false, fb: "\"Only a few\" plus an untracked process is exactly where a focused sample belongs."}
  ]},
  take: "Interviews show you how a process is supposed to work and where to probe. They don't prove it works. Treat every answer as a claim that needs a corroborating test.",
  refs: [REF.a53, REF.isacaInt, REF.iiaInt]
},
/* ---------------- S6 TEST + SAMPLE ---------------- */
{
  mod: "M5", life: 2, prof: 2, method: "Test", depth: "focused", coverage: "basic + focused", tier: "Target: Repeatable (3)", cism: [3, 4],
  title: "Test it: sample, compare, find the exceptions",
  lead: {msg: "Tell me your sample design before you show me results: the population, who picked the sample, and why that coverage.", tag: "test"},
  scene: `<p>Population for the period 2026-04-01 → 2026-09-30: <strong>34</strong> employee separations (HR, R05) and <strong>9</strong> contractor end dates (procurement, R06). You test against AD's disable timestamps.</p>`,
  concept: {lbl: "Depth & coverage — NIST's terms", prov: "fw", html: `NIST's coverage values: a <b>basic sample</b> is representative; a <b>focused sample</b> extends it to include other important objects; a <b>sufficiently large sample</b> extends that further. Your design: a <b>basic sample</b> of 11 employees, selected at random from 34, plus a <b>focused</b> extension that takes <b>all 9 contractors</b>, because the interview showed that path to be different and untracked. <span class="prov inf">inference</span> The numbers are this engagement's choice. NIST does not prescribe sample sizes, and no free primary source sets them.`},
  evid: [{app: "Workpaper", title: "WP-AC2-01 termination test — results", pre:
`<span class="c">Threshold: disable window = 1 business day (org-defined, agreed S2)</span>
<span class="b">Stratum     n   Within window   Late (calendar d)   Still enabled</span>
Employees   11  11              0                   0     <span class="g">✓</span>
Contractors  9   3              4 (+6 to +41)       <span class="r">2</span>

<span class="b">Contractor exceptions</span>   <span class="c">end dates confirmed with hiring managers</span>
c-0172  end 2026-05-30  disabled 2026-06-05  (+6 cal. days)
c-0188  end 2026-06-14  disabled 2026-07-25  (+41 cal. days)
c-0193  end 2026-07-01  disabled 2026-07-14  (+13 cal. days)
c-0201  end 2026-08-08  disabled 2026-08-20  (+12 cal. days)
c-0207  end 2026-08-29  <span class="r">ENABLED</span>  last VPN logon <span class="r">2026-09-17</span>
c-0214  end 2026-09-12  <span class="r">ENABLED</span>  last logon 2026-09-11
<span class="c">Accounts/dates synthetic · c-#### are placeholder IDs</span>`}],
  nist: {csf: ["PR.AA-05"], sp: ["ac-2"], hl: ["AC-02f.[04]", "AC-02l.[01]", "AC-02g."], showMethods: true},
  four: {
    cri: {t: "<b>AC-02f.[04]</b>: accounts are disabled in accordance with the organization-defined procedures. <b>AC-02l.[01]</b>: aligned with termination processes.", prov: "fw"},
    src: {t: "<b>Test</b> organizational processes for account management against two independent populations, then compare against AD (a mechanism implementing account management).", prov: "fw"},
    suf: {t: "Sufficient for a conclusion <i>per stratum</i>. Contractors fail (a census of all 9, so there's no sampling risk). Employees show no exceptions in 11 random items. That supports \"operating as claimed\", with ordinary sampling risk, so say it that way. Appropriate, because the populations came from systems of record, the end dates were confirmed with hiring managers, and the timestamps came from AD.", v: "ok", vt: "sufficient", prov: "inf"},
    ali: {t: "Exception rate: 0/11 employees, 6/9 contractors. One enabled account shows a VPN logon <b>after</b> the contract ended. <b>PR.AA-05 → gap</b> for the contractor population.", v: "bad", vt: "exceptions", prov: "syn"}
  },
  owner: [
    {l: "Tom's first reaction", t: "\"Managers didn't email us. That's not on IT.\""},
    {l: "Reasonable pushback", t: "\"That may be the cause, and it goes in the finding. The criteria are about the <i>process</i> being aligned to termination, and right now there's no process for contractors that doesn't depend on someone remembering.\""}
  ],
  threat: {ctrl: "AC-02", note: "c-0207 logged on over VPN 19 days after the contract ended. <b>You are an assessor, not an investigator.</b> Escalate it today to the incident process for triage. Don't analyze it inside the workpaper. (The incident side is what the dfir-trainers repo covers.)"},
  gate: {q: "Competing explanations for the contractor exceptions", rows: [
    ["Operating failure (people didn't follow a good process)", "Employees: 11/11 fine", "No contractor procedure exists to follow (S4 draft never approved)", ""],
    ["<b>Design gap</b> (no process covers contractors)", "Policy scope = employees only; manager email path untracked", "None found", "w"],
    ["Evidence gap (they were disabled; logs are wrong)", "—", "AD shows 2 still enabled at fieldwork; VPN logon recorded", ""],
    ["Scope / criteria mismatch (contractors not meant to be covered)", "Policy says 'employees'", "AC-2 covers all system accounts; target agreed at S2 covers them", ""],
    ["Data error (procurement end dates wrong: extensions, re-engagements)", "—", "All 6 end dates confirmed with hiring managers before reporting", ""]
  ]},
  bias: {name: "Anchoring on the good stratum", prov: "inf", trap: "11/11 employees passed, so it feels like the control \"basically works\" and the contractors are noise.", ct: "Counter: report by stratum. A clean majority doesn't dilute a design gap in a high-risk population."},
  dec: {q: "c-0207 shows a VPN logon after the contract ended. Your next action:", opts: [
    {t: "Disable the account yourself. You have the evidence.", ok: false, fb: "Don't alter the system under test, and don't alter what may become incident evidence. Escalate to the control owner and the incident process."},
    {t: "Escalate the same day to TAC's incident process and to the control owner (IT Ops), note it in the workpaper, and carry on with the assessment.", ok: true, fb: "Right. A possible incident goes to the people who handle incidents, and quickly. Your finding stands either way."},
    {t: "Wait and include it in the final report in six weeks.", ok: false, fb: "A live risk can't wait for the reporting calendar. Assessors escalate when they find one."}
  ]},
  take: "Sample from independent populations, report results by stratum, and before you name a cause, test it against the other plausible ones.",
  refs: [REF.cases, REF.a53, REF.ctid, REF.dfir],
  fx: {prof: {"PR.AA-05": "g"}, close: ["q5"]}
},
/* ---------------- S7 INVENTORY ---------------- */
{
  mod: "M5", life: 2, prof: 2, method: "Test", depth: "focused", coverage: "census (full reconcile)", tier: "Target: Repeatable (3)", cism: [3],
  title: "Test the population itself: asset inventory",
  lead: {msg: "Every other test samples from some list. If the list is wrong, every test is wrong. Reconcile the inventory against what's actually on the network.", tag: "test"},
  scene: `<p>The CMDB export (R07) is your population for scanning, patching and configuration. You compare it against 30 days of DHCP/NAC records from the three sites.</p>`,
  evid: [{app: "Workpaper", title: "WP-CM8-01 inventory reconciliation", pre:
`CMDB active records ............................ 612
Distinct devices seen on network (30d) .......... 668
Matched (in both) ............................... 589
In CMDB, not seen in 30d ........................  23  <span class="c">(retired? offline?)</span>
<span class="hi">Seen on network, NOT in CMDB ....................  79</span>
   ramp handheld scanners (vendor MDM) ...........  52
   label/warehouse printers ......................  14
   <span class="r">unidentified ...................................   4</span>  <span class="c">→ escalated same day</span>
   personal phones on corp Wi-Fi .................   9  <span class="c">→ not org hardware:</span>
                                                         <span class="c">separate observation O-01</span>
<span class="hi">Org-managed / in-boundary devices missing from CMDB  70</span>  <span class="c">(52+14+4)</span>
<span class="c">612 − 23 = 589 · 668 − 589 = 79 · 79 − 9 = 70 · 70/668 ≈ 10.5% — synthetic</span>`}],
  nist: {csf: ["ID.AM-01"], sp: ["cm-8"], hl: ["CM-08a.01", "CM-08a.02", "CM-08b."], showMethods: true},
  four: {
    cri: {t: "<b>CM-08a.02</b>: the inventory includes all components within the system. <b>CM-08a.01</b>: it accurately reflects the system.", prov: "fw"},
    src: {t: "<b>Test</b> the mechanisms supporting inventory (the CMDB) against an independent observation of the network (DHCP and NAC records).", prov: "fw"},
    suf: {t: "A full reconciliation, which is a census rather than one of NIST's three sample terms, because the inventory is the population for other tests. Before concluding, apply the criteria precisely. ID.AM-01 is hardware <i>managed by the organization</i>, and CM-08a.02 is components <i>within the system</i>. The 9 personal phones are neither, so they're a different issue (BYOD on the corporate network) and get recorded separately. The 4 unidentified devices could be rogue, so they go to security operations <b>today</b>, the same way the S6 VPN logon did.", v: "ok", vt: "sufficient", prov: "inf"},
    ali: {t: "70 in-boundary devices (about 10.5% of those observed) are missing from the inventory. <b>ID.AM-01 → gap.</b> Every test built on the CMDB (RA-5 next) inherits the gap. Observation O-01 (personal devices on corporate Wi-Fi) is reported separately.", v: "bad", vt: "gap", prov: "syn"}
  },
  owner: [{l: "Ops' view", t: "\"The handhelds are in the vendor's MDM. They're inventoried, just not in ours.\" A fair point, and it goes into the cause. The criterion is <i>one</i> inventory that reflects the system: a second list you can't see doesn't feed your scanning."}],
  threat: {ctrl: "CM-08", note: "Unknown devices are unmanaged attack surface. CTID's CM-8 mapping includes <b>T1133 External Remote Services</b> and <b>T1190 Exploit Public-Facing Application</b> (listed below)."},
  bias: {name: "Population trust", prov: "inf", trap: "Treating the CMDB as truth because it's the official system.", ct: "Counter: before you sample from any list, ask what independent source could show the list is incomplete. Then check it."},
  dec: {q: "Why reconcile the full inventory instead of sampling it?", opts: [
    {t: "Because NIST requires 100% for inventories.", ok: false, fb: "800-53A doesn't say that, and its three coverage terms are all <i>sample</i> levels. A census is your choice, and yours to defend."},
    {t: "Because it's the population for other tests. A sample can't tell you what's <i>missing</i> from a list.", ok: true, fb: "Right. Completeness can only be tested against an independent full view. Sampling from the list itself will never find the gaps in it."},
    {t: "Because the data was easy to get.", ok: false, fb: "Convenience isn't a coverage rationale. Write the real reason in the workpaper."}
  ]},
  take: "Test whether a population is complete before you sample from it. An inventory gap is often the cause behind several other findings.",
  refs: [REF.a53, REF.ctid],
  fx: {prof: {"ID.AM-01": "g"}, close: ["q6"]}
},
/* ---------------- S8 VULN SCANNING ---------------- */
{
  mod: "M5", life: 2, prof: 2, method: "Examine + Test", depth: "basic", coverage: "basic", tier: "Target: Repeatable (3)", cism: [2, 3],
  title: "Follow the gap: what the scanner can't see",
  lead: {msg: "Quick one. Where does the scanner get its target list? If the answer is 'the CMDB,' you already know part of your finding.", tag: "examine"},
  scene: `<p>R08: the scanner's target configuration and the last three monthly scan summaries.</p>`,
  evid: [{app: "Config", title: "scanner targets — source", pre:
`target_source:   cmdb_sync (nightly)
schedule:        monthly, all targets
last 3 runs:     612 targets each; <span class="g">589 / 588 / 589 responded</span>
                 <span class="c">(non-responders ≈ the 23 stale CMDB records)</span>
criticals open > 30d:  7   <span class="c">(tracked in tickets)</span>
response-time SLA:  <span class="r">none defined</span>   <span class="c">(RA-05d ODP — left open at S2)</span>
<span class="r">not targeted:    devices absent from CMDB (n=70, see WP-CM8-01)</span>
<span class="c">— synthetic —</span>`}],
  nist: {csf: ["ID.RA-01"], sp: ["ra-5"], hl: ["RA-05a.[02]", "RA-05c.", "RA-05d."], showMethods: true},
  four: {
    cri: {t: "<b>RA-05a.[02]</b>: systems and hosted applications are scanned for vulnerabilities at the organization-defined frequency. <b>ID.RA-01</b>: vulnerabilities are identified, validated and recorded.", prov: "fw"},
    src: {t: "<b>Examine</b> the scanning tool's configuration documentation and the scan results. <b>Test</b> by comparing the target list to the reconciled inventory.", prov: "fw"},
    suf: {t: "Sufficient on coverage: the configuration shows the target source, and the S7 reconciliation quantifies what's excluded. <b>RA-05d</b> can't be tested at all. The 7 criticals open beyond 30 days can't be judged late or on time, because no organization-defined response time exists.", v: "ok", vt: "sufficient", prov: "inf"},
    ali: {t: "Scanning runs against every CMDB target and is blind to 70 devices. <b>ID.RA-01 → partial</b> (F-04). Two causes: the CMDB gap (F-03), and the scanner being fed from it. Fixing it needs both: complete the inventory, <i>and</i> point the scanner at the reconciled list. The missing response-time value goes into F-04, so RA-05d can be tested next cycle.", v: "more", vt: "partial", prov: "syn"}
  },
  owner: [{l: "Security engineer's view", t: "\"Scanning is fine. Every target that answered got scanned.\" True. The finding is about coverage and an undefined response time, not about the scanner working. That framing keeps the conversation calm."}],
  threat: {ctrl: "RA-05", note: "Unscanned devices are where exploitable flaws stay unknown. CTID maps RA-5 to <b>T1190</b> and <b>T1210 Exploitation of Remote Services</b>, among others."},
  bias: {name: "Metric comfort", prov: "inf", trap: "A 100% scan-completion metric feels like coverage.", ct: "Counter: always ask \"100% of <i>what</i>?\" A ratio is only as good as its denominator."},
  dec: {q: "How do you write up the scanner issue relative to the inventory finding?", opts: [
    {t: "As two unrelated findings.", ok: false, fb: "Then management fixes two symptoms and leaves the shared cause alone."},
    {t: "As a separate finding that names its cause as the inventory gap (F-03) and links the two.", ok: true, fb: "Right. Separate criteria, shared cause. The remediation plan fixes the cause once."},
    {t: "Fold it into the inventory finding and drop it.", ok: false, fb: "The two have different criteria and different effects, so they need separate findings. The cause link is what connects them."}
  ]},
  take: "When two findings share a cause, link them. Fixing the cause once is cheaper and lasts longer than treating each symptom.",
  refs: [REF.a53, REF.ctid],
  fx: {prof: {"ID.RA-01": "p"}, close: ["q7"]}
},
/* ---------------- S9 SUPPLIER ---------------- */
{
  mod: "T1", life: 2, prof: 2, method: "Examine + Interview", depth: "focused", coverage: "basic", tier: "Target: Repeatable (3)", cism: [3],
  title: "Supplier risk: read the assurance report, not the logo",
  lead: {msg: "Procurement says 'they have a SOC 2.' What period does it cover, what does it leave out, and what does it say <i>we</i> have to do?", tag: "third party"},
  scene: `<p><strong>Plovertrack</strong> (a fictional SaaS shipment-tracking platform) holds every customer's shipment data. Procurement's file (R09) holds a SOC 2 Type II report collected at onboarding.</p>`,
  evid: [{app: "PDF", title: "Plovertrack SOC 2 Type II — key pages (summarized)", pre:
`Report period ....... 2024-07-01 → <span class="hi">2025-06-30</span>
Report date ......... 2025-08-15
Opinion ............. unqualified
Subservice org ...... cloud hosting provider — <span class="hi">carved out</span>
Exceptions noted .... 2 (change mgmt approvals) — mgmt responses
CUECs (user entity controls), incl.:
  "User entities are responsible for <span class="r">timely removal of
   access for their terminated users</span>."
Newer report ........ <span class="r">not requested since onboarding</span>
Bridge letter ....... <span class="r">none on file</span>
Subservice report ... <span class="r">not requested</span> (hosting provider)
Plovertrack login ... <span class="r">local accounts (no SSO to TAC AD)</span>
<span class="c">— synthetic; report content invented —</span>`}],
  concept: {lbl: "Reading a SOC 2 report: four things to check", prov: "oc", html: `Practitioner guidance (Linford &amp; Co; Bitsight) names four checks.<br><b>The period.</b> How stale it is. A <i>bridge (gap) letter</i> is a <b>management</b> assertion, not auditor assurance, and Linford notes it typically covers a short gap of about three months or less, between the report's end and now. It can't stand in for a report that's more than a year old. Ask for the <b>newer report</b> first, and a bridge letter only for the short remaining gap.<br><b>Carve-outs.</b> Subservice organizations excluded from testing. Ask for the subservice organization's own report, and check the complementary controls the report expects of it.<br><b>Exceptions.</b> Read the test results, not only the opinion.<br><b>CUECs.</b> Controls the report assumes <i>you</i> perform.<br>The authoritative description criteria are AICPA's DC 200, which needs a free account and wasn't read for this build.`},
  nist: {csf: ["GV.SC-07"], sp: ["sr-6"], hl: [], showMethods: true},
  four: {
    cri: {t: "<b>GV.SC-07</b>: supplier risks are understood, recorded, prioritized, assessed, responded to and <i>monitored over the course of the relationship</i>. <b>SR-6</b>: assess and review supplier risks at the organization-defined frequency.", prov: "fw"},
    src: {t: "<b>Examine</b> records of supplier due diligence reviews (an SR-6 examine object). <b>Interview</b> procurement and the business owner.", prov: "fw"},
    suf: {t: "Enough to conclude that monitoring isn't happening: one review at onboarding, a report now more than 15 months past its period end, and no newer report requested. <i>Not</i> enough to say anything about contractor accounts inside Plovertrack. You haven't tested them.", v: "ok", vt: "sufficient (for SC-07)", prov: "inf"},
    ali: {t: "<b>GV.SC-07 → partial</b> (F-05). The CUEC points back at S6. Plovertrack uses local accounts, so the contractor gap <i>may</i> extend into the vendor's platform. That's an <b>untested risk</b>. Record it as a follow-up test (sample contractor end dates against Plovertrack's user list). Don't fold it into F-01's condition.", v: "more", vt: "partial", prov: "syn"}
  },
  owner: [{l: "Procurement's view", t: "\"We checked them when we signed.\" That's true, and it's the point. The criterion says <i>over the course of the relationship</i>. Ask for the newer report (with a bridge letter only for any short gap after it) and the hosting provider's report, and set a review cycle."}],
  threat: {ctrl: null, note: "CTID maps no techniques to SR-6 directly. But a stale vendor account belonging to an ex-contractor is <b>T1078 Valid Accounts</b> again, this time in someone else's platform."},
  bias: {name: "Halo effect", prov: "inf", trap: "\"They have a SOC 2\" makes the vendor feel safe.", ct: "Counter: a report's opinion covers <i>their</i> controls, <i>in that period</i>, <i>minus the carve-outs</i>, <i>assuming your CUECs</i>. Read all four before you lean on it."},
  dec: {q: "Which item in the report most changes your earlier findings?", opts: [
    {t: "The unqualified opinion.", ok: false, fb: "An opinion is about their controls during their period. It doesn't touch your findings."},
    {t: "The CUEC on removing terminated users' access, combined with Plovertrack's local accounts.", ok: true, fb: "Right. It suggests your contractor-deprovisioning gap may reach into the vendor's platform. Test it (a follow-up sample) before you claim it, and include Plovertrack in F-01's recommended fix either way."},
    {t: "The two change-management exceptions.", ok: false, fb: "Worth noting and following up, but they're the vendor's to fix, and they don't change your own control findings."}
  ]},
  take: "Supplier assurance covers a specific period and scope, and it assumes you run certain controls yourself. Check the CUECs against your own findings.",
  refs: [REF.linford, REF.bridge, REF.bitsight, REF.dc200, REF.oscal],
  fx: {prof: {"GV.SC-07": "p"}, close: ["q8"]}
},
/* ---------------- S10 FINDINGS ---------------- */
{
  mod: "M6", life: 3, prof: 3, method: "—", depth: "—", coverage: "—", tier: "Target: Repeatable (3)", cism: [2],
  title: "Write the findings: criteria, condition, cause, effect",
  lead: {msg: "If a finding doesn't say what should be, what is, why, and so what, it's an opinion. Write F-01 in full and show me.", tag: "findings"},
  concept: {lbl: "GAO's elements of a finding (verbatim, Yellow Book glossary)", prov: "fw", html: `<b>Criteria</b>: "the required or desired state or expectation with respect to the program or operation." <b>Condition</b>: "A situation that exists. The condition is determined and documented during the engagement." <b>Cause</b>: "The factor or factors responsible for the difference between the condition and the criteria, which may also serve as a basis for recommendations for corrective actions." <b>Effect or potential effect</b>: "The outcome or consequence resulting from the difference between the condition and the criteria." <span style="color:var(--faint)">U.S. GAO, public domain.</span>`},
  scene: `<p>F-01 below is written out in full. F-02 through F-05 follow the same pattern.</p>`,
  evid: [{app: "Report", title: "F-01 Contractor accounts not disabled at end of engagement", pre:
`<span class="b">CRITERIA</span>   PR.AA-05; AC-2 objectives AC-02f.[04], AC-02l.[01] —
           accounts disabled per defined procedure, aligned with
           termination. Org-defined window (agreed S2): 1 business day.
<span class="b">CONDITION</span>  6 of 9 contractor end dates in 2026-04→09 (all 9 tested)
           were outside the window: 4 disabled 6–41 calendar days
           late; 2 still enabled at fieldwork, one with a VPN logon
           19 days after its end date. Employees: 0 of 11 sampled.
<span class="b">CAUSE</span>      No approved procedure covers contractors (policy scope
           "employees"; procedure never approved). Contractor
           offboarding relies on untracked manager email.
<span class="b">EFFECT</span>     Former contractors retained usable directory/VPN access
           after their engagements ended; one instance referred to
           TAC's incident process for triage.
<span class="b">RECOMMEND</span>  Feed procurement end dates into the same automated
           disable path as HR; extend policy scope (F-02); interim
           weekly reconciliation; include non-SSO SaaS (Plovertrack).
<span class="b">FOLLOW-UP</span>  Untested: contractor accounts inside Plovertrack (CUEC).
<span class="c">— synthetic —</span>`},
  {app: "Register", title: "Findings summary", pre:
`F-01 Contractor deprovisioning ......... PR.AA-05  <span class="r">gap</span>
F-02 Access policy out of review ........ GV.PO-02  <span class="r">gap</span>
F-03 Hardware inventory incomplete ...... ID.AM-01  <span class="r">gap</span>
F-04 Scanner blind to non-CMDB devices;  ID.RA-01  <span class="hi">partial</span>  (cause: F-03 +
     no vuln response times defined                       scanner feed)
F-05 Supplier monitoring lapsed ......... GV.SC-07  <span class="hi">partial</span>
O-01 Personal devices on corporate Wi-Fi  (observation — outside ID.AM-01;
     refer to network/mobile-device owners)
<span class="c">— synthetic —</span>`}],
  nist: {csf: ["PR.AA-05"], sp: ["ac-2"], hl: ["AC-02f.[04]", "AC-02l.[01]"]},
  four: {
    cri: {t: "Each finding names its CSF outcome, the 800-53A objective labels tested, and the target line and organization-defined values agreed at S2.", prov: "inf"},
    src: {t: "Your workpapers: WP-AC2-01, WP-CM8-01, the document review notes, the interview notes, the supplier file.", prov: "syn"},
    suf: {t: "GAO: <b>sufficiency</b> is \"a measure of the quantity of evidence used to support the findings and conclusions…\". <b>Appropriateness</b> is \"the measure of the quality of evidence that encompasses the relevance, validity, and reliability of evidence…\". Check both for every finding. A finding states only what that evidence supports. Untested extensions (Plovertrack) go into a follow-up, not into the condition.", v: "ok", vt: "check each", prov: "fw"},
    ali: {t: "Five findings and one observation, each traced to an outcome. Cause links: F-04 → F-03; F-01 ↔ F-02 (policy scope).", v: "na", vt: "drafted", prov: "syn"}
  },
  owner: [{l: "How management reads a finding", t: "First they hunt for the sentence that blames a person. Write causes as <i>conditions of the system</i> (\"no approved procedure covers…\"), not people. You'll get a better management response."}],
  threat: {ctrl: "AC-02", note: "In the effect statement, name the exposure plainly (former contractors retain valid access). Don't speculate about an attacker the evidence hasn't shown."},
  bias: {name: "Severity creep", prov: "inf", trap: "The VPN logon makes F-01 feel like a breach, and the language escalates (\"compromised\").", ct: "Counter: the condition says what you observed. Triage is handling the logon. The finding doesn't claim an incident it hasn't established."},
  dec: {q: "Which sentence is a CAUSE, not a condition?", opts: [
    {t: "\"2 contractor accounts were still enabled at fieldwork.\"", ok: false, fb: "That's what exists, which makes it the condition."},
    {t: "\"Offboarding relies on untracked manager email; no approved procedure covers contractors.\"", ok: true, fb: "Right. That explains <i>why</i> the condition differs from the criteria, and the recommendation targets it."},
    {t: "\"Former contractors retained usable access after their engagements ended.\"", ok: false, fb: "That's the consequence, which makes it the effect."}
  ]},
  take: "Every finding needs criteria, condition, cause and effect. Write the cause as a property of the system, not a person, and aim the recommendation at the cause.",
  refs: [REF.gao, REF.yb]
},
/* ---------------- S11 RISK ---------------- */
{
  mod: "M7", life: 3, prof: 3, method: "Interview + Examine", depth: "basic", coverage: "basic", tier: "Current (judgment): Risk Informed (2)", cism: [2],
  title: "Rate the risk, and discover there's nothing to rate against",
  lead: {msg: "Before you call anything high risk: high compared with what? Show me the organization's appetite statement.", tag: "risk"},
  scene: `<p>You ask the CFO for the risk management strategy and the appetite statement (R10). There's a 2024 strategy slide deck with three objectives on it. There is no appetite or tolerance statement. The committee has never been asked for one.</p>`,
  evid: [{app: "Register", title: "risk-register-draft (qualitative; org-defined scale)", pre:
`<span class="b">ID   Risk statement                              L      I      Current*</span>
R-1  Former contractor access used to reach      Mod    High   High
     shipment data (F-01)
R-2  Uninventoried devices exploited unseen      Mod    Mod    Mod
     (F-03/F-04)
R-3  Vendor platform access persists — untested  Low    High   Mod
     (F-05/CUEC follow-up)
R-4  Policy no longer reflects operations (F-02) Mod    Low    Low
<span class="c">*Current = as observed, with today's (failing) controls; residual is rated
 after the POA&amp;M. Scale Low/Mod/High: org-defined, synthetic.</span>
<span class="c">"Within appetite?" → </span><span class="r">cannot answer</span>`}],
  concept: {lbl: "Why appetite comes first", prov: "fw", html: `CSF 2.0 <b>GV.RM-02</b> expects risk appetite and tolerance statements to be established, communicated and maintained. Its own implementation examples include turning appetite statements into measurable tolerance statements. PM-9's guidance says an organization-wide risk management strategy includes an expression of risk tolerance. <span class="prov inf">inference</span> Without one, there's no organizational threshold to compare a rating against.`},
  nist: {csf: ["GV.RM-02", "GV.RM-01"], sp: ["pm-9"], hl: ["PM-09a.01", "PM-09c."], showMethods: true},
  four: {
    cri: {t: "<b>GV.RM-02</b> (appetite and tolerance statements); <b>GV.RM-01</b> (objectives agreed by stakeholders); <b>PM-09a.01</b> (a comprehensive strategy is developed).", prov: "fw"},
    src: {t: "<b>Examine</b> the risk management strategy (a PM-9 examine object). <b>Interview</b> the people responsible for developing it, here the CFO.", prov: "fw"},
    suf: {t: "Sufficient to conclude the statements don't exist. Absence is confirmed by the owner and backed by a document search.", v: "ok", vt: "sufficient", prov: "syn"},
    ali: {t: "<b>GV.RM-02 → gap</b> (F-06). <b>GV.RM-01 → partial</b>: objectives exist, but the committee never agreed them. This becomes a <b>board decision</b>, not a management fix. <br><span class=\"prov inf\">judgment</span> <b>Tier read: Risk Informed (2).</b> CSWP 29's Tiers characterize how rigorous the governance and management practices are; they aren't computed from subcategory scores. The basis here: practices exist and are approved by management (the strategy deck, the access process for employees), but there's no board-set appetite, policies have lapsed, and the practices aren't consistent across populations (contractors). State that basis whenever you state the tier.", v: "bad", vt: "gap", prov: "syn"}
  },
  owner: [{l: "CFO's view", t: "\"We manage risk fine without a statement.\" Possibly, but then nobody can tell whether R-1 is acceptable. Offer a one-paragraph draft appetite statement for the committee to edit. Make the decision easy to take."}],
  threat: {ctrl: null, note: "Risk ratings here are qualitative and synthetic. Quantitative approaches (FAIR, for example) estimate frequency and magnitude. The Open FAIR body of knowledge is non-commercial licensed, so it's linked, not embedded."},
  bias: {name: "Availability (again)", prov: "inf", trap: "The peer ransomware event pushes every rating to High.", ct: "Counter: rate likelihood from <i>your</i> evidence (the conditions you observed), and record what drove each rating."},
  dec: {q: "R-1 is rated High. Can you tell the board it 'exceeds appetite'?", opts: [
    {t: "Yes. High always exceeds appetite.", ok: false, fb: "Says who? There's no appetite statement. That's your threshold, not the organization's."},
    {t: "No. Report that no appetite statement exists (F-06) and ask the committee to set one, so R-1 can be judged against it.", ok: true, fb: "Right. Turning a missing statement into a board decision is exactly what GV.RM-02 is about, and it answers the committee's question honestly."},
    {t: "Leave the risk ratings out of the report.", ok: false, fb: "The ratings still inform priority. Just don't claim a comparison against a threshold that doesn't exist."}
  ]},
  take: "Risk ratings need a threshold set by the organization. If there's no appetite statement, reporting that gap is the most useful finding you can give a board.",
  refs: [REF.csf, REF.oscal, REF.ir8286],
  fx: {prof: {"GV.RM-02": "g", "GV.RM-01": "p"}, close: ["q9"]}
},
/* ---------------- S12 POA&M ---------------- */
{
  mod: "M8", life: 4, prof: 3, method: "—", depth: "—", coverage: "—", tier: "Current (judgment): Risk Informed (2)", cism: [2, 3],
  title: "Build the POA&M: owners, milestones, and proof of closure",
  lead: {msg: "A POA&M line with no owner, no dates and no closure evidence is just a wish. And nobody closes a line by changing its status.", tag: "remediate"},
  concept: {lbl: "NIST's OSCAL POA&M model", prov: "fw", html: `NIST's example OSCAL POA&amp;M links each <b>risk</b> (title, description, statement, status, likelihood and impact, deadline) to <b>remediations</b> (a type such as <i>accept</i>, a lifecycle stage such as <i>planned</i>, and <b>milestone tasks</b> with dates). <b>CA-05a</b> asks for a POA&amp;M documenting planned remediation of weaknesses; <b>CA-05b</b> asks for it to be updated at an organization-defined frequency.`},
  evid: [{app: "POA&M", title: "poam-v1 (shape follows OSCAL)", pre:
`<span class="b">risk</span>   R-1 Former contractor access persists        status: open
       likelihood: moderate  impact: high          deadline: 2027-01-31
<span class="b">remed</span>  type: mitigate  lifecycle: planned
  M1 2026-10-23 interim: weekly reconcile procurement↔AD  owner: IT Ops
  M2 2026-11-30 procurement end-date feed → auto-disable  owner: IT + Proc
  M3 2026-12-15 Plovertrack: SSO or monthly access review owner: Biz owner
  M4 2027-01-31 retest AC-2 contractor stratum             owner: <span class="hi">independent assessor</span>
<span class="b">closure</span> evidence = retest WP with 0 exceptions, not a status change

<span class="b">risk</span>   R-4 Policy out of review (F-02)              status: open
<span class="b">remed</span>  type: mitigate  M1 2026-12-01 revise ISP-04 scope incl.
       contractors; approve by named official (AC-01b); set review
       frequency (AC-01c ODP)
<span class="c">— synthetic —</span>`},
  {app: "Sheet", title: "TAC's own improvement tracker (pre-existing, from a 2025 pen test)", pre:
`items 8 · closed with evidence 3 · open with dates 0 · <span class="r">open, no dates 5</span>
last updated 2025-11-20 · no owner column
<span class="c">— synthetic — this, not your new POA&amp;M, is the basis for rating ID.IM-01</span>`}],
  nist: {csf: ["ID.IM-01"], sp: ["ca-5"], hl: ["CA-05a.", "CA-05b."], showMethods: true},
  four: {
    cri: {t: "<b>ID.IM-01</b>: improvements are identified from evaluations. <b>CA-05a / CA-05b</b>: a POA&amp;M is developed, then updated at the organization-defined frequency.", prov: "fw"},
    src: {t: "<b>Examine</b> TAC's existing improvement tracker (the plan of action and milestones is a CA-5 examine object). Management owns and agrees the new POA&amp;M lines; you check them for completeness.", prov: "inf"},
    suf: {t: "Rate ID.IM-01 on <i>TAC's own</i> practice, not on the POA&amp;M you helped draft. Rating your own work product is a self-review threat. Their tracker identifies improvements (3 closed with evidence) but has no owners or dates for 5 items and hasn't been updated in roughly 11 months. The CA-5b frequency (monthly, agreed at S2) isn't being met.", v: "ok", vt: "sufficient", prov: "inf"},
    ali: {t: "<b>ID.IM-01 → partial</b>, based on the pre-existing tracker. The new POA&amp;M is management's, and it's the vehicle for fixing this. Interim compensating action for R-1: the weekly reconciliation.", v: "more", vt: "partial", prov: "syn"}
  },
  owner: [{l: "Owner pushback", t: "\"Can we mark M1 done once the script exists?\" Pushback: done means the reconciliation <i>ran</i> and produced output. Closure evidence is an artifact, not an intention."}],
  threat: {ctrl: null, note: "The interim control (a weekly reconciliation) narrows the exposure window for valid-account misuse while the permanent fix is built."},
  bias: {name: "Closure optimism", prov: "inf", trap: "The owner updates the status to \"closed\" and the tracker turns green.", ct: "Counter: the closing milestone is the assessor's retest. Closure evidence is named on the line, in advance."},
  dec: {q: "Management proposes to ACCEPT the risk behind O-01 (personal devices on corporate Wi-Fi) until next year's network segmentation project. Your role?", opts: [
    {t: "Refuse. Risk acceptance isn't allowed.", ok: false, fb: "Acceptance is a legitimate remediation type. NIST's own OSCAL POA&amp;M example shows an accepted risk with a deadline."},
    {t: "Make sure the acceptance is made by someone with authority, recorded with a deadline and a rationale, and checked against the appetite statement once one exists.", ok: true, fb: "Right. Your job is that the decision is informed, recorded and owned, not that you agree with it."},
    {t: "Accept it on their behalf so the POA&amp;M looks complete.", ok: false, fb: "Assessors don't accept risk. That breaks the independence everything else rests on."}
  ]},
  take: "Every POA&M line needs an owner, dated milestones and named closure evidence. Accepting a risk is a valid choice when someone with authority makes it, records it and sets a deadline.",
  refs: [REF.poamEx, REF.fedramp, REF.oscal],
  fx: {prof: {"ID.IM-01": "p"}, close: ["q10"]}
},
/* ---------------- S13 BOARD REPORT ---------------- */
{
  mod: "M9", life: 5, prof: 4, method: "—", depth: "—", coverage: "—", tier: "Current (judgment): Risk Informed (2) · Target: Repeatable (3)", cism: [1, 3],
  title: "Answer the board in one page",
  lead: {msg: "The committee asked one question. Answer it in the first sentence. Then give them three decisions, not thirty findings.", tag: "report"},
  scene: `<p>Executive audiences need risk in business terms and a clear ask. The technical register goes in an appendix for management.</p>`,
  evid: [{app: "Memo", title: "Audit & Risk Committee — CSF 2.0 alignment (one page)", pre:
`<span class="b">ANSWER</span>  Partially aligned. Of 10 CSF 2.0 outcomes in agreed scope
        (of 106 in the framework): 0 fully meet, 6 partial, 4 gaps.
        Tier read (assessor judgment): Risk Informed (2);
        target: Repeatable (3).
<span class="b">MOST IMPORTANT</span>
  1. Former contractors kept access to our network after leaving
     (6 of 9 tested). Interim weekly check started; automated fix by
     Nov 30. Whether this extends into a key vendor platform is
     being tested.
  2. About 1 in 10 devices on our networks isn't in the inventory,
     so the vulnerability scanner never looks at it. Fix: one
     reconciled inventory, and point the scanner at it, by Q1.
  3. <span class="hi">No board-approved risk appetite exists</span> — so we cannot tell
     you which risks are acceptable.
<span class="b">DECISIONS ASKED</span>
  A. Approve a risk appetite statement (draft attached).
  B. Fund inventory + identity automation in the January budget.
  C. Agree semi-annual reporting on 3 metrics (below).
<span class="b">METRICS</span> contractor accounts disabled within the agreed window ·
        inventory variance · POA&amp;M items past due
<span class="b">LIMITS</span>  10 of 106 outcomes; evidence period Apr–Sep 2026. Not
        assessed: Detect, Respond, Recover; Protect only via access
        (PR.AA-05). Contract-clause fulfilment (GV.OC-03) not tested.
        Independent consultant; populations from HR/procurement.
<span class="c">— synthetic —</span>`}],
  concept: {lbl: "Rolling cyber risk up to the enterprise", prov: "inf", html: `Paraphrased. NIST IR 8286 Rev. 1 and IR 8286C Rev. 1 (2025) address integrating cybersecurity risk into enterprise risk management, including rolling cyber risk information up to enterprise level for governance oversight. Read them for the method. <b>CA-7</b> (continuous monitoring) asks for organization-defined metrics, monitoring frequencies, and reporting of security status to organization-defined roles. It's written at <i>system</i> level, so using its structure for board metrics is an adaptation, not a requirement.`},
  nist: {csf: ["GV.OV-01"], sp: ["ca-7"], hl: ["CA-07a.", "CA-07g.[01]"], showMethods: false},
  four: {
    cri: {t: "<b>GV.OV-01</b>: strategy outcomes reviewed to inform and adjust direction. <b>CA-07a / CA-07g.[01]</b>: metrics defined; status reported to defined roles at a defined frequency.", prov: "fw"},
    /* pairing GV.OV-01 → CA-7 is a trainer selection */
    src: {t: "Your findings register, the risk register and the POA&amp;M, compressed for this audience.", prov: "syn"},
    suf: {t: "Each claim on the page traces to a finding and a workpaper. The <b>limits</b> line is mandatory: it stops \"partially aligned\" being read as covering more than you tested.", v: "ok", vt: "traceable", prov: "inf"},
    ali: {t: "<b>GV.OV-01 → partial</b>, rated on TAC's existing oversight, not on this engagement. The committee minutes show a yearly cyber agenda item (synthetic), but no review of outcomes against strategy. Approving decision C makes that review recurring.", v: "more", vt: "partial", prov: "syn"}
  },
  owner: [{l: "CEO's request", t: "\"Can we lead with the positives?\" You can mention what works. You can't bury the answer. The committee asked about alignment; the first line answers that."}],
  threat: {ctrl: "CA-07", note: "Continuous monitoring is where governance meets detection. CTID maps CA-7 to <b>T1078</b>, <b>T1562 Impair Defenses</b> and <b>T1567 Exfiltration Over Web Service</b>, among many others."},
  bias: {name: "Audience softening", prov: "inf", trap: "Rounding \"4 gaps\" into \"some opportunities\" because it's the board.", ct: "Counter: plain words, a limits line, and decisions they can actually take. Softened language makes it harder for them to decide."},
  dec: {q: "Which first sentence answers the committee's question?", opts: [
    {t: "\"Our security program has matured significantly this year.\"", ok: false, fb: "That doesn't answer \"are we aligned?\" and nothing in your evidence supports it."},
    {t: "\"Partially aligned: of the 10 outcomes we agreed to assess, none fully meets, 6 are partial and 4 are gaps. Three decisions would close the most important ones.\"", ok: true, fb: "Right. Answer, scope, then the ask. Everything else supports that sentence."},
    {t: "\"We identified 5 findings across PR.AA-05, GV.PO-02, ID.AM-01…\"", ok: false, fb: "Subcategory IDs are for the appendix. The committee needs the answer and the decisions."}
  ]},
  take: "Lead with the answer, state what you tested and what you didn't, and give decisions the board can take. Put the technical detail in an appendix.",
  refs: [REF.ir8286, REF.oscal, REF.csf],
  fx: {prof: {"GV.OV-01": "p"}, close: ["q11"]}
},
/* ---------------- S14 DEBRIEF ---------------- */
{
  mod: "Debrief", life: 6, prof: 4, method: "—", depth: "—", coverage: "—", tier: "Current (judgment): Risk Informed (2) · Target: Repeatable (3)", cism: [1, 2, 3, 4],
  title: "Debrief: the four questions, every time",
  lead: {msg: "Same four questions on every engagement, whatever the framework. Say them back to me.", tag: "debrief"},
  scene: `<table class="mini"><tr><th>Question</th><th>What answered it here</th></tr>
<tr><td><b>What am I looking for?</b> (criteria)</td><td>The CSF outcome text plus the 800-53A objective labels, both verbatim from NIST, plus the target line agreed at S2.</td></tr>
<tr><td><b>Where am I looking?</b> (source)</td><td>800-53A's own assessment objects for examine, interview and test. Populations come from systems of record, never from the control owner.</td></tr>
<tr><td><b>How do I know it's what I need?</b> (sufficiency)</td><td>GAO: <i>sufficiency</i> = quantity; <i>appropriateness</i> = relevance, validity, reliability. NIST: depth and coverage. Corroborate testimony.</td></tr>
<tr><td><b>How do I align it?</b> (alignment)</td><td>A finding with criteria, condition, cause and effect, then a risk rating against an appetite, then a POA&amp;M with owners, milestones and closure evidence, then the decision the board takes.</td></tr></table>
<p><b>Bias watchlist from this case:</b> recency, scope drift, copy-paste targets, "it exists so it works," narrative capture, convenience sourcing, anchoring on the good stratum, population trust, metric comfort, halo effect, severity creep, closure optimism, audience softening. <b>Plus one threat that isn't a bias:</b> self-review. Rate the organization's own practices, never the work product you helped write.</p>
<p><b>CISM (2026-11-03 outline):</b> this case leaned on D3 Program (testing, evaluation, external services), D2 Risk, and D1 Governance. D4 Incident Management appeared at the S6 escalation (plus the S7 unknown-device referral), which is the handoff to the <a href="https://github.com/grumby42/dfir-trainers">dfir-trainers</a> side.</p>
<p><b>Next:</b> run the exercise generator, then fill in the workpaper log for one control at your own organization or lab (see <code>LAB.md</code>).</p>`,
  nist: null,
  four: null,
  dec: null,
  take: "Name the decision the work informs. Test against verbatim criteria. Source evidence independently. Write findings with all four elements. Tie risk to an appetite. Prove every closure.",
  refs: [REF.csf, REF.a53, REF.gao, REF.cism]
}
];

/* Workpaper example rows (synthetic) for the log */
const LOG_EXAMPLE = [
  {ctrl: "AC-2", csf: "PR.AA-05", req: "Accounts disabled per procedure; aligned with termination (AC-02f.[04], AC-02l.[01])", method: "T", depth: "focused", coverage: "basic + focused", objects: "HR separations (R05); procurement end-dates (R06); AD disable timestamps", role: "IT Ops Mgr", evref: "WP-AC2-01", period: "2026-04-01..2026-09-30", result: "exception", exception: "6/9 contractors late or still enabled; 0/11 employees", finding: "F-01", likelihood: "moderate", impact: "high", residual: "low", status: "open", rtype: "mitigate", owner: "IT Ops + Procurement", milestone: "2026-11-30 auto-disable feed", closure: "Retest contractor stratum: 0 exceptions"},
  {ctrl: "CM-8", csf: "ID.AM-01", req: "Inventory includes all components (CM-08a.02)", method: "T", depth: "focused", coverage: "full reconcile", objects: "CMDB export; DHCP/NAC 30d", role: "Infra lead", evref: "WP-CM8-01", period: "2026-09", result: "exception", exception: "70 in-boundary devices not inventoried (9 personal phones → O-01)", finding: "F-03", likelihood: "moderate", impact: "moderate", residual: "low", status: "open", rtype: "mitigate", owner: "Infra", milestone: "2027-03-31 single reconciled inventory", closure: "Re-reconcile: variance under agreed tolerance"}
];

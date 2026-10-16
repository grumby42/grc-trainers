/* ===== WORKPAPER LOG =====
   Fixed schema; the risk/remediation fields follow NIST's OSCAL POA&M model
   (likelihood/impact facets, status, remediation type, milestone tasks). */

const LOG_FIELDS = [
  {id: "ctrl", l: "Control ID (800-53 / other)", ph: "AC-2"},
  {id: "csf", l: "CSF 2.0 outcome", ph: "PR.AA-05", list: () => Object.keys(DATA.csf)},
  {id: "req", l: "Requirement / objective labels tested", ph: "AC-02f.[04], AC-02l.[01]", full: true},
  {id: "method", l: "Method", opts: ["E", "I", "T", "E+I", "E+T", "I+T", "E+I+T"]},
  {id: "depth", l: "Depth", opts: ["basic", "focused", "comprehensive"]},
  {id: "coverage", l: "Coverage", opts: ["basic", "focused", "sufficiently large", "basic + focused", "full reconcile"]},
  {id: "objects", l: "Assessment objects / populations", ph: "HR separations; AD export", full: true},
  {id: "role", l: "Interviewee role (no names in shared logs)", ph: "IT Ops Mgr"},
  {id: "evref", l: "Evidence / workpaper ref", ph: "WP-AC2-01"},
  {id: "period", l: "Evidence period", ph: "2026-04-01..2026-09-30"},
  {id: "result", l: "Result", opts: ["meets", "exception", "not tested", "n/a"]},
  {id: "exception", l: "Exception detail (condition)", ph: "6/9 contractor stratum", full: true},
  {id: "finding", l: "Finding ID", ph: "F-01"},
  {id: "likelihood", l: "Current likelihood (as observed; org scale)", opts: ["", "low", "moderate", "high"]},
  {id: "impact", l: "Current impact (org scale)", opts: ["", "low", "moderate", "high"]},
  {id: "residual", l: "Target residual rating (after remediation)", opts: ["", "low", "moderate", "high"]},
  {id: "status", l: "Risk status", opts: ["", "open", "investigating", "remediating", "deviation-requested", "deviation-approved", "closed"]},
  {id: "rtype", l: "Remediation type (OSCAL)", opts: ["", "mitigate", "accept", "transfer", "avoid", "share", "contingency"]},
  {id: "owner", l: "Remediation owner (role)", ph: "IT Ops + Procurement"},
  {id: "milestone", l: "Next milestone (date + task)", ph: "2026-11-30 auto-disable feed"},
  {id: "closure", l: "Closure evidence required", ph: "Retest: 0 exceptions", full: true}
];
let LOG = [];
try { LOG = JSON.parse(localStorage.getItem("grct-csf-log") || "[]"); } catch (e) { LOG = []; }
const saveLog = () => { try { localStorage.setItem("grct-csf-log", JSON.stringify(LOG)); } catch (e) { /* storage unavailable: in-memory only */ } };

function renderLogForm() {
  $("logForm").innerHTML = LOG_FIELDS.map(f => {
    let ctl;
    if (f.opts) ctl = `<select id="f_${f.id}">${f.opts.map(o => `<option>${esc(o)}</option>`).join("")}</select>`;
    else ctl = `<input id="f_${f.id}" placeholder="${esc(f.ph || "")}" ${f.list ? `list="dl_${f.id}"` : ""}>${f.list ? `<datalist id="dl_${f.id}">${f.list().map(o => `<option value="${esc(o)}">`).join("")}</datalist>` : ""}`;
    return `<div class="${f.full ? "full" : ""}"><label for="f_${f.id}">${esc(f.l)}</label>${ctl}</div>`;
  }).join("");
}
function renderLogTable() {
  const host = $("logTableHost");
  if (!LOG.length) { host.innerHTML = `<div class="emptyrow">No rows yet. Add one above, or load the walkthrough example.</div>`; return; }
  const cols = ["ctrl", "csf", "method", "depth", "coverage", "result", "finding", "likelihood", "impact", "status", "rtype", "milestone"];
  host.innerHTML = `<table class="tbl"><tr>${cols.map(c => `<th>${esc(c)}</th>`).join("")}<th></th></tr>${LOG.map((r, k) => `<tr>${cols.map(c => `<td>${esc(r[c])}</td>`).join("")}<td><button class="btn sm ghost" data-del="${k}">✕</button></td></tr>`).join("")}</table>`;
  host.querySelectorAll("[data-del]").forEach(b => b.onclick = () => { LOG.splice(+b.dataset.del, 1); saveLog(); renderLogTable(); });
}
function download(name, text, type) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([text], {type}));
  a.download = name; document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 0);
}
$("logAdd").onclick = () => {
  const r = {}; LOG_FIELDS.forEach(f => r[f.id] = $("f_" + f.id).value.trim());
  if (!r.ctrl) { $("f_ctrl").focus(); return; }
  LOG.push(r); saveLog(); renderLogTable();
};
$("logExample").onclick = () => { LOG = LOG.concat(JSON.parse(JSON.stringify(LOG_EXAMPLE))); saveLog(); renderLogTable(); };
$("logClear").onclick = () => { if (confirm("Clear all workpaper rows?")) { LOG = []; saveLog(); renderLogTable(); } };
$("logJson").onclick = () => download("workpapers.json", JSON.stringify({schema: "grct-workpaper-v1", build: BUILD_ID, exported_utc: new Date().toISOString(), rows: LOG}, null, 2), "application/json");
$("logTsv").onclick = () => {
  const clean = v => String(v || "").replace(/[\t\r\n]+/g, " ");
  const rows = [LOG_FIELDS.map(f => f.id).join("\t"), ...LOG.map(r => LOG_FIELDS.map(f => clean(r[f.id])).join("\t"))];
  download("workpapers.tsv", rows.join("\n"), "text/tab-separated-values");
};

/* ===== ABOUT ===== */
function renderAbout() {
  const p = DATA.provenance;
  $("aboutHost").innerHTML = `
  <h2 style="margin-top:0">About this trainer</h2>
  <p><b>Credits first.</b> The framework and assessment content belongs to the people who wrote it: <b>NIST</b> (CSF 2.0; SP 800-53 Rev 5.2.0 and SP 800-53A, published as OSCAL by the NIST OSCAL team), <b>the U.S. GAO</b> (Yellow Book definitions of the elements of a finding and of evidence), and <b>MITRE's Center for Threat-Informed Defense</b> (Mappings Explorer, 800-53 ↔ ATT&amp;CK). Practitioner sources are linked, not reproduced: ISACA Journal, IIA, Linford &amp; Co, Bitsight, AICPA.</p>
  <p><b>Not affiliated with, sponsored by, or endorsed by</b> NIST, GAO, MITRE, ISACA, ISC2, IIA, AICPA, Linford &amp; Co, Bitsight, or any organization named here. <b>${esc(ORG)}</b> and everyone in it are fictional. Every document, account, number and conversation is synthetic. This is training, not audit or legal advice.</p>
  <h3>Embedded data (license-compatible, baked in at build time; nothing fetched at runtime)</h3>
  <table class="mini">
    <tr><th>Source</th><th>Version / commit</th><th>License</th></tr>
    <tr><td>${esc(p.sp80053_catalog)}</td><td>oscal-content ${esc(p.oscal_content_commit)}</td><td>${esc(p.oscal_license)}</td></tr>
    <tr><td>${esc(p.csf_catalog)}</td><td>oscal-content ${esc(p.oscal_content_commit)}</td><td>${esc(p.oscal_license)}</td></tr>
    <tr><td>CTID Mappings Explorer — 800-53 Rev 5 ↔ ATT&amp;CK ${esc(p.ctid_attack_version)} enterprise (last update ${esc(p.ctid_last_update)})</td><td>mappings-explorer ${esc(p.ctid_commit)}</td><td>${esc(p.ctid_license)}</td></tr>
    <tr><td>GAO Yellow Book glossary definitions (quoted)</td><td>gaoinnovations.gov glossary</td><td>U.S. Government work, not subject to U.S. copyright</td></tr>
  </table>
  <h3>MITRE ATT&amp;CK® notice</h3>
  <p style="font-size:12.5px">"© 2026 The MITRE Corporation. This work is reproduced and distributed with the permission of The MITRE Corporation."</p>
  <p style="font-size:12.5px">The MITRE Corporation (MITRE) hereby grants you a non-exclusive, royalty-free license to use ATT&amp;CK® for research, development, and commercial purposes. Any copy you make for such purposes is authorized provided that you reproduce MITRE's copyright designation and this license in any such copy.</p>
  <p style="font-size:12px;color:var(--muted)">MITRE ATT&amp;CK and ATT&amp;CK are registered trademarks of The MITRE Corporation. ATT&amp;CK is provided "AS IS"; see MITRE's <a href="https://attack.mitre.org/resources/legal-and-branding/terms-of-use/" target="_blank" rel="noopener">Terms of Use</a> for the full disclaimers (also reproduced in THIRD_PARTY_NOTICES.md).</p>
  <h3>What is <i>not</i> verified here</h3>
  <ul style="font-size:13.5px">
    <li><b>CSF 2.0 ↔ 800-53 pairings</b> are trainer selections. NIST's official mapping (OLIR #186) wasn't reachable from the build environment. Verify each pairing at <a href="https://csrc.nist.gov/projects/olir/informative-reference-catalog/details?referenceId=186#/" target="_blank" rel="noopener">OLIR #186</a>.</li>
    <li><b>Sample sizes</b> in the case are this engagement's choice. NIST defines coverage levels, not counts.</li>
    <li><b>SOC 2 reading guidance</b> comes from practitioner sources. AICPA DC 200, the primary source, needs a free account and wasn't read for this build.</li>
    <li><b>CISM tags</b> use the outline effective 2026-11-03, verified at domain level (weights 18/20/33/29). Subtopic placement is pending ISACA publishing the detailed outline.</li>
  </ul>
  <h3>Build</h3>
  <div class="stamp">BUILD_ID ${esc(BUILD_ID)}<br>STAMP_UTC ${esc(STAMP_UTC)}<br>Spec: grc-trainers/TRAINER_SPEC.md · License: MIT (trainer code and original content). Third-party notices: THIRD_PARTY_NOTICES.md</div>`;
}

/* ===== BOOT ===== */
$("stampBox").innerHTML = `${esc(BUILD_ID)}<br>${esc(STAMP_UTC)}<br>NIST OSCAL ${esc(DATA.provenance.oscal_content_commit)}<br>CTID ${esc(DATA.provenance.ctid_commit)}`;
renderLogForm(); renderLogTable(); render();

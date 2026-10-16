/* ===== APP ===== */
const $ = id => document.getElementById(id);
const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"}[c]));
const PROV = {fw: ["fw", "framework text"], oc: ["oc", "outline / course"], inf: ["inf", "inference"], syn: ["syn", "synthetic"]};
const prov = p => p && PROV[p] ? `<span class="prov ${PROV[p][0]}">${PROV[p][1]}</span>` : "";
const shuffle = a => { const b = a.slice(); for (let k = b.length - 1; k > 0; k--) { const j = Math.floor(Math.random() * (k + 1)); [b[k], b[j]] = [b[j], b[k]]; } return b; };
const pick = a => a[Math.floor(Math.random() * a.length)];
const ctrlByLabel = lab => Object.values(DATA.sp80053).find(c => c.id === lab);

let i = 0, view = "assessor", prevMeters = null;

/* ---------- NIST panel (verbatim from OSCAL) ---------- */
function nistPanel(n) {
  if (!n || (!n.csf.length && !n.sp.length)) return "";
  const hl = new Set(n.hl || []);
  const parts = [];
  n.csf.forEach(id => {
    const c = DATA.csf[id]; if (!c) return;
    parts.push(`<div class="stmt"><span class="ol">${esc(id)}</span>${esc(c.text)}</div>`);
    if (c.examples.length) parts.push(`<div class="mh">CSF 2.0 implementation examples (first 3 of ${c.examples.length})</div><ul>${c.examples.slice(0, 3).map(e => `<li>${esc(e)}</li>`).join("")}</ul>`);
  });
  n.sp.forEach(key => {
    const c = DATA.sp80053[key]; if (!c) return;
    parts.push(`<div class="mh" style="margin-top:14px">SP 800-53 Rev 5.2.0 — ${esc(c.id)} ${esc(c.title)} · control statement</div>`);
    c.statement.forEach(s => parts.push(`<div class="stmt" style="padding-left:${s.depth * 10}px"><span class="ol">${esc(s.label)}</span>${esc(s.text)}</div>`));
    const objs = c.objectives.filter(o => o.label && o.label !== c.id || c.objectives.length === 1);
    parts.push(`<div class="mh">SP 800-53A assessment objectives — determine if…</div>`);
    objs.forEach(o => parts.push(`<div class="obj ${hl.has(o.label) ? "hl" : ""}"><span class="ol">${esc(o.label)}</span>${esc(o.text)}</div>`));
    if (n.showMethods) {
      ["EXAMINE", "INTERVIEW", "TEST"].forEach(m => {
        if (c.methods[m]) parts.push(`<div class="mh">${m} — assessment objects</div><ul>${c.methods[m].map(x => `<li>${esc(x)}</li>`).join("")}</ul>`);
      });
    }
  });
  const label = [...n.csf.map(x => "CSF " + x), ...n.sp.map(k => DATA.sp80053[k] ? DATA.sp80053[k].id : k)].join(" · ");
  return `<details class="nist" ${n.open ? "open" : ""}><summary>NIST text — ${esc(label)} <span class="prov fw">verbatim · OSCAL</span></summary><div class="nb">${parts.join("")}<div class="refs" style="margin-top:10px">Source: NIST OSCAL content ${esc(DATA.provenance.oscal_content_commit)} — ${esc(DATA.provenance.sp80053_catalog)}; ${esc(DATA.provenance.csf_catalog)}. Highlighted = objectives this step tests. CSF ↔ 800-53 pairing is a trainer selection; verify against NIST OLIR #186.</div></div></details>`;
}

/* ---------- meters ---------- */
function pips(n, cur) { let h = ""; for (let k = 0; k < n; k++) h += `<i class="${k < cur ? "on" : k === cur ? "cur" : ""}"></i>`; return `<div class="pips">${h}</div>`; }
function renderMeters(t) {
  const m = {
    "Engagement lifecycle": [LIFE[t.life], pips(LIFE.length, t.life)],
    "CSF Profile step": [PROFILE[t.prof], pips(PROFILE.length, t.prof)],
    "Assessment method": [t.method, ""],
    "Depth": [t.depth, ""],
    "Coverage": [t.coverage, ""],
    "Tier read": [t.tier, ""]
  };
  $("fwstrip").innerHTML = Object.entries(m).map(([k, v]) => {
    const ch = prevMeters && prevMeters[k] !== v[0];
    return `<div class="fw ${ch ? "changed" : ""}"><div class="k">${k}</div><div class="v">${esc(v[0])}</div>${v[1]}</div>`;
  }).join("");
  prevMeters = Object.fromEntries(Object.entries(m).map(([k, v]) => [k, v[0]]));
}

/* ---------- rail ---------- */
function stateAt(idx) {
  const prof = {}, open = new Set(), closed = new Set(), cism = new Set();
  PROFILE_ROWS.forEach(r => prof[r] = "u");
  for (let k = 0; k <= idx; k++) {
    const fx = S[k].fx || {};
    Object.assign(prof, fx.prof || {});
    (fx.open || []).forEach(q => open.add(q));
    (fx.close || []).forEach(q => { closed.add(q); open.add(q); });
    (S[k].cism || []).forEach(d => cism.add(d));
  }
  return {prof, open, closed, cism};
}
function renderRail() {
  const st = stateAt(i);
  const lab = {u: ["u", "not assessed"], p: ["p", "partial"], g: ["g", "gap"], m: ["m", "meets"]};
  $("profTbl").innerHTML = PROFILE_ROWS.map(r => {
    const s = lab[st.prof[r]];
    return `<tr><td class="id">${r}</td><td>${esc((DATA.csf[r] || {}).text || "").slice(0, 70)}…</td><td><span class="st ${s[0]}">${s[1]}</span></td></tr>`;
  }).join("");
  const shown = QS.filter(q => st.open.has(q.id));
  $("qs").innerHTML = shown.length ? shown.map(q => `<li class="${st.closed.has(q.id) ? "closed" : ""}"><span>${st.closed.has(q.id) ? "✓" : "●"}</span><span>${esc(q.t)}</span></li>`).join("") : `<li>None yet. Intake first.</li>`;
  const names = {1: "D1 Gov 18%", 2: "D2 Risk 20%", 3: "D3 Prog 33%", 4: "D4 IM 29%"};
  $("cismbar").innerHTML = [1, 2, 3, 4].map(d => `<div class="${st.cism.has(d) ? "on" : ""}">${names[d]}</div>`).join("");
}

/* ---------- step body ---------- */
function reasonPanel(f, n) {
  if (!f) return "";
  const paired = n && n.csf && n.sp && n.csf.length && n.sp.length;
  const row = (cls, name, q, x, extra) => `<div class="rrow"><div class="lbl ${cls}">${name} <span style="text-transform:none;letter-spacing:0;font-weight:500;color:var(--faint)">— ${q}</span>${x.v ? `<span class="verdict ${x.v}">${esc(x.vt || "")}</span>` : ""}${prov(x.prov)}${extra || ""}</div><div class="txt">${x.t}</div></div>`;
  const pairChip = paired ? `<span class="prov inf" title="The CSF outcome and 800-53 text are verbatim NIST; pairing them is a trainer selection. Verify at NIST OLIR #186.">pairing: inference</span>` : "";
  return `<div class="reason"><div class="rh">Assessor reasoning — the four questions</div><div class="rb">
    ${row("cri", "Criteria", "what am I looking for?", f.cri, pairChip)}
    ${row("src", "Source", "where am I looking for it?", f.src)}
    ${row("suf", "Sufficiency", "how do I know it's what I need?", f.suf)}
    ${row("ali", "Alignment", "how do I make it conform?", f.ali)}
  </div></div>`;
}
function ownerPanel(o) {
  if (!o) return "";
  return `<div class="ownpanel"><div class="ah">Control Owner view — plausible perspective, not a script ${prov("inf")}</div><div class="ab">${o.map(r => `<div class="arow"><div class="lbl">${esc(r.l)}</div><div class="txt">${r.t}</div></div>`).join("")}</div></div>`;
}
function threatPanel(th) {
  if (!th) return "";
  let body = `<div class="arow"><div class="lbl">Why it matters here ${prov("inf")}</div><div class="txt">${th.note}</div></div>`;
  const a = th.ctrl && DATA.attack[th.ctrl];
  if (a && a.sample.length) {
    body += `<div class="arow"><div class="lbl">CTID: ${esc(th.ctrl)} is mapped as mitigating ${a.total_parent_techniques} parent ATT&amp;CK techniques (Enterprise v${esc(DATA.provenance.ctid_attack_version)}). A selection follows. <span class="prov fw">CTID · Apache-2.0</span></div><div class="txt">${a.sample.map(t => `<div style="margin:7px 0"><span class="tech">${esc(t.id)}</span> <b>${esc(t.name)}</b>${t.rationale ? `<div style="font-size:12px;color:var(--faint);margin-top:2px">CTID note: ${esc(t.rationale)}</div>` : ""}</div>`).join("")}<div style="font-size:11.5px;color:var(--faint);margin-top:6px">Why each pairing holds: CTID publishes the mapping; for most entries in this dataset, no per-entry rationale text is given. See the CTID Mappings Explorer for methodology.</div></div></div>`;
  } else if (th.ctrl === null) {
    body += `<div class="arow"><div class="lbl">CTID mapping</div><div class="txt">No control-to-technique mapping applies to this step. Governance controls (PM-9, CA-5, SR-6, AC-1) have no CTID technique mappings; they work <i>through</i> operational controls.</div></div>`;
  }
  return `<div class="thrpanel"><div class="ah">Threat lens — would this control interrupt real behavior?</div><div class="ab">${body}</div></div>`;
}
function gatePanel(g) {
  if (!g) return "";
  return `<div class="gate"><h4>Competing-explanations gate ${prov("inf")}</h4><div style="font-size:12.5px;margin-bottom:6px">${esc(g.q)}. Seek <i>disconfirming</i> evidence for each explanation.</div><table><tr><th>Explanation</th><th>Supports</th><th>Contradicts</th></tr>${g.rows.map(r => `<tr><td class="${r[3] ? "w" : ""}">${r[0]}${r[3] ? " ← best supported" : ""}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join("")}</table></div>`;
}
function decisionPanel(d, si) {
  if (!d) return "";
  const opts = d.opts.map((o, k) => `<button class="opt" data-k="${k}" data-s="${si}">${o.t}<span class="mk"></span></button>`).join("");
  return `<div class="decision"><div class="q">Decision: ${d.q}</div>${opts}<div class="fb" id="fb${si}"></div></div>`;
}
function render() {
  const t = S[i];
  $("prog").style.width = ((i + 1) / S.length * 100) + "%";
  $("phase").innerHTML = `${esc(t.mod)} · ${esc(LIFE[t.life])}<span class="cism">CISM ${t.cism.map(d => "D" + d).join(" · ")}</span>`;
  $("title").textContent = t.title;
  let h = "";
  if (t.lead) h += `<div class="lead"><div class="ava">${LEAD.init}</div><div><div class="who">${LEAD.name} <span class="role">· ${LEAD.role}</span><span class="tag">${esc(t.lead.tag)}</span>${prov("syn")}</div><div class="msg">${t.lead.msg}</div></div></div>`;
  if (t.scene) h += `<div class="scene">${t.scene}</div>`;
  if (t.concept) h += `<div class="newconcept"><div class="lbl">${esc(t.concept.lbl)} ${prov(t.concept.prov)}</div><div style="font-size:13.5px;margin-top:3px">${t.concept.html}</div></div>`;
  if (t.evid) h += `<div class="workspace">${t.evid.map(e => `<div class="win"><div class="bar"><span class="app"><b>${esc(e.app)}</b> · ${esc(e.title)}</span>${prov("syn")}</div><pre>${e.pre}</pre></div>`).join("")}</div>`;
  if (view === "assessor") h += reasonPanel(t.four, t.nist);
  if (view === "owner") h += ownerPanel(t.owner) || "";
  if (view === "threat") h += threatPanel(t.threat) || "";
  h += nistPanel(t.nist);
  h += gatePanel(t.gate);
  if (t.bias) h += `<div class="bias"><h4>Bias check — ${esc(t.bias.name)} ${prov(t.bias.prov)}</h4><p>${t.bias.trap}</p><p class="ct">${t.bias.ct}</p></div>`;
  h += decisionPanel(t.dec, i);
  if (t.take) h += `<div class="take"><h4>Takeaway</h4><p>${t.take}</p></div>`;
  if (t.refs && t.refs.length) h += `<div class="refs">Sources: ${t.refs.map(r => `<a href="${esc(r.u)}" target="_blank" rel="noopener">${esc(r.t)}</a>`).join(" · ")}</div>`;
  $("body").innerHTML = h;
  $("prev").disabled = i === 0;
  $("next").disabled = i === S.length - 1;
  $("stepNo").textContent = `${i + 1} / ${S.length} · ← → keys`;
  renderMeters(t);
  renderRail();
}
document.addEventListener("click", e => {
  const b = e.target.closest(".opt[data-s]"); if (!b) return;
  const si = +b.dataset.s, k = +b.dataset.k, d = S[si].dec, o = d.opts[k];
  b.parentElement.querySelectorAll(".opt").forEach((x, kk) => { x.classList.remove("correct", "wrong"); if (d.opts[kk].ok) x.classList.add("correct"); x.querySelector(".mk").textContent = d.opts[kk].ok ? "✓" : ""; });
  if (!o.ok) { b.classList.add("wrong"); b.querySelector(".mk").textContent = "✗"; }
  const fb = $("fb" + si); fb.className = "fb show " + (o.ok ? "ok" : "no"); fb.innerHTML = o.fb;
});
$("prev").onclick = () => { if (i > 0) { i--; render(); window.scrollTo(0, 0); } };
$("next").onclick = () => { if (i < S.length - 1) { i++; render(); window.scrollTo(0, 0); } };
document.addEventListener("keydown", e => {
  if ($("walkMode").classList.contains("hidden")) return;
  if (["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) return;
  if (e.key === "ArrowRight" && i < S.length - 1) { i++; render(); }
  if (e.key === "ArrowLeft" && i > 0) { i--; render(); }
});
$("viewToggle").addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  view = b.dataset.view;
  $("viewToggle").querySelectorAll("button").forEach(x => x.classList.toggle("on", x === b));
  render();
});

/* ---------- modes ---------- */
document.querySelectorAll(".modebtn").forEach(b => b.onclick = () => {
  document.querySelectorAll(".modebtn").forEach(x => x.classList.toggle("on", x === b));
  ["walk", "ex", "log", "about"].forEach(m => $(m + "Mode").classList.toggle("hidden", m !== b.dataset.mode));
  if (b.dataset.mode === "ex" && !$("exHost").innerHTML) newRep();
  if (b.dataset.mode === "about") renderAbout();
});

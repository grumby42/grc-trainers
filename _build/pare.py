#!/usr/bin/env python3
"""Pare NIST OSCAL + CTID JSON into the small data block a GRC trainer embeds.

Runs fully offline against local checkouts at pinned commits. Nothing is fetched.

Usage:
  python3 -I pare.py --oscal <oscal-content checkout> --ctid <mappings-explorer checkout> \
      --case <case.json> --out <data.json>

case.json lists the CSF 2.0 subcategories and SP 800-53 controls a case needs:
  {"csf": ["GV.PO-02", ...], "sp80053": ["ac-2", ...], "attack_per_control": 8}

Output: one JSON object with provenance, CSF outcomes (verbatim), 800-53 controls
(statement, 800-53A objectives, examine/interview/test objects, ODP labels; all
verbatim), and CTID ATT&CK "mitigates" entries with their rationale.
"""
import argparse
import json
import re
import subprocess
from pathlib import Path

CSF_PATH = "nist.gov/CSF/v2.0/json/NIST_CSF_v2.0_catalog.json"
SP53_PATH = "nist.gov/SP800-53/rev5/json/NIST_SP-800-53_rev5_catalog.json"
CTID_PATH = ("mappings/nist_800_53/attack-16.1/nist_800_53-rev5/enterprise/"
             "nist_800_53-rev5_attack-16.1-enterprise.json")

INSERT = re.compile(r"\{\{\s*insert:\s*param,\s*([\w.\-]+)\s*\}\}")


def git_head(repo):
    try:
        out = subprocess.run(["git", "-C", str(repo), "log", "-1", "--format=%h %cs"],
                             capture_output=True, text=True, check=True)
        return out.stdout.strip()
    except Exception:
        return "unknown"


def walk(node, fn):
    if isinstance(node, dict):
        fn(node)
        for v in node.values():
            walk(v, fn)
    elif isinstance(node, list):
        for v in node:
            walk(v, fn)


def index_controls(catalog):
    found = {}

    def fn(n):
        if "id" in n and "class" in n and "parts" in n:
            found[n["id"]] = n
    walk(catalog, fn)
    return found


def param_labels(ctrl):
    """Map every param id (and alt-identifier) to the bracket text NIST prints."""
    raw = {p["id"]: p for p in ctrl.get("params", [])}
    for p in ctrl.get("params", []):
        for pr in p.get("props", []):
            if pr.get("name") == "alt-identifier":
                raw[pr["value"]] = p

    def text_for(p, depth=0):
        if "select" in p:
            how = p["select"].get("how-many", "")
            choices = [INSERT.sub(lambda m: text_for(raw[m.group(1)], depth + 1)
                                  if m.group(1) in raw and depth < 3 else m.group(0), c)
                       for c in p["select"].get("choice", [])]
            kind = "Selection (one or more)" if how == "one-or-more" else "Selection"
            return f"[{kind}: {'; '.join(choices)}]"
        lab = p.get("label")
        if not lab:
            g = p.get("guidelines") or []
            lab = g[0]["prose"] if g else p["id"]
        if not lab.startswith("organization-defined"):
            lab = "organization-defined " + lab
        return f"[Assignment: {lab}]"

    return {pid: text_for(p) for pid, p in raw.items()}


def render(prose, labels):
    # ODPs render the way NIST prints them: [Assignment: ...] / [Selection: ...]
    return INSERT.sub(lambda m: labels.get(m.group(1), f"[{m.group(1)}]"), prose or "").strip()


def label_of(part):
    for pr in part.get("props", []):
        if pr.get("name") == "label":
            return pr["value"]
    return ""


def flatten(part, labels, out, depth=0):
    if part.get("prose"):
        out.append({"label": label_of(part), "text": render(part["prose"], labels), "depth": depth})
    for sub in part.get("parts", []):
        flatten(sub, labels, out, depth + 1)


def control_record(ctrl):
    labels = param_labels(ctrl)
    rec = {"id": label_of(ctrl) or ctrl["id"].upper(), "title": ctrl["title"],
           "statement": [], "objectives": [], "methods": {}, "guidance": ""}
    for part in ctrl["parts"]:
        name = part["name"]
        if name == "statement":
            flatten(part, labels, rec["statement"])
        elif name == "guidance":
            rec["guidance"] = render(part.get("prose", ""), labels)
        elif name == "assessment-objective":
            flatten(part, labels, rec["objectives"])
        elif name == "assessment-method":
            method = next((p["value"] for p in part.get("props", []) if p.get("name") == "method"), "?")
            objs = []
            for sub in part.get("parts", []):
                if sub.get("name") == "assessment-objects":
                    objs = [x.strip() for x in sub.get("prose", "").split("\n") if x.strip()]
            rec["methods"][method] = objs
    rec["odps"] = [{"id": p["id"], "label": p.get("label", ""),
                    "guideline": (p.get("guidelines") or [{}])[0].get("prose", "")}
                   for p in ctrl.get("params", []) if "_odp" in p["id"]]
    return rec


def csf_record(sub):
    rec = {"id": sub["id"], "text": "", "examples": []}
    for part in sub.get("parts", []):
        if part["name"] == "statement":
            rec["text"] = part.get("prose", "")
        elif part["name"] == "example":
            rec["examples"].append(part.get("prose", ""))
    return rec


def ctid_key(ctrl_id):
    fam, num = ctrl_id.upper().split("-")
    return f"{fam}-{int(num):02d}"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--oscal", required=True)
    ap.add_argument("--ctid", required=True)
    ap.add_argument("--case", required=True)
    ap.add_argument("--out", required=True)
    a = ap.parse_args()

    case = json.loads(Path(a.case).read_text())
    oscal, ctid = Path(a.oscal), Path(a.ctid)

    csf_cat = json.loads((oscal / CSF_PATH).read_text())["catalog"]
    sp_cat = json.loads((oscal / SP53_PATH).read_text())["catalog"]
    ctid_doc = json.loads((ctid / CTID_PATH).read_text())

    csf_idx, sp_idx = index_controls(csf_cat), index_controls(sp_cat)

    missing = [c for c in case["csf"] if c not in csf_idx] + \
              [c for c in case["sp80053"] if c not in sp_idx]
    if missing:
        raise SystemExit(f"IDs not found in catalogs (do not guess): {missing}")

    n = case.get("attack_per_control", 8)
    attack = {}
    for cid in case["sp80053"]:
        key = ctid_key(cid)
        rows = [m for m in ctid_doc["mapping_objects"]
                if m.get("capability_id") == key and m.get("status") == "complete"
                and "." not in m["attack_object_id"]]
        seen, picked = set(), []
        for m in sorted(rows, key=lambda r: r["attack_object_id"]):
            if m["attack_object_id"] in seen:
                continue
            seen.add(m["attack_object_id"])
            picked.append({"id": m["attack_object_id"], "name": m["attack_object_name"],
                           "rationale": m.get("comments", "")})
        prefer = case.get("attack_prefer", {}).get(key, [])
        by_id = {t["id"]: t for t in picked}
        absent = [t for t in prefer if t not in by_id]
        if absent:
            raise SystemExit(f"{key}: preferred techniques not mapped by CTID (do not guess): {absent}")
        sample = [by_id[t] for t in prefer] + [t for t in picked if t["id"] not in prefer]
        attack[key] = {"total_parent_techniques": len(picked), "sample": sample[:n]}

    out = {
        "provenance": {
            "oscal_content_commit": git_head(oscal),
            "csf_catalog": f"{csf_cat['metadata']['title']} v{csf_cat['metadata'].get('version')}",
            "sp80053_catalog": f"{sp_cat['metadata']['title']} v{sp_cat['metadata'].get('version')}",
            "oscal_license": "CC0 1.0 Universal / US Government work (public domain)",
            "ctid_commit": git_head(ctid),
            "ctid_file": CTID_PATH,
            "ctid_attack_version": ctid_doc["metadata"].get("attack_version"),
            "ctid_last_update": ctid_doc["metadata"].get("last_update"),
            "ctid_license": "Apache-2.0 (c) MITRE",
        },
        "csf": {c: csf_record(csf_idx[c]) for c in case["csf"]},
        "sp80053": {c: control_record(sp_idx[c]) for c in case["sp80053"]},
        "attack": attack,
    }
    Path(a.out).write_text(json.dumps(out, ensure_ascii=False, indent=1))
    print(f"wrote {a.out}: {len(out['csf'])} CSF outcomes, {len(out['sp80053'])} controls")


if __name__ == "__main__":
    main()

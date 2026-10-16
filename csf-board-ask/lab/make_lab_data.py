#!/usr/bin/env python3
"""Generate a synthetic practice dataset for the csf-board-ask lab (LAB.md, Tier 2).

Everything produced is fake: invented names (role labels only), placeholder account
IDs, RFC 7042 documentation-range MAC addresses (00-00-5E-00-53-xx), and dates.
Exceptions are planted at random so each seed gives a different answer key.

Usage:
  python3 -I make_lab_data.py --out ./labdata --seed 42
  python3 -I make_lab_data.py --out ./labdata --seed 42 --answers   # also writes answer_key.json
"""
import argparse
import csv
import datetime as dt
import json
import random
from pathlib import Path

START, END = dt.date(2026, 4, 1), dt.date(2026, 9, 30)


def rand_day(r):
    return START + dt.timedelta(days=r.randrange((END - START).days + 1))


def bus_days_after(d, n):
    while n > 0:
        d += dt.timedelta(days=1)
        if d.weekday() < 5:
            n -= 1
    return d


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", required=True)
    ap.add_argument("--seed", type=int, default=42)
    ap.add_argument("--answers", action="store_true")
    a = ap.parse_args()
    r = random.Random(a.seed)
    out = Path(a.out)
    out.mkdir(parents=True, exist_ok=True)

    # --- Access: HR separations, contractor end dates, AD state ---
    hr = [{"person_id": f"e-{1000 + k}", "role": r.choice(["Ramp Agent", "Dispatcher", "Analyst", "Supervisor", "Clerk"]),
           "separation_date": rand_day(r).isoformat()} for k in range(r.randint(30, 40))]
    con = [{"person_id": f"c-{2000 + k}", "agency": r.choice(["Agency A", "Agency B", "Agency C"]),
            "end_date": rand_day(r).isoformat()} for k in range(r.randint(8, 14))]
    ad, answers = [], {"access_exceptions": [], "inventory_unmatched": [], "inventory_stale": []}
    for p in hr:
        sep = dt.date.fromisoformat(p["separation_date"])
        late = r.random() < 0.05
        dis = bus_days_after(sep, r.randint(3, 15) if late else r.randint(0, 1))
        ad.append({"account": p["person_id"], "enabled": "False", "disabled_date": dis.isoformat(), "last_logon": (sep - dt.timedelta(days=1)).isoformat()})
        if late:
            answers["access_exceptions"].append({"account": p["person_id"], "type": "late", "days_after": (dis - sep).days})
    for p in con:
        end = dt.date.fromisoformat(p["end_date"])
        roll = r.random()
        if roll < 0.35:
            ad.append({"account": p["person_id"], "enabled": "False", "disabled_date": bus_days_after(end, r.randint(0, 1)).isoformat(), "last_logon": (end - dt.timedelta(days=1)).isoformat()})
        elif roll < 0.75:
            dis = end + dt.timedelta(days=r.randint(5, 45))
            ad.append({"account": p["person_id"], "enabled": "False", "disabled_date": dis.isoformat(), "last_logon": (end - dt.timedelta(days=1)).isoformat()})
            answers["access_exceptions"].append({"account": p["person_id"], "type": "late", "days_after": (dis - end).days})
        else:
            used = r.random() < 0.5
            last = end + dt.timedelta(days=r.randint(2, 20)) if used else end - dt.timedelta(days=1)
            ad.append({"account": p["person_id"], "enabled": "True", "disabled_date": "", "last_logon": last.isoformat()})
            answers["access_exceptions"].append({"account": p["person_id"], "type": "still_enabled", "logon_after_end": used})
    for k in range(r.randint(150, 200)):  # active staff
        ad.append({"account": f"e-{3000 + k}", "enabled": "True", "disabled_date": "", "last_logon": END.isoformat()})
    r.shuffle(ad)

    # --- Inventory: CMDB vs network observation ---
    def mac(n):
        return f"00-00-5E-00-53-{n:02X}"  # RFC 7042 documentation range: 256 addresses
    ids = list(range(256))
    r.shuffle(ids)
    n_match, n_stale, n_unmatched = r.randint(150, 190), r.randint(5, 12), r.randint(15, 30)
    matched, stale, unmatched = ids[:n_match], ids[n_match:n_match + n_stale], ids[n_match + n_stale:n_match + n_stale + n_unmatched]
    kinds = ["laptop", "desktop", "server", "switch", "printer"]
    cmdb = [{"asset_id": f"A-{k:04d}", "mac": mac(m), "type": r.choice(kinds), "owner_role": "IT"} for k, m in enumerate(matched + stale)]
    nac = [{"mac": mac(m), "first_seen": START.isoformat(), "site": r.choice(["Site 1", "Site 2", "Site 3"])} for m in matched]
    for m in unmatched:
        t = r.choice(["handheld scanner", "label printer", "phone", "unknown"])
        nac.append({"mac": mac(m), "first_seen": rand_day(r).isoformat(), "site": r.choice(["Site 1", "Site 2", "Site 3"])})
        answers["inventory_unmatched"].append({"mac": mac(m), "planted_kind": t})
    answers["inventory_stale"] = [mac(m) for m in stale]
    r.shuffle(nac)

    def write(name, rows):
        with open(out / name, "w", newline="") as f:
            w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
            w.writeheader()
            w.writerows(rows)

    write("hr_separations.csv", hr)
    write("contractor_end_dates.csv", con)
    write("ad_accounts.csv", ad)
    write("cmdb_export.csv", cmdb)
    write("nac_observed_30d.csv", nac)
    (out / "README.txt").write_text(
        "SYNTHETIC training data — csf-board-ask lab. Not real people, accounts, or devices.\n"
        f"Seed {a.seed}. Period {START}..{END}. MACs are RFC 7042 documentation addresses.\n")
    if a.answers:
        answers["counts"] = {"hr": len(hr), "contractors": len(con), "cmdb": len(cmdb), "nac": len(nac)}
        (out / "answer_key.json").write_text(json.dumps(answers, indent=1))
    print(f"wrote {out}/ (seed {a.seed}): {len(hr)} HR, {len(con)} contractors, {len(ad)} AD, {len(cmdb)} CMDB, {len(nac)} NAC")


if __name__ == "__main__":
    main()

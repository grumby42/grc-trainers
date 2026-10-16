#!/usr/bin/env python3
"""Assemble a trainer's single-file index.html from src/ + pared data, and stamp it.

Usage:
  python3 -I build.py --case-dir <trainer folder> --data <data.json> --prefix GRCT

Writes <trainer folder>/index.html. Stamps BUILD_ID = <PREFIX>-YYYYMMDD-HHMMZ and
STAMP_UTC = ISO minute, both taken from the UTC clock at build time.
"""
import argparse
import datetime as dt
import json
from pathlib import Path

ORDER = ["content.js", "app.js", "exercises.js", "log.js"]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--case-dir", required=True)
    ap.add_argument("--data", required=True)
    ap.add_argument("--prefix", default="GRCT")
    a = ap.parse_args()

    case = Path(a.case_dir)
    src = case / "src"
    now = dt.datetime.now(dt.timezone.utc)
    build_id = f"{a.prefix}-{now:%Y%m%d-%H%M}Z"
    stamp = f"{now:%Y-%m-%dT%H:%M}Z"

    data = json.loads(Path(a.data).read_text())
    # </script> inside JSON would end the script tag early; neutralise it.
    data_js = json.dumps(data, ensure_ascii=False).replace("</", "<\\/")

    script = "\n".join([
        f'const BUILD_ID="{build_id} (provisional prefix)";',
        f'const STAMP_UTC="{stamp}";',
        f"const DATA={data_js};",
        *[(src / f).read_text() for f in ORDER],
    ])
    shell = (src / "shell.html").read_text()
    if "/*@@SCRIPT@@*/" not in shell:
        raise SystemExit("shell.html is missing the /*@@SCRIPT@@*/ marker")
    out = shell.replace("/*@@SCRIPT@@*/", script)
    (case / "index.html").write_text(out)
    (case / "_script_check.js").write_text(script)
    print(f"{build_id} · {stamp} · {len(out):,} bytes → {case / 'index.html'}")


if __name__ == "__main__":
    main()

# Third-party notices

The trainer code and original content in this repository are MIT-licensed (see `LICENSE`).
Some trainers embed third-party data, baked in at build time. That data stays under its
own terms, listed below. Sources that are only cited and linked (ISACA, IIA, AICPA, CIS
Controls, the Secure Controls Framework, CSA CCM/CAIQ, Open FAIR, and practitioner blogs)
are **not** embedded, and are not covered here.

---

## NIST OSCAL content — `usnistgov/oscal-content`

- **Used in:** `csf-board-ask` (CSF 2.0 outcome text and implementation examples; SP 800-53
  Rev 5.2.0 control statements; SP 800-53A Rev 5.2.0 assessment objectives, methods and
  objects).
- **Pinned commit:** `78650f0` (2026-05-13).
- **Terms (from the repository's LICENSE.md):** This project is in the worldwide public
  domain. As a work of the United States government, it is in the public domain within the
  United States. NIST additionally waives copyright and related rights worldwide through the
  [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).
- NIST requests attribution. Source: https://github.com/usnistgov/oscal-content

## MITRE Center for Threat-Informed Defense — Mappings Explorer

- **Used in:** `csf-board-ask` Threat lens (NIST SP 800-53 Rev 5 ↔ ATT&CK 16.1 Enterprise
  "mitigates" mappings: control ID, technique ID and technique name).
- **Pinned commit:** `a85e55a` (2026-10-04). File:
  `mappings/nist_800_53/attack-16.1/nist_800_53-rev5/enterprise/nist_800_53-rev5_attack-16.1-enterprise.json`
- **License:** Apache License, Version 2.0. A full copy ships at `LICENSES/Apache-2.0.txt`.
- **Notice (from the project README):** © 2024 MITRE. Approved for public release.
  Document number(s) CT0104.
- **Changes made:** filtered to the case's controls and to parent techniques with status
  `complete`; reformatted into the trainer's data block. CTID's per-entry `comments` field
  is carried over where present, though it is empty for nearly all entries in this file.
- ATT&CK technique IDs and names: © The MITRE Corporation. This work is reproduced and
  distributed with the permission of The MITRE Corporation. ATT&CK® is a registered
  trademark of The MITRE Corporation. (The ATT&CK terms-of-use page wasn't reachable at
  build time. This attribution follows MITRE's standard form; confirm it before publishing.)

## U.S. GAO — Government Auditing Standards (Yellow Book) glossary

- **Used in:** `csf-board-ask` (quoted definitions: criteria, condition, cause, effect,
  sufficiency, appropriateness).
- **Terms:** GAO products are generally not subject to U.S. copyright protection
  (https://www.gao.gov/copyright). Source: https://gaoinnovations.gov/yellowbook/glossary.html

---

*Generated 2026-10-16T16:33Z · build `GRCT-20261016-1633Z`.*

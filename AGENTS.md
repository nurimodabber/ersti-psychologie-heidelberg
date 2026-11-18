# Ersti-Guide Psychologie Heidelberg — Agent Brain

Shared by Antigravity and Claude Code (`CLAUDE.md` imports this file). Workspace tandem rules: `../AGENTS.md`.

Unofficial guide for first-semester B.Sc. Psychology students in Heidelberg. German only. Features and file layout: `README.md`.

- **Stack:** plain HTML/CSS/JS, no build, no install. `index.html` + `css/style.css` + `js/`. One serverless function `api/calendar.js` (calendar feed, see `vercel.json`).
- **Content:** lives in `js/data.js`, `js/data-extra.js`, `js/data-knowledge.js`. Content changes go there, not into `index.html`.
- **Facts:** every fact comes from the heiBOX folder "EKS_Materialien_Erstis" or the university's own pages. Never add or change dates, rules or module details from general knowledge; ask for the source.
- **Run:** `python3 -m http.server 8000`. Test another point in time with `index.html?now=2026-10-06T10:30`.
- **Check:** `node tools/check-links.mjs` after changing links.
- **Deploy:** Vercel project (`.vercel/`), remote `nurimodabber/ersti-psychologie-heidelberg`. Treat a push to `main` as going live; push only when told.
- **Design:** Neumorphism "Sandstone": depth through light and shadow only, no borders. Design tokens are in `css/style.css`.
- **State:** user data is only in `localStorage` under `ersti-guide-psy-hd-v1`. Do not rename that key; it would wipe users' saved ticks.

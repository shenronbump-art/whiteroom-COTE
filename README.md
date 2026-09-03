# WR-01 — Ayanokoji / White Room Protocol Academy

A polished static online-school style curriculum app.

## Features

- Command-center dashboard
- 11 progressive phases
- 44 structured lessons
- Principles and five-step kernel
- Scenario simulator
- Recall training
- Daily review
- Student profile
- Settings
- Local progress/notes/profile storage
- JSON export/import backup
- Google resource links
- Doubt/contact page using:
  - gauxarts@gmail.com
  - cyberjai2k25@gmail.com
- GitHub Pages deployment workflow

## Data saving

No server or database is required. The browser stores progress, profile data, notes, scores and settings in `localStorage`.

Use **Settings → Export backup** to download a JSON backup. Use **Import backup** to restore it on another browser/device.

## Run locally

Use any static server. For example:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## GitHub Pages

Push the project to the `main` branch and select **GitHub Actions** as the Pages deployment source in the repository settings. The included workflow deploys the site.

## License

MIT License. See `LICENSE`.

## Scope

The “White Room” name is used as a fictional training theme. The app does not recommend harmful deprivation, dangerous conditioning, self-harm, manipulation, paranoia, or unsafe physical training. Character entries distinguish canon, inference and safety guidance.

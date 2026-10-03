# barteus.github.io

Personal website of Bartłomiej Poniecki-Klotz, hosted on GitHub Pages at <https://barteus.github.io>.

Plain static HTML/CSS/JS with no build step. GitHub Pages serves the `main` branch from the repository root.

## Structure

| File | Purpose |
|---|---|
| `index.html` | Page content: hero, about, expertise, experience |
| `styles.css` | Styles (light/dark via `prefers-color-scheme`) |
| `script.js` | Renders the "Writing & Activity" section |
| `medium-articles.js` | Medium articles (generated, see below) |
| `youtube-videos.js` | YouTube talks (edit by hand) |
| `linkedin-activities.js` | LinkedIn activities (edit by hand) |
| `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png` | Icons |
| `404.html`, `robots.txt`, `sitemap.xml`, `.nojekyll` | GitHub Pages extras |

## Preview locally

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Refresh Medium articles

```bash
cd medium && npm install && node fetch-medium-articles.js
```

This rewrites `medium-articles.js` from the Medium RSS feed. See `medium/MEDIUM_SETUP.md`.

Or run it on GitHub: **Actions → Update Medium articles → Run workflow**. The workflow commits `medium-articles.js` to `main` only if there are new articles.

## Publish

Commit and push to `main`. GitHub Pages deploys automatically within a minute or two.

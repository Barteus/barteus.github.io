# barteus.github.io

Personal website of Bartłomiej Poniecki-Klotz, hosted on GitHub Pages at <https://barteus.github.io>.

Plain static HTML/CSS/JS with no build step and no third-party requests (fonts and icons are self-hosted). GitHub Pages serves the `main` branch from the repository root.

## Structure

```
index.html                 Page content: hero, about, expertise, experience, writing
404.html                   GitHub Pages "not found" page
robots.txt, sitemap.xml    Search engine hints
.nojekyll                  Serve files as-is (no Jekyll)
assets/
  css/styles.css           Styles (light/dark via prefers-color-scheme)
  js/main.js               Renders "Writing & Activity" and the "Show more" toggles
  data/medium-articles.js  Medium articles (generated, see below)
  data/youtube-videos.js   YouTube talks (edit by hand)
  data/linkedin-activities.js  LinkedIn activities (edit by hand)
  img/                     Profile photo, favicons, icons.svg (Font Awesome Free sprite, CC BY 4.0)
  fonts/                   Self-hosted Inter & JetBrains Mono (SIL OFL 1.1)
medium/                    Script that refreshes the Medium articles
```

## Preview locally

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Refresh Medium articles

```bash
cd medium && npm install && node fetch-medium-articles.js
```

This rewrites `assets/data/medium-articles.js` from the Medium RSS feed. See `medium/MEDIUM_SETUP.md`.

## Publish

Commit and push to `main`. GitHub Pages deploys automatically within a minute or two.

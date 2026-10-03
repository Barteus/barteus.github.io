# Medium articles

`fetch-medium-articles.js` reads the RSS feed at `https://medium.com/feed/@barteus` and rewrites
`assets/data/medium-articles.js`, which the homepage loads in the "Writing & Activity" section.

## Refresh the list

```bash
cd medium
npm install
npm run fetch-articles
```

Then review and commit `assets/data/medium-articles.js`.

## Notes

- The RSS feed only returns the latest ~10 articles; older ones drop off when you refresh.
- To change the account, edit `MEDIUM_RSS_URL` at the top of `fetch-medium-articles.js`.
- YouTube and LinkedIn entries live in `assets/data/youtube-videos.js` and
  `assets/data/linkedin-activities.js` and are edited by hand.

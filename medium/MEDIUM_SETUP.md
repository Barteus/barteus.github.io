# Medium Articles Integration Setup

This guide explains how to set up automatic Medium article fetching for your personal webpage.

## Overview

The system consists of two parts:
1. **Node.js script** (`medium/fetch-medium-articles.js`) - Fetches articles from Medium RSS feed
2. **Generated file** (`medium-articles.js`) - Contains the fetched articles for the webpage

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

This installs the required `xmldom` package for XML parsing.

### 2. Fetch Medium Articles

Run the fetching script:

```bash
npm run fetch-articles
```

Or directly:

```bash
node medium/fetch-medium-articles.js
```

### 3. Verify Output

The script will:
- Fetch articles from `https://medium.com/feed/@barteus`
- Parse the RSS feed
- Generate `medium-articles.js` file
- Display a summary of fetched articles

### 4. Use in Webpage

The webpage automatically loads `medium-articles.js` and merges it with your LinkedIn activities.

## File Structure

```
super-webpage/
├── medium/
│   └── fetch-medium-articles.js    # Node.js script to fetch articles
├── medium-articles.js              # Generated file with articles (auto-created)
├── script.js                       # Main webpage script
├── index.html                      # Main webpage
├── styles.css                      # Styling
├── package.json                    # Dependencies
└── MEDIUM_SETUP.md                # This file
```

## How It Works

### Fetching Process

1. **RSS Feed**: Script fetches from `https://medium.com/feed/@barteus`
2. **XML Parsing**: Uses `xmldom` to parse the RSS feed
3. **Data Extraction**: Extracts title, excerpt, date, and URL for each article
4. **File Generation**: Creates `medium-articles.js` with formatted data

### Webpage Integration

1. **Dynamic Loading**: Webpage loads `medium-articles.js` as a script
2. **Merging**: Combines Medium articles with LinkedIn activities
3. **Sorting**: Sorts all activities by date (newest first)
4. **Display**: Shows activities with expand/collapse functionality

## Generated File Format

The `medium-articles.js` file contains:

```javascript
const mediumArticles = [
    {
        title: "Article Title",
        excerpt: "Article excerpt...",
        date: "2024-01-15",
        source: "Medium",
        url: "https://medium.com/@barteus/article-url"
    },
    // ... more articles
];
```

## Automation

### Manual Update

To update articles, simply run:

```bash
npm run fetch-articles
```

### Automated Updates

You can set up automated updates using:

1. **GitHub Actions** (recommended)
2. **Cron jobs** (local server)
3. **CI/CD pipelines**

### GitHub Actions Example

Create `.github/workflows/update-articles.yml`:

```yaml
name: Update Medium Articles

on:
  schedule:
    - cron: '0 6 * * *'  # Daily at 6 AM
  workflow_dispatch:     # Manual trigger

jobs:
  update-articles:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install
      - run: npm run fetch-articles
      - run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add medium-articles.js
          git commit -m "Update Medium articles" || exit 0
          git push
```

## Troubleshooting

### Common Issues

1. **"Failed to fetch RSS feed"**
   - Check internet connection
   - Verify Medium RSS URL is accessible
   - Medium might be blocking requests (rare)

2. **"Failed to load medium-articles.js"**
   - Ensure `medium-articles.js` exists
   - Check file permissions
   - Verify file path in script

3. **"Medium articles not found in file"**
   - Regenerate the file: `npm run fetch-articles`
   - Check file content for syntax errors

### Debug Mode

Add debug logging:

```javascript
// In medium/fetch-medium-articles.js
console.log('Raw XML:', xmlText.substring(0, 500));
console.log('Parsed articles:', articles);
```

## Customization

### Change Medium Profile

Edit `MEDIUM_RSS_URL` in `medium/fetch-medium-articles.js`:

```javascript
const MEDIUM_RSS_URL = 'https://medium.com/feed/@your-username';
```

### Modify Output Format

Edit the `generateJSFile()` function to change the output format.

### Add More Sources

You can extend the system to fetch from other sources:
- Dev.to
- Hashnode
- Personal blog RSS feeds

## Benefits

- **No CORS Issues**: Server-side fetching avoids browser CORS restrictions
- **Reliable**: Works even if Medium changes their API
- **Fast**: Pre-generated data loads instantly
- **Flexible**: Easy to modify and extend
- **Automated**: Can be set up for automatic updates

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review console logs for error messages
3. Verify all dependencies are installed
4. Ensure proper file permissions 
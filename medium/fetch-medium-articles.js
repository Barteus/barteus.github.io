const https = require('https');
const fs = require('fs');
const { DOMParser } = require('xmldom');

// Configuration
const MEDIUM_RSS_URL = 'https://medium.com/feed/@barteus';
const OUTPUT_FILE = '../medium-articles.js';

// Function to fetch RSS feed
function fetchRSSFeed(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                if (res.statusCode === 200) {
                    resolve(data);
                } else {
                    reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
                }
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

// Function to parse RSS XML and extract articles
function parseMediumRSS(xmlText) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
    const items = xmlDoc.getElementsByTagName('item');
    
    const articles = [];
    
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        
        const titleElement = item.getElementsByTagName('title')[0];
        const linkElement = item.getElementsByTagName('link')[0];
        const pubDateElement = item.getElementsByTagName('pubDate')[0];
        const descriptionElement = item.getElementsByTagName('description')[0];
        const contentEncodedElement = item.getElementsByTagName('content:encoded')[0];
        
        if (titleElement && linkElement && pubDateElement) {
            const title = titleElement.textContent || '';
            const link = linkElement.textContent || '';
            const pubDate = pubDateElement.textContent || '';
            const description = descriptionElement ? descriptionElement.textContent || '' : '';
            const contentEncoded = contentEncodedElement ? contentEncodedElement.textContent || '' : '';
            
            // Extract tags from category elements
            const categoryElements = item.getElementsByTagName('category');
            const tags = [];
            
            for (let j = 0; j < categoryElements.length; j++) {
                const categoryText = categoryElements[j].textContent || '';
                if (categoryText.trim()) {
                    tags.push(categoryText.trim());
                }
            }
            
            // Extract h4 sections from content:encoded
            let h4Sections = [];
            if (contentEncoded) {
                // Count h4 tags in first 50 characters
                const first50Chars = contentEncoded.substring(0, 50);
                const h4OpenCount = (first50Chars.match(/<h4/g) || []).length;
                const h4CloseCount = (first50Chars.match(/<\/h4>/g) || []).length;
                
                // If we have at least 2 complete h4 sections in first 50 chars
                if (h4OpenCount >= 2 && h4CloseCount >= 2) {
                    // Extract all h4 content from the full content
                    const h4Regex = /<h4[^>]*>(.*?)<\/h4>/g;
                    let match;
                    while ((match = h4Regex.exec(contentEncoded)) !== null && h4Sections.length < 2) {
                        const h4Content = match[1]
                            .replace(/<[^>]*>/g, '') // Remove HTML tags
                            .replace(/&[^;]+;/g, ' ') // Replace HTML entities
                            .trim();
                        if (h4Content) {
                            h4Sections.push(h4Content);
                        }
                    }
                }
            }
            
            // Build the formatted excerpt with H4 sections and tags only
            let excerptParts = [];
            
            // Add h4 sections to excerpt if available
            if (h4Sections.length > 0) {
                excerptParts.push(...h4Sections);
            }
            
            // Add tags to excerpt if available
            if (tags.length > 0) {
                excerptParts.push(`Tags: ${tags.join(', ')}`);
            }
            
            // Create excerpt with only a one-sentence description
            let excerpt = '';
            if (contentEncoded) {
                // Extract excerpt from content:encoded (remove HTML tags)
                excerpt = contentEncoded
                    .replace(/<[^>]*>/g, '')
                    .replace(/&[^;]+;/g, ' ') // Replace HTML entities
                    .trim()
                    .substring(0, 120); // Max 120 characters
                
                // Add ellipsis if truncated
                if (excerpt.length >= 120) {
                    excerpt = excerpt + '...';
                }
            }
            
            // Fallback to title if content:encoded is empty
            if (!excerpt && title) {
                excerpt = title.substring(0, 120);
                if (excerpt.length >= 120) {
                    excerpt = excerpt + '...';
                }
            }
            
            // Debug logging
            console.log(`Article: ${title}`);
            console.log(`Content:encoded length: ${contentEncoded ? contentEncoded.length : 0}`);
            console.log(`Final excerpt: "${excerpt}"`);
            console.log('---');
            
            // Parse date
            const date = new Date(pubDate).toISOString().split('T')[0];
            
            articles.push({
                title: title,
                excerpt: excerpt,
                date: date,
                source: 'Medium',
                url: link,
                tags: tags // Also store tags separately for potential future use
            });
        }
    }
    
    return articles;
}

// Function to generate JavaScript file content
function generateJSFile(articles) {
    const timestamp = new Date().toISOString();
    
    return `// Auto-generated Medium articles file
// Generated on: ${timestamp}
// Total articles: ${articles.length}

const mediumArticles = ${JSON.stringify(articles, null, 2)};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = mediumArticles;
}

// Make available globally for browser use
if (typeof window !== 'undefined') {
    window.mediumArticles = mediumArticles;
}
`;
}

// Main function - renamed to fetch-medium-articles
async function fetchMediumArticles() {
    try {
        console.log('Fetching Medium articles from RSS feed...');
        console.log(`URL: ${MEDIUM_RSS_URL}`);
        
        // Fetch RSS feed
        const xmlText = await fetchRSSFeed(MEDIUM_RSS_URL);
        console.log('✓ RSS feed fetched successfully');
        
        // Parse articles
        const articles = parseMediumRSS(xmlText);
        console.log(`✓ Parsed ${articles.length} articles`);
        
        // Sort articles by date (newest first)
        articles.sort((a, b) => new Date(b.date) - new Date(a.date));
        console.log('✓ Articles sorted by date (newest first)');
        
        // Generate JavaScript file
        const jsContent = generateJSFile(articles);
        
        // Write to file
        fs.writeFileSync(OUTPUT_FILE, jsContent, 'utf8');
        console.log(`✓ Articles saved to ${OUTPUT_FILE}`);
        
        // Display summary
        console.log('\n📊 Summary:');
        console.log(`- Total articles: ${articles.length}`);
        console.log(`- Date range: ${articles[articles.length - 1]?.date} to ${articles[0]?.date}`);
        console.log(`- Output file: ${OUTPUT_FILE}`);
        
        // Show first few articles
        console.log('\n📝 Recent articles:');
        articles.slice(0, 3).forEach((article, index) => {
            console.log(`${index + 1}. ${article.title} (${article.date})`);
        });
        
        if (articles.length > 3) {
            console.log(`   ... and ${articles.length - 3} more articles`);
        }
        
        return articles;
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        throw error;
    }
}

// Run the script
if (require.main === module) {
    fetchMediumArticles()
        .then(() => {
            console.log('\n✅ Medium articles fetch completed successfully!');
        })
        .catch((error) => {
            console.error('\n❌ Medium articles fetch failed:', error.message);
            process.exit(1);
        });
}

module.exports = {
    fetchMediumArticles,
    fetchRSSFeed,
    parseMediumRSS,
    generateJSFile
}; 
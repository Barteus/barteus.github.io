// Configuration object for easy customization
const config = {
    name: "Bartłomiej Poniecki-Klotz",
    title: "AI Solution Architect & AI SME @ Dell Technologies",
    bio: "Passionate about designing and implementing cutting-edge AI solutions that drive business transformation and innovation.",
    photo: "./bpk-photo.jpeg",
    social: {
        linkedin: "https://linkedin.com/in/barteus",
        medium: "https://barteus.medium.com/",
        github: "https://github.com/barteus",
        twitter: "https://twitter.com/barteus88"
    }
};

// DOM elements
const elements = {
    name: document.querySelector('.name'),
    title: document.querySelector('.title'),
    bio: document.querySelector('.bio'),
    photo: document.getElementById('profile-photo'),
    linkedinLink: document.getElementById('linkedin-link'),
    mediumLink: document.getElementById('medium-link'),
    githubLink: document.getElementById('github-link'),
    twitterLink: document.getElementById('twitter-link'),
    articlesContainer: document.getElementById('articles-container')
};

// Initialize the page
function initializePage() {
    updateProfileInfo();
    updateSocialLinks();
    loadAllActivities();
    addEventListeners();
    addAnimations();
}

// Load and merge all activities (Medium articles + LinkedIn activities)
async function loadAllActivities() {
    try {
        // Show loading state
        addLoadingState(elements.articlesContainer, 'Loading recent activities...');
        
        // Load Medium articles from generated file
        const mediumArticles = await loadMediumArticles();
        
        // Load LinkedIn activities from separate file
        const linkedinActivities = await loadLinkedInActivities();
        
        // Merge Medium articles with LinkedIn activities
        const allActivities = mergeAndSortActivities(mediumArticles, linkedinActivities);
        
        // Update config with merged activities
        config.articles = allActivities;
        
        // Populate articles
        populateArticles();
        
        console.log(`✓ Loaded ${mediumArticles.length} Medium articles and ${linkedinActivities.length} LinkedIn activities`);
        
    } catch (error) {
        console.error('Error loading activities:', error);
        // Fallback to empty activities
        config.articles = [];
        populateArticles();
    }
}

// Load Medium articles from generated file
async function loadMediumArticles() {
    return new Promise((resolve, reject) => {
        // Check if mediumArticles is already available (from previous load)
        if (typeof window.mediumArticles !== 'undefined') {
            console.log('✓ Medium articles already loaded');
            resolve(window.mediumArticles);
            return;
        }
        
        // Try to load the generated medium-articles.js file
        const script = document.createElement('script');
        script.src = './medium-articles.js';
        
        script.onload = function() {
            // Check if mediumArticles is available
            if (typeof window.mediumArticles !== 'undefined') {
                console.log('✓ Loaded Medium articles from file');
                resolve(window.mediumArticles);
            } else {
                reject(new Error('Medium articles not found in file'));
            }
        };
        
        script.onerror = function() {
            reject(new Error('Failed to load medium-articles.js'));
        };
        
        document.head.appendChild(script);
    });
}

// Load LinkedIn activities from separate file
async function loadLinkedInActivities() {
    return new Promise((resolve, reject) => {
        // Check if linkedinActivities is already available (from previous load)
        if (typeof window.linkedinActivities !== 'undefined') {
            console.log('✓ LinkedIn activities already loaded');
            resolve(window.linkedinActivities);
            return;
        }
        
        // Try to load the linkedin-activities.js file
        const script = document.createElement('script');
        script.src = './linkedin-activities.js';
        
        script.onload = function() {
            // Check if linkedinActivities is available
            if (typeof window.linkedinActivities !== 'undefined') {
                console.log('✓ Loaded LinkedIn activities from file');
                resolve(window.linkedinActivities);
            } else {
                reject(new Error('LinkedIn activities not found in file'));
            }
        };
        
        script.onerror = function() {
            reject(new Error('Failed to load linkedin-activities.js'));
        };
        
        document.head.appendChild(script);
    });
}

// Merge and sort Medium articles and LinkedIn activities
function mergeAndSortActivities(mediumArticles, linkedinActivities) {
    // Ensure both arrays exist
    const medium = Array.isArray(mediumArticles) ? mediumArticles : [];
    const linkedin = Array.isArray(linkedinActivities) ? linkedinActivities : [];
    
    // Combine both arrays
    const allActivities = [...medium, ...linkedin];
    
    // Sort by date (newest first)
    allActivities.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
    });
    
    console.log(`✓ Merged ${medium.length} Medium articles and ${linkedin.length} LinkedIn activities`);
    console.log(`✓ Total activities: ${allActivities.length}`);
    
    return allActivities;
}

// Update profile information
function updateProfileInfo() {
    elements.name.textContent = config.name;
    elements.title.textContent = config.title;
    elements.bio.textContent = config.bio;
    elements.photo.src = config.photo;
    elements.photo.alt = `${config.name} - ${config.title}`;
}

// Update social media links
function updateSocialLinks() {
    elements.linkedinLink.href = config.social.linkedin;
    elements.mediumLink.href = config.social.medium;
    elements.githubLink.href = config.social.github;
    elements.twitterLink.href = config.social.twitter;
}

// Populate articles section
function populateArticles() {
    if (!config.articles || config.articles.length === 0) {
        elements.articlesContainer.innerHTML = `
            <div class="no-articles">
                <p>No activities found. Please run the Medium fetch script to load articles.</p>
            </div>
        `;
        return;
    }
    
    const articlesHTML = config.articles.map((article, index) => {
        // Create tags display
        let tagsDisplay = '';
        if (article.tags && article.tags.length > 0) {
            const tagsText = article.tags.join(', ');
            tagsDisplay = `
                <div class="article-tags">
                    Tags: ${tagsText}
                </div>
            `;
        }
        
        return `
            <article class="article-card ${index >= 5 ? 'hidden' : ''}" onclick="openArticle('${article.url}')">
                <h4 class="article-title">${article.title}</h4>
                ${tagsDisplay}
                <div class="article-meta">
                    <span class="article-date">${formatDate(article.date)}</span>
                    <span class="article-source ${article.source.toLowerCase()}">${article.source}</span>
                </div>
            </article>
        `;
    }).join('');
    
    elements.articlesContainer.innerHTML = articlesHTML;
    
    // Show expand button only if there are more than 5 articles
    const expandButton = document.getElementById('expand-button');
    if (config.articles.length <= 5) {
        expandButton.style.display = 'none';
    } else {
        expandButton.style.display = 'inline-flex';
    }
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Open article in new tab
function openArticle(url) {
    window.open(url, '_blank');
}

// Add event listeners
function addEventListeners() {
    // Add click tracking for social links
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', function(e) {
            // Add analytics tracking here if needed
            console.log(`Clicked on ${this.querySelector('span').textContent}`);
        });
    });

    // Add expand button functionality
    const expandButton = document.getElementById('expand-button');
    expandButton.addEventListener('click', function() {
        const hiddenArticles = document.querySelectorAll('.article-card.hidden');
        const expandText = document.getElementById('expand-text');
        const icon = this.querySelector('i');
        
        if (hiddenArticles.length > 0) {
            // Show all articles
            hiddenArticles.forEach(article => {
                article.classList.remove('hidden');
            });
            expandText.textContent = 'Show Less';
            this.classList.add('expanded');
        } else {
            // Hide articles beyond the first 5
            const allArticles = document.querySelectorAll('.article-card');
            allArticles.forEach((article, index) => {
                if (index >= 5) {
                    article.classList.add('hidden');
                }
            });
            expandText.textContent = 'Show More Activities';
            this.classList.remove('expanded');
        }
    });

    // Add smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open modals or overlays
            console.log('Escape pressed');
        }
    });
}

// Add animations and effects
function addAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    document.querySelectorAll('.header, .articles-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Add hover effects for article cards
    document.querySelectorAll('.article-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Utility function to add loading state
function addLoadingState(element, text = 'Loading...') {
    element.innerHTML = `<div class="loading">${text}</div>`;
}

// Utility function to remove loading state
function removeLoadingState(element, content) {
    element.innerHTML = content;
}

// Handle window resize for responsive design
function handleResize() {
    // Add any responsive adjustments here
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        document.body.classList.add('mobile');
    } else {
        document.body.classList.remove('mobile');
    }
}

// Add window resize listener
window.addEventListener('resize', handleResize);

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    handleResize();
    
    // Add a small delay to ensure smooth animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Export functions for potential external use
window.pageUtils = {
    openArticle,
    formatDate,
    addLoadingState,
    removeLoadingState,
    loadAllActivities,
    loadMediumArticles
}; 
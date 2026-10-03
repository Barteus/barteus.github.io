// Renders the "Writing & Activity" section from assets/data/*.js and wires up the "Show more" toggles.
const VISIBLE_ACTIVITIES = 6;

function getActivities() {
    const sources = [window.mediumArticles, window.linkedinActivities, window.youtubeVideos];
    return sources
        .flatMap(list => (Array.isArray(list) ? list : []))
        .sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Dates are stored as YYYY-MM-DD, which JS parses as UTC midnight; format in UTC so
// visitors west of Greenwich don't see the previous month.
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', timeZone: 'UTC' });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function safeUrl(url) {
    try {
        const parsed = new URL(url);
        return parsed.protocol === 'https:' || parsed.protocol === 'http:' ? parsed.href : '#';
    } catch {
        return '#';
    }
}

// Shows/hides the extra items behind a "Show more" button and keeps aria-expanded in sync.
function setupToggle(button, getExtraItems) {
    const extraItems = getExtraItems();
    if (extraItems.length === 0) {
        button.hidden = true;
        return;
    }
    button.hidden = false;
    button.addEventListener('click', () => {
        const expanded = button.getAttribute('aria-expanded') !== 'true';
        button.setAttribute('aria-expanded', String(expanded));
        button.classList.toggle('expanded', expanded);
        button.querySelector('span').textContent = expanded ? 'Show less' : 'Show more';
        extraItems.forEach(item => item.classList.toggle('hidden', !expanded));
    });
}

function renderActivities() {
    const container = document.getElementById('articles-container');
    const button = document.getElementById('expand-button');
    const activities = getActivities();

    if (activities.length === 0) {
        container.innerHTML = '<p class="empty">No articles yet.</p>';
        button.hidden = true;
        return;
    }

    container.innerHTML = activities.map((a, i) => `
        <a class="article-card${i >= VISIBLE_ACTIVITIES ? ' hidden' : ''}" href="${escapeHtml(safeUrl(a.url))}" target="_blank" rel="noopener">
            <div class="article-meta">
                <time datetime="${escapeHtml(a.date)}">${formatDate(a.date)}</time>
                <span class="article-source">${escapeHtml(a.source)}</span>
            </div>
            <h3 class="article-title">${escapeHtml(a.title)}</h3>
            ${a.tags && a.tags.length ? `<ul class="tags small">${a.tags.slice(0, 4).map(t => `<li>${escapeHtml(t)}</li>`).join('')}</ul>` : ''}
        </a>
    `).join('');

    setupToggle(button, () => [...container.querySelectorAll('.article-card')].slice(VISIBLE_ACTIVITIES));
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('year').textContent = new Date().getFullYear();
    renderActivities();
    setupToggle(document.getElementById('experience-toggle'), () => [...document.querySelectorAll('.timeline li.hidden')]);
});

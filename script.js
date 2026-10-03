// Renders the "Writing & Activity" section from medium-articles.js, linkedin-activities.js and youtube-videos.js.
const VISIBLE_COUNT = 6;

function getActivities() {
    const medium = Array.isArray(window.mediumArticles) ? window.mediumArticles : [];
    const linkedin = Array.isArray(window.linkedinActivities) ? window.linkedinActivities : [];
    const youtube = Array.isArray(window.youtubeVideos) ? window.youtubeVideos : [];
    return [...medium, ...linkedin, ...youtube].sort((a, b) => new Date(b.date) - new Date(a.date));
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function renderActivities() {
    const container = document.getElementById('articles-container');
    const expandButton = document.getElementById('expand-button');
    const activities = getActivities();

    if (activities.length === 0) {
        container.innerHTML = '<p class="empty">No articles yet.</p>';
        expandButton.style.display = 'none';
        return;
    }

    container.innerHTML = activities.map((a, i) => `
        <a class="article-card${i >= VISIBLE_COUNT ? ' hidden' : ''}" href="${encodeURI(a.url)}" target="_blank" rel="noopener">
            <div class="article-meta">
                <span>${formatDate(a.date)}</span>
                <span class="article-source">${escapeHtml(a.source)}</span>
            </div>
            <h3 class="article-title">${escapeHtml(a.title)}</h3>
            ${a.tags && a.tags.length ? `<ul class="tags small">${a.tags.slice(0, 4).map(t => `<li>${escapeHtml(t)}</li>`).join('')}</ul>` : ''}
        </a>
    `).join('');

    expandButton.style.display = activities.length > VISIBLE_COUNT ? 'inline-flex' : 'none';
    expandButton.addEventListener('click', () => {
        const expanded = expandButton.classList.toggle('expanded');
        container.querySelectorAll('.article-card').forEach((card, i) => {
            if (i >= VISIBLE_COUNT) card.classList.toggle('hidden', !expanded);
        });
        document.getElementById('expand-text').textContent = expanded ? 'Show less' : 'Show more';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('year').textContent = new Date().getFullYear();
    renderActivities();
});

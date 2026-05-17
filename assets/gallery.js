const PATTERNS = [
  { id: '123buy', label: '123Buy' },
  { id: 'buywedge', label: 'BuyWedge' },
  { id: 'reverseup', label: 'ReverseUp' },
  { id: 'bottom', label: 'Bottom' },
  { id: 'dbl_top', label: 'Double Top' },
  { id: 'oscilation', label: 'Oscilation' }
];

// Change this if you use a different Worker domain.
// Recommended Worker custom domain: https://api.chartataglance.co.uk
const API_BASE = 'https://api.chartataglance.co.uk/api';

const gallery = document.getElementById('gallery');
const galleryTitle = document.getElementById('gallery-title');
const galleryStatus = document.getElementById('gallery-status');
const patternNav = document.getElementById('pattern-nav');
const latestGrid = document.getElementById('latest-grid');

function formatPatternName(pattern) {
  const found = PATTERNS.find(p => p.id === pattern);
  return found ? found.label : pattern;
}

function getConfidenceFromName(name) {
  const match = name.match(/_(0\.\d{2}|1\.00)\.png$/i);
  return match ? match[1] : '';
}

function getDateFromName(name) {
  const match = name.match(/(20\d{2}-\d{2}-\d{2})_(\d{2}-\d{2}-\d{2})/);
  return match ? `${match[1]} ${match[2].replaceAll('-', ':')}` : '';
}

function imageCard(item) {
  const confidence = item.confidence || getConfidenceFromName(item.name || item.key || '') || '—';
  const date = item.date || getDateFromName(item.name || item.key || '') || 'Latest result';
  const pattern = item.pattern || 'AI Detection';

  return `
    <article class="result-card">
      <a href="${item.url}" target="_blank" rel="noopener">
        <img loading="lazy" src="${item.url}" alt="${formatPatternName(pattern)} DAX AI prediction screenshot">
      </a>
      <div class="result-meta">
        <h3>${formatPatternName(pattern)}</h3>
        <p><strong>Confidence:</strong> ${confidence}</p>
        <p><strong>Captured:</strong> ${date}</p>
      </div>
    </article>
  `;
}

async function fetchPattern(pattern, limit = 60) {
  const url = `${API_BASE}/list?pattern=${encodeURIComponent(pattern)}&limit=${limit}`;
  const response = await fetch(url, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error(`Worker API error ${response.status}`);
  }

  const payload = await response.json();
  return payload.objects || [];
}

async function fallbackJson(pattern) {
  const response = await fetch(`data/${pattern}.json`, { cache: 'no-store' });
  if (!response.ok) return [];
  const items = await response.json();
  return items.map(item => ({ ...item, url: item.image }));
}

async function loadGallery(pattern) {
  galleryTitle.textContent = `${formatPatternName(pattern)} AI Results`;
  galleryStatus.textContent = 'Loading live R2 screenshots...';
  gallery.innerHTML = '';

  try {
    let items = await fetchPattern(pattern);

    if (!items.length) {
      galleryStatus.textContent = 'No live R2 screenshots found yet for this pattern.';
      return;
    }

    galleryStatus.textContent = `${items.length} latest screenshots loaded from Cloudflare R2.`;
    gallery.innerHTML = items.map(imageCard).join('');
  } catch (error) {
    console.warn(error);
    const fallback = await fallbackJson(pattern);

    if (!fallback.length) {
      galleryStatus.textContent = 'No screenshots found. Check the Worker domain, R2 bucket binding, and public image URL.';
      return;
    }

    galleryStatus.textContent = 'Worker API unavailable, showing backup JSON examples.';
    gallery.innerHTML = fallback.map(imageCard).join('');
  }
}

async function loadLatest() {
  if (!latestGrid) return;

  latestGrid.innerHTML = '<p class="muted">Loading latest AI detections...</p>';

  try {
    const all = [];

    for (const pattern of PATTERNS) {
      const items = await fetchPattern(pattern.id, 6);
      all.push(...items.map(item => ({ ...item, pattern: pattern.id })));
    }

    all.sort((a, b) => new Date(b.uploaded || 0) - new Date(a.uploaded || 0));

    latestGrid.innerHTML = all.slice(0, 12).map(imageCard).join('') || '<p class="muted">No live detections found yet.</p>';
  } catch (error) {
    latestGrid.innerHTML = '<p class="muted">Latest feed will appear after the Worker API is connected.</p>';
  }
}

function buildPatternNav() {
  if (!patternNav) return;

  patternNav.innerHTML = PATTERNS.map(pattern => `
    <button type="button" onclick="loadGallery('${pattern.id}')">${pattern.label}</button>
  `).join('');
}

buildPatternNav();
loadGallery('123buy');
loadLatest();

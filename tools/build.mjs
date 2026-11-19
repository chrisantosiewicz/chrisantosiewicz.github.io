// Builds the static site from content/projects.mjs.
// Run from the site folder:  node tools/build.mjs
// Writes index.html, 404.html and projects/<slug>/index.html. No dependencies.
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import projects from '../content/projects.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const LINKEDIN = 'https://www.linkedin.com/in/chris-antosiewicz-ca2026';
const SITE_NAME = 'Chris Antosiewicz';

const esc = (s = '') => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const paras = (text = '') => text.split('\n\n').map(t => `<p>${esc(t)}</p>`).join('');
const statusLabel = s => { s = (s || '').toLowerCase(); return s.startsWith('completed') ? 'Completed' : s.startsWith('live') ? 'Live' : 'In progress'; };
const fmtDate = iso => new Date(iso + 'T12:00:00Z')
  .toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });
const ext = (href, label, cls = 'text-link') =>
  `<a class="${cls}" href="${esc(href)}" target="_blank" rel="noopener noreferrer">${esc(label)} <span aria-hidden="true">↗</span></a>`;

const page = ({ title, description, base, body, bodyClass = '' }) => `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#141713">
  <meta name="description" content="${esc(description)}">
  <title>${esc(title)}</title>
  <link rel="icon" href="${base}assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="${base}assets/styles.css">
  <script src="${base}assets/site.js" defer></script>
</head>
<body class="${bodyClass}">
<a class="skip-link" href="#main">Skip to content</a>
<header class="header"><a class="brand" href="${base}" aria-label="Chris Antosiewicz home"><span class="monogram">ca<span>↗</span></span><span>CHRIS ANTOSIEWICZ<span class="brand-sub">RESEARCH &amp; ANALYTICS</span></span></a><nav aria-label="Main navigation"><a href="${base}#projects">Projects</a><a class="nav-contact" href="${LINKEDIN}" target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a></nav></header>
<main id="main">
${body}
</main>
<footer class="wrap footer"><span>© <span class="year">2026</span> Chris Antosiewicz</span><a href="#main">Back to top ↑</a></footer>
</body>
</html>
`;

// ---------- Home ----------
const card = (p, i) => `<article class="project-card">
  <a class="project-preview" href="projects/${p.slug}/" tabindex="-1" aria-hidden="true"><img class="project-image" src="${esc(p.image)}" alt="" loading="${i < 2 ? 'eager' : 'lazy'}"></a>
  <div class="project-body">
    <div class="project-meta"><span>${esc(p.sport)}</span><span>${statusLabel(p.status).toUpperCase()}</span></div>
    <h3><a class="card-link" href="projects/${p.slug}/">${esc(p.title)}</a></h3>
    <p>${esc(p.card || p.summary)}</p>
    <div class="project-bottom"><div class="project-tags">${p.tags.map(t => `<span>${esc(t)}</span>`).join('')}</div><span class="detail-button" aria-hidden="true">Read project →</span></div>
  </div>
</article>`;

const home = page({
  title: 'Chris Antosiewicz · Sports Analytics',
  description: 'Chris Antosiewicz, Syracuse Sport Analytics graduate: NFL and MLB models, an automated NFL scouting report, and more.',
  base: '',
  bodyClass: 'home',
  body: `<section class="hero intro wrap" aria-labelledby="hero-title">
  <div class="hero-copy"><p class="eyebrow"><span class="status-dot"></span> SPORT ANALYTICS · SYRACUSE UNIVERSITY</p><h1 id="hero-title">Hi, I’m Chris <em>Antosiewicz.</em></h1>
  <p class="hero-description">I’m a cum laude Sport Analytics graduate from Syracuse who turns raw data into models and reports that decision-makers can use. I mostly work with football and baseball data, and I’ve worked with live data for an MLS academy, college athletic programs and Chicago’s economic development arm.</p>
  <p class="hero-description">My senior thesis modeled 15 seasons of NFL play-by-play in R. I’m expanding on it with an automated weekly scouting report that uses SQL models to break down the trends behind every NFL team and show how your team can prepare for game day.</p>
  <div class="hero-actions"><a class="button primary" href="#projects">Explore my projects <span aria-hidden="true">↓</span></a><a class="text-link" href="${LINKEDIN}" target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a></div>
  <dl class="skill-row"><div><dt>Languages</dt><dd>R, Python, SQL</dd></div><div><dt>Tools</dt><dd>DuckDB, Shiny, Quarto, GitHub Actions</dd></div><div><dt>Methods</dt><dd>XGBoost, Random Forest, ridge and logistic regression, walk-forward validation</dd></div></dl></div>
  <a class="featured" href="projects/${projects[0].slug}/"><span class="featured-top"><span>LATEST PROJECT</span><span>${statusLabel(projects[0].status).toUpperCase()}</span></span><img src="${esc(projects[0].featuredImage || projects[0].image)}" alt="${esc(projects[0].featuredAlt || projects[0].imageAlt)}"><span class="featured-body"><strong>${esc(projects[0].title)}</strong><span>${esc(projects[0].subtitle)}</span><span class="featured-cta">Read project →</span></span></a>
</section>
<section class="research wrap" id="projects" aria-labelledby="projects-title"><div class="section-heading"><div><p class="eyebrow">01 / PROJECTS</p><h2 id="projects-title">Selected <em>projects.</em></h2></div><span class="project-status">${projects.length} PROJECTS</span></div>
<div class="project-grid">
${projects.map(card).join('\n')}
</div></section>
<section class="contact wrap" aria-labelledby="contact-title"><p class="eyebrow">02 / CONTACT</p><div class="contact-row"><h2 id="contact-title">Let’s talk <em>sports &amp; data.</em></h2><a class="button primary" href="${LINKEDIN}" target="_blank" rel="noopener noreferrer">Connect on LinkedIn <span aria-hidden="true">↗</span></a></div></section>`
});

// ---------- Project pages ----------
const figure = (src, alt, caption, credit, base) => `<figure class="detail-figure"><a class="figure-link" href="${base}${esc(src)}" target="_blank" rel="noopener noreferrer" aria-label="Open full-size image"><img src="${base}${esc(src)}" alt="${esc(alt)}"></a><figcaption>${esc(caption || '')}${credit ? ` <span class="credit">${esc(credit)}</span>` : ''}</figcaption></figure>`;

const findingsBlock = p => {
  if (!p.findings?.length) return '';
  if (typeof p.findings[0] === 'object') {
    const f0 = p.findings[0];
    return `<section class="detail-section"><h2>Findings</h2>
<p class="table-caption">Pooled three-market log-loss difference, ${esc(f0.units.split(',').pop().trim())}. ${esc(f0.period)}, ${f0.nGames.toLocaleString('en-US')} games. Negative favors the first model.</p>
<div class="table-scroll"><table class="findings-table">
<thead><tr><th scope="col">Comparison</th><th scope="col">Estimate</th><th scope="col">95% interval</th></tr></thead><tbody>
${p.findings.map(f => `<tr><th scope="row">${esc(f.finding)}<span>${esc(f.comparison)}</span></th><td>${f.estimate > 0 ? '+' : ''}${f.estimate}</td><td>${f.confidenceInterval95.map(n => (n > 0 ? '+' : '') + n).join(' to ')}</td></tr>`).join('\n')}
</tbody></table></div>
<ul class="note-list">${p.findings.map(f => `<li><strong>${esc(f.finding)}.</strong> ${esc(f.limitation)}</li>`).join('')}</ul></section>`;
  }
  return `<section class="detail-section"><h2>${esc(p.findingsTitle || 'Findings')}</h2><ol class="findings-list">${p.findings.map(f => `<li>${esc(f)}</li>`).join('')}</ol></section>`;
};

const linkLabels = { repository: 'Code on GitHub', report: 'Full write-up', demo: 'Interactive app' };

const projectPage = (p, i) => {
  const base = '../../';
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  const links = [
    ...Object.entries(p.links || {}).filter(([, u]) => u).map(([k, u]) => ext(u, k === 'demo' && !u.includes('shinyapps') ? 'Live site' : (linkLabels[k] || k), 'button ghost')),
    ...(p.artifactLinks || []).map(a => a.url.startsWith('http') ? ext(a.url, a.label, 'button ghost') : `<a class="button ghost" href="${base}${esc(a.url)}">${esc(a.label)} <span aria-hidden="true">↗</span></a>`)
  ];
  const sources = (p.dataSources || []).map(s => `<li><strong>${esc(s.name)}</strong>${[s.coverage, s.sampleSize || s.sample, s.refresh].filter(Boolean).map(x => `<span>${esc(x)}</span>`).join('')}</li>`).join('');
  return page({
    title: `${p.title} · Chris Antosiewicz`,
    description: p.subtitle,
    base,
    bodyClass: `project-page project-${p.slug}`,
    body: `<article class="project-article">
<header class="project-hero wrap">
  <a class="back-link" href="${base}#projects"><span aria-hidden="true">←</span> All projects</a>
  <p class="eyebrow"><span class="status-dot"></span> ${esc(p.sport)} / ${statusLabel(p.status).toUpperCase()} / UPDATED ${fmtDate(p.updated).toUpperCase()}</p>
  <h1>${esc(p.title)}</h1>
  <p class="project-subtitle">${esc(p.subtitle)}</p>
  ${links.length ? `<div class="project-links">${links.join('')}</div>` : ''}
</header>
<div class="wrap project-figure-wrap">${figure(p.image, p.imageAlt, p.imageCaption, p.imageCredit, base)}</div>
<div class="wrap project-layout">
  <div class="project-main">
    <section class="detail-section lead-section"><h2>Overview</h2>${paras(p.overview)}</section>
    ${findingsBlock(p)}
    ${(p.extraImages || []).map(x => figure(x.src, x.alt, x.caption, null, base)).join('')}
    <section class="detail-section"><h2>Limitations and what’s left</h2><ul class="note-list">${p.limitations.map(l => `<li>${esc(l)}</li>`).join('')}</ul></section>
    ${p.artifactNote ? `<p class="artifact-note">${esc(p.artifactNote)}</p>` : ''}
  </div>
  <aside class="project-side" aria-label="Project details">
    <section><h2>My role</h2><p>${esc(p.contribution)}</p></section>
    <section><h2>Tools and methods</h2><div class="chip-list">${p.tools.map(t => `<span>${esc(t)}</span>`).join('')}</div>
    ${p.plannedTools?.length ? `<h3>Planned, not built yet</h3><div class="chip-list planned">${p.plannedTools.map(t => `<span>${esc(t)}</span>`).join('')}</div>` : ''}</section>
    <section><h2>Data</h2><ul class="source-list">${sources}</ul></section>
    ${p.links?.demo ? '<p class="side-note">The app runs on free hosting and can take a few seconds to wake up.</p>' : ''}
  </aside>
</div>
<nav class="wrap project-pager" aria-label="More projects">
  <a href="${base}projects/${prev.slug}/"><span>← Previous</span>${esc(prev.title)}</a>
  <a href="${base}projects/${next.slug}/"><span>Next →</span>${esc(next.title)}</a>
</nav>
</article>`
  });
};

const notFound = page({
  title: 'Page not found · Chris Antosiewicz',
  description: 'Page not found.',
  base: '/',
  body: `<section class="hero wrap not-found"><div class="hero-copy"><p class="eyebrow"><span class="status-dot"></span> 404</p><h1>Nothing <em>here.</em></h1><p class="hero-description">That page doesn’t exist. The projects are all on the home page.</p><div class="hero-actions"><a class="button primary" href="/#projects">See my projects <span aria-hidden="true">↘</span></a></div></div></section>`
});

rmSync(join(root, 'projects'), { recursive: true, force: true });
const write = (rel, html) => { const f = join(root, rel); mkdirSync(dirname(f), { recursive: true }); writeFileSync(f, html); };
write('index.html', home);
write('404.html', notFound);
projects.forEach((p, i) => write(`projects/${p.slug}/index.html`, projectPage(p, i)));
console.log(`Built home, 404 and ${projects.length} project pages.`);

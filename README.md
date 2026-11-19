# Chris Antosiewicz · sports analytics portfolio

Static site for GitHub Pages. No frameworks, no build dependencies beyond Node for regenerating pages.

## Layout

- `index.html` – home page (hero, Projects, About, Contact)
- `projects/<slug>/index.html` – one page per project
- `404.html` – not-found page
- `assets/` – `styles.css`, `site.js`, favicon, and project figures in `assets/img/`
- `content/projects.mjs` – all project text, figures and links (the one file to edit)
- `tools/build.mjs` – regenerates the HTML from `content/projects.mjs`

## Add or edit a project

1. Edit `content/projects.mjs`. The order in that file is the order on the home page. Give a new project a unique `slug` (it becomes its URL) and put its figure in `assets/img/`.
2. Run `node tools/build.mjs` from this folder.
3. Commit and push. GitHub Pages republishes in about a minute.

Any project's figure can be its own style: the page frame follows the site theme, the image is shown as-is.

## Preview locally

`python -m http.server 4173` in this folder, then open http://127.0.0.1:4173.

## Publish on GitHub Pages

Best option: a public repository named `chrisantosiewicz.github.io`, with these files at its root. Then in the repository go to Settings → Pages → Build and deployment → Source: "Deploy from a branch", Branch: `main`, folder `/ (root)`. The site appears at https://chrisantosiewicz.github.io/.

If you use a differently named repository instead, everything works except the 404 page's links, which assume the site is at the domain root.

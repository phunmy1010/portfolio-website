# Blessing Joshua — Portfolio

A static, no-build portfolio site (vanilla HTML/CSS/JS) showcasing UI/UX design, no-code builds, and freelance client work — including two live apps, MealPilot and BrightMind NG, plus five UX case studies.

## Structure

```
index.html          → main site (Home, Work, Contact)
brightmind-ng.html   → standalone BrightMind NG learning app (linked from a project card)
styles.css           → all site styles
app.js                → navigation, scroll reveal, mobile menu
projects.js           → project data + case study modal rendering
images/                → all photos, mockups, and SVG covers
```

## How to edit

- **Add or edit a project:** open `projects.js`, edit the `PROJECTS` array. Each entry needs `id`, `category`, `year`, `image`, `title`, `role`, `tags`, `description`, `challenge`, `solution`, `tools`, `overview`, `discovery`, `results`. Set `isLive: true` and a `live` URL if it's a live app (adds a "Live Build" badge and an "Open Live App" button in the case study).
- **Add images:** drop them in `images/`, reference as `images/filename.jpg` in `projects.js`.
- **Edit bio/services/testimonials/contact info:** all directly in `index.html`.
- **Colors/fonts:** all defined as CSS variables at the top of `styles.css` under `:root`.

## Deploying

This is a plain static site — no build step. Push to GitHub, enable GitHub Pages on the `main` branch (root), done.

## Notes

- The old Google AI Studio version (Vite/React/TypeScript) required a Gemini API key and a Node server to run the "AI Twin" chat and admin photo upload. Both have been removed and replaced with a simple static contact section, so this version runs entirely on GitHub Pages with no backend or API key required.

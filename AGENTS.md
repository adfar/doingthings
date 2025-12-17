# Repository Guidelines

## Project Structure & Module Organization

- `index.html` is the entry point for the site.
- `assets/css/` holds stylesheets (recommend starting with `assets/css/main.css`).
- `assets/js/` holds client-side scripts (recommend starting with `assets/js/main.js`).
- `assets/` can also store images/fonts (add subfolders like `assets/img/` as needed).

## Build, Test, and Development Commands

This repository is currently a dependency-free static site (no build step).

- Serve locally (recommended): `python3 -m http.server 8000`
  - Then visit `http://localhost:8000/` to ensure relative paths under `assets/` resolve correctly.
- Quick preview (works, but less realistic): open `index.html` directly in your browser.

## Coding Style & Naming Conventions

- Indentation: 4 spaces (match `index.html`).
- HTML: prefer semantic elements (`header`, `main`, `nav`) and keep markup accessible (labels for inputs, meaningful `alt` text).
- CSS/JS: keep files small and focused; split into multiple files only when it improves readability.
- Naming: use lowercase, hyphenated filenames (e.g., `hero-banner.css`, `task-list.js`) and predictable asset paths (`assets/css/…`, `assets/js/…`).

## Testing Guidelines

There are no automated tests yet. Before opening a PR, do a quick manual pass:

- Load the page in at least two browsers.
- Check mobile layout using responsive devtools (e.g., 320px and 768px widths).
- Verify basic accessibility: keyboard navigation, focus states, and readable contrast.

## Commit & Pull Request Guidelines

- Commits: the current history uses short, simple subjects (e.g., `initial commit`). Keep messages concise and imperative (e.g., `add landing content`, `style header`).
- PRs: include a short summary, testing notes (what you clicked/verified), and screenshots for any visual change.

## Security & Configuration Tips

- Do not commit secrets (API keys, tokens). If configuration becomes necessary, prefer an `.env.example` and document expected variables here.

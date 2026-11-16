# Twelve programs, one method

A static site version of Jesse Myer's STAR(T) program deck. No build step: plain HTML, CSS and JavaScript, with GSAP vendored in `vendor/`.

## Publish on GitHub Pages
1. Create a repository and push the contents of this folder to the `main` branch.
2. In the repository: Settings, Pages, Source "Deploy from a branch", branch `main`, folder `/ (root)`.
3. The site is served at `https://<user>.github.io/<repo>/`. All paths are relative, so a project page or a custom domain both work.

## Use
- Click a program on the index. Inside a program, the S, T, A, R, (T) bar follows the scroll; left and right arrow keys move between programs; `i` or Escape returns to the index.
- The Light or Dark button in the top bar switches theme; the choice is remembered in the browser.

## Structure
- `index.html`, `css/style.css`, `js/app.js`: the site.
- `js/data.js`: all program content, generated from the same source as the PowerPoint decks.
- `media/`: animations as H.264 MP4 with JPEG posters; they load and play only while on screen.
- `.nojekyll`: tells GitHub Pages to serve the folder as is.

Figures marked EST. are estimates; figures marked DERIVED are arithmetic from recorded figures.

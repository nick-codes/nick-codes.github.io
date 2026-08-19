# nick.codes

The personal site for **Nick Palmer** — fractional CTO and principal engineer
for hire. Live at <https://nick.codes>.

Rebuilt in 2026 from a Jekyll blog into a Vite + React + Tailwind site, matching
the stack used on [mreneedesigns](https://github.com/nick-codes/mreneedesigns).

## Stack

| | |
|---|---|
| Build | Vite 7 |
| UI | React 19 |
| Routing | React Router 7 |
| Styling | Tailwind CSS 4 (CSS-first config — see below) |
| Deploy | `gh-pages` → GitHub Pages |

## Commands

```bash
npm install

npm run dev       # dev server on http://localhost:5173
npm run build     # -> dist/  (runs content + post-build steps)
npm run preview   # serve the built dist/
npm run lint
npm run deploy    # build, then publish dist/ to the gh-pages branch
```

## Where the content lives

Almost all copy is data, not markup. To change what the site says, edit these:

| File | Contains |
|---|---|
| `src/content/site.js` | Name, tagline, email, phone, Calendly URL, social links, nav |
| `src/content/services.js` | The four engagements — names, prices, durations, copy, "good for" lists |
| `src/posts/*.md` | Blog archive, Markdown with YAML front matter |

Prices appear in exactly one place (`services.js`) and flow to both the home
page cards and the services page. There is no second copy to forget.

## How the build works

Two Node scripts wrap `vite build`:

1. **`tools/build-content.mjs`** (pre-build) parses `src/posts/*.md` into
   `src/generated/posts.json` — front matter via `gray-matter`, Markdown via
   `marked`. Doing this at build time keeps the Markdown parser out of the
   browser bundle. It also rewrites the old absolute `http://nick.codes/...`
   self-links in the 2014 posts to root-relative paths.

2. **`tools/post-build.mjs`** (post-build) writes the things Vite does not:
   - `dist/404.html` — a byte-for-byte copy of `index.html`. GitHub Pages serves
     it for any unknown path, which boots the SPA directly at a deep URL like
     `/posts/left-turn-to-go` with no redirect hop.
   - `dist/CNAME` — the apex domain.
   - `dist/feed.xml` — Atom feed at the same path the old `jekyll-feed` plugin
     used, so existing subscribers are unaffected.
   - `dist/sitemap.xml` and `dist/robots.txt`.

`src/generated/` is gitignored; it is rebuilt on every `dev` and `build`.

## Tailwind configuration

There is deliberately **no `tailwind.config.js`**. Tailwind 4 is configured
CSS-first, so the theme (colours, fonts) lives in the `@theme` block at the top
of `src/index.css`. A `tailwind.config.js` would be inert unless explicitly
pulled in with `@config`.

## Adding a post

Drop a Markdown file in `src/posts/` named `YYYY-MM-DD-the-slug.md`:

```markdown
---
title: 'Post Title'
date: '2026-01-15'
description: 'One line used for the excerpt and meta description.'
tags: ['go', 'architecture']
---

Body copy here.
```

The filename is authoritative for both the date and the URL
(`/posts/the-slug`), which is how the original Jekyll permalinks were built.
The feed, sitemap and archive index all pick it up automatically.

## Deployment

`npm run deploy` builds and pushes `dist/` to the **`gh-pages`** branch.

> **One-time setup required.** This repo previously served Jekyll from the
> default branch. Before the first deploy, set
> *Settings → Pages → Build and deployment → Source* to **Deploy from a branch**,
> branch **`gh-pages`**, folder **`/ (root)`**. Until that is changed, the old
> Jekyll site will keep being served.

## Preserved from the old site

- All seven 2014 posts, at their original `/posts/:slug` URLs.
- `/about` and `/feed.xml`.
- `/archive`, `/categories`, `/tags`, `/tag/:name` and `/category/:name` now
  redirect to `/writing` rather than 404.

## Repository layout note

The repo root doubles as the dev container's home directory, so `Dockerfile`,
`docker-compose.yml`, `entrypoint.sh` and `scripts/` are container tooling
rather than part of the website. The `claude` / `claude:build` npm scripts
belong to that tooling and are kept in `package.json` alongside the site
scripts.

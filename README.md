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
   - **One `dist/<route>/index.html` per route.** This is the important one.
     Relying on `404.html` alone meant every page but the home page was served
     with an HTTP **404 status** — the content rendered, but search engines
     treat a 404 status as "does not exist" regardless of the body, so nothing
     was indexable. A real file per route makes GitHub Pages return 200.
     Each file also gets its own `<title>`, description, canonical and og tags
     baked in, so crawlers that do not execute JavaScript see correct metadata
     rather than the home page's.
   - `dist/404.html` — a copy of `index.html`, now only for genuinely unknown
     URLs.
   - `dist/CNAME` — the apex domain.
   - `dist/feed.xml` — Atom feed at the same path the old `jekyll-feed` plugin
     used, so existing subscribers are unaffected.
   - `dist/sitemap.xml` and `dist/robots.txt`.

   Route metadata lives in `src/content/routes.js` and is read by both the
   `<Seo>` component and this script, so the runtime and the build cannot
   drift.

### URLs have a trailing slash

Pages are served from directory indexes, so GitHub Pages 301s `/services` to
`/services/`. Canonical tags, the sitemap and the feed all use the
trailing-slash form — a canonical must name the final, non-redirecting URL.
`canonicalPath()` in `src/content/routes.js` is the single place that rule
lives.

`src/generated/` is gitignored; it is rebuilt on every `dev` and `build`.

## Images

| File | Purpose |
|---|---|
| `public/og.jpg` | 1200×630 social card (Open Graph / Twitter) |
| `public/nick-palmer.jpg` | 480×480 portrait used on `/about` and in the JSON-LD |
| `public/favicon.svg` | Browser tab icon |
| `tools/og-card.html` | Editable source for the social card |
| `tools/og-avatar-source.jpg` | 1024×1024 portrait, vendored from Gravatar |

The portrait originates from the Gravatar for `nick@sluggardy.net`. It is
vendored into the repo rather than hotlinked so the site does not depend on
Gravatar being reachable, and so the image cannot change without a commit.

To re-render the social card after editing `tools/og-card.html`:

```bash
npx playwright screenshot --viewport-size=1200,630 tools/og-card.html public/og.jpg
```

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
- `/archive`, `/categories`, `/tags`, `/tag/:name` and `/category/:name` are
  emitted as real 200 pages that canonical to `/writing`, so the old archive
  URLs keep their history instead of 404ing. Tag and category paths are
  enumerated from the posts, so they track content rather than a hard-coded
  list.

## Repository layout note

The repo root doubles as the dev container's home directory, so `Dockerfile`,
`docker-compose.yml`, `entrypoint.sh` and `scripts/` are container tooling
rather than part of the website. The `claude` / `claude:build` npm scripts
belong to that tooling and are kept in `package.json` alongside the site
scripts.

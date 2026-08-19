# nick.codes — working notes

Personal site for Nick Palmer, positioned as a **fractional CTO and principal
engineer for hire**. Vite + React 19 + Tailwind 4, deployed to GitHub Pages.

See `README.md` for commands and build mechanics. This file covers the things
that are easy to get wrong.

## The site's job

It sells four fixed-scope engagements. The message is deliberately *not*
"I'm looking for consulting work" — it is "I can provide senior technical
leadership without you hiring another full-time executive or engineering team."
Keep copy in that register: direct, specific, no agency-speak, no invented
metrics.

The single conversion action is the Calendly link
(`https://calendly.com/nickcodes/chat`), rendered through the `<BookCall>`
component in `src/components/ui.jsx`. Do not hand-write that URL elsewhere.

## Editing content

Copy is data. Change these rather than the JSX:

- `src/content/site.js` — identity, contact details, nav, credibility stats.
- `src/content/services.js` — the four engagements. **Prices live here only**;
  the home page cards and the services page both read from it.
- `src/posts/*.md` — the archive.

## Factual claims

Biographical copy on `/about` and the credibility stats on the home page are
drawn from Nick's LinkedIn and the previous site. Do not add outcomes, metrics,
client names or testimonials that are not already sourced — if a claim cannot
be pointed at, leave it out and ask.

## Conventions

- Tailwind 4 is configured **CSS-first** in the `@theme` block of
  `src/index.css`. There is no `tailwind.config.js` and adding one will not do
  anything unless it is wired up with `@config`.
- Semantic colour tokens only: `ink` / `ink-soft` / `ink-faint` for text,
  `paper` / `paper-raised` for surfaces, `rule` for borders, `accent` for the
  one accent colour. Avoid raw Tailwind palette classes like `text-gray-500`.
- The accent colour is used sparingly on purpose, so that calls to action are
  the only things competing for attention.
- Layout primitives (`Container`, `Section`, `Eyebrow`, `BookCall`,
  `ButtonLink`) live in `src/components/ui.jsx`. Reuse them.
- Per-page `<title>`/meta come from the `<Seo>` component, which mutates the
  static tags in `index.html` rather than rendering new ones — that keeps
  exactly one of each tag for crawlers that do not run JS.

## Do not break these

- **Post URLs.** `/posts/:slug` matches the original Jekyll permalinks. The slug
  comes from the Markdown filename, not front matter. Renaming a file changes a
  live URL.
- **`/feed.xml`.** Same path the old `jekyll-feed` plugin published; existing
  subscribers depend on it.
- **`dist/404.html`.** Must stay an exact copy of `index.html` — it is the SPA
  fallback GitHub Pages serves for deep links. `tools/post-build.mjs` handles it.
- **Legacy redirects** in `src/App.jsx` (`/archive`, `/categories`, `/tags`,
  `/tag/:name`, `/category/:name` → `/writing`).

## Verifying changes

`vite preview` has its own SPA fallback, which masks broken deep links. To test
the way GitHub Pages actually behaves, serve `dist/` with a server that returns
`404.html` for unknown paths and check a deep URL such as
`/posts/left-turn-to-go` loads directly.

## Deployment gotcha

`npm run deploy` publishes to the **`gh-pages`** branch. The repo historically
served Jekyll from the default branch, so GitHub Pages must be pointed at
`gh-pages` in *Settings → Pages* or the old site keeps serving.

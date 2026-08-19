// Runs after `vite build`. Emits the things GitHub Pages needs that Vite does
// not produce itself: the SPA fallback, the apex-domain CNAME, and the
// feed/sitemap/robots files that the old Jekyll plugins used to generate.
import { readFileSync, writeFileSync, copyFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')

const posts = JSON.parse(
  readFileSync(join(root, 'src', 'generated', 'posts.json'), 'utf8'),
)

const SITE = 'https://nick.codes'
const TITLE = 'Nick Palmer — Fractional CTO & Principal Engineer'
const DESCRIPTION =
  'Fractional CTO and principal engineer for hire. Architecture, AI strategy, cloud and scaling problems, and rescuing troubled projects.'

const escape = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

// --- SPA fallback ----------------------------------------------------------
// GitHub Pages serves 404.html for any path it has no file for. Making it a
// byte-for-byte copy of index.html means a deep link such as
// /posts/left-turn-to-go boots the app directly, with no redirect hop and no
// flash of a placeholder page.
copyFileSync(join(dist, 'index.html'), join(dist, '404.html'))

// --- Custom domain ---------------------------------------------------------
if (existsSync(join(root, 'CNAME'))) {
  copyFileSync(join(root, 'CNAME'), join(dist, 'CNAME'))
}

// --- Atom feed -------------------------------------------------------------
// The old site published /feed.xml via jekyll-feed. Keeping the same path means
// existing subscribers do not silently stop receiving posts.
const updated = posts.length
  ? new Date(`${posts[0].date}T00:00:00Z`).toISOString()
  : new Date(0).toISOString()

const feed = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escape(TITLE)}</title>
  <subtitle>${escape(DESCRIPTION)}</subtitle>
  <link href="${SITE}/feed.xml" rel="self" type="application/atom+xml"/>
  <link href="${SITE}/" rel="alternate" type="text/html"/>
  <updated>${updated}</updated>
  <id>${SITE}/</id>
  <author><name>Nick Palmer</name><email>nick@nick.codes</email></author>
${posts
  .map(
    (p) => `  <entry>
    <title>${escape(p.title)}</title>
    <link href="${SITE}/posts/${p.slug}" rel="alternate" type="text/html"/>
    <id>${SITE}/posts/${p.slug}</id>
    <published>${new Date(`${p.date}T00:00:00Z`).toISOString()}</published>
    <updated>${new Date(`${p.date}T00:00:00Z`).toISOString()}</updated>
    <summary>${escape(p.description || p.excerpt)}</summary>
    <content type="html">${escape(p.html)}</content>
  </entry>`,
  )
  .join('\n')}
</feed>
`
writeFileSync(join(dist, 'feed.xml'), feed, 'utf8')

// --- Sitemap ---------------------------------------------------------------
const routes = [
  { loc: '/', priority: '1.0' },
  { loc: '/services', priority: '0.9' },
  { loc: '/about', priority: '0.7' },
  { loc: '/contact', priority: '0.7' },
  { loc: '/writing', priority: '0.5' },
  ...posts.map((p) => ({ loc: `/posts/${p.slug}`, priority: '0.4', lastmod: p.date })),
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${SITE}${r.loc}</loc>${r.lastmod ? `\n    <lastmod>${r.lastmod}</lastmod>` : ''}
    <priority>${r.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`
writeFileSync(join(dist, 'sitemap.xml'), sitemap, 'utf8')

// --- robots ----------------------------------------------------------------
writeFileSync(
  join(dist, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`,
  'utf8',
)

console.log(
  `post-build: 404.html, CNAME, feed.xml (${posts.length} entries), sitemap.xml (${routes.length} urls), robots.txt`,
)

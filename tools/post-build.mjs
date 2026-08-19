// Runs after `vite build`. Emits the things GitHub Pages needs that Vite does
// not produce itself: the SPA fallback, the apex-domain CNAME, and the
// feed/sitemap/robots files that the old Jekyll plugins used to generate.
import { readFileSync, writeFileSync, copyFileSync, existsSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { routeMeta, legacyRedirects, fullTitle, canonicalPath } from '../src/content/routes.js'

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
// GitHub Pages serves 404.html for any path it has no file for. It serves it
// with a real 404 *status*, which is fine for genuinely unknown URLs but fatal
// for real pages: crawlers drop a 404 regardless of what the body contains.
// So 404.html covers only the unknown case, and every real route gets its own
// file below.
copyFileSync(join(dist, 'index.html'), join(dist, '404.html'))

// --- One real HTML file per route ------------------------------------------
// Each is the built index.html with route-specific metadata substituted in, so
// GitHub Pages returns 200 and crawlers that do not execute JavaScript still
// read the correct title, description and canonical URL. The client-side <Seo>
// component sets the same values during in-app navigation.
const template = readFileSync(join(dist, 'index.html'), 'utf8')

function pageFor(path, { title, description, type = 'website', canonical }) {
  const t = escape(fullTitle(title))
  const d = escape(description)
  const url = `${SITE}${canonicalPath(canonical || path)}`

  // Replacement *functions*, not strings: the service descriptions contain
  // prices like "$500", and a `$n` sequence in a replacement string is read as
  // a capture-group backreference.
  //
  // Patterns allow arbitrary whitespace between attributes because Vite passes
  // index.html through unminified, so multi-line <meta> tags survive verbatim.
  const sub = (html, label, re, value) => {
    // Assert the pattern *matched*, not that the output changed: substituting
    // a value for an identical one (og:type "website" on most routes) is a
    // legitimate no-op. A pattern that fails to match, however, would ship the
    // page carrying the home page's metadata — the sort of failure that looks
    // fine in a browser and stays invisible until it costs you search traffic.
    if (!re.test(html)) {
      throw new Error(`post-build: pattern for "${label}" did not match on ${path}`)
    }
    return html.replace(re, (_m, open, close) => open + value + close)
  }

  return [
    ['title', /(<title>)[^<]*(<\/title>)/, t],
    ['description', /(<meta\s+name="description"\s+content=")[^"]*(")/, d],
    ['canonical', /(<link\s+rel="canonical"\s+href=")[^"]*(")/, url],
    ['og:title', /(<meta\s+property="og:title"\s+content=")[^"]*(")/, t],
    ['og:description', /(<meta\s+property="og:description"\s+content=")[^"]*(")/, d],
    ['og:url', /(<meta\s+property="og:url"\s+content=")[^"]*(")/, url],
    ['og:type', /(<meta\s+property="og:type"\s+content=")[^"]*(")/, type],
    ['twitter:title', /(<meta\s+name="twitter:title"\s+content=")[^"]*(")/, t],
    ['twitter:description', /(<meta\s+name="twitter:description"\s+content=")[^"]*(")/, d],
  ].reduce((html, [label, re, value]) => sub(html, label, re, value), template)
}

function emit(path, html) {
  // A directory with index.html is served at both /path and /path/ by every
  // static host, unlike relying on extensionless .html resolution.
  const dir = join(dist, path)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), html, 'utf8')
}

let emitted = 0
for (const [path, meta] of Object.entries(routeMeta)) {
  if (path === '/') continue // dist/index.html already is the home page
  emit(path, pageFor(path, meta))
  emitted++
}

for (const post of posts) {
  emit(`/posts/${post.slug}`, pageFor(`/posts/${post.slug}`, {
    title: post.title,
    description: post.description || post.excerpt,
    type: 'article',
  }))
  emitted++
}

for (const path of legacyRedirects) {
  emit(path, pageFor(path, { ...routeMeta['/writing'], canonical: '/writing' }))
  emitted++
}

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
    <link href="${SITE}${canonicalPath(`/posts/${p.slug}`)}" rel="alternate" type="text/html"/>
    <id>${SITE}${canonicalPath(`/posts/${p.slug}`)}</id>
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
    <loc>${SITE}${canonicalPath(r.loc)}</loc>${r.lastmod ? `\n    <lastmod>${r.lastmod}</lastmod>` : ''}
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
  `post-build: ${emitted} route pages, 404.html, CNAME, feed.xml (${posts.length} entries), ` +
    `sitemap.xml (${routes.length} urls), robots.txt`,
)

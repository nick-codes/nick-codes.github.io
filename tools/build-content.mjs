// Converts the Markdown posts in src/posts into a single JSON module consumed
// by the app. Doing this at build time keeps the Markdown parser out of the
// browser bundle and means front matter never has to be parsed client-side.
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'
import { marked } from 'marked'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const postsDir = join(root, 'src', 'posts')
const outDir = join(root, 'src', 'generated')

marked.setOptions({ gfm: true, breaks: false })

// Filenames carry the publication date, Jekyll-style:
// 2014-05-20-view-holder-pattern-improved.md -> 2014-05-20 + the slug.
const FILENAME = /^(\d{4})-(\d{2})-(\d{2})-(.+)\.md$/

// These posts were written when the site was served over plain HTTP and linked
// to itself absolutely. Rewrite those to root-relative paths so intra-site
// links stay inside the SPA instead of triggering a full page load, and drop
// the trailing slash the old Jekyll permalinks used.
function rewriteInternalLinks(html) {
  return html
    .replace(/https?:\/\/nick\.codes\/posts\/([a-z0-9-]+)\/?/gi, '/posts/$1')
    .replace(/https?:\/\/nick\.codes\/?/gi, '/')
}

function toText(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/~~~[\s\S]*?~~~/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#*_>`]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function excerptOf(markdown, limit = 240) {
  const text = toText(markdown)
  if (text.length <= limit) return text
  const cut = text.slice(0, limit)
  return cut.slice(0, cut.lastIndexOf(' ')) + '…'
}

function asArray(value) {
  if (!value) return []
  return (Array.isArray(value) ? value : [value]).map(String)
}

const posts = readdirSync(postsDir)
  .filter((name) => FILENAME.test(name))
  .map((name) => {
    const [, year, month, day, slug] = name.match(FILENAME)
    const raw = readFileSync(join(postsDir, name), 'utf8')
    const { data, content } = matter(raw)

    // Front matter dates win over the filename when both are present, but the
    // filename is authoritative for the slug because that is what the old
    // permalinks were built from.
    const date = data.date ? String(data.date).slice(0, 10) : `${year}-${month}-${day}`

    return {
      slug,
      title: data.title ? String(data.title) : slug,
      date,
      tags: asArray(data.tags),
      categories: asArray(data.categories),
      description: data.description ? String(data.description) : '',
      excerpt: excerptOf(content),
      html: rewriteInternalLinks(marked.parse(content)),
    }
  })
  .sort((a, b) => b.date.localeCompare(a.date))

mkdirSync(outDir, { recursive: true })
writeFileSync(
  join(outDir, 'posts.json'),
  JSON.stringify(posts, null, 2) + '\n',
  'utf8',
)

const tags = [...new Set(posts.flatMap((p) => p.tags))].length
console.log(`content: ${posts.length} posts, ${tags} distinct tags -> src/generated/posts.json`)

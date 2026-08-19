import { useEffect } from 'react'
import { site } from '../content/site'
import { canonicalPath } from '../content/routes'

// Updates the existing head tags in place rather than rendering new ones.
// React 19 would hoist <title>/<meta> for us, but index.html already ships a
// static set for crawlers that do not execute JS — mutating those keeps exactly
// one of each tag instead of leaving duplicates behind.
function setMeta(selector, value) {
  const el = document.head.querySelector(selector)
  if (el && value) el.setAttribute('content', value)
}

export default function Seo({ title, description, path, type = 'website' }) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${site.name}` : site.title
    const desc = description || site.description
    const url = `${site.url}${canonicalPath(path)}`

    document.title = fullTitle
    setMeta('meta[name="description"]', desc)
    setMeta('meta[property="og:title"]', fullTitle)
    setMeta('meta[property="og:description"]', desc)
    setMeta('meta[property="og:url"]', url)
    setMeta('meta[property="og:type"]', type)
    setMeta('meta[name="twitter:title"]', fullTitle)
    setMeta('meta[name="twitter:description"]', desc)

    const canonical = document.head.querySelector('link[rel="canonical"]')
    if (canonical) canonical.setAttribute('href', url)
  }, [title, description, path, type])

  return null
}

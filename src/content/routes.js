// Canonical metadata for every static route.
//
// Single source of truth, read by two consumers:
//   1. the <Seo> component at runtime, for client-side navigation, and
//   2. tools/post-build.mjs, which bakes these into a real HTML file per route
//      so GitHub Pages serves a 200 and non-JS crawlers see correct tags.
//
// Imports use explicit .js extensions so this module is importable by plain
// Node (the build script) as well as by Vite.
import { site } from './site.js'

export const routeMeta = {
  '/': {
    title: null, // the site title is already the full positioning statement
    description: site.description,
  },
  '/services': {
    title: 'Services',
    description:
      'Four fixed-scope engagements: a $500 engineering diagnostic, a $2,500 AI automation sprint, a $3,500–$5,000 engineering rescue sprint, and fractional CTO work from $6,000/month.',
  },
  '/about': {
    title: 'About',
    description:
      'Nick Palmer — twenty years across roughly twenty startups, four of them as principal engineer in regulated fintech. PhD in distributed systems from VU Amsterdam. Based in Houston.',
  },
  '/writing': {
    title: 'Writing',
    description:
      'Archived posts on Android, build systems, Go, Scala and Swift — written in 2014 and kept online.',
  },
  '/contact': {
    title: 'Contact',
    description:
      'Book a 30-minute call, or reach Nick Palmer by email or phone. Based in Houston, working with clients anywhere.',
  },
}

// Matches the title format the <Seo> component produces.
export function fullTitle(title) {
  return title ? `${title} — ${site.name}` : site.title
}

export function metaFor(path) {
  return { ...routeMeta[path], path }
}

// Old Jekyll index URLs. They are folded into /writing, and App.jsx redirects
// them client-side. Static hosting cannot issue a 301, so the build emits a
// real 200 page for each with its canonical pointing at /writing — which is
// how you consolidate them in search without a server.
export const legacyRedirects = [
  '/archive',
  '/categories',
  '/tags',
]

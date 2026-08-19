// Single source of truth for site-wide identity, contact details and metadata.
export const site = {
  name: 'Nick Palmer',
  domain: 'nick.codes',
  url: 'https://nick.codes',
  title: 'Nick Palmer — Fractional CTO & Principal Engineer',
  tagline: 'Senior technical leadership, without the full-time hire.',
  description:
    'Fractional CTO and principal engineer for hire. Architecture, AI strategy, ' +
    'cloud and scaling problems, and rescuing troubled projects — in fixed-scope ' +
    'engagements with clear prices.',
  location: 'Houston, Texas',
  email: 'nick@nick.codes',
  phone: '650.704.4969',
  phoneHref: '+16507044969',
  calendly: 'https://calendly.com/nickcodes/chat',
  linkedin: 'https://www.linkedin.com/in/nickpalmer/',
  github: 'https://github.com/nick-codes',
}

export const nav = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/writing', label: 'Writing' },
  { to: '/contact', label: 'Contact' },
]

// Short, checkable credibility statements. Keep these factual.
export const credentials = [
  {
    stat: '20+',
    label: 'startups',
    detail: 'Hands-on across roughly twenty startups, at every layer of the stack.',
  },
  {
    stat: '4 yrs',
    label: 'principal engineer, regulated fintech',
    detail:
      'Led architecture, delivery and operational maturity at Array, operating in a de facto VP of Engineering capacity.',
  },
  {
    stat: 'PhD',
    label: 'distributed systems',
    detail:
      'Doctorate and MSc in parallel and distributed computer systems from VU Amsterdam.',
  },
]

import { Link } from 'react-router-dom'
import { site, nav } from '../content/site'
import { Container } from './ui'

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-rule bg-paper-raised">
      <Container className="py-12">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="flex items-baseline gap-1.5 font-semibold tracking-tight">
              <span className="font-mono text-accent">&gt;</span>
              <span className="text-ink">{site.domain}</span>
            </p>
            <p className="mt-3 max-w-xs text-sm text-ink-faint">{site.tagline}</p>
            <p className="mt-3 text-sm text-ink-faint">{site.location}</p>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink">Site</h2>
            <ul className="mt-4 space-y-2">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-sm text-ink-faint hover:text-accent">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink">Contact</h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href={site.calendly} target="_blank" rel="noopener noreferrer" className="font-medium text-accent hover:text-accent-dark">
                  Book a call
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="text-ink-faint hover:text-accent">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={`tel:${site.phoneHref}`} className="text-ink-faint hover:text-accent">
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="text-ink-faint hover:text-accent">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={site.github} target="_blank" rel="noopener noreferrer" className="text-ink-faint hover:text-accent">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-rule pt-6 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© 2013–{new Date().getFullYear()} Nick Palmer.</p>
          <a href="/feed.xml" className="hover:text-accent">RSS</a>
        </div>
      </Container>
    </footer>
  )
}

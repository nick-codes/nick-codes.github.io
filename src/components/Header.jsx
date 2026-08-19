import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { site, nav } from '../content/site'
import { Container, BookCall } from './ui'

export default function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  // Close the mobile menu whenever the route changes, otherwise it stays open
  // over the new page after a tap.
  useEffect(() => setOpen(false), [location.pathname])

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? 'text-ink' : 'text-ink-faint hover:text-ink'
    }`

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/90 backdrop-blur-sm">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link to="/" className="group flex items-baseline gap-1.5 font-semibold tracking-tight">
            <span className="font-mono text-accent">&gt;</span>
            <span className="text-ink">{site.domain}</span>
          </Link>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
            {nav.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'} className={linkClass}>
                {item.label}
              </NavLink>
            ))}
            <BookCall className="!px-4 !py-2" />
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-md text-ink md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? (
                <>
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>

        {open && (
          <nav id="mobile-nav" className="border-t border-rule py-4 md:hidden" aria-label="Mobile">
            <ul className="flex flex-col gap-1">
              {nav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `block rounded-md px-2 py-2.5 text-base font-medium ${
                        isActive ? 'bg-accent-wash text-accent' : 'text-ink-soft'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <BookCall className="mt-3 w-full" />
          </nav>
        )}
      </Container>
    </header>
  )
}

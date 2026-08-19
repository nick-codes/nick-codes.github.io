import { Link } from 'react-router-dom'
import { site } from '../content/site'

export function Container({ className = '', children }) {
  return (
    <div className={`mx-auto w-full max-w-5xl px-5 sm:px-8 ${className}`}>{children}</div>
  )
}

export function Section({ className = '', children, ...rest }) {
  return (
    <section className={`py-16 sm:py-20 ${className}`} {...rest}>
      <Container>{children}</Container>
    </section>
  )
}

export function Eyebrow({ children }) {
  return (
    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
      {children}
    </p>
  )
}

const buttonBase =
  'inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition-colors duration-150'

const variants = {
  primary: 'bg-accent text-white hover:bg-accent-dark',
  secondary: 'border border-rule bg-paper-raised text-ink hover:border-accent hover:text-accent',
  ghost: 'text-accent hover:text-accent-dark',
}

// The primary conversion path is the Calendly link, so it gets its own
// component to keep the URL and the wording consistent across every page.
export function BookCall({ variant = 'primary', className = '', children }) {
  return (
    <a
      href={site.calendly}
      target="_blank"
      rel="noopener noreferrer"
      className={`${buttonBase} ${variants[variant]} ${className}`}
    >
      {children || 'Book a call'}
      <span aria-hidden="true">→</span>
    </a>
  )
}

export function ButtonLink({ to, variant = 'secondary', className = '', children }) {
  return (
    <Link to={to} className={`${buttonBase} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  )
}

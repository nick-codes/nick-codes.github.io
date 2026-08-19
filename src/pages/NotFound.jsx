import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { Container } from '../components/ui'

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" path="/404" description="That page does not exist." />
      <Container className="py-28 text-center">
        <p className="font-mono text-sm text-accent">404</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          That page does not exist.
        </h1>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-ink-soft">
          The site was rebuilt in 2026 and a few old URLs moved. The archive is
          still here, and everything else is a click away.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="rounded-md bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-accent-dark"
          >
            Home
          </Link>
          <Link
            to="/services"
            className="rounded-md border border-rule bg-paper-raised px-5 py-3 text-sm font-semibold text-ink hover:border-accent hover:text-accent"
          >
            Services
          </Link>
          <Link
            to="/writing"
            className="rounded-md border border-rule bg-paper-raised px-5 py-3 text-sm font-semibold text-ink hover:border-accent hover:text-accent"
          >
            Writing
          </Link>
        </div>
      </Container>
    </>
  )
}

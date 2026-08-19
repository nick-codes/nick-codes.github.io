import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Seo from '../components/Seo'
import { Container, Section, Eyebrow, BookCall } from '../components/ui'
import { site } from '../content/site'
import { services } from '../content/services'

export default function Services() {
  const { hash } = useLocation()

  // Cards on the home page deep-link to a specific engagement. The sticky
  // header would otherwise cover the heading we just scrolled to.
  useEffect(() => {
    if (!hash) return
    const el = document.querySelector(hash)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top, behavior: 'smooth' })
  }, [hash])

  return (
    <>
      <Seo
        title="Services"
        path="/services"
        description="Four fixed-scope engagements: a $500 engineering diagnostic, a $2,500 AI automation sprint, a $3,500–$5,000 engineering rescue sprint, and fractional CTO work from $6,000/month."
      />

      <Container className="pt-16 pb-12 sm:pt-20">
        <div className="max-w-3xl">
          <Eyebrow>Services</Eyebrow>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
            Four ways to work together.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            Every engagement below has a defined scope and a published price.
            Most clients start small — a diagnostic or a sprint — and only move
            to something ongoing once we both know it is worth it.
          </p>
        </div>
      </Container>

      <div className="border-t border-rule">
        {services.map((s, i) => (
          <section
            key={s.slug}
            id={s.slug}
            className={`scroll-mt-20 border-b border-rule ${
              i % 2 === 1 ? 'bg-paper-raised' : ''
            }`}
          >
            <Container className="py-14 sm:py-16">
              <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
                <div>
                  <p className="font-mono text-sm text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                    {s.name}
                  </h2>

                  <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <p className="text-2xl font-bold text-accent">
                      {s.price}
                      {s.priceSuffix && (
                        <span className="text-base font-normal text-ink-faint">
                          {s.priceSuffix}
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-ink-faint">{s.duration}</p>
                  </div>

                  <div className="mt-6 space-y-4">
                    {s.body.map((p) => (
                      <p key={p} className="leading-relaxed text-ink-soft">
                        {p}
                      </p>
                    ))}
                  </div>

                  <BookCall className="mt-8" variant="secondary">
                    Book a call about this
                  </BookCall>
                </div>

                <div className="rounded-xl border border-rule bg-paper p-6 lg:sticky lg:top-24 lg:self-start">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink">
                    Good for
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {s.goodFor.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
                        <span aria-hidden="true" className="mt-1 select-none font-mono text-accent">
                          ▸
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Container>
          </section>
        ))}
      </div>

      <Section>
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight text-ink">
            Not sure which one you need?
          </h2>
          <p className="mt-4 leading-relaxed text-ink-soft">
            Then start with the diagnostic. Ninety minutes is usually enough to
            work out whether your problem is a one-week fix or a six-month
            change of direction — and you will leave with a written plan
            either way.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <BookCall />
            <a
              href={`mailto:${site.email}`}
              className="text-sm font-medium text-ink-faint underline-offset-4 hover:text-accent hover:underline sm:ml-2"
            >
              or email {site.email}
            </a>
          </div>
        </div>
      </Section>
    </>
  )
}

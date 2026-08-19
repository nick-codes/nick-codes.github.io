import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { Container, Section, Eyebrow, BookCall, ButtonLink } from '../components/ui'
import { site, credentials } from '../content/site'
import { services } from '../content/services'

export default function Home() {
  return (
    <>
      <Seo path="/" />

      {/* Hero ------------------------------------------------------------ */}
      <Container className="pt-16 pb-14 sm:pt-24 sm:pb-20">
        <div className="max-w-3xl">
          <Eyebrow>Fractional CTO &amp; Principal Engineer</Eyebrow>
          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Senior technical leadership, without the full-time hire.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
            I am Nick Palmer. For twenty years I have built and led engineering
            in startups — most recently four years as principal engineer in
            regulated fintech, operating as a de facto VP of Engineering. Now I
            do that work for a handful of companies at a time.
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
            If you need the judgement of a CTO but not another executive salary,
            that is the gap I fill.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <BookCall />
            <ButtonLink to="/services">See how I work</ButtonLink>
          </div>
        </div>
      </Container>

      {/* Credibility ----------------------------------------------------- */}
      <div className="border-y border-rule bg-paper-raised">
        <Container className="py-10">
          <dl className="grid gap-8 sm:grid-cols-3">
            {credentials.map((c) => (
              <div key={c.label}>
                <dt className="flex flex-wrap items-baseline gap-x-2">
                  <span className="whitespace-nowrap text-2xl font-bold tracking-tight text-accent">
                    {c.stat}
                  </span>
                  <span className="text-sm font-semibold text-ink">{c.label}</span>
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-ink-faint">{c.detail}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </div>

      {/* Services -------------------------------------------------------- */}
      <Section>
        <div className="max-w-2xl">
          <Eyebrow>Engagements</Eyebrow>
          <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Fixed scope. Published prices.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            Four ways to work together, from a single session to ongoing
            leadership. You know what each one costs before you enquire.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2">
          {services.map((s) => (
            <li
              key={s.slug}
              className="flex flex-col rounded-xl border border-rule bg-paper-raised p-6 transition-colors hover:border-accent"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <h3 className="text-lg font-semibold leading-snug text-ink">{s.name}</h3>
                <p className="shrink-0 font-semibold text-accent">
                  {s.price}
                  {s.priceSuffix && (
                    <span className="text-sm font-normal text-ink-faint">{s.priceSuffix}</span>
                  )}
                </p>
              </div>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-ink-faint">
                {s.duration}
              </p>
              <p className="mt-4 flex-grow text-sm leading-relaxed text-ink-soft">{s.summary}</p>
              <Link
                to={`/services#${s.slug}`}
                className="mt-5 text-sm font-semibold text-accent hover:text-accent-dark"
              >
                What this includes →
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* What I'm brought in for ------------------------------------------ */}
      <div className="border-t border-rule bg-paper-raised">
        <Section>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <Eyebrow>What I get called about</Eyebrow>
              <h2 className="text-3xl font-bold tracking-tight text-ink">
                Usually one of these.
              </h2>
              <p className="mt-4 leading-relaxed text-ink-soft">
                My background is distributed systems — a doctorate in it, then
                two decades of building them in anger. In practice that means I
                get called when something is either badly broken or about to be.
              </p>
            </div>
            <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {[
                'The architecture will not survive the next 10×',
                'Everyone has an AI opinion and no AI strategy',
                'The cloud bill is growing faster than revenue',
                'Shipping has quietly slowed to a crawl',
                'The prototype works but cannot go to production',
                'A key engineer left and took the context with them',
                'An investor wants technical diligence done properly',
                'There is no one senior to sanity-check decisions',
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
                  <span aria-hidden="true" className="mt-1 select-none font-mono text-accent">
                    ▸
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Section>
      </div>

      {/* Closing CTA ----------------------------------------------------- */}
      <Section>
        <div className="rounded-2xl bg-ink px-7 py-12 sm:px-12 sm:py-14">
          <h2 className="max-w-xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Start with a conversation.
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-white/70">
            Tell me what is in front of you. If I am the right person for it, I
            will say so and tell you which engagement fits. If I am not, I will
            say that too — and point you somewhere better.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <BookCall className="!bg-white !text-ink hover:!bg-white/90" />
            <a
              href={`mailto:${site.email}`}
              className="text-sm font-medium text-white/70 underline-offset-4 hover:text-white hover:underline sm:ml-3"
            >
              or email {site.email}
            </a>
          </div>
        </div>
      </Section>
    </>
  )
}

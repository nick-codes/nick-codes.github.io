import Seo from '../components/Seo'
import { metaFor } from '../content/routes'
import { Container, Section, Eyebrow, BookCall } from '../components/ui'
import { site } from '../content/site'

const education = [
  {
    credential: 'PhD, Distributed Software for Mobile Devices',
    place: 'VU Amsterdam',
    note: 'Thesis: “Smartphones: A Platform for Disaster Management”.',
  },
  {
    credential: 'MSc, Parallel and Distributed Computer Systems',
    place: 'VU Amsterdam',
  },
  {
    credential: 'BSc, Computer Engineering',
    place: 'University of Arizona',
  },
]

const recognition = [
  'Best Student Paper — MobiCASE 2010',
  'Best Demo — MobiCASE 2010',
  'Best Presentation — HotMobile 2009',
  'Google Android Developer Challenge, 6th place — 2009',
]

export default function About() {
  return (
    <>
      <Seo {...metaFor('/about')} />

      <Container className="pt-16 pb-12 sm:pt-20">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-10">
          <img
            src="/nick-palmer.jpg"
            alt="Nick Palmer"
            width="480"
            height="480"
            className="h-28 w-28 shrink-0 rounded-full object-cover ring-4 ring-rule sm:h-36 sm:w-36"
          />
          <div className="max-w-2xl">
            <Eyebrow>About</Eyebrow>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
              I have spent twenty years being the person they call.
            </h1>
          </div>
        </div>
      </Container>

      <Container className="pb-16">
        <div className="grid gap-14 lg:grid-cols-[1.5fr_1fr]">
          <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-ink-soft">
            <p>
              Most recently that was four years as a principal engineer at
              Array, a regulated fintech, where I led architecture, delivery and
              operational maturity — in practice, a de facto VP of Engineering.
              Before that, roughly twenty startups.
            </p>
            <p>
              The range matters more than the count. I have worked on the
              internals of an embedded Java virtual machine and ported it to
              real-time embedded operating systems. I have written middleware
              for the cable billing industry, and front-ends and servers for
              traders in fixed income derivatives. I have shipped mobile
              applications, distributed backends, cloud infrastructure and a
              long tail of websites. There is not much of the stack I have not
              had my hands in, which is why I am usually quick to spot where a
              problem actually lives rather than where it is being reported.
            </p>
            <p>
              Academically my background is distributed systems: a doctorate and
              a master's from VU Amsterdam, on distributed software for mobile
              devices. That work was about coordination, partial failure and
              making unreliable components behave — which turns out to describe
              most production systems, and a fair number of engineering
              organizations.
            </p>

            <h2 className="!mt-12 text-2xl font-bold tracking-tight text-ink">
              How I actually work
            </h2>
            <p>
              I lead with questions rather than prescriptions. Most teams I meet
              are not short of ideas or effort — they are operating on an
              assumption nobody has said out loud in a year. The fastest way I
              can help is usually to surface that assumption, not to arrive with
              a prepackaged answer about what your architecture should be.
            </p>
            <p>
              I also stay hands-on. I write code on most engagements. Technical
              leadership that has drifted too far from the actual system tends
              to produce advice that is directionally right and practically
              useless, and I would rather be the other kind of useful.
            </p>
            <p>
              And I try to leave teams better than I found them. If I have been
              embedded with your engineers for a month and they have not learned
              anything from it, I have not done the job properly.
            </p>

            <h2 className="!mt-12 text-2xl font-bold tracking-tight text-ink">
              Outside the work
            </h2>
            <p>
              I am based in {site.location}. I cook seriously, and I practise
              Ving Tsun Kung Fu — which I am told I should not be asked about
              unless you have time to spare.
            </p>
          </div>

          <aside className="space-y-10 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border border-rule bg-paper-raised p-6">
              <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink">
                Education
              </h2>
              <ul className="mt-4 space-y-4">
                {education.map((e) => (
                  <li key={e.credential}>
                    <p className="text-sm font-semibold leading-snug text-ink">{e.credential}</p>
                    <p className="text-sm text-ink-faint">{e.place}</p>
                    {e.note && <p className="mt-1 text-xs text-ink-faint">{e.note}</p>}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-rule bg-paper-raised p-6">
              <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink">
                Recognition
              </h2>
              <ul className="mt-4 space-y-2.5">
                {recognition.map((r) => (
                  <li key={r} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
                    <span aria-hidden="true" className="mt-1 select-none font-mono text-accent">
                      ▸
                    </span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-rule bg-paper-raised p-6">
              <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink">
                Elsewhere
              </h2>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-dark">
                    LinkedIn — full history
                  </a>
                </li>
                <li>
                  <a href={site.github} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-dark">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </Container>

      <div className="border-t border-rule bg-paper-raised">
        <Section>
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-ink">
              Think I might be useful?
            </h2>
            <p className="mt-4 leading-relaxed text-ink-soft">
              The quickest way to find out is to talk for half an hour.
            </p>
            <BookCall className="mt-7" />
          </div>
        </Section>
      </div>
    </>
  )
}

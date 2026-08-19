import Seo from '../components/Seo'
import { Container, Eyebrow, BookCall } from '../components/ui'
import { site } from '../content/site'

const channels = [
  { label: 'Email', value: site.email, href: `mailto:${site.email}` },
  { label: 'Phone', value: site.phone, href: `tel:${site.phoneHref}` },
  { label: 'LinkedIn', value: '/in/nickpalmer', href: site.linkedin, external: true },
  { label: 'GitHub', value: '@nick-codes', href: site.github, external: true },
]

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact"
        path="/contact"
        description="Book a 30-minute call, or reach Nick Palmer by email or phone. Based in Houston, working with clients anywhere."
      />

      <Container className="pt-16 pb-20 sm:pt-20">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr]">
          <div className="max-w-2xl">
            <Eyebrow>Contact</Eyebrow>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
              Let's talk about what is in front of you.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              The fastest route is to put half an hour in my calendar. Come with
              the actual problem rather than a polished version of it — the call
              is more useful that way, and I will tell you honestly whether I am
              the right person for it.
            </p>

            <div className="mt-9">
              <BookCall>Book a 30-minute call</BookCall>
            </div>

            <div className="mt-12 rounded-xl border border-rule bg-paper-raised p-6">
              <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink">
                What happens next
              </h2>
              <ol className="mt-5 space-y-4">
                {[
                  'We talk for thirty minutes. No charge, no pitch deck.',
                  'If there is a fit, I tell you which engagement suits and what it costs.',
                  'If there is not, I say so — and point you at someone better suited.',
                ].map((step, i) => (
                  <li key={step} className="flex gap-4">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-wash font-mono text-xs font-semibold text-accent">
                      {i + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-ink-soft">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border border-rule bg-paper-raised p-6">
              <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink">
                Direct
              </h2>
              <dl className="mt-5 space-y-4">
                {channels.map((c) => (
                  <div key={c.label}>
                    <dt className="text-xs uppercase tracking-wide text-ink-faint">{c.label}</dt>
                    <dd className="mt-0.5">
                      <a
                        href={c.href}
                        {...(c.external
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                        className="font-medium text-accent hover:text-accent-dark"
                      >
                        {c.value}
                      </a>
                    </dd>
                  </div>
                ))}
                <div>
                  <dt className="text-xs uppercase tracking-wide text-ink-faint">Based in</dt>
                  <dd className="mt-0.5 font-medium text-ink">{site.location}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-ink-faint">Working with</dt>
                  <dd className="mt-0.5 font-medium text-ink">Clients anywhere, remote</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </Container>
    </>
  )
}

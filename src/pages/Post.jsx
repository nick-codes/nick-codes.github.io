import { Link, useParams, Navigate } from 'react-router-dom'
import Seo from '../components/Seo'
import { Container, Section, BookCall } from '../components/ui'
import posts from '../generated/posts.json'

const formatDate = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })

export default function Post() {
  const { slug } = useParams()
  const index = posts.findIndex((p) => p.slug === slug)

  if (index === -1) return <Navigate to="/writing" replace />

  const post = posts[index]
  // posts.json is sorted newest first, so the next-older post is the one after.
  const older = posts[index + 1]
  const newer = posts[index - 1]

  return (
    <>
      <Seo
        title={post.title}
        path={`/posts/${post.slug}`}
        description={post.description || post.excerpt}
        type="article"
      />

      <Container className="pt-12 pb-16 sm:pt-16">
        <article className="mx-auto max-w-2xl">
          <Link to="/writing" className="text-sm font-medium text-accent hover:text-accent-dark">
            ← All writing
          </Link>

          <header className="mt-6 border-b border-rule pb-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
              {post.title}
            </h1>
            <p className="mt-3 font-mono text-xs uppercase tracking-wide text-ink-faint">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </p>
            {post.tags.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded bg-accent-wash px-2 py-0.5 font-mono text-xs text-accent"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </header>

          <div className="mt-6 rounded-lg border border-rule bg-paper-raised px-4 py-3 text-sm text-ink-faint">
            This post is from {post.date.slice(0, 4)} and is kept online as an
            archive. Some of the tools it discusses have changed considerably
            since.
          </div>

          {/* Content is Markdown authored by the site owner and converted at
              build time — not third-party input — so rendering it as HTML is
              safe here. */}
          <div
            className="prose-post mt-10"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          <nav className="mt-14 grid gap-4 border-t border-rule pt-8 sm:grid-cols-2">
            {older ? (
              <Link
                to={`/posts/${older.slug}`}
                className="rounded-lg border border-rule p-4 transition-colors hover:border-accent"
              >
                <span className="text-xs uppercase tracking-wide text-ink-faint">Older</span>
                <span className="mt-1 block font-semibold text-ink">{older.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {newer && (
              <Link
                to={`/posts/${newer.slug}`}
                className="rounded-lg border border-rule p-4 text-right transition-colors hover:border-accent sm:col-start-2"
              >
                <span className="text-xs uppercase tracking-wide text-ink-faint">Newer</span>
                <span className="mt-1 block font-semibold text-ink">{newer.title}</span>
              </Link>
            )}
          </nav>
        </article>
      </Container>

      <div className="border-t border-rule bg-paper-raised">
        <Section>
          <div className="mx-auto max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-ink">
              These days I do this for a living.
            </h2>
            <p className="mt-4 leading-relaxed text-ink-soft">
              I work as a fractional CTO and principal engineer — architecture,
              AI strategy, scaling and rescuing troubled projects.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <BookCall />
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-rule bg-paper px-5 py-3 text-sm font-semibold text-ink hover:border-accent hover:text-accent"
              >
                See services
              </Link>
            </div>
          </div>
        </Section>
      </div>
    </>
  )
}

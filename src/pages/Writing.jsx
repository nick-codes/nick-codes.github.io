import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { Container, Eyebrow } from '../components/ui'
import posts from '../generated/posts.json'

const formatDate = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })

export default function Writing() {
  return (
    <>
      <Seo
        title="Writing"
        path="/writing"
        description="Archived posts on Android, build systems, Go, Scala and Swift — written between 2014 and 2015 and kept online."
      />

      <Container className="pt-16 pb-12 sm:pt-20">
        <div className="max-w-3xl">
          <Eyebrow>Writing</Eyebrow>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
            The archive.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            These posts date from 2014, when this site was a developer blog and
            I was mostly writing about Android, build systems and the languages
            I was moving between. They are old, and some of the tooling has
            moved on considerably — but the links still work, so they stay up.
          </p>
        </div>
      </Container>

      <Container className="pb-20">
        <ul className="max-w-3xl divide-y divide-rule border-t border-rule">
          {posts.map((post) => (
            <li key={post.slug} className="py-7">
              <p className="font-mono text-xs uppercase tracking-wide text-ink-faint">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight">
                <Link to={`/posts/${post.slug}`} className="text-ink hover:text-accent">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 leading-relaxed text-ink-soft">
                {post.description || post.excerpt}
              </p>
              {post.tags.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-2">
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
            </li>
          ))}
        </ul>

        <p className="mt-10 text-sm text-ink-faint">
          Subscribe via{' '}
          <a href="/feed.xml" className="text-accent hover:text-accent-dark">
            RSS
          </a>
          .
        </p>
      </Container>
    </>
  )
}

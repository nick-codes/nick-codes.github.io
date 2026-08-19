import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Client-side navigation preserves scroll position by default, which is wrong
// when moving between unrelated pages. Anchor links are left alone.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

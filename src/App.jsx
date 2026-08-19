import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'
import Writing from './pages/Writing'
import Post from './pages/Post'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col bg-paper">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/writing" element={<Writing />} />
            <Route path="/posts/:slug" element={<Post />} />
            <Route path="/contact" element={<Contact />} />

            {/* Legacy Jekyll routes. The old site published an archive plus
                category and tag indexes; all three are now folded into
                /writing, so redirect rather than 404 on inbound links. */}
            <Route path="/posts" element={<Navigate to="/writing" replace />} />
            <Route path="/archive" element={<Navigate to="/writing" replace />} />
            <Route path="/categories" element={<Navigate to="/writing" replace />} />
            <Route path="/tags" element={<Navigate to="/writing" replace />} />
            <Route path="/tag/:name" element={<Navigate to="/writing" replace />} />
            <Route path="/category/:name" element={<Navigate to="/writing" replace />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

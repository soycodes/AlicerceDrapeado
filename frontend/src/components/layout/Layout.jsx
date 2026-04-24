import { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import BackToTop from '../ui/BackToTop'

/**
 * Layout — wraps every page with header, footer, and global UI elements.
 */
export default function Layout({ children }) {
  // Remove focus outline on mouse click, restore on keyboard nav
  useEffect(() => {
    const handleMouseDown = () => document.body.classList.add('using-mouse')
    const handleKeyDown = (e) => {
      if (e.key === 'Tab') document.body.classList.remove('using-mouse')
    }
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}

import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'
import CircuitBackground from '../ui/CircuitBackground/CircuitBackground'
import ThemeToggle from '../ui/ThemeToggle/ThemeToggle'
import WhatsAppButton from '../ui/WhatsAppButton/WhatsAppButton'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

function Layout({ theme, toggleTheme }) {
  useEffect(() => {
    // Refresh ScrollTrigger on route change
    ScrollTrigger.refresh()
    
    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div className="app">
      <CircuitBackground />
      <Navbar theme={theme} />
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      <main className="page-content">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default Layout

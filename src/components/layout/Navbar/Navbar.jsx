import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ArrowRight } from 'lucide-react'
import styles from './Navbar.module.css'

function Navbar({ theme }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  const navLinks = [
    { path: '/', label: 'Início' },
    { path: '/servicos', label: 'Serviços' },
    { path: '/cases', label: 'Cases' },
    { path: '/#precos', label: 'Preços' },
    { path: '/#sobre', label: 'Sobre' },
    { path: '/#contato', label: 'Contato' },
  ]

  const isActive = (path) => {
    if (path.startsWith('/#')) {
      return location.pathname === '/' && location.hash === path.substring(1)
    }
    return location.pathname === path
  }

  const handleNavClick = (e, path) => {
    if (path.startsWith('/#')) {
      e.preventDefault()
      const element = document.querySelector(path.substring(1))
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      } else if (location.pathname !== '/') {
        window.location.href = path
      }
    }
  }

  return (
    <>
      <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
        <div className="container">
          <div className={styles.navbarInner}>
            {/* Logo */}
            <Link to="/" className={`${styles.logo} ${theme === 'light' ? styles.logoLight : ''}`}>
              <svg 
                width="40" 
                height="40" 
                viewBox="0 0 40 40" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className={styles.logoIcon}
              >
                <path 
                  d="M20 2L36 11V29L20 38L4 29V11L20 2Z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  fill="none"
                  className={styles.logoHexagon}
                />
                <circle cx="20" cy="20" r="6" fill="currentColor" className={styles.logoCenter} />
                <circle cx="20" cy="8" r="3" fill="currentColor" className={styles.logoNode} />
                <circle cx="31" cy="15" r="3" fill="currentColor" className={styles.logoNode} />
                <circle cx="31" cy="25" r="3" fill="currentColor" className={styles.logoNode} />
                <circle cx="20" cy="32" r="3" fill="currentColor" className={styles.logoNode} />
                <circle cx="9" cy="25" r="3" fill="currentColor" className={styles.logoNode} />
                <circle cx="9" cy="15" r="3" fill="currentColor" className={styles.logoNode} />
                <line x1="20" y1="14" x2="20" y2="8" stroke="currentColor" strokeWidth="1.5" />
                <line x1="25" y1="17" x2="31" y2="15" stroke="currentColor" strokeWidth="1.5" />
                <line x1="25" y1="23" x2="31" y2="25" stroke="currentColor" strokeWidth="1.5" />
                <line x1="20" y1="26" x2="20" y2="32" stroke="currentColor" strokeWidth="1.5" />
                <line x1="15" y1="23" x2="9" y2="25" stroke="currentColor" strokeWidth="1.5" />
                <line x1="15" y1="17" x2="9" y2="15" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <span className={styles.logoText}>Nexus Tech</span>
            </Link>

            {/* Desktop Navigation */}
            <div className={styles.navLinks}>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={(e) => handleNavClick(e, link.path)}
                  className={`${styles.navLink} ${isActive(link.path) ? styles.active : ''}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <a
              href="https://wa.me/5524981313689?text=Quero%20meu%20site"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.ctaButton} animate-pulse-glow`}
            >
              <span>Falar com Especialista</span>
              <ArrowRight size={16} />
            </a>

            {/* Mobile Menu Button */}
            <button
              className={styles.mobileMenuButton}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
        <div className={styles.mobileMenuContent}>
          {navLinks.map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={(e) => handleNavClick(e, link.path)}
              className={`${styles.mobileNavLink} ${isActive(link.path) ? styles.active : ''}`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://wa.me/5524981313689?text=Quero%20meu%20site"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mobileCtaButton}
          >
            <span>Falar com Especialista</span>
            <ArrowRight size={18} />
          </a>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className={styles.mobileOverlay}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}

export default Navbar

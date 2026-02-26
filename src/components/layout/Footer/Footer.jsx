import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Linkedin, Instagram, Youtube, ArrowRight } from 'lucide-react'
import styles from './Footer.module.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  const solutionsLinks = [
    { label: 'IA Atendimento', path: '/produto/ia-atendimento-pro' },
    { label: 'IA Analytics', path: '/produto/ia-analytics-360' },
    { label: 'IA Automação', path: '/produto/ia-automacao-de-processos' },
    { label: 'IA Conteúdo', path: '/produto/ia-geracao-de-conteudo' },
    { label: 'IA Segurança', path: '/produto/ia-seguranca-compliance' },
    { label: 'Ver todas', path: '/servicos', isArrow: true },
  ]

  const companyLinks = [
    { label: 'Sobre nós', path: '/#sobre' },
    { label: 'Cases', path: '/cases' },
    { label: 'Blog', path: '#', isComingSoon: true },
    { label: 'Carreiras', path: '#', isComingSoon: true },
    { label: 'Parceiros', path: '#' },
  ]

  const supportLinks = [
    { label: 'Documentação', path: '#' },
    { label: 'Status do sistema', path: '#' },
    { label: 'Segurança', path: '#' },
    { label: 'LGPD/Privacidade', path: '#' },
    { label: 'Termos de uso', path: '#' },
  ]

  return (
    <footer className={styles.footer}>
      {/* Animated Circuit Line */}
      <div className={styles.circuitLine}>
        <svg viewBox="0 0 1200 20" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path
            d="M0 10H1200"
            stroke="url(#circuit-gradient)"
            strokeWidth="2"
            strokeDasharray="20 10 5 10"
            className={styles.animatedLine}
          />
          <defs>
            <linearGradient id="circuit-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0" />
              <stop offset="50%" stopColor="#2563EB" stopOpacity="1" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="container">
        <div className={styles.footerContent}>
          {/* Logo & Description */}
          <div className={styles.footerBrand}>
            <Link to="/" className={styles.footerLogo}>
              <svg 
                width="48" 
                height="48" 
                viewBox="0 0 40 40" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M20 2L36 11V29L20 38L4 29V11L20 2Z" 
                  stroke="#2563EB" 
                  strokeWidth="2" 
                  fill="none"
                />
                <circle cx="20" cy="20" r="6" fill="#2563EB" />
                <circle cx="20" cy="8" r="3" fill="#7C3AED" />
                <circle cx="31" cy="15" r="3" fill="#7C3AED" />
                <circle cx="31" cy="25" r="3" fill="#7C3AED" />
                <circle cx="20" cy="32" r="3" fill="#7C3AED" />
                <circle cx="9" cy="25" r="3" fill="#7C3AED" />
                <circle cx="9" cy="15" r="3" fill="#7C3AED" />
              </svg>
              <span className={styles.footerLogoText}>Nexus Tech</span>
            </Link>
            <p className={styles.footerTagline}>
              Potencializando empresas com Inteligência Artificial
            </p>
            <div className={styles.footerSocial}>
              <a href="#" className={styles.socialLink} aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className={styles.socialLink} aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className={styles.socialLink} aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Solutions Column */}
          <div className={styles.footerColumn}>
            <h4 className={styles.footerColumnTitle}>Soluções</h4>
            <ul className={styles.footerLinks}>
              {solutionsLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className={styles.footerLink}>
                    {link.label}
                    {link.isArrow && <ArrowRight size={14} />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className={styles.footerColumn}>
            <h4 className={styles.footerColumnTitle}>Empresa</h4>
            <ul className={styles.footerLinks}>
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className={styles.footerLink}>
                    {link.label}
                    {link.isComingSoon && (
                      <span className={styles.comingSoonBadge}>em breve</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div className={styles.footerColumn}>
            <h4 className={styles.footerColumnTitle}>Suporte</h4>
            <ul className={styles.footerLinks}>
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className={styles.footerLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className={styles.footerColumn}>
            <h4 className={styles.footerColumnTitle}>Contato</h4>
            <ul className={styles.footerContact}>
              <li>
                <a href="mailto:contato@nexustech.com.br" className={styles.contactLink}>
                  <Mail size={16} />
                  <span>contato@nexustech.com.br</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://wa.me/5524981313689?text=Quero%20meu%20site" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                >
                  <Phone size={16} />
                  <span>+55 (24) 98131-3689</span>
                </a>
              </li>
              <li>
                <span className={styles.contactItem}>
                  <MapPin size={16} />
                  <span>
                    Av. Paulista, 1374 — 12º andar<br />
                    São Paulo/SP, CEP 01310-100
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © {currentYear} Nexus Tech Solutions. CNPJ: 38.947.201/0001-83. Todos os direitos reservados.
          </p>
          <p className={styles.credit}>
            Desenvolvido por{' '}
            <a 
              href="https://globallanding.com.br" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.creditLink}
            >
              Global Landing
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Building2, Users, Award } from 'lucide-react'
import SectionBadge from '../../ui/SectionBadge/SectionBadge'
import styles from './About.module.css'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  {
    value: '200+',
    label: 'Empresas transformadas',
    icon: Building2
  },
  {
    value: '98,7%',
    label: 'Satisfação dos clientes',
    icon: Users
  },
  {
    value: '5 anos',
    label: 'De inovação',
    icon: Award
  }
]

function About() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const statsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      gsap.from(contentRef.current?.children || [], {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        },
        x: -40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out'
      })

      // Stats animation
      gsap.from(statsRef.current?.children || [], {
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="sobre" className={styles.about}>
      <div className="container">
        <div className={styles.aboutGrid}>
          {/* Left Content */}
          <div ref={contentRef} className={styles.content}>
            <SectionBadge>Sobre Nós</SectionBadge>
            
            <h2 className={styles.title}>
              Nascemos para liderar a revolução da IA nas empresas brasileiras
            </h2>
            
            <div className={styles.textContent}>
              <p>
                Fundada em 2019 por ex-pesquisadores do Instituto Tecnológico de São Paulo e 
                engenheiros vindos de Google e IBM, a Nexus Tech Solutions nasceu de uma 
                convicção simples: a Inteligência Artificial não deveria ser privilégio das 
                grandes corporações globais.
              </p>
              <p>
                Após 5 anos transformando mais de 200 empresas brasileiras — de startups 
                em crescimento acelerado a grupos com faturamento bilionário — construímos 
                a maior plataforma de IA B2B do Brasil, com 98,7% de taxa de satisfação 
                dos clientes e presença em 7 estados.
              </p>
            </div>

            <a href="#contato" className={styles.ctaLink}>
              Conhecer nossa história completa
              <ArrowRight size={16} />
            </a>
          </div>

          {/* Right Illustration */}
          <div className={styles.illustration}>
            <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.aboutIllustration}>
              {/* Background circle */}
              <circle cx="200" cy="200" r="180" fill="url(#aboutGradient)" opacity="0.1"/>
              
              {/* Team illustration */}
              <g transform="translate(100, 80)">
                {/* Person 1 */}
                <circle cx="50" cy="40" r="30" fill="#2563EB" opacity="0.8"/>
                <rect x="20" y="80" width="60" height="80" rx="8" fill="#1E40AF"/>
                
                {/* Person 2 */}
                <circle cx="150" cy="40" r="30" fill="#7C3AED" opacity="0.8"/>
                <rect x="120" y="80" width="60" height="80" rx="8" fill="#5B21B6"/>
                
                {/* Person 3 */}
                <circle cx="100" cy="100" r="35" fill="#3B82F6" opacity="0.9"/>
                <rect x="65" y="150" width="70" height="90" rx="8" fill="#1D4ED8"/>
                
                {/* Connection lines */}
                <line x1="80" y1="60" x2="120" y2="60" stroke="#2563EB" strokeWidth="2" strokeDasharray="4 2"/>
                <line x1="100" y1="80" x2="100" y2="120" stroke="#7C3AED" strokeWidth="2" strokeDasharray="4 2"/>
              </g>
              
              {/* Decorative elements */}
              <circle cx="320" cy="80" r="20" fill="#2563EB" opacity="0.3"/>
              <circle cx="60" cy="320" r="25" fill="#7C3AED" opacity="0.3"/>
              <rect x="300" y="280" width="40" height="40" rx="8" fill="#3B82F6" opacity="0.3" transform="rotate(15 320 300)"/>
              
              {/* AI/Brain icon */}
              <g transform="translate(280, 160)">
                <circle cx="40" cy="40" r="35" fill="none" stroke="#2563EB" strokeWidth="2"/>
                <path d="M40 15 L40 25 M40 55 L40 65 M15 40 L25 40 M55 40 L65 40" stroke="#2563EB" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="40" cy="40" r="15" fill="#2563EB" opacity="0.3"/>
                <circle cx="40" cy="40" r="8" fill="#2563EB"/>
              </g>
              
              <defs>
                <linearGradient id="aboutGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563EB"/>
                  <stop offset="100%" stopColor="#7C3AED"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Stats */}
        <div ref={statsRef} className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <div className={styles.statIcon}>
                <stat.icon size={24} />
              </div>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About

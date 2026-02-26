import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Search, Lightbulb, Zap, TrendingUp } from 'lucide-react'
import SectionBadge from '../../ui/SectionBadge/SectionBadge'
import styles from './HowItWorks.module.css'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Diagnóstico',
    description: 'Analisamos profundamente os processos da sua empresa para identificar onde a IA gera mais valor.'
  },
  {
    number: '02',
    icon: Lightbulb,
    title: 'Estratégia Personalizada',
    description: 'Desenvolvemos um roadmap de IA sob medida para os objetivos específicos do seu negócio.'
  },
  {
    number: '03',
    icon: Zap,
    title: 'Implementação Ágil',
    description: 'Nossa equipe especializada implementa as soluções com mínima interrupção das suas operações.'
  },
  {
    number: '04',
    icon: TrendingUp,
    title: 'Evolução Contínua',
    description: 'Monitoramos, otimizamos e expandimos as soluções conforme sua empresa cresce.'
  }
]

function HowItWorks() {
  const sectionRef = useRef(null)
  const stepsRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Steps animation
      gsap.from(stepsRef.current?.children || [], {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.2,
        ease: 'power3.out'
      })

      // Line animation
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { strokeDashoffset: 1000 },
          {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              end: 'bottom 40%',
              scrub: 1
            },
            strokeDashoffset: 0,
            ease: 'none'
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className={styles.howItWorks}>
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <SectionBadge>Processo</SectionBadge>
          <h2 className={styles.title}>
            Da estratégia à implementação em 4 etapas
          </h2>
        </div>

        {/* Steps */}
        <div className={styles.stepsContainer}>
          {/* Animated connecting line */}
          <svg className={styles.connectingLine} viewBox="0 0 1000 4" preserveAspectRatio="none">
            <path
              ref={lineRef}
              d="M0 2 L1000 2"
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              strokeDasharray="10 5"
              strokeDashoffset="1000"
            />
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2563EB" />
                <stop offset="50%" stopColor="#7C3AED" />
                <stop offset="100%" stopColor="#2563EB" />
              </linearGradient>
            </defs>
          </svg>

          <div ref={stepsRef} className={styles.stepsGrid}>
            {steps.map((step, index) => (
              <div key={step.number} className={styles.step}>
                {/* Background number */}
                <span className={styles.bgNumber}>{step.number}</span>
                
                {/* Content */}
                <div className={styles.stepContent}>
                  <div className={styles.iconWrapper}>
                    <step.icon size={28} />
                  </div>
                  <span className={styles.stepNumber}>Etapa {step.number}</span>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDescription}>{step.description}</p>
                </div>

                {/* Connector dot */}
                {index < steps.length - 1 && (
                  <div className={styles.connector}>
                    <div className={styles.connectorDot} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks

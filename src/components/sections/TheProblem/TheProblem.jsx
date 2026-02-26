import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import { Repeat, Brain, TrendingDown, ArrowRight } from 'lucide-react'
import SectionBadge from '../../ui/SectionBadge/SectionBadge'
import GlassCard from '../../ui/GlassCard/GlassCard'
import styles from './TheProblem.module.css'

gsap.registerPlugin(ScrollTrigger)

const painPoints = [
  {
    icon: Repeat,
    title: 'Processos Manuais e Ineficientes',
    description: 'Equipes desperdiçando horas em tarefas repetitivas que uma IA resolve em segundos.',
    color: 'blue'
  },
  {
    icon: Brain,
    title: 'Decisões Baseadas em Achismos',
    description: 'Sem análise de dados em tempo real, você está navegando no escuro enquanto o mercado acelera.',
    color: 'purple'
  },
  {
    icon: TrendingDown,
    title: 'Custo Operacional Crescente',
    description: 'Cada processo sem automação é dinheiro saindo do seu bolso todo mês sem necessidade.',
    color: 'red'
  }
]

function TheProblem() {
  const sectionRef = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current?.children || [], {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out'
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className={styles.theProblem}>
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <SectionBadge>O Desafio do Mercado</SectionBadge>
          <h2 className={styles.title}>
            Enquanto você hesita, seus concorrentes já estão usando IA.
          </h2>
        </div>

        {/* Pain Points Grid */}
        <div ref={cardsRef} className={styles.painPointsGrid}>
          {painPoints.map((point, index) => (
            <GlassCard key={index} hoverable padding="large">
              <div className={styles.painPointCard}>
                <div className={`${styles.iconWrapper} ${styles[point.color]}`}>
                  <point.icon size={28} />
                </div>
                <h3 className={styles.cardTitle}>{point.title}</h3>
                <p className={styles.cardDescription}>{point.description}</p>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* CTA */}
        <div className={styles.ctaWrapper}>
          <Link to="/cases" className={styles.ctaLink}>
            Ver todos os cases de transformação
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default TheProblem

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import { TrendingUp, ArrowRight, Quote } from 'lucide-react'
import SectionBadge from '../../ui/SectionBadge/SectionBadge'
import GlassCard from '../../ui/GlassCard/GlassCard'
import styles from './CaseHighlight.module.css'

gsap.registerPlugin(ScrollTrigger)

const caseStudies = [
  {
    id: 'techvarejo',
    company: 'TechVarejo S.A.',
    industry: 'Varejo / E-commerce',
    solutions: ['IA Atendimento Pro', 'IA Analytics 360'],
    primaryMetric: '+340%',
    primaryMetricLabel: 'em satisfação do cliente',
    secondaryMetric: '-67%',
    secondaryMetricLabel: 'no tempo de resposta',
    quote: 'A implementação da IA transformou completamente nossa operação de atendimento. Em 3 meses, atingimos resultados que levariam anos manualmente.',
    author: 'Carlos Mendonça',
    role: 'CEO',
    color: 'blue'
  },
  {
    id: 'meridian',
    company: 'Grupo Meridian Logística',
    industry: 'Logística e Supply Chain',
    solutions: ['IA Automação de Processos'],
    primaryMetric: '-80%',
    primaryMetricLabel: 'em tarefas manuais',
    secondaryMetric: 'R$ 1.2M',
    secondaryMetricLabel: 'economizados em 12 meses',
    quote: 'Automatizamos 47 processos críticos. Nossa equipe agora foca no que realmente importa: crescimento estratégico.',
    author: 'Ana Ribeiro',
    role: 'COO',
    color: 'purple'
  },
  {
    id: 'credimus',
    company: 'Banco Credimus',
    industry: 'Fintech / Serviços Financeiros',
    solutions: ['IA Segurança & Compliance', 'IA Analytics 360'],
    primaryMetric: '-99.2%',
    primaryMetricLabel: 'em falsos positivos de fraude',
    secondaryMetric: '100%',
    secondaryMetricLabel: 'conformidade LGPD',
    quote: 'A detecção de fraudes com IA nos salvou de perdas estimadas em R$ 4M no primeiro semestre.',
    author: 'Ricardo Fonseca',
    role: 'CISO',
    color: 'blue'
  }
]

function CaseHighlight() {
  const sectionRef = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current?.children || [], {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 95%',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out'
      })
      ScrollTrigger.refresh()
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className={styles.caseHighlight}>
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <SectionBadge>Casos de Sucesso</SectionBadge>
          <h2 className={styles.title}>
            Empresas que já transformaram seus resultados
          </h2>
        </div>

        {/* Case Studies Grid */}
        <div ref={cardsRef} className={styles.casesGrid} style={{ opacity: 1 }}>
          {caseStudies.map((caseStudy) => (
            <GlassCard key={caseStudy.id} hoverable padding="large">
              <div className={styles.caseCard}>
                {/* Company Info */}
                <div className={styles.companyHeader}>
                  <div className={`${styles.companyIcon} ${styles[caseStudy.color]}`}>
                    <TrendingUp size={24} />
                  </div>
                  <div className={styles.companyInfo}>
                    <h3 className={styles.companyName}>{caseStudy.company}</h3>
                    <span className={styles.industry}>{caseStudy.industry}</span>
                  </div>
                </div>

                {/* Solutions Used */}
                <div className={styles.solutions}>
                  <span className={styles.solutionsLabel}>Soluções utilizadas:</span>
                  <div className={styles.solutionsTags}>
                    {caseStudy.solutions.map((solution, index) => (
                      <span key={index} className={styles.solutionTag}>
                        {solution}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <div className={styles.metrics}>
                  <div className={styles.metric}>
                    <span className={`${styles.metricValue} ${styles[caseStudy.color]}`}>
                      {caseStudy.primaryMetric}
                    </span>
                    <span className={styles.metricLabel}>{caseStudy.primaryMetricLabel}</span>
                  </div>
                  <div className={styles.metricDivider} />
                  <div className={styles.metric}>
                    <span className={styles.metricValueSecondary}>
                      {caseStudy.secondaryMetric}
                    </span>
                    <span className={styles.metricLabel}>{caseStudy.secondaryMetricLabel}</span>
                  </div>
                </div>

                {/* Quote */}
                <div className={styles.quote}>
                  <Quote size={20} className={styles.quoteIcon} />
                  <p className={styles.quoteText}>{caseStudy.quote}</p>
                  <div className={styles.quoteAuthor}>
                    <span className={styles.authorName}>{caseStudy.author}</span>
                    <span className={styles.authorRole}>{caseStudy.role}</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* CTA */}
        <div className={styles.ctaWrapper}>
          <Link to="/cases" className={styles.ctaButton}>
            <span>Ver todos os cases</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CaseHighlight

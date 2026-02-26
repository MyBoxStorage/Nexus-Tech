import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import { MessageSquare, BarChart3, Workflow, FileText, Shield, ArrowRight } from 'lucide-react'
import SectionBadge from '../../ui/SectionBadge/SectionBadge'
import GlassCard from '../../ui/GlassCard/GlassCard'
import styles from './ServicesHighlight.module.css'

gsap.registerPlugin(ScrollTrigger)

const featuredServices = [
  {
    id: 'ia-atendimento-pro',
    title: 'IA para Atendimento ao Cliente',
    description: 'Chatbots inteligentes com IA generativa que atendem 24/7, aprendem com cada interação e resolvem até 94% das solicitações sem intervenção humana.',
    icon: MessageSquare,
    size: 'large',
    color: 'blue'
  },
  {
    id: 'ia-analytics-360',
    title: 'IA para Análise de Dados',
    description: 'Dashboards preditivos em tempo real que transformam dados brutos em insights acionáveis para decisões estratégicas.',
    icon: BarChart3,
    size: 'medium',
    color: 'purple'
  },
  {
    id: 'ia-automacao-de-processos',
    title: 'IA para Automação de Processos',
    description: 'Automatize workflows completos com RPA + IA, reduzindo até 80% do trabalho manual.',
    icon: Workflow,
    size: 'medium',
    color: 'blue'
  },
  {
    id: 'ia-geracao-de-conteudo',
    title: 'IA para Geração de Conteúdo',
    description: 'Crie textos, posts e campanhas em escala mantendo a voz da sua marca.',
    icon: FileText,
    size: 'small',
    color: 'purple'
  },
  {
    id: 'ia-seguranca-compliance',
    title: 'IA para Segurança e Compliance',
    description: 'Detecção de anomalias e conformidade regulatória automatizada.',
    icon: Shield,
    size: 'small',
    color: 'blue'
  }
]

function ServicesHighlight() {
  const sectionRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(gridRef.current?.children || [], {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className={styles.servicesHighlight}>
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <SectionBadge>Nossas Soluções</SectionBadge>
          <h2 className={styles.title}>
            IA para cada dimensão do seu negócio
          </h2>
        </div>

        {/* Bento Grid */}
        <div ref={gridRef} className={styles.bentoGrid}>
          {featuredServices.map((service) => (
            <Link
              key={service.id}
              to={`/produto/${service.id}`}
              className={`${styles.card} ${styles[service.size]} ${styles[service.color]}`}
            >
              <GlassCard hoverable glowOnHover padding="medium">
                <div className={styles.cardContent}>
                  <div className={`${styles.iconWrapper} ${styles[service.color]}`}>
                    <service.icon size={service.size === 'large' ? 32 : 24} />
                  </div>
                  <h3 className={styles.cardTitle}>{service.title}</h3>
                  <p className={styles.cardDescription}>{service.description}</p>
                  <span className={styles.cardLink}>
                    Ver detalhes <ArrowRight size={14} />
                  </span>
                </div>
              </GlassCard>
            </Link>
          ))}

          {/* Feature Card - Full Width */}
          <Link to="/servicos" className={`${styles.card} ${styles.feature}`}>
            <div className={styles.featureCard}>
              <div className={styles.featureContent}>
                <span className={styles.featureNumber}>+45</span>
                <div className={styles.featureText}>
                  <h3 className={styles.featureTitle}>soluções disponíveis</h3>
                  <p className={styles.featureDescription}>
                    Explore nosso catálogo completo de soluções de IA para todas as áreas do seu negócio
                  </p>
                </div>
              </div>
              <span className={styles.featureLink}>
                Ver Catálogo Completo <ArrowRight size={18} />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ServicesHighlight

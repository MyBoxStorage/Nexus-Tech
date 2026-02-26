import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import { TrendingUp, ArrowRight, Quote, CheckCircle, XCircle, MessageCircle, Calendar } from 'lucide-react'
import SectionBadge from '../../components/ui/SectionBadge/SectionBadge'
import GlassCard from '../../components/ui/GlassCard/GlassCard'
import styles from './Cases.module.css'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '200+', label: 'Empresas' },
  { value: 'R$ 47M+', label: 'Valor gerado' },
  { value: '98,7%', label: 'Satisfação' }
]

const problems = [
  {
    title: 'A Barreira da Implementação',
    description: '83% das empresas brasileiras já tentaram implementar alguma solução de IA internamente e falharam. O motivo? Implementações técnicas complexas, falta de dados estruturados e ausência de expertise interna.',
    painPoints: [
      'Alto custo de contratação de especialistas',
      'Sistemas legados incompatíveis',
      'Resistência cultural interna',
      'Dificuldade em mensurar ROI'
    ]
  },
  {
    title: 'Soluções Genéricas que Não Funcionam',
    description: 'Ferramentas de IA genéricas entregam resultados genéricos. Seu negócio tem particularidades únicas que exigem uma IA treinada especificamente para seus dados, seus processos e seus objetivos.',
    painPoints: [
      'Chatbots que irritam clientes',
      'Analytics sem contexto do negócio',
      'Automações que quebram com exceções'
    ]
  },
  {
    title: 'O Custo da Inação',
    description: 'Cada mês sem IA é um mês em que seus concorrentes estão se distanciando. O custo de não agir é exponencialmente maior que o custo de implementar.',
    painPoints: [
      'Empresas com IA crescem 2,5x mais rápido',
      'Redução de custos operacionais em até 45%',
      'Aumento de satisfação do cliente em 35%'
    ]
  }
]

const caseStudies = [
  {
    id: 'techvarejo',
    company: 'TechVarejo S.A.',
    industry: 'Varejo / E-commerce',
    solutions: ['IA Atendimento Pro', 'IA Analytics 360'],
    challenge: 'Atendimento ao cliente sobrecarregado, tempos de resposta altos e falta de visibilidade sobre comportamento do consumidor.',
    implementation: 'Implementação em 6 semanas com integração aos sistemas existentes e treinamento da equipe.',
    metrics: [
      { label: 'Satisfação do cliente', value: '+340%' },
      { label: 'Tempo de resposta', value: '-67%' },
      { label: 'Resolução automática', value: '94%' },
      { label: 'ROI em', value: '4 meses' }
    ],
    quote: 'A implementação da IA transformou completamente nossa operação de atendimento. Em 3 meses, atingimos resultados que levariam anos manualmente.',
    author: 'Carlos Mendonça',
    role: 'CEO',
    beforeAfter: {
      before: ['Tempo médio de resposta: 45 min', 'Satisfação: 62%', 'Custo por atendimento: R$ 18'],
      after: ['Tempo médio de resposta: 3 min', 'Satisfação: 96%', 'Custo por atendimento: R$ 4']
    }
  },
  {
    id: 'meridian',
    company: 'Grupo Meridian Logística',
    industry: 'Logística e Supply Chain',
    solutions: ['IA Automação de Processos'],
    challenge: 'Processos manuais em toda a cadeia operacional, desde entrada de pedidos até faturamento.',
    implementation: 'Automação de 47 processos críticos em 10 semanas com RPA + IA.',
    metrics: [
      { label: 'Tarefas manuais', value: '-80%' },
      { label: 'Economia anual', value: 'R$ 1.2M' },
      { label: 'Processos automatizados', value: '47' },
      { label: 'Erros operacionais', value: '-92%' }
    ],
    quote: 'Automatizamos 47 processos críticos. Nossa equipe agora foca no que realmente importa: crescimento estratégico.',
    author: 'Ana Ribeiro',
    role: 'COO',
    beforeAfter: {
      before: ['Processamento manual de notas', 'Reconciliação em 3 dias', 'Erros em 12% das operações'],
      after: ['Processamento automático 24/7', 'Reconciliação em 2 horas', 'Erros em menos de 1%']
    }
  },
  {
    id: 'credimus',
    company: 'Banco Credimus',
    industry: 'Fintech / Serviços Financeiros',
    solutions: ['IA Segurança & Compliance', 'IA Analytics 360'],
    challenge: 'Alto volume de falsos positivos em detecção de fraude e dificuldade em manter conformidade LGPD.',
    implementation: 'Sistema de detecção de anomalias em 8 semanas com integração aos sistemas bancários.',
    metrics: [
      { label: 'Falsos positivos', value: '-99.2%' },
      { label: 'Conformidade LGPD', value: '100%' },
      { label: 'Prevenção de perdas', value: 'R$ 4M' },
      { label: 'Detecção em tempo real', value: '< 200ms' }
    ],
    quote: 'A detecção de fraudes com IA nos salvou de perdas estimadas em R$ 4M no primeiro semestre.',
    author: 'Ricardo Fonseca',
    role: 'CISO',
    beforeAfter: {
      before: ['Falsos positivos: 35%', 'Tempo de análise: 4h', 'Conformidade parcial'],
      after: ['Falsos positivos: 0.3%', 'Tempo de análise: 5min', 'Conformidade total']
    }
  },
  {
    id: 'edutech',
    company: 'EduTech Brasil',
    industry: 'Educação',
    solutions: ['IA Analytics 360', 'IA Treinamento Adaptativo'],
    challenge: 'Baixa retenção de alunos e dificuldade em personalizar a experiência de aprendizado.',
    implementation: 'Plataforma de analytics educacional com personalização de conteúdo em 5 semanas.',
    metrics: [
      { label: 'Retenção de alunos', value: '+28%' },
      { label: 'Engajamento', value: '+45%' },
      { label: 'Conclusão de cursos', value: '+52%' },
      { label: 'Tempo de implementação', value: '90 dias' }
    ],
    quote: 'O Analytics 360 mudou completamente nossa cultura de decisão. Agora tomamos decisões baseadas em dados reais.',
    author: 'Camila Ferreira',
    role: 'Diretora Geral',
    beforeAfter: {
      before: ['Retenção: 68%', 'Engajamento baixo', 'Decisões intuitivas'],
      after: ['Retenção: 96%', 'Engajamento alto', 'Decisões baseadas em dados']
    }
  },
  {
    id: 'industrialprime',
    company: 'IndustrialPrime Group',
    industry: 'Indústria / Manufatura',
    solutions: ['IA Manutenção Preditiva', 'IA Supply Chain'],
    challenge: 'Paradas não planejadas de produção causando perdas milionárias e estoque desbalanceado.',
    implementation: 'Sensores IoT + IA para predição de falhas e otimização de supply chain em 12 semanas.',
    metrics: [
      { label: 'Downtime reduzido', value: '-94%' },
      { label: 'Economia em perdas', value: 'R$ 3.8M' },
      { label: 'Precisão de previsão', value: '97%' },
      { label: 'OTIF melhorado', value: '+35%' }
    ],
    quote: 'Reduzimos downtime em 94%. Nossa linha de produção agora opera com uma precisão que jamais imaginamos ser possível.',
    author: 'Henrique Salave\'a',
    role: 'Diretor Industrial',
    beforeAfter: {
      before: ['Downtime: 15% do tempo', 'Manutenção corretiva', 'Falhas inesperadas'],
      after: ['Downtime: 0.9% do tempo', 'Manutenção preditiva', 'Falhas antecipadas']
    }
  }
]

const solutionSlugMap = {
  'IA Atendimento Pro': 'ia-atendimento-pro',
  'IA Analytics 360': 'ia-analytics-360',
  'IA Automação de Processos': 'ia-automacao-de-processos',
  'IA Geração de Conteúdo': 'ia-geracao-de-conteudo',
  'IA Segurança & Compliance': 'ia-seguranca-compliance',
  'IA Manutenção Preditiva': 'ia-manutencao-preditiva',
  'IA Supply Chain': 'ia-supply-chain',
  'IA Treinamento Adaptativo': 'ia-treinamento-adaptativo',
}

function getSolutionSlug(solution) {
  return solutionSlugMap[solution] || solution.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function Cases() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.case-study-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.2,
        ease: 'power3.out'
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className={styles.casesPage}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <SectionBadge>Transformações Reais</SectionBadge>
            <h1 className={styles.heroTitle}>Empresas que escolheram o futuro</h1>
            
            <div className={styles.statsRow}>
              {stats.map((stat, index) => (
                <div key={index} className={styles.statItem}>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className={styles.problemsSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Por que a maioria das empresas ainda não usa IA de verdade?
            </h2>
          </div>

          <div className={styles.problemsGrid}>
            {problems.map((problem, index) => (
              <GlassCard key={index} padding="large">
                <div className={styles.problemCard}>
                  <div className={styles.problemNumber}>0{index + 1}</div>
                  <h3 className={styles.problemTitle}>{problem.title}</h3>
                  <p className={styles.problemDescription}>{problem.description}</p>
                  <ul className={styles.painPointsList}>
                    {problem.painPoints.map((point, i) => (
                      <li key={i} className={styles.painPoint}>
                        <XCircle size={16} className={styles.painIcon} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section ref={sectionRef} className={styles.caseStudiesSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <SectionBadge>Casos de Sucesso</SectionBadge>
            <h2 className={styles.sectionTitle}>Transformações que geram resultados</h2>
          </div>

          <div className={styles.caseStudiesList}>
            {caseStudies.map((caseStudy) => (
              <div key={caseStudy.id} className="case-study-card">
                <GlassCard padding="large">
                  <div className={styles.caseStudy}>
                    {/* Header */}
                    <div className={styles.caseHeader}>
                      <div className={styles.caseCompany}>
                        <div className={styles.companyIcon}>
                          <TrendingUp size={24} />
                        </div>
                        <div>
                          <h3 className={styles.companyName}>{caseStudy.company}</h3>
                          <span className={styles.industry}>{caseStudy.industry}</span>
                        </div>
                      </div>
                      <div className={styles.solutions}>
                        {caseStudy.solutions.map((solution, i) => (
                          <Link 
                            key={i} 
                            to={`/produto/${getSolutionSlug(solution)}`}
                            className={styles.solutionTag}
                          >
                            {solution}
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Content */}
                    <div className={styles.caseContent}>
                      <div className={styles.caseDetails}>
                        <div className={styles.detailBlock}>
                          <h4 className={styles.detailTitle}>Desafio</h4>
                          <p className={styles.detailText}>{caseStudy.challenge}</p>
                        </div>
                        <div className={styles.detailBlock}>
                          <h4 className={styles.detailTitle}>Implementação</h4>
                          <p className={styles.detailText}>{caseStudy.implementation}</p>
                        </div>
                      </div>

                      {/* Metrics */}
                      <div className={styles.metricsGrid}>
                        {caseStudy.metrics.map((metric, i) => (
                          <div key={i} className={styles.metricCard}>
                            <span className={styles.metricValue}>{metric.value}</span>
                            <span className={styles.metricLabel}>{metric.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quote */}
                    <div className={styles.caseQuote}>
                      <Quote size={24} className={styles.quoteIcon} />
                      <p className={styles.quoteText}>{caseStudy.quote}</p>
                      <div className={styles.quoteAuthor}>
                        <span className={styles.authorName}>{caseStudy.author}</span>
                        <span className={styles.authorRole}>{caseStudy.role}</span>
                      </div>
                    </div>

                    {/* Before/After */}
                    <div className={styles.beforeAfter}>
                      <div className={styles.beforeAfterColumn}>
                        <h5 className={styles.beforeAfterTitle}>Antes</h5>
                        <ul className={styles.beforeAfterList}>
                          {caseStudy.beforeAfter.before.map((item, i) => (
                            <li key={i} className={styles.beforeItem}>
                              <XCircle size={14} />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className={styles.beforeAfterColumn}>
                        <h5 className={styles.beforeAfterTitle}>Depois</h5>
                        <ul className={styles.beforeAfterList}>
                          {caseStudy.beforeAfter.after.map((item, i) => (
                            <li key={i} className={styles.afterItem}>
                              <CheckCircle size={14} />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className={styles.bottomCta}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Sua empresa pode ser o próximo case de sucesso</h2>
            <p className={styles.ctaText}>
              Agende uma consultoria gratuita e descubra como a IA pode transformar seus resultados.
            </p>
            <div className={styles.ctaButtons}>
              <a 
                href="https://wa.me/5524981313689?text=Quero%20meu%20site"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.primaryCta}
              >
                <Calendar size={18} />
                <span>Agendar diagnóstico gratuito</span>
              </a>
              <a 
                href="https://wa.me/5524981313689?text=Quero%20meu%20site"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.secondaryCta}
              >
                <MessageCircle size={18} />
                <span>Falar pelo WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Cases

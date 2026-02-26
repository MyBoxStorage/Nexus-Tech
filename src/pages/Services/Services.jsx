import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle } from 'lucide-react'
import SectionBadge from '../../components/ui/SectionBadge/SectionBadge'
import GlassCard from '../../components/ui/GlassCard/GlassCard'
import styles from './Services.module.css'

gsap.registerPlugin(ScrollTrigger)

// Category colors
const categoryColors = {
  atendimento: '#2563EB',
  analytics: '#7C3AED',
  automacao: '#22C55E',
  conteudo: '#F59E0B',
  seguranca: '#EF4444',
  rh: '#EC4899',
  vendas: '#06B6D4',
  financeiro: '#8B5CF6',
  operacoes: '#10B981'
}

// All 45 services organized by category
const servicesData = [
  // ATENDIMENTO (8)
  { id: 'ia-atendimento-pro', name: 'IA Atendimento Pro', category: 'atendimento', price: 'R$ 2.997/mês', description: 'Chatbot com IA generativa 24/7, integração com CRM e análise de sentimento.' },
  { id: 'ia-voz-inteligente', name: 'IA Voz Inteligente', category: 'atendimento', price: 'R$ 3.497/mês', description: 'URA com processamento de linguagem natural para atendimento telefônico.' },
  { id: 'ia-triagem-de-tickets', name: 'IA Triagem de Tickets', category: 'atendimento', price: 'R$ 1.497/mês', description: 'Classificação e roteamento automático de solicitações de suporte.' },
  { id: 'ia-analise-de-sentimento', name: 'IA Análise de Sentimento', category: 'atendimento', price: 'R$ 1.997/mês', description: 'Monitoramento emocional em tempo real nas interações com clientes.' },
  { id: 'ia-tradutor-em-tempo-real', name: 'IA Tradutor em Tempo Real', category: 'atendimento', price: 'R$ 1.297/mês', description: 'Atendimento multilíngue automático para clientes globais.' },
  { id: 'ia-faq-dinamico', name: 'IA FAQ Dinâmico', category: 'atendimento', price: 'R$ 997/mês', description: 'Base de conhecimento que aprende e se atualiza automaticamente.' },
  { id: 'ia-onboarding-de-clientes', name: 'IA Onboarding de Clientes', category: 'atendimento', price: 'R$ 2.197/mês', description: 'Jornada de ativação personalizada e automatizada para novos clientes.' },
  { id: 'ia-retencao-proativa', name: 'IA Retenção Proativa', category: 'atendimento', price: 'R$ 2.497/mês', description: 'Identificação e ação em clientes com risco de churn.' },
  
  // ANALYTICS & DADOS (7)
  { id: 'ia-analytics-360', name: 'IA Analytics 360', category: 'analytics', price: 'R$ 3.497/mês', description: 'Dashboard preditivo em tempo real com insights automatizados.' },
  { id: 'ia-forecasting', name: 'IA Forecasting', category: 'analytics', price: 'R$ 2.797/mês', description: 'Previsão de demanda, receita e estoque com machine learning.' },
  { id: 'ia-market-intelligence', name: 'IA Market Intelligence', category: 'analytics', price: 'R$ 2.297/mês', description: 'Monitoramento de concorrentes e tendências de mercado.' },
  { id: 'ia-data-quality', name: 'IA Data Quality', category: 'analytics', price: 'R$ 1.797/mês', description: 'Limpeza e enriquecimento automático de bases de dados.' },
  { id: 'ia-customer-intelligence', name: 'IA Customer Intelligence', category: 'analytics', price: 'R$ 2.597/mês', description: 'Segmentação e perfil comportamental avançado de clientes.' },
  { id: 'ia-report-generator', name: 'IA Report Generator', category: 'analytics', price: 'R$ 1.497/mês', description: 'Relatórios executivos automáticos com narrativa em linguagem natural.' },
  { id: 'ia-cohort-analysis', name: 'IA Cohort Analysis', category: 'analytics', price: 'R$ 1.997/mês', description: 'Análise de coorte automática para SaaS e e-commerce.' },
  
  // AUTOMAÇÃO (8)
  { id: 'ia-automacao-de-processos', name: 'IA Automação de Processos', category: 'automacao', price: 'R$ 4.197/mês', description: 'RPA + IA para workflows completos e complexos.' },
  { id: 'ia-documentos-inteligentes', name: 'IA Documentos Inteligentes', category: 'automacao', price: 'R$ 2.197/mês', description: 'Extração, classificação e processamento de documentos.' },
  { id: 'ia-aprovacoes-automaticas', name: 'IA Aprovações Automáticas', category: 'automacao', price: 'R$ 1.697/mês', description: 'Fluxos de aprovação com decisão baseada em regras e IA.' },
  { id: 'ia-integracao-de-sistemas', name: 'IA Integração de Sistemas', category: 'automacao', price: 'R$ 3.197/mês', description: 'Orquestração de APIs e sistemas legados com IA.' },
  { id: 'ia-email-inteligente', name: 'IA Email Inteligente', category: 'automacao', price: 'R$ 1.297/mês', description: 'Triagem, resposta e encaminhamento automático de e-mails.' },
  { id: 'ia-agendamento-inteligente', name: 'IA Agendamento Inteligente', category: 'automacao', price: 'R$ 997/mês', description: 'Otimização automática de agendas e reuniões.' },
  { id: 'ia-erp-copilot', name: 'IA ERP Copilot', category: 'automacao', price: 'R$ 2.997/mês', description: 'Assistente de IA integrado ao seu ERP.' },
  { id: 'ia-contrato-automatico', name: 'IA Contrato Automático', category: 'automacao', price: 'R$ 2.497/mês', description: 'Geração e análise de contratos com IA jurídica.' },
  
  // CONTEÚDO (5)
  { id: 'ia-geracao-de-conteudo', name: 'IA Geração de Conteúdo', category: 'conteudo', price: 'R$ 1.997/mês', description: 'Textos, posts, artigos e conteúdo em escala.' },
  { id: 'ia-copywriter', name: 'IA Copywriter', category: 'conteudo', price: 'R$ 1.497/mês', description: 'Copy de alta conversão para vendas e marketing.' },
  { id: 'ia-seo-automatico', name: 'IA SEO Automático', category: 'conteudo', price: 'R$ 1.697/mês', description: 'Otimização contínua de conteúdo para buscadores.' },
  { id: 'ia-personalizacao-de-conteudo', name: 'IA Personalização de Conteúdo', category: 'conteudo', price: 'R$ 2.197/mês', description: 'Conteúdo dinâmico adaptado a cada usuário.' },
  { id: 'ia-criacao-de-apresentacoes', name: 'IA Criação de Apresentações', category: 'conteudo', price: 'R$ 997/mês', description: 'Slides executivos gerados automaticamente.' },
  
  // SEGURANÇA (5)
  { id: 'ia-seguranca-compliance', name: 'IA Segurança & Compliance', category: 'seguranca', price: 'R$ 3.997/mês', description: 'Monitoramento e detecção de anomalias em tempo real.' },
  { id: 'ia-anti-fraude', name: 'IA Anti-Fraude', category: 'seguranca', price: 'R$ 4.497/mês', description: 'Detecção em tempo real de transações fraudulentas.' },
  { id: 'ia-lgpd-manager', name: 'IA LGPD Manager', category: 'seguranca', price: 'R$ 2.197/mês', description: 'Governança e conformidade de dados automática.' },
  { id: 'ia-pentest-continuo', name: 'IA Pentest Contínuo', category: 'seguranca', price: 'Sob consulta', description: 'Testes de vulnerabilidade automatizados.' },
  { id: 'ia-threat-intelligence', name: 'IA Threat Intelligence', category: 'seguranca', price: 'Sob consulta', description: 'Inteligência de ameaças cibernéticas em tempo real.' },
  
  // RH & PESSOAS (4)
  { id: 'ia-recrutamento-inteligente', name: 'IA Recrutamento Inteligente', category: 'rh', price: 'R$ 1.997/mês', description: 'Triagem de currículos e matching automático.' },
  { id: 'ia-people-analytics', name: 'IA People Analytics', category: 'rh', price: 'R$ 2.497/mês', description: 'Análise de engajamento, performance e retenção.' },
  { id: 'ia-treinamento-adaptativo', name: 'IA Treinamento Adaptativo', category: 'rh', price: 'R$ 1.797/mês', description: 'Plataforma de learning com IA personalizada.' },
  { id: 'ia-clima-organizacional', name: 'IA Clima Organizacional', category: 'rh', price: 'R$ 1.297/mês', description: 'Pesquisa e análise de cultura com IA.' },
  
  // VENDAS & MARKETING (4)
  { id: 'ia-lead-scoring', name: 'IA Lead Scoring', category: 'vendas', price: 'R$ 2.197/mês', description: 'Qualificação automática de leads por probabilidade de conversão.' },
  { id: 'ia-campanha-inteligente', name: 'IA Campanha Inteligente', category: 'vendas', price: 'R$ 2.797/mês', description: 'Otimização automática de campanhas de mídia paga.' },
  { id: 'ia-sales-copilot', name: 'IA Sales Copilot', category: 'vendas', price: 'R$ 1.997/mês', description: 'Assistente de vendas com sugestões em tempo real.' },
  { id: 'ia-pricing-dinamico', name: 'IA Pricing Dinâmico', category: 'vendas', price: 'R$ 3.197/mês', description: 'Precificação inteligente baseada em demanda e concorrência.' },
  
  // FINANCEIRO (2)
  { id: 'ia-conciliacao-financeira', name: 'IA Conciliação Financeira', category: 'financeiro', price: 'R$ 2.497/mês', description: 'Automatização de reconciliação e fechamento contábil.' },
  { id: 'ia-gestao-de-fluxo-de-caixa', name: 'IA Gestão de Fluxo de Caixa', category: 'financeiro', price: 'R$ 1.997/mês', description: 'Previsão e otimização automática do fluxo de caixa.' },
  
  // OPERAÇÕES (2)
  { id: 'ia-supply-chain', name: 'IA Supply Chain', category: 'operacoes', price: 'R$ 3.497/mês', description: 'Otimização de cadeia de suprimentos e demanda.' },
  { id: 'ia-manutencao-preditiva', name: 'IA Manutenção Preditiva', category: 'operacoes', price: 'Sob consulta', description: 'Prevenção de falhas em equipamentos com sensores + IA.' }
]

const categories = [
  { id: 'todos', label: 'Todos' },
  { id: 'atendimento', label: 'Atendimento' },
  { id: 'analytics', label: 'Analytics & Dados' },
  { id: 'automacao', label: 'Automação' },
  { id: 'conteudo', label: 'Conteúdo' },
  { id: 'seguranca', label: 'Segurança' },
  { id: 'rh', label: 'RH & Pessoas' },
  { id: 'vendas', label: 'Vendas & Marketing' },
  { id: 'financeiro', label: 'Financeiro' },
  { id: 'operacoes', label: 'Operações' }
]

function Services() {
  const [activeFilter, setActiveFilter] = useState('todos')
  const sectionRef = useRef(null)
  const gridRef = useRef(null)

  const filteredServices = activeFilter === 'todos' 
    ? servicesData 
    : servicesData.filter(service => service.category === activeFilter)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(gridRef.current?.children || [], {
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power2.out'
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [filteredServices])

  return (
    <div className={styles.servicesPage}>
      {/* Hero Header */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <SectionBadge>Catálogo de Soluções</SectionBadge>
            <h1 className={styles.heroTitle}>45 Soluções de IA para o seu Negócio</h1>
            <p className={styles.heroSubtitle}>
              Do atendimento ao cliente à segurança de dados, temos a solução certa para cada desafio.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <div className={styles.filterBar}>
        <div className="container">
          <div className={styles.filterScroll}>
            {categories.map((category) => (
              <button
                key={category.id}
                className={`${styles.filterChip} ${activeFilter === category.id ? styles.active : ''}`}
                onClick={() => setActiveFilter(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <section ref={sectionRef} className={styles.servicesGrid}>
        <div className="container">
          <div ref={gridRef} className={styles.grid}>
            {filteredServices.map((service) => (
              <Link 
                key={service.id} 
                to={`/produto/${service.id}`}
                className={styles.serviceCard}
              >
                <GlassCard hoverable padding="medium">
                  <div className={styles.cardContent}>
                    <span 
                      className={styles.categoryBadge}
                      style={{ 
                        backgroundColor: `${categoryColors[service.category]}20`,
                        color: categoryColors[service.category]
                      }}
                    >
                      {categories.find(c => c.id === service.category)?.label}
                    </span>
                    <h3 className={styles.serviceName}>{service.name}</h3>
                    <p className={styles.serviceDescription}>{service.description}</p>
                    <div className={styles.cardFooter}>
                      <span className={styles.servicePrice}>{service.price}</span>
                      <span className={styles.viewDetails}>
                        Ver detalhes <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className={styles.footerCta}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Não encontrou o que procura?</h2>
            <p className={styles.ctaText}>
              Desenvolvemos soluções personalizadas para atender às necessidades específicas do seu negócio.
            </p>
            <a 
              href="https://wa.me/5524981313689?text=Quero%20meu%20site"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaButton}
            >
              <MessageCircle size={20} />
              <span>Falar com Especialista</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Services

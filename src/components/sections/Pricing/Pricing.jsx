import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check, Star, ArrowRight, X } from 'lucide-react'
import SectionBadge from '../../ui/SectionBadge/SectionBadge'
import styles from './Pricing.module.css'

gsap.registerPlugin(ScrollTrigger)

/** Brazilian format: 2997 → "2.997" (period as thousand separator, no decimals) */
const formatPrice = (value) => {
  if (value == null) return ''
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

const individualProducts = [
  {
    id: 'ia-atendimento-pro',
    name: 'IA Atendimento Pro',
    badge: 'MAIS POPULAR',
    monthlyPrice: 2997,
    annualPrice: 2397,
    description: 'Chatbot com IA generativa para atendimento 24/7, integração com CRM e análise de sentimento.',
    features: [
      'Atendimento 24/7 automatizado',
      'Integração com CRMs principais',
      'Análise de sentimento em tempo real',
      'Relatórios de performance',
      'Suporte técnico prioritário'
    ]
  },
  {
    id: 'ia-analytics-360',
    name: 'IA Analytics 360',
    badge: null,
    monthlyPrice: 3497,
    annualPrice: 2797,
    description: 'Dashboard de inteligência de dados em tempo real com previsões e insights automatizados.',
    features: [
      'Dashboard em tempo real',
      'Previsões preditivas',
      'Integração com múltiplas fontes',
      'Alertas automáticos',
      'API para integrações'
    ]
  },
  {
    id: 'ia-automacao-de-processos',
    name: 'IA Automação de Processos',
    badge: null,
    monthlyPrice: 4197,
    annualPrice: 3357,
    description: 'Automação de workflows completos com RPA + IA, reduzindo até 80% do trabalho manual.',
    features: [
      'Automação de workflows',
      'RPA integrado',
      'Processamento de documentos',
      'Integração com ERPs',
      'Monitoramento 24/7'
    ]
  },
  {
    id: 'ia-geracao-de-conteudo',
    name: 'IA Geração de Conteúdo',
    badge: null,
    monthlyPrice: 1997,
    annualPrice: 1597,
    description: 'Criação automatizada de textos, relatórios, campanhas e conteúdo personalizado em escala.',
    features: [
      'Geração de textos em escala',
      'Personalização por persona',
      'SEO otimizado automaticamente',
      'Múltiplos idiomas',
      'Revisão por IA incluída'
    ]
  },
  {
    id: 'ia-seguranca-compliance',
    name: 'IA Segurança & Compliance',
    badge: null,
    monthlyPrice: 3997,
    annualPrice: 3197,
    description: 'Monitoramento contínuo com IA para detecção de anomalias, fraudes e conformidade regulatória.',
    features: [
      'Detecção de anomalias 24/7',
      'Conformidade LGPD',
      'Relatórios de auditoria',
      'Alertas em tempo real',
      'Gestão de incidentes'
    ]
  }
]

const packages = [
  {
    id: 'starter-intelligence',
    name: 'Starter Intelligence',
    includes: ['IA Atendimento Pro', 'IA Geração de Conteúdo'],
    monthlyPrice: 4497,
    annualPrice: 3597,
    savings: 497,
    badge: 'ECONOMIA DE R$497',
    highlight: false
  },
  {
    id: 'business-intelligence-suite',
    name: 'Business Intelligence Suite',
    includes: ['IA Analytics 360', 'IA Automação de Processos', 'IA Segurança & Compliance'],
    monthlyPrice: 9997,
    annualPrice: 7997,
    savings: 1694,
    badge: 'MELHOR CUSTO-BENEFÍCIO',
    highlight: true
  },
  {
    id: 'enterprise-ai-complete',
    name: 'Enterprise AI Complete',
    includes: ['Todas as 5 soluções', 'Equipe dedicada', 'Suporte 24/7', 'Integrações customizadas'],
    monthlyPrice: null,
    annualPrice: null,
    savings: null,
    badge: 'ENTERPRISE',
    highlight: false,
    isEnterprise: true
  }
]

function PricingCard({ product, isAnnual, onViewDetails }) {
  const price = isAnnual ? product.annualPrice : product.monthlyPrice

  return (
    <div className={styles.pricingCard}>
      {product.badge && (
        <span className={`${styles.badge} ${styles.popularBadge}`}>
          {product.badge}
        </span>
      )}
      
      <h3 className={styles.productName}>{product.name}</h3>
      <p className={styles.productDescription}>{product.description}</p>
      
      <div className={styles.priceContainer}>
        <span className={styles.currency}>R$</span>
        <span className={styles.price}>{formatPrice(price)}</span>
        <span className={styles.period}>/mês</span>
      </div>
      
      {isAnnual && (
        <span className={styles.annualSavings}>Economia de 20% no anual</span>
      )}
      
      <ul className={styles.featuresList}>
        {product.features.map((feature, index) => (
          <li key={index} className={styles.featureItem}>
            <Check size={16} className={styles.checkIcon} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <div className={styles.cardActions}>
        <a 
          href="https://wa.me/5524981313689?text=Quero%20meu%20site"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.primaryButton}
        >
          Começar Agora
        </a>
        <button 
          onClick={() => onViewDetails(product)}
          className={styles.secondaryButton}
        >
          Ver detalhes <ArrowRight size={14} />
        </button>
      </div>
    </div>
  )
}

function PackageCard({ package: pkg, isAnnual }) {
  const price = isAnnual ? pkg.annualPrice : pkg.monthlyPrice

  return (
    <div className={`${styles.packageCard} ${pkg.highlight ? styles.highlighted : ''}`}>
      {pkg.badge && (
        <span className={`${styles.badge} ${pkg.highlight ? styles.bestValueBadge : styles.savingsBadge}`}>
          {pkg.highlight && <Star size={12} />}
          {pkg.badge}
        </span>
      )}
      
      <h3 className={styles.packageName}>{pkg.name}</h3>
      
      <div className={styles.includesSection}>
        <span className={styles.includesLabel}>Inclui:</span>
        <ul className={styles.includesList}>
          {pkg.includes.map((item, index) => (
            <li key={index} className={styles.includeItem}>
              <Check size={14} className={styles.checkIcon} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {pkg.isEnterprise ? (
        <div className={styles.enterprisePrice}>
          <span className={styles.enterpriseLabel}>Sob Consulta</span>
        </div>
      ) : (
        <div className={styles.priceContainer}>
          <span className={styles.currency}>R$</span>
          <span className={styles.price}>{formatPrice(price)}</span>
          <span className={styles.period}>/mês</span>
        </div>
      )}
      
      <a 
        href="https://wa.me/5524981313689?text=Quero%20meu%20site"
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.primaryButton} ${pkg.highlight ? styles.highlightedButton : ''}`}
      >
        {pkg.isEnterprise ? 'Falar com Especialista' : 'Começar Agora'}
      </a>
    </div>
  )
}

function PricingModal({ product, isOpen, onClose }) {
  const modalRef = useRef(null)

  useEffect(() => {
    if (isOpen && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }
      )
    }
  }, [isOpen])

  if (!isOpen || !product) return null

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div 
        ref={modalRef}
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.modalClose} onClick={onClose}>
          <X size={24} />
        </button>
        
        <h2 className={styles.modalTitle}>{product.name}</h2>
        <p className={styles.modalDescription}>{product.description}</p>
        
        <div className={styles.modalSection}>
          <h4 className={styles.modalSectionTitle}>Funcionalidades Incluídas</h4>
          <ul className={styles.modalFeatures}>
            {product.features.map((feature, index) => (
              <li key={index} className={styles.modalFeatureItem}>
                <Check size={18} className={styles.checkIcon} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className={styles.modalSection}>
          <h4 className={styles.modalSectionTitle}>Especificações Técnicas</h4>
          <div className={styles.specsGrid}>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>SLA de Uptime</span>
              <span className={styles.specValue}>99.9%</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Tempo de Resposta</span>
              <span className={styles.specValue}>&lt; 200ms</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Suporte</span>
              <span className={styles.specValue}>24/7</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Implementação</span>
              <span className={styles.specValue}>2-4 semanas</span>
            </div>
          </div>
        </div>
        
        <div className={styles.modalActions}>
          <a 
            href="https://wa.me/5524981313689?text=Quero%20meu%20site"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.modalPrimaryButton}
          >
            Começar Agora
          </a>
        </div>
      </div>
    </div>
  )
}

function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const sectionRef = useRef(null)
  const carouselRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out'
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleViewDetails = (product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProduct(null), 300)
  }

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 340
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section ref={sectionRef} id="precos" className={styles.pricing}>
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <SectionBadge>Planos e Soluções</SectionBadge>
          <h2 className={styles.title}>
            Invista no futuro da sua empresa
          </h2>
          <p className={styles.subtitle}>
            Soluções individuais ou pacotes combinados para máximo resultado
          </p>
        </div>

        {/* Toggle */}
        <div className={styles.toggleContainer}>
          <button
            className={`${styles.toggleButton} ${!isAnnual ? styles.active : ''}`}
            onClick={() => setIsAnnual(false)}
          >
            Mensal
          </button>
          <button
            className={`${styles.toggleButton} ${isAnnual ? styles.active : ''}`}
            onClick={() => setIsAnnual(true)}
          >
            Anual
            <span className={styles.discountBadge}>-20%</span>
          </button>
        </div>

        {/* Individual Products Carousel */}
        <div className={styles.sectionLabel}>Produtos Individuais</div>
        <div className={styles.carouselContainer}>
          <button 
            className={`${styles.carouselArrow} ${styles.arrowLeft}`}
            onClick={() => scrollCarousel('left')}
            aria-label="Anterior"
          >
            <ArrowRight size={20} style={{ transform: 'rotate(180deg)' }} />
          </button>
          
          <div ref={carouselRef} className={styles.pricingCarousel}>
            {individualProducts.map((product) => (
              <PricingCard 
                key={product.id} 
                product={product} 
                isAnnual={isAnnual}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
          
          <button 
            className={`${styles.carouselArrow} ${styles.arrowRight}`}
            onClick={() => scrollCarousel('right')}
            aria-label="Próximo"
          >
            <ArrowRight size={20} />
          </button>
        </div>

        {/* Packages */}
        <div className={styles.sectionLabel}>Pacotes</div>
        <div className={styles.packagesGrid}>
          {packages.map((pkg) => (
            <PackageCard 
              key={pkg.id} 
              package={pkg} 
              isAnnual={isAnnual}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <PricingModal 
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  )
}

export default Pricing

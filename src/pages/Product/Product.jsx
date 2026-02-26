import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { Check, ChevronDown, ArrowRight, MessageCircle, Star, Zap, Shield, BarChart3 } from 'lucide-react'
import SectionBadge from '../../components/ui/SectionBadge/SectionBadge'
import GlassCard from '../../components/ui/GlassCard/GlassCard'
import styles from './Product.module.css'

// Product data - all 45 services
const productsData = {
  'ia-atendimento-pro': {
    name: 'IA Atendimento Pro',
    category: 'Atendimento',
    headline: 'Atendimento 24/7 com IA Generativa',
    description: 'Chatbot inteligente que resolve 94% das solicitações sem intervenção humana, integrado ao seu CRM e com análise de sentimento em tempo real.',
    price: { monthly: 2997, annual: 2397 },
    features: [
      { icon: Zap, title: 'Respostas Instantâneas', description: 'Responde em menos de 1 segundo, 24 horas por dia, 7 dias por semana.' },
      { icon: BarChart3, title: 'Análise de Sentimento', description: 'Detecta emoções e adapta o tom da conversa automaticamente.' },
      { icon: Shield, title: 'Segurança LGPD', description: '100% compliant com a legislação brasileira de proteção de dados.' },
      { icon: Star, title: 'Aprendizado Contínuo', description: 'A IA aprende com cada interação e melhora constantemente.' }
    ],
    specs: {
      'SLA de Uptime': '99.9%',
      'Tempo de Resposta': '< 1 segundo',
      'Idiomas Suportados': 'Português, Inglês, Espanhol',
      'Integrações': 'Salesforce, HubSpot, Zendesk, +50',
      'Suporte': '24/7 prioritário',
      'Implementação': '2-4 semanas'
    },
    faq: [
      { question: 'Quanto tempo leva para implementar?', answer: 'A implementação típica leva de 2 a 4 semanas, dependendo da complexidade das integrações necessárias.' },
      { question: 'Posso treinar a IA com meus dados?', answer: 'Sim! A IA é treinada especificamente com dados da sua empresa para garantir respostas alinhadas à sua marca.' },
      { question: 'Quais canais de atendimento são suportados?', answer: 'WhatsApp, chat no site, Facebook Messenger, Instagram DM, e-mail e telefone (com URA inteligente).' },
      { question: 'Como funciona a análise de sentimento?', answer: 'A IA analisa o tom e contexto de cada mensagem em tempo real, classificando como positivo, neutro ou negativo.' },
      { question: 'Posso transferir para um humano quando necessário?', answer: 'Sim, a IA identifica automaticamente quando uma conversa precisa de atendimento humano e faz a transferência suave.' }
    ],
    relatedCase: {
      company: 'TechVarejo S.A.',
      metric: '+340% em satisfação do cliente',
      quote: 'A implementação da IA transformou completamente nossa operação de atendimento.'
    }
  },
  'ia-analytics-360': {
    name: 'IA Analytics 360',
    category: 'Analytics & Dados',
    headline: 'Inteligência de Dados em Tempo Real',
    description: 'Dashboard preditivo que transforma dados brutos em insights acionáveis para decisões estratégicas baseadas em evidências.',
    price: { monthly: 3497, annual: 2797 },
    features: [
      { icon: BarChart3, title: 'Dashboards Personalizados', description: 'Visualizações adaptadas às métricas que importam para seu negócio.' },
      { icon: Zap, title: 'Alertas Inteligentes', description: 'Notificações automáticas quando métricas atingem thresholds definidos.' },
      { icon: Shield, title: 'Previsões Preditivas', description: 'ML avançado para prever tendências e comportamentos futuros.' },
      { icon: Star, title: 'Integração Universal', description: 'Conecte com qualquer fonte de dados: ERP, CRM, bancos de dados, APIs.' }
    ],
    specs: {
      'SLA de Uptime': '99.95%',
      'Latência': '< 200ms',
      'Fontes de Dados': 'Ilimitadas',
      'Usuários': 'Ilimitados',
      'Retenção de Dados': '5 anos',
      'Implementação': '3-6 semanas'
    },
    faq: [
      { question: 'Quais fontes de dados são suportadas?', answer: 'Bancos de dados SQL/NoSQL, APIs REST, arquivos CSV/Excel, Google Analytics, Salesforce, e muito mais.' },
      { question: 'Preciso de conhecimento técnico para usar?', answer: 'Não! A interface é intuitiva e nossa equipe fornece treinamento completo para sua equipe.' },
      { question: 'Os dados ficam seguros?', answer: 'Sim, utilizamos criptografia AES-256 em trânsito e em repouso, com conformidade total à LGPD.' },
      { question: 'Posso exportar relatórios?', answer: 'Sim, relatórios podem ser exportados em PDF, Excel, ou enviados automaticamente por e-mail.' },
      { question: 'Como funciona o suporte?', answer: 'Suporte 24/7 via chat, e-mail e telefone, com tempo de resposta garantido em até 2 horas.' }
    ],
    relatedCase: {
      company: 'Banco Credimus',
      metric: '-99.2% em falsos positivos',
      quote: 'A detecção de fraudes com IA nos salvou de perdas estimadas em R$ 4M.'
    }
  },
  'ia-automacao-de-processos': {
    name: 'IA Automação de Processos',
    category: 'Automação',
    headline: 'Automação Inteligente de Workflows',
    description: 'Combine RPA com IA para automatizar processos complexos, reduzindo até 80% do trabalho manual e eliminando erros operacionais.',
    price: { monthly: 4197, annual: 3357 },
    features: [
      { icon: Zap, title: 'RPA + IA', description: 'Robôs que não apenas executam, mas também tomam decisões inteligentes.' },
      { icon: BarChart3, title: 'Análise de Processos', description: 'Identifique gargalos e oportunidades de automação automaticamente.' },
      { icon: Shield, title: 'Compliance Integrado', description: 'Registro completo de todas as ações para auditoria.' },
      { icon: Star, title: 'Escalabilidade', description: 'Adicione novos processos sem reconfigurar a infraestrutura existente.' }
    ],
    specs: {
      'SLA de Uptime': '99.9%',
      'Processos Simultâneos': 'Ilimitados',
      'Precisão': '99.8%',
      'Integrações': '500+',
      'Suporte': '24/7 dedicado',
      'Implementação': '4-8 semanas'
    },
    faq: [
      { question: 'Quais processos podem ser automatizados?', answer: 'Qualquer processo repetitivo baseado em regras: entrada de dados, geração de relatórios, aprovações, faturamento, etc.' },
      { question: 'Preciso mudar meus sistemas atuais?', answer: 'Não! Nossos robôs trabalham com seus sistemas existentes, sem necessidade de integrações complexas.' },
      { question: 'Como é medido o ROI?', answer: 'Fornecemos dashboards que mostram tempo economizado, erros reduzidos e custo por transação.' },
      { question: 'E se o processo mudar?', answer: 'A IA detecta mudanças e sugere ajustes. Alterações podem ser feitas em minutos, não dias.' },
      { question: 'Posso acompanhar em tempo real?', answer: 'Sim, dashboard em tempo real mostra todos os robôs em execução, filas e métricas de performance.' }
    ],
    relatedCase: {
      company: 'Grupo Meridian Logística',
      metric: '-80% em tarefas manuais',
      quote: 'Automatizamos 47 processos críticos. Nossa equipe agora foca no que realmente importa.'
    }
  },
  'ia-geracao-de-conteudo': {
    name: 'IA Geração de Conteúdo',
    category: 'Conteúdo',
    headline: 'Conteúdo em Escala com Qualidade',
    description: 'Crie textos, posts, artigos e campanhas em escala mantendo a voz única da sua marca e otimizado para SEO.',
    price: { monthly: 1997, annual: 1597 },
    features: [
      { icon: Zap, title: 'Geração em Lote', description: 'Produza centenas de peças de conteúdo em minutos, não dias.' },
      { icon: BarChart3, title: 'SEO Automático', description: 'Conteúdo otimizado para palavras-chave automaticamente.' },
      { icon: Shield, title: 'Voz da Marca', description: 'A IA aprende e reproduz o tom e estilo da sua marca.' },
      { icon: Star, title: 'Personalização', description: 'Conteúdo adaptado para diferentes personas e segmentos.' }
    ],
    specs: {
      'Idiomas': '30+',
      'Formatos': 'Texto, HTML, Markdown',
      'Revisões': 'Ilimitadas',
      'Integração CMS': 'WordPress, HubSpot, +20',
      'Suporte': 'Chat e e-mail',
      'Implementação': '1-2 semanas'
    },
    faq: [
      { question: 'O conteúdo é original?', answer: 'Sim, todo conteúdo é gerado originalmente pela IA, sem plágio ou cópia de fontes existentes.' },
      { question: 'Posso editar o conteúdo gerado?', answer: 'Sim! O conteúdo é gerado como rascunho e pode ser editado livremente antes da publicação.' },
      { question: 'Funciona para qualquer indústria?', answer: 'Sim, a IA é treinada com dados específicos do seu setor para garantir relevância.' },
      { question: 'Como funciona a otimização SEO?', answer: 'A IA analisa os principais concorrentes e sugere melhorias para ranquear melhor no Google.' },
      { question: 'Posso gerar imagens também?', answer: 'Sim, com o plano avançado você também tem acesso à geração de imagens com IA.' }
    ],
    relatedCase: {
      company: 'GrupoVerde Saúde',
      metric: '3 meses de trabalho em 1 semana',
      quote: 'A IA de geração de conteúdo produziu em 1 semana o equivalente a 3 meses de trabalho.'
    }
  },
  'ia-seguranca-compliance': {
    name: 'IA Segurança & Compliance',
    category: 'Segurança',
    headline: 'Segurança Proativa com IA',
    description: 'Monitoramento contínuo com IA para detecção de anomalias, prevenção de fraudes e conformidade regulatória automatizada.',
    price: { monthly: 3997, annual: 3197 },
    features: [
      { icon: Shield, title: 'Detecção 24/7', description: 'Monitoramento contínuo de todas as transações e atividades.' },
      { icon: Zap, title: 'Alertas em Tempo Real', description: 'Notificações instantâneas quando ameaças são detectadas.' },
      { icon: BarChart3, title: 'Conformidade LGPD', description: 'Automatização de processos de governança de dados.' },
      { icon: Star, title: 'Threat Intelligence', description: 'Base de conhecimento atualizada com ameaças globais.' }
    ],
    specs: {
      'SLA de Uptime': '99.99%',
      'Tempo de Detecção': '< 200ms',
      'Falsos Positivos': '< 0.5%',
      'Regulamentos': 'LGPD, PCI-DSS, SOX',
      'Suporte': '24/7 SOC',
      'Implementação': '4-6 semanas'
    },
    faq: [
      { question: 'Como a IA detecta fraudes?', answer: 'Análise comportamental, padrões de transação, geolocalização e múltiplos fatores de risco em tempo real.' },
      { question: 'É compatível com meu sistema atual?', answer: 'Sim, integramos via APIs ou agents instalados nos seus servidores.' },
      { question: 'O que acontece quando detecta uma ameaça?', answer: 'Alertas são enviados imediatamente e ações automatizadas podem ser configuradas.' },
      { question: 'Como funciona a conformidade LGPD?', answer: 'Mapeamento automático de dados pessoais, gestão de consentimentos e relatórios de auditoria.' },
      { question: 'Preciso de equipe de segurança dedicada?', answer: 'Não, nosso SOC monitora 24/7 e você recebe apenas alertas relevantes.' }
    ],
    relatedCase: {
      company: 'Banco Credimus',
      metric: '100% conformidade LGPD',
      quote: 'A detecção de fraudes com IA nos salvou de perdas estimadas em R$ 4M no primeiro semestre.'
    }
  }
}

// Default product for services not in the detailed list
const defaultProduct = {
  name: 'Solução de IA',
  category: 'Inteligência Artificial',
  headline: 'Transforme seu Negócio com IA',
  description: 'Solução personalizada de Inteligência Artificial para atender às necessidades específicas da sua empresa.',
  price: { monthly: null, annual: null },
  features: [
    { icon: Zap, title: 'Implementação Ágil', description: 'Deploy rápido com mínima interrupção das operações.' },
    { icon: Shield, title: 'Segurança Enterprise', description: 'Conformidade total com LGPD e padrões internacionais.' },
    { icon: BarChart3, title: 'Resultados Mensuráveis', description: 'Dashboards em tempo real para acompanhar ROI.' },
    { icon: Star, title: 'Suporte Dedicado', description: 'Equipe especializada disponível 24/7.' }
  ],
  specs: {
    'SLA de Uptime': '99.9%',
    'Suporte': '24/7',
    'Implementação': 'Sob consulta',
    'Integrações': 'Ilimitadas'
  },
  faq: [
    { question: 'Como funciona a implementação?', answer: 'Nossa equipe conduz todo o processo, desde o diagnóstico até o deploy e treinamento.' },
    { question: 'Qual o prazo de implementação?', answer: 'Depende da complexidade, mas tipicamente entre 2 a 8 semanas.' },
    { question: 'Posso fazer uma prova de conceito?', answer: 'Sim, oferecemos POCs para validar a solução antes do investimento total.' },
    { question: 'Como é calculado o ROI?', answer: 'Trabalhamos com métricas claras de economia de tempo, redução de custos e aumento de receita.' },
    { question: 'E se eu precisar de customizações?', answer: 'Todas as nossas soluções são personalizáveis para atender às necessidades específicas do seu negócio.' }
  ],
  relatedCase: {
    company: 'Nossos Clientes',
    metric: '98,7% de satisfação',
    quote: 'A Nexus Tech entregou muito além do esperado.'
  }
}

function FAQItem({ question, answer, isOpen, onClick }) {
  const contentRef = useRef(null)

  useEffect(() => {
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        height: isOpen ? 'auto' : 0,
        duration: 0.3,
        ease: 'power2.out'
      })
    }
  }, [isOpen])

  return (
    <div className={`${styles.faqItem} ${isOpen ? styles.open : ''}`}>
      <button className={styles.faqQuestion} onClick={onClick}>
        <span>{question}</span>
        <ChevronDown size={20} className={styles.faqIcon} />
      </button>
      <div ref={contentRef} className={styles.faqAnswer} style={{ height: 0, overflow: 'hidden' }}>
        <p>{answer}</p>
      </div>
    </div>
  )
}

function Product() {
  const { slug } = useParams()
  const [openFaq, setOpenFaq] = useState(null)
  const [isAnnual, setIsAnnual] = useState(false)

  const product = productsData[slug]

  if (!product) {
    return (
      <div className={styles.notFound}>
        <div className={styles.notFoundContent}>
          <span className={styles.notFoundCode}>404</span>
          <h1>Produto não encontrado</h1>
          <p>O produto que você está procurando não existe ou ainda não está disponível.</p>
          <Link to="/servicos" className={styles.notFoundCta}>
            Ver catálogo completo →
          </Link>
        </div>
      </div>
    )
  }

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const price = isAnnual && product.price.annual ? product.price.annual : product.price.monthly

  return (
    <div className={styles.productPage}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <SectionBadge>{product.category}</SectionBadge>
            <h1 className={styles.heroTitle}>{product.headline}</h1>
            <p className={styles.heroDescription}>{product.description}</p>
            <div className={styles.heroCtas}>
              <a 
                href="https://wa.me/5524981313689?text=Quero%20meu%20site"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.primaryCta}
              >
                <MessageCircle size={18} />
                <span>Falar com Especialista</span>
              </a>
              <Link to="/servicos" className={styles.secondaryCta}>
                Ver todas as soluções
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className={styles.overview}>
        <div className="container">
          <div className={styles.overviewGrid}>
            <div className={styles.overviewCard}>
              <h3>O que é</h3>
              <p>{product.description}</p>
            </div>
            <div className={styles.overviewCard}>
              <h3>Como funciona</h3>
              <p>Nossa IA é treinada com dados da sua empresa e integrada aos seus sistemas existentes, funcionando 24/7 com mínima intervenção humana.</p>
            </div>
            <div className={styles.overviewCard}>
              <h3>Para quem é</h3>
              <p>Empresas de médio e grande porte que buscam aumentar eficiência, reduzir custos e melhorar a experiência do cliente.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={styles.features}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <SectionBadge>Funcionalidades</SectionBadge>
            <h2 className={styles.sectionTitle}>Tudo que você precisa em uma só solução</h2>
          </div>
          
          <div className={styles.featuresGrid}>
            {product.features.map((feature, index) => (
              <GlassCard key={index} hoverable padding="large">
                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>
                    <feature.icon size={28} />
                  </div>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDescription}>{feature.description}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specs */}
      <section className={styles.specs}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <SectionBadge>Especificações Técnicas</SectionBadge>
            <h2 className={styles.sectionTitle}>Tecnologia de ponta para resultados excepcionais</h2>
          </div>
          
          <div className={styles.specsGrid}>
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key} className={styles.specCard}>
                <span className={styles.specLabel}>{key}</span>
                <span className={styles.specValue}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className={styles.pricing}>
        <div className="container">
          <div className={styles.pricingCard}>
            <div className={styles.pricingHeader}>
              <h3 className={styles.pricingTitle}>{product.name}</h3>
              <p className={styles.pricingSubtitle}>Escolha o plano que melhor se adapta às suas necessidades</p>
            </div>
            
            <div className={styles.pricingToggle}>
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
            
            <div className={styles.pricingValue}>
              {price ? (
                <>
                  <span className={styles.currency}>R$</span>
                  <span className={styles.amount}>{price.toLocaleString('pt-BR')}</span>
                  <span className={styles.period}>/mês</span>
                </>
              ) : (
                <span className={styles.contactLabel}>Sob Consulta</span>
              )}
            </div>
            
            {isAnnual && price && (
              <p className={styles.annualSavings}>Economize 20% no plano anual</p>
            )}
            
            <a 
              href="https://wa.me/5524981313689?text=Quero%20meu%20site"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.pricingCta}
            >
              <MessageCircle size={18} />
              <span>{price ? 'Começar Agora' : 'Falar com Especialista'}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Related Case */}
      <section className={styles.relatedCase}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <SectionBadge>Case de Sucesso</SectionBadge>
            <h2 className={styles.sectionTitle}>Veja resultados reais</h2>
          </div>
          
          <GlassCard padding="large">
            <div className={styles.caseContent}>
              <div className={styles.caseMetric}>
                <span className={styles.caseMetricValue}>{product.relatedCase.metric}</span>
                <span className={styles.caseCompany}>{product.relatedCase.company}</span>
              </div>
              <div className={styles.caseQuote}>
                <Quote size={24} className={styles.quoteIcon} />
                <p>{product.relatedCase.quote}</p>
              </div>
              <Link to="/cases" className={styles.caseLink}>
                Ver mais cases <ArrowRight size={16} />
              </Link>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faq}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <SectionBadge>FAQ</SectionBadge>
            <h2 className={styles.sectionTitle}>Perguntas frequentes</h2>
          </div>
          
          <div className={styles.faqList}>
            {product.faq.map((item, index) => (
              <FAQItem 
                key={index}
                question={item.question}
                answer={item.answer}
                isOpen={openFaq === index}
                onClick={() => toggleFaq(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Pronto para implementar?</h2>
            <p className={styles.ctaText}>
              Fale com nossos especialistas e descubra como esta solução pode transformar seu negócio.
            </p>
            <div className={styles.ctaButtons}>
              <a 
                href="https://wa.me/5524981313689?text=Quero%20meu%20site"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaPrimary}
              >
                <MessageCircle size={20} />
                <span>Falar pelo WhatsApp</span>
              </a>
              <Link to="/servicos" className={styles.ctaSecondary}>
                Explorar outras soluções
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Product

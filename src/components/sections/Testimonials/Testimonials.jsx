import styles from './Testimonials.module.css'
import SectionBadge from '../../ui/SectionBadge/SectionBadge'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Fernanda Costa',
    role: 'CEO',
    company: 'Innova Digital',
    text: 'A Nexus Tech entregou muito além do esperado. Nossa IA de atendimento responde 94% das solicitações sem intervenção humana. Crescimento de 40% em NPS em 6 meses.',
    initials: 'FC',
    color: '#2563EB'
  },
  {
    name: 'Marcelo Teixeira',
    role: 'Diretor de Operações',
    company: 'LogMais',
    text: 'Implementação impecável, equipe extremamente técnica. Em 8 semanas tínhamos 12 processos automatizados rodando em produção. ROI em menos de 4 meses.',
    initials: 'MT',
    color: '#7C3AED'
  },
  {
    name: 'Juliana Barbosa',
    role: 'CMO',
    company: 'GrupoVerde Saúde',
    text: 'A IA de geração de conteúdo produziu em 1 semana o equivalente a 3 meses de trabalho da nossa equipe. Qualidade surpreendente e alinhada à nossa voz de marca.',
    initials: 'JB',
    color: '#2563EB'
  },
  {
    name: 'Roberto Almeida',
    role: 'CTO',
    company: 'FinBridge',
    text: 'Segurança e compliance com IA era nosso maior desafio. A Nexus resolveu em 60 dias o que nossa equipe interna tentava há 2 anos. Parceiro estratégico de longo prazo.',
    initials: 'RA',
    color: '#7C3AED'
  },
  {
    name: 'Camila Ferreira',
    role: 'Diretora Geral',
    company: 'EduTech Brasil',
    text: 'O Analytics 360 mudou completamente nossa cultura de decisão. Agora tomamos decisões baseadas em dados reais. Crescimento de 28% em retenção de alunos em um trimestre.',
    initials: 'CF',
    color: '#22C55E'
  }
]

function Testimonials() {
  return (
    <section className={styles.testimonials}>
      <div className="container">
        <div className={styles.header}>
          <SectionBadge>Depoimentos</SectionBadge>
          <h2 className={styles.title}>O que nossos clientes dizem</h2>
        </div>

        <div className={styles.grid}>
          {testimonials.map((t, index) => (
            <div
              key={index}
              className={styles.card}
              style={{ animationDelay: `${index * 0.12}s` }}
            >
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={styles.star} />
                ))}
              </div>

              <p className={styles.text}>"{t.text}"</p>

              <div className={styles.author}>
                <div
                  className={styles.avatar}
                  style={{ background: `${t.color}25`, borderColor: `${t.color}40` }}
                >
                  <span style={{ color: t.color }}>{t.initials}</span>
                </div>
                <div className={styles.authorInfo}>
                  <span className={styles.authorName}>{t.name}</span>
                  <span className={styles.authorRole}>{t.role} · {t.company}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials

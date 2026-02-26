import { Link } from 'react-router-dom'
import { Repeat, Brain, TrendingDown, ArrowRight } from 'lucide-react'
import SectionBadge from '../../ui/SectionBadge/SectionBadge'
import styles from './TheProblem.module.css'

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
  return (
    <section className={styles.theProblem}>
      <div className="container">
        <div className={styles.header}>
          <SectionBadge>O Desafio do Mercado</SectionBadge>
          <h2 className={styles.title}>
            Enquanto você hesita, seus concorrentes já estão usando IA.
          </h2>
        </div>

        <div className={styles.painPointsGrid}>
          {painPoints.map((point, index) => (
            <div
              key={index}
              className={styles.painPointCard}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className={`${styles.iconWrapper} ${styles[point.color]}`}>
                <point.icon size={28} />
              </div>
              <h3 className={styles.cardTitle}>{point.title}</h3>
              <p className={styles.cardDescription}>{point.description}</p>
            </div>
          ))}
        </div>

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

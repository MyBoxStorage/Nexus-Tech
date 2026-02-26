import { Link } from 'react-router-dom'
import SectionBadge from '../../ui/SectionBadge/SectionBadge'
import styles from './About.module.css'

function About() {
  return (
    <section id="sobre" className={styles.about}>
      <div className="container">
        <div className={styles.aboutGrid}>

          <div className={styles.content}>
            <div className={styles.fadeItem} style={{ animationDelay: '0s' }}>
              <SectionBadge>Sobre Nós</SectionBadge>
            </div>

            <h2 className={styles.title} style={{ animationDelay: '0.1s' }}>
              Nascemos para liderar a revolução da IA nas empresas brasileiras
            </h2>

            <p className={styles.text} style={{ animationDelay: '0.2s' }}>
              Fundada em 2019 por ex-pesquisadores do Instituto Tecnológico de São Paulo e
              engenheiros vindos de Google e IBM, a Nexus Tech Solutions nasceu de uma
              convicção simples: a Inteligência Artificial não deveria ser privilégio das
              grandes corporações globais.
            </p>

            <p className={styles.text} style={{ animationDelay: '0.3s' }}>
              Após 5 anos transformando mais de 200 empresas brasileiras — de startups
              em crescimento acelerado a grupos com faturamento bilionário — construímos
              a maior plataforma de IA B2B do Brasil, com 98,7% de taxa de satisfação
              dos clientes e presença em 7 estados.
            </p>

            <Link to="/cases" className={styles.ctaLink} style={{ animationDelay: '0.4s' }}>
              Conhecer nossa história completa →
            </Link>
          </div>

          <div className={styles.imageWrapper}>
            <div className={styles.illustrationPlaceholder}>
              <div className={styles.illustrationInner}>
                <div className={styles.ilCircle1} />
                <div className={styles.ilCircle2} />
                <div className={styles.ilCircle3} />
                <div className={styles.ilDot1} />
                <div className={styles.ilDot2} />
              </div>
            </div>
          </div>

        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statItem} style={{ animationDelay: '0.5s' }}>
            <span className={styles.statNumber}>200+</span>
            <span className={styles.statLabel}>Empresas transformadas</span>
          </div>
          <div className={styles.statItem} style={{ animationDelay: '0.6s' }}>
            <span className={styles.statNumber}>98,7%</span>
            <span className={styles.statLabel}>Satisfação dos clientes</span>
          </div>
          <div className={styles.statItem} style={{ animationDelay: '0.7s' }}>
            <span className={styles.statNumber}>5 anos</span>
            <span className={styles.statLabel}>De inovação</span>
          </div>
        </div>

      </div>
    </section>
  )
}

export default About

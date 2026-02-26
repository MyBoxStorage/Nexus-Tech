import styles from './SocialProof.module.css'

const certifications = [
  { name: 'G', label: 'Google Cloud Partner', color: '#4285F4' },
  { name: 'A', label: 'AWS Partner Network', color: '#FF9900' },
  { name: 'M', label: 'Microsoft Azure Partner', color: '#00A4EF' },
  { name: 'AI', label: 'OpenAI Partner', color: '#10A37F' },
  { name: 'NV', label: 'NVIDIA Partner', color: '#76B900' },
  { name: 'ISO', label: 'ISO 27001 Certified', color: '#0066CC' },
]

function SocialProof() {
  return (
    <section className={styles.socialProof}>
      <div className="container">
        <p className={styles.tagline}>
          Tecnologias certificadas por líderes globais
        </p>
        <div className={styles.logosGrid}>
          {certifications.map((cert, index) => (
            <div
              key={cert.name}
              className={styles.logoCard}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={styles.logoBadge}
                style={{ borderColor: cert.color, background: `${cert.color}15` }}
              >
                <span className={styles.logoInitial} style={{ color: cert.color }}>
                  {cert.name}
                </span>
              </div>
              <span className={styles.logoName}>{cert.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SocialProof

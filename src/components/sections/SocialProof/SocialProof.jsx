import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './SocialProof.module.css'

gsap.registerPlugin(ScrollTrigger)

const certifications = [
  { name: 'Google Cloud', label: 'Google Cloud Partner', color: '#4285F4' },
  { name: 'AWS', label: 'AWS Partner Network', color: '#FF9900' },
  { name: 'Microsoft', label: 'Microsoft Azure Partner', color: '#00A4EF' },
  { name: 'OpenAI', label: 'OpenAI Partner', color: '#10A37F' },
  { name: 'NVIDIA', label: 'NVIDIA Partner', color: '#76B900' },
  { name: 'ISO 27001', label: 'ISO 27001 Certified', color: '#0066CC' },
]

function SocialProof() {
  const sectionRef = useRef(null)
  const logosRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(logosRef.current?.children || [], {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="social-proof" className={styles.socialProof}>
      <div className="container">
        <p className={styles.tagline}>
          Tecnologias certificadas por líderes globais
        </p>
        <div ref={logosRef} className={styles.logosGrid}>
          {certifications.map((cert) => (
            <div key={cert.name} className={styles.logoCard} title={cert.label}>
              <div className={styles.logoBadge} style={{ borderColor: cert.color }}>
                <span className={styles.logoInitial} style={{ color: cert.color }}>
                  {cert.name.charAt(0)}
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

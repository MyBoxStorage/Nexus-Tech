import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './SocialProof.module.css'

gsap.registerPlugin(ScrollTrigger)

// Partner logos as SVG components
const GoogleCloudLogo = () => (
  <svg viewBox="0 0 120 24" fill="currentColor" className={styles.logo}>
    <path d="M14.63 11.18l-1.85-3.23A9.04 9.04 0 0012 5.4V.36h-2.16v5.04a9.04 9.04 0 00-.78 2.55H7.8v2.16h1.26c.15.9.45 1.74.87 2.52l-1.86 3.23 1.87 1.08 1.86-3.23a9.08 9.08 0 003.12 1.8V20.4h2.16v-4.89a9.08 9.08 0 003.12-1.8l1.86 3.23 1.87-1.08-1.86-3.23c.42-.78.72-1.62.87-2.52h1.26V7.95h-1.26a9.04 9.04 0 00-.78-2.55V.36H18.36v5.04a9.04 9.04 0 00-.78 2.55h-2.95zM12 14.4a3.6 3.6 0 110-7.2 3.6 3.6 0 010 7.2z"/>
    <text x="28" y="17" fontSize="12" fontWeight="600">Google Cloud Partner</text>
  </svg>
)

const AWSLogo = () => (
  <svg viewBox="0 0 80 24" fill="currentColor" className={styles.logo}>
    <path d="M18.59 16.75c-1.6.72-3.35 1.1-5.18 1.1-4.94 0-8.5-3.06-8.5-7.4 0-4.35 3.56-7.4 8.5-7.4 1.83 0 3.58.38 5.18 1.1l-.5 1.8c-1.35-.58-2.85-.88-4.68-.88-3.6 0-6.1 2.2-6.1 5.38 0 3.2 2.5 5.4 6.1 5.4 1.83 0 3.33-.3 4.68-.88l.5 1.78zm6.35-12.05c2.2 0 3.65 1.05 3.65 3.35 0 2.15-1.35 3.55-4.05 4.35l-1.5.4.1 3.55h-2.2V7.7h2.2v3.5l1.3-.35c1.8-.5 2.6-1.2 2.6-2.4 0-1.15-.7-1.75-2-1.75-.9 0-1.85.25-2.85.75l-.7-1.75c1.15-.55 2.45-.9 4.15-.9zm10.5 0c2.75 0 4.3 1.65 4.3 4.85 0 3.2-1.55 4.85-4.3 4.85s-4.3-1.65-4.3-4.85c0-3.2 1.55-4.85 4.3-4.85zm0 1.95c-1.35 0-2.05 1.05-2.05 2.9 0 1.85.7 2.9 2.05 2.9s2.05-1.05 2.05-2.9c0-1.85-.7-2.9-2.05-2.9zm8.65-1.95h2.2v9.2h-2.2v-9.2zm0-3.6h2.2v2.2h-2.2v-2.2zm6.5 3.6v9.2h-2.2v-9.2h2.2zm-.05-3.6c.65 0 1.15.5 1.15 1.15s-.5 1.15-1.15 1.15-1.15-.5-1.15-1.15.5-1.15 1.15-1.15z"/>
    <text x="52" y="17" fontSize="10" fontWeight="600">Partner</text>
  </svg>
)

const AzureLogo = () => (
  <svg viewBox="0 0 100 24" fill="currentColor" className={styles.logo}>
    <path d="M5.48 17.52L0 20.1l9.1-15.7 3.65 6.3-7.27 6.82zm9.1-4.2l-5.47 4.9 8.2 4.68L24 10.4l-6.42-11.1-3.65 6.3 4.1 7.12-3.45.6z"/>
    <text x="28" y="17" fontSize="11" fontWeight="600">Microsoft Azure</text>
  </svg>
)

const OpenAILogo = () => (
  <svg viewBox="0 0 80 24" fill="currentColor" className={styles.logo}>
    <path d="M20.64 10.8a5.4 5.4 0 11-10.8 0 5.4 5.4 0 0110.8 0z"/>
    <path d="M15.24 0a9.6 9.6 0 100 19.2 9.6 9.6 0 000-19.2zm0 17.4a7.8 7.8 0 110-15.6 7.8 7.8 0 010 15.6z"/>
    <text x="26" y="17" fontSize="12" fontWeight="600">OpenAI</text>
  </svg>
)

const NVIDIALogo = () => (
  <svg viewBox="0 0 80 24" fill="currentColor" className={styles.logo}>
    <path d="M8.4 4.8l-6 14.4h3l1.2-3h6l1.2 3h3L10.8 4.8h-2.4zm-1.2 9l2.4-6 2.4 6H7.2z"/>
    <path d="M21.6 4.8v14.4h2.4V12l4.8 7.2h3l-4.8-7.2 4.8-7.2h-3l-4.8 7.2V4.8h-2.4z"/>
    <text x="34" y="17" fontSize="11" fontWeight="600">NVIDIA</text>
  </svg>
)

const ISO27001Logo = () => (
  <svg viewBox="0 0 100 24" fill="currentColor" className={styles.logo}>
    <rect x="2" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
    <path d="M6 12l3 3 5-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <text x="22" y="17" fontSize="10" fontWeight="600">ISO 27001</text>
  </svg>
)

const partners = [
  { name: 'Google Cloud Partner', Logo: GoogleCloudLogo },
  { name: 'AWS Partner', Logo: AWSLogo },
  { name: 'Microsoft Azure', Logo: AzureLogo },
  { name: 'OpenAI', Logo: OpenAILogo },
  { name: 'NVIDIA', Logo: NVIDIALogo },
  { name: 'ISO 27001', Logo: ISO27001Logo },
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
          {partners.map((partner) => (
            <div key={partner.name} className={styles.logoWrapper} title={partner.name}>
              <partner.Logo />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SocialProof

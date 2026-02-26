import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ArrowRight, MessageCircle } from 'lucide-react'
import SectionBadge from '../../ui/SectionBadge/SectionBadge'
import ScrollIndicator from '../../ui/ScrollIndicator/ScrollIndicator'
import NeuralNetwork from './NeuralNetwork'
import styles from './Hero.module.css'

// Scramble Text Effect Component
function ScrambleText({ text, duration = 1500 }) {
  const [displayText, setDisplayText] = useState(text)
  const chars = '!@#$%^&*ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  
  useEffect(() => {
    let iteration = 0
    const totalIterations = text.length * 3
    const intervalTime = duration / totalIterations
    
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            if (index < iteration / 3) {
              return text[index]
            }
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')
      )
      
      iteration++
      
      if (iteration >= totalIterations) {
        clearInterval(interval)
        setDisplayText(text)
      }
    }, intervalTime)
    
    return () => clearInterval(interval)
  }, [text, duration])
  
  return <span>{displayText}</span>
}

function Hero() {
  const heroRef = useRef(null)
  const contentRef = useRef(null)
  const underlineRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    
    // GSAP entrance animations
    const ctx = gsap.context(() => {
      // Content fade in
      gsap.from(contentRef.current?.children || [], {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.3
      })
      
      // Underline animation
      if (underlineRef.current) {
        gsap.fromTo(
          underlineRef.current,
          { strokeDashoffset: 300 },
          { 
            strokeDashoffset: 0, 
            duration: 1.5, 
            ease: 'power2.out',
            delay: 1.5 
          }
        )
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const scrollToNext = () => {
    const nextSection = document.getElementById('social-proof')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section ref={heroRef} className={styles.hero}>
      {/* Video Background */}
      <div className={styles.videoBackground}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className={styles.video}
          poster="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1920"
        >
          <source 
            src="https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_30fps.mp4" 
            type="video/mp4" 
          />
        </video>
        <div className={styles.videoOverlay} />
      </div>

      {/* Neural Network 3D */}
      <NeuralNetwork />

      {/* Content */}
      <div className="container">
        <div ref={contentRef} className={styles.heroContent}>
          {/* Badge */}
          <div className={styles.badgeWrapper}>
            <SectionBadge>Inteligência Artificial</SectionBadge>
          </div>

          {/* Headline */}
          <h1 className={styles.headline}>
            <span className={styles.headlineLine}>Sua Empresa.</span>
            <span className={styles.headlineLine}>
              Potencializada por{' '}
              <span className={styles.highlight}>
                {isLoaded ? <ScrambleText text="IA" duration={1500} /> : 'IA'}
              </span>
              .
            </span>
          </h1>

          {/* Subheadline */}
          <p className={styles.subheadline}>
            Transformamos operações complexas em{' '}
            <span className={styles.underlineContainer}>
              vantagens competitivas
              <svg 
                ref={underlineRef}
                className={styles.underlineSvg}
                viewBox="0 0 300 12"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 8 Q 75 2, 150 8 T 298 8"
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="300"
                  strokeDashoffset="300"
                />
              </svg>
            </span>{' '}
            reais através de soluções de Inteligência Artificial 
            personalizadas para médias e grandes empresas.
          </p>

          {/* CTAs */}
          <div className={styles.ctaGroup}>
            <Link to="/servicos" className={styles.primaryCta}>
              <span>Conheça Nossas Soluções</span>
              <ArrowRight size={18} />
            </Link>
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

      {/* Scroll Indicator */}
      <div className={styles.scrollIndicatorWrapper}>
        <ScrollIndicator onClick={scrollToNext} />
      </div>
    </section>
  )
}

export default Hero

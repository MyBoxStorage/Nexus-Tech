import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MessageCircle, Mail, MapPin, Clock, Check, Send } from 'lucide-react'
import SectionBadge from '../../ui/SectionBadge/SectionBadge'
import styles from './Contact.module.css'

gsap.registerPlugin(ScrollTrigger)

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    phone: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const sectionRef = useRef(null)
  const formRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(formRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        },
        x: 40,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out'
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const validatePhone = (phone) => {
    return phone.length >= 10
  }

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    
    if (name === 'phone') {
      setFormData(prev => ({ ...prev, [name]: formatPhone(value) }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório'
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'E-mail inválido'
    }
    if (!formData.company.trim()) newErrors.company = 'Empresa é obrigatória'
    if (!formData.role.trim()) newErrors.role = 'Cargo é obrigatório'
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório'
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Telefone inválido'
    }
    if (!formData.message.trim()) newErrors.message = 'Mensagem é obrigatória'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      setIsSubmitted(true)
    }
  }

  return (
    <section ref={sectionRef} id="contato" className={styles.contact}>
      <div className="container">
        <div className={styles.contactGrid}>
          {/* Left Content */}
          <div className={styles.contactInfo}>
            <SectionBadge>Contato</SectionBadge>
            
            <h2 className={styles.title}>
              Pronto para transformar sua empresa?
            </h2>
            
            <p className={styles.subtitle}>
              Fale com nossos especialistas e descubra quais soluções de IA fazem sentido para o seu negócio.
            </p>

            {/* WhatsApp CTA */}
            <a 
              href="https://wa.me/5524981313689?text=Quero%20meu%20site"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappCta}
            >
              <MessageCircle size={24} />
              <span>Iniciar conversa no WhatsApp</span>
            </a>

            {/* Contact Details */}
            <div className={styles.contactDetails}>
              <a href="mailto:contato@nexustech.com.br" className={styles.contactItem}>
                <Mail size={20} />
                <span>contato@nexustech.com.br</span>
              </a>
              
              <div className={styles.contactItem}>
                <MapPin size={20} />
                <span>
                  Av. Paulista, 1374 — 12º andar<br />
                  São Paulo/SP, CEP 01310-100
                </span>
              </div>
              
              <div className={styles.contactItem}>
                <Clock size={20} />
                <span>Seg–Sex, 09h–18h</span>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div ref={formRef} className={styles.formContainer}>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className={styles.contactForm}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.formLabel}>
                      Nome completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`${styles.formInput} ${errors.name ? styles.error : ''}`}
                      placeholder="Seu nome"
                    />
                    {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.formLabel}>
                      E-mail corporativo *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`${styles.formInput} ${errors.email ? styles.error : ''}`}
                      placeholder="seu@email.com"
                    />
                    {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="company" className={styles.formLabel}>
                      Empresa *
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className={`${styles.formInput} ${errors.company ? styles.error : ''}`}
                      placeholder="Nome da empresa"
                    />
                    {errors.company && <span className={styles.errorMessage}>{errors.company}</span>}
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="role" className={styles.formLabel}>
                      Cargo *
                    </label>
                    <input
                      type="text"
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className={`${styles.formInput} ${errors.role ? styles.error : ''}`}
                      placeholder="Seu cargo"
                    />
                    {errors.role && <span className={styles.errorMessage}>{errors.role}</span>}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.formLabel}>
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`${styles.formInput} ${errors.phone ? styles.error : ''}`}
                    placeholder="(00) 00000-0000"
                  />
                  {errors.phone && <span className={styles.errorMessage}>{errors.phone}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.formLabel}>
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`${styles.formTextarea} ${errors.message ? styles.error : ''}`}
                    placeholder="Conte-nos sobre seu projeto e necessidades..."
                    rows={4}
                  />
                  {errors.message && <span className={styles.errorMessage}>{errors.message}</span>}
                </div>

                <button type="submit" className={styles.submitButton}>
                  <Send size={18} />
                  <span>Enviar mensagem</span>
                </button>
              </form>
            ) : (
              <div className={styles.successMessage}>
                {/* Confetti */}
                <div className={styles.confettiContainer}>
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className={styles.confettiPiece} style={{ animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
                
                <div className={styles.successIcon}>
                  <Check size={32} />
                </div>
                
                <h3 className={styles.successTitle}>Mensagem enviada!</h3>
                <p className={styles.successText}>
                  Entre em contato com a Global Landing e adquira o site da sua empresa!
                </p>
                
                <a 
                  href="https://globallanding.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.successCta}
                >
                  Visitar Global Landing
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact

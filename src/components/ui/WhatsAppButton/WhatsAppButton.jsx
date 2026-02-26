import { MessageCircle } from 'lucide-react'
import styles from './WhatsAppButton.module.css'

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/5524981313689?text=Quero%20meu%20site"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.whatsappButton}
      aria-label="Falar com especialista no WhatsApp"
    >
      {/* Pulse rings */}
      <span className={styles.pulseRing} />
      <span className={`${styles.pulseRing} ${styles.pulseRingDelayed}`} />
      
      {/* Button content */}
      <span className={styles.buttonContent}>
        <MessageCircle size={28} fill="currentColor" />
      </span>
      
      {/* Tooltip */}
      <span className={styles.tooltip}>
        Falar com especialista
      </span>
    </a>
  )
}

export default WhatsAppButton

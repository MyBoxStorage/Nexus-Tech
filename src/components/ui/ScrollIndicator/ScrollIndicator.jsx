import { ChevronDown } from 'lucide-react'
import styles from './ScrollIndicator.module.css'

function ScrollIndicator({ onClick }) {
  return (
    <button 
      className={styles.scrollIndicator}
      onClick={onClick}
      aria-label="Rolar para baixo"
    >
      <span className={styles.text}>Scroll</span>
      <ChevronDown size={24} className={styles.icon} />
    </button>
  )
}

export default ScrollIndicator

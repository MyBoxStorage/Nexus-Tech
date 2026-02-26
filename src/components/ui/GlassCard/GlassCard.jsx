import styles from './GlassCard.module.css'

function GlassCard({ 
  children, 
  className = '', 
  hoverable = true,
  glowOnHover = false,
  padding = 'large'
}) {
  const cardClasses = [
    styles.glassCard,
    hoverable && styles.hoverable,
    glowOnHover && styles.glowOnHover,
    styles[padding] || styles.medium,
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={cardClasses}>
      {children}
    </div>
  )
}

export default GlassCard

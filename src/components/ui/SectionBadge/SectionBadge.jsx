import styles from './SectionBadge.module.css'

function SectionBadge({ children, variant = 'default' }) {
  const badgeClasses = [
    styles.sectionBadge,
    styles[variant]
  ].filter(Boolean).join(' ')

  return (
    <span className={badgeClasses}>
      <span className={styles.bracket}>[</span>
      <span className={styles.text}>{children}</span>
      <span className={styles.bracket}>]</span>
    </span>
  )
}

export default SectionBadge

import { Sun, Moon } from 'lucide-react'
import styles from './ThemeToggle.module.css'

function ThemeToggle({ theme, toggleTheme }) {
  const isDark = theme === 'dark'

  return (
    <button
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label={isDark ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
      title={isDark ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
    >
      <div className={`${styles.toggleIcon} ${isDark ? styles.dark : styles.light}`}>
        {isDark ? (
          <Sun size={18} className={styles.sunIcon} />
        ) : (
          <Moon size={18} className={styles.moonIcon} />
        )}
      </div>
      <span className={styles.toggleText}>
        {isDark ? 'Claro' : 'Escuro'}
      </span>
    </button>
  )
}

export default ThemeToggle

import styles from './Tag.module.css'

interface TagProps {
  children: React.ReactNode
  variant?: 'default' | 'live' | 'next' | 'roadmap'
}

export default function Tag({ children, variant = 'default' }: TagProps) {
  return (
    <span className={`${styles.tag} ${variant !== 'default' ? styles[variant] ?? '' : ''}`}>
      {(variant === 'live') && <span className={styles.dot} />}
      {(variant === 'next') && <span className={`${styles.dot} ${styles.dotNext}`} />}
      {(variant === 'roadmap') && <span className={`${styles.dot} ${styles.dotRoadmap}`} />}
      {children}
    </span>
  )
}

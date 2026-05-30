import Eyebrow from './Eyebrow'
import styles from './SectionHead.module.css'

interface SectionHeadProps {
  eyebrow: string
  title: React.ReactNode
  lede?: React.ReactNode
  dark?: boolean
}

export default function SectionHead({ eyebrow, title, lede, dark }: SectionHeadProps) {
  return (
    <div className={`${styles.head} ${dark ? styles.dark : ''}`}>
      <div className={styles.left}>
        <Eyebrow muted={dark}>{eyebrow}</Eyebrow>
        <h2 className={styles.title}>{title}</h2>
      </div>
      {lede && (
        <div className={styles.right}>
          <p className={styles.lede}>{lede}</p>
        </div>
      )}
    </div>
  )
}

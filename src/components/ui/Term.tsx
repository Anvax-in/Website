import styles from './Term.module.css'

interface TermProps {
  children: React.ReactNode
  dark?: boolean
}

export default function Term({ children, dark }: TermProps) {
  return (
    <code className={`${styles.term} ${dark ? styles.dark : ''}`}>
      {children}
    </code>
  )
}

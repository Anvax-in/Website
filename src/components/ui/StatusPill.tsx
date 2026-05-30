import styles from './StatusPill.module.css'

type Status = 'live' | 'wip' | 'planned'

interface StatusPillProps {
  status: Status
  children: React.ReactNode
}

export default function StatusPill({ status, children }: StatusPillProps) {
  return (
    <span className={`${styles.pill} ${status !== 'live' ? styles[status] ?? '' : ''}`}>
      {children}
    </span>
  )
}

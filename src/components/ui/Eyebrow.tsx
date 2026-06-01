import styles from './Eyebrow.module.css'

interface EyebrowProps {
  children: React.ReactNode
  muted?: boolean
  bare?: boolean
  onDark?: boolean
  className?: string
}

export default function Eyebrow({ children, muted, bare, onDark, className = '' }: EyebrowProps) {
  return (
    <div className={`${styles.eyebrow} ${muted ? styles.muted : ''} ${bare ? styles.bare : ''} ${onDark ? styles.onDark : ''} ${className}`}>
      {children}
    </div>
  )
}

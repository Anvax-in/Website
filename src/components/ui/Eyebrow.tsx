import styles from './Eyebrow.module.css'

interface EyebrowProps {
  children: React.ReactNode
  muted?: boolean
  bare?: boolean
  className?: string
}

export default function Eyebrow({ children, muted, bare, className = '' }: EyebrowProps) {
  return (
    <div className={`${styles.eyebrow} ${muted ? styles.muted : ''} ${bare ? styles.bare : ''} ${className}`}>
      {children}
    </div>
  )
}

import type { AnchorHTMLAttributes } from 'react'
import styles from './Button.module.css'

type Variant = 'primary' | 'accent' | 'secondary' | 'ghost' | 'secondaryDark'

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant
  arrow?: boolean
}

export default function Button({
  variant = 'primary',
  arrow = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <a
      className={`${styles.btn} ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
      {arrow && <span className={styles.arr}>→</span>}
    </a>
  )
}

import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import styles from './Button.module.css'

type Variant = 'primary' | 'accent' | 'secondary' | 'ghost' | 'secondaryDark'

type ButtonAsAnchor = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  arrow?: boolean
  variant?: Variant
}

type ButtonAsButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: undefined
  arrow?: boolean
  variant?: Variant
}

type ButtonProps = ButtonAsAnchor | ButtonAsButton

export default function Button({
  variant = 'primary',
  arrow = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const cls = `${styles.btn} ${styles[variant]} ${className}`
  const content = (
    <>
      {children}
      {arrow && <span className={styles.arr}>→</span>}
    </>
  )
  if ('href' in props && props.href !== undefined) {
    return (
      <a className={cls} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </a>
    )
  }
  return (
    <button className={cls} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  )
}

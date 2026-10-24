'use client'
import { useEffect, useRef, useState, type ReactNode, type ElementType } from 'react'

type Props = {
  children: ReactNode
  /** Stagger in ms, for siblings revealed in sequence. */
  delay?: number
  as?: ElementType
  className?: string
}

/**
 * Fade-and-rise on first entry. Reveals once and disconnects.
 * Content is visible by default if JS never runs — the .reveal class in
 * global.css only hides it after hydration marks the element as observed.
 */
export default function Reveal({ children, delay = 0, as: Tag = 'div', className = '' }: Props) {
  const ref = useRef<HTMLElement | null>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') { setShown(true); return }

    const io = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting) {
            if (delay) setTimeout(() => setShown(true), delay)
            else setShown(true)
            io.disconnect()
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [delay])

  return (
    <Tag ref={ref} className={`reveal ${shown ? 'isIn' : ''} ${className}`.trim()}>
      {children}
    </Tag>
  )
}

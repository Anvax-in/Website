'use client'
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode, type ElementType } from 'react'

type Props = {
  children: ReactNode
  /** Stagger in ms, for siblings revealed in sequence. */
  delay?: number
  as?: ElementType
  className?: string
}

/**
 * Fade-and-rise on first entry. Reveals once and disconnects.
 *
 * Content is visible by default — the plain `reveal` class in global.css
 * carries no hiding style. Only once this component's effects actually run
 * on the client does it add `pending` (synchronously, before paint) to hide
 * the element ahead of its scroll-into-view reveal. If JS never runs, is
 * blocked, or hydration fails, the server-rendered markup keeps its bare
 * `reveal` class and stays visible.
 */
export default function Reveal({ children, delay = 0, as: Tag = 'div', className = '' }: Props) {
  const ref = useRef<HTMLElement | null>(null)
  const [pending, setPending] = useState(false)
  const [shown, setShown] = useState(false)

  // Runs synchronously before the browser paints, so a hydrated client
  // never flashes the unhidden state before the hide-and-reveal animation.
  useLayoutEffect(() => {
    setPending(true)
  }, [])

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
    <Tag ref={ref} className={`reveal ${pending ? 'pending' : ''} ${shown ? 'isIn' : ''} ${className}`.trim()}>
      {children}
    </Tag>
  )
}

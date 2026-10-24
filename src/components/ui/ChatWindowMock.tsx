'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import styles from './ChatWindowMock.module.css'

export interface ChatWindowMockSource {
  n: number
  title: string
  system: string
}

export interface ChatWindowMockTag {
  t: string
  tone: 'ink' | 'sage'
}

export interface ChatWindowMockProps {
  /** Bar text, e.g. "Chat · grounded thread" or `Chat · ${chat.workspace}`. */
  label: string
  /** The chat bubble (the question). */
  question: string
  /** Rendered between the bubble and the answer. */
  middle?: ReactNode
  /** Answer paragraphs. Each gets a trailing footnote mark iff `sources` is non-empty. */
  answer: string[]
  /** Numbered citation list (industry hero only). */
  sources?: ChatWindowMockSource[]
  /** Pill row (industry hero only). */
  tags?: ChatWindowMockTag[]
  /** Rendered last. */
  footer?: ReactNode
}

export default function ChatWindowMock({ label, question, middle, answer, sources, tags, footer }: ChatWindowMockProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const hasFootnotes = Boolean(sources && sources.length > 0)

  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.playing)
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )
    obs.observe(panel)
    return () => obs.disconnect()
  }, [])

  return (
    <div className={styles.mockPanel} ref={panelRef}>
      <div className={styles.mockBar}>
        <span className={styles.mockBarLabel}>{label}</span>
        <span className={styles.mockGoverned}>
          <span className={styles.mockGovernedDot} />
          Governed
        </span>
      </div>
      <div className={styles.mockBody}>
        <div className={`${styles.mockChatBubble} ${styles.crBubble}`}>{question}</div>

        {middle}

        {answer.map((paragraph, i) => (
          <p key={i} className={`${styles.mockChatAnswer} ${styles.crAnswer}`}>
            {paragraph}
            {hasFootnotes && <sup>{i + 1}</sup>}
          </p>
        ))}

        {sources && sources.length > 0 && (
          <ul className={styles.sources}>
            {sources.map((s) => (
              <li key={s.n}>
                <b>{s.n}</b>
                <span>{s.title}</span>
                <em>{s.system}</em>
              </li>
            ))}
          </ul>
        )}

        {tags && tags.length > 0 && (
          <div className={styles.tags}>
            {tags.map((tag) => (
              <span key={tag.t} className={tag.tone === 'ink' ? styles.tagInk : styles.tagSage}>
                {tag.t}
              </span>
            ))}
          </div>
        )}

        {footer}
      </div>
    </div>
  )
}

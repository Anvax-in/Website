import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Button from '@/components/ui/Button'
import Reveal from '@/components/ui/Reveal'
import Icon from '@/components/ui/Icon'
import { industries, bySlug } from '@/content/industries'
import ChatWindowMock from '@/components/ui/ChatWindowMock'
import IndustryMock from '@/components/industries/IndustryMock'
import IndustryFaq from '@/components/industries/IndustryFaq'
import styles from '@/pages/Industry.module.css'
import chatMockStyles from '@/components/ui/ChatWindowMock.module.css'

export function generateStaticParams() {
  return industries.map(i => ({ slug: i.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const ind = bySlug((await params).slug)
  if (!ind) return {}
  const url = `https://www.anvax.in/industries/${ind.slug}`
  return {
    title: `${ind.name} | Anvax`,
    description: ind.metaDescription,
    openGraph: { title: `${ind.hero.h1} | Anvax`, description: ind.metaDescription, url },
    alternates: { canonical: url },
  }
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const ind = bySlug((await params).slug)
  if (!ind) notFound()

  return (
    <>
      <header className={styles.hero}>
        <div className={styles.heroGrid} />
        <div className={`container ${styles.heroInner}`}>
          <div>
            <div className={styles.eyebrow}>{ind.name}</div>
            <h1 className={styles.h1}>{ind.hero.h1}</h1>
            <p className={styles.lede}>{ind.hero.lede}</p>
            <div className={styles.ctas}>
              <Button href="/contact" arrow>Book a demo</Button>
              <Button href="/product" variant="secondary">See the platform</Button>
            </div>
          </div>
          <ChatWindowMock
            label={`Chat · ${ind.hero.chat.workspace}`}
            question={ind.hero.chat.question}
            middle={
              <>
                <div className={`${chatMockStyles.mockRedactPill} ${chatMockStyles.crPill}`}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--sage-600)" strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink: 0 }} aria-hidden="true">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  {ind.hero.chat.tags.find(t => t.tone === 'ink')?.t}
                </div>
                <div className={`${chatMockStyles.mockStepCard} ${chatMockStyles.crStep}`}>
                  <div className={chatMockStyles.mockStepHead}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--sage-600)" strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink: 0 }} aria-hidden="true">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span className={chatMockStyles.mockStepTitle}>Completed · {ind.hero.chat.sources.length} sources</span>
                  </div>
                  <div className={chatMockStyles.mockStepChips}>
                    {ind.hero.chat.sources.map(s => (
                      <span key={s.n} className={chatMockStyles.mockChipLogo}>
                        <Icon name="file" size={12} />
                        {s.system}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            }
            answer={ind.hero.chat.answer}
            footer={
              <div className={chatMockStyles.mockChatInput}>
                <div className={chatMockStyles.mockChatInputTop}>
                  <span className={chatMockStyles.mockChatGovernedPill}>
                    <span className={chatMockStyles.mockChatGovernedDot} />
                    Governed
                  </span>
                  <span className={chatMockStyles.mockChatCorpora}>All corpora</span>
                </div>
                <div className={chatMockStyles.mockChatInputRow}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--slate-400)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }} aria-hidden="true">
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                  </svg>
                  <span className={chatMockStyles.mockChatPlaceholder}>Ask about a policy, a contract or a control…</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--slate-400)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginLeft: 'auto' }} aria-hidden="true">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2M12 19v4" />
                  </svg>
                  <span className={chatMockStyles.mockSendBtn} aria-hidden="true">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 19V5M5 12l7-7 7 7" />
                    </svg>
                  </span>
                </div>
                <div className={chatMockStyles.mockChatMeta}>
                  <span>Llama 3.1 70B · self-hosted</span>
                  <span>·</span>
                  <span>Retention: 90 days</span>
                  <span>·</span>
                  <span className={chatMockStyles.mockChatLogged}>{ind.hero.chat.tags.find(t => t.tone === 'sage')?.t}</span>
                </div>
              </div>
            }
          />
        </div>
      </header>

      <section className={styles.storyWrap}>
        <div className="container">
          <Reveal className={styles.story}>
            <div className={styles.storyMain}>
              <div className={styles.storyLabel}>{ind.story.label}</div>
              <h2>{ind.story.title}</h2>
              <h3>The challenge</h3><p>{ind.story.challenge}</p>
              <h3>The result</h3><p>{ind.story.result}</p>
            </div>
            <div className={styles.storyStats}>
              {ind.story.stats.map(s => (
                <div key={s.label}><div className={styles.storyFigure}>{s.figure}</div><div>{s.label}</div></div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className={styles.band}>
        <div className="container">
          <Reveal className={styles.sectionHead}>
            <div className={styles.eyebrow}>{ind.benefitsEyebrow}</div>
            <h2 className={styles.h2}>{ind.benefitsTitle}</h2>
          </Reveal>
          <Reveal className={styles.benefits}>
            {ind.benefits.map(b => (
              <div key={b.title} className={styles.benefit}>
                <span className={styles.iconSquare}><Icon name={b.icon} /></span>
                <h3>{b.title}</h3>
                <p>{b.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className={styles.band}>
        <div className="container">
          <Reveal className={styles.sectionHead}>
            <div className={styles.eyebrow}>Anvax in action</div>
            <h2 className={styles.h2}>{ind.teamsTitle}</h2>
          </Reveal>
          {ind.teams.map((t, i) => (
            <Reveal key={t.team} className={`${styles.row} ${i % 2 ? styles.rowFlip : ''}`}>
              <div className={styles.rowText}>
                <div className={styles.eyebrow}>{t.team}</div>
                <h3 className={styles.h3}>{t.title}</h3>
                <p className={styles.rowBody}>{t.body}</p>
                <ul className={styles.points}>
                  {t.points.map(p => (
                    <li key={p.t}>
                      {p.icon ? (
                        <>
                          <div className={styles.pointHead}>
                            <div className={`${styles.pointIcon} ${styles['pointIcon_' + t.tint]}`}>
                              <Icon name={p.icon} size={15} />
                            </div>
                            <strong>{p.t}</strong>
                          </div>
                          <span className={styles.pointBodyIndent}>{p.d}</span>
                        </>
                      ) : (
                        <>
                          <strong>{p.t}</strong>
                          <span>{p.d}</span>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`${styles.panel} ${styles['tint_' + t.tint]}`}>
                <IndustryMock mock={t.mock} />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className={styles.quoteBand}>
        <div className="container">
          <Reveal className={styles.quote}>
            <span className={styles.quoteMark} aria-hidden>&ldquo;</span>
            <p>{ind.quote.text}</p>
            <div>{ind.quote.role}</div>
          </Reveal>
        </div>
      </section>

      {/* Connectors section intentionally omitted for now. */}

      <section className={styles.band}>
        <div className="container">
          <Reveal className={styles.secGrid}>
            <div>
              <div className={styles.eyebrow}>Security</div>
              <h2 className={styles.h2}>Your data stays yours.</h2>
              <p className={styles.rowBody}>Anvax runs inside your environment, follows your permissions and keeps a record of every answer.</p>
            </div>
            <div className={styles.secItems}>
              {[
                ['lock', 'Stays in your environment', 'Deploy on-premises or in your private cloud. Nothing is sent outside.'],
                ['shield', 'Sensitive details protected', ind.securityNote],
                ['layers', 'Permissions respected', 'People only find what they already have access to.'],
                ['audit', 'Every answer traceable', 'Sources and actions are recorded, so you can always show your work.'],
              ].map(([icon, t, d]) => (
                <div key={t} className={styles.secItem}>
                  <span className={styles.iconSquareDark}><Icon name={icon} size={18} /></span>
                  <div><strong>{t}</strong><p>{d}</p></div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className={styles.band}>
        <div className="container">
          <Reveal className={styles.secGrid}>
            <h2 className={styles.h2}>FAQs</h2>
            <IndustryFaq items={ind.faqs} />
          </Reveal>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={`container ${styles.ctaInner}`}>
          <h2>{ind.cta.title}</h2>
          <p>{ind.cta.body}</p>
          <div className={styles.ctas}>
            <Button href="/contact" arrow variant="primary">Book a demo</Button>
            <Button href="/security" variant="secondaryDark">Security and trust</Button>
          </div>
        </div>
      </section>
    </>
  )
}

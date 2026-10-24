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
            answer={ind.hero.chat.answer}
            sources={ind.hero.chat.sources}
            tags={ind.hero.chat.tags}
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
                  {t.points.map(p => <li key={p.t}><strong>{p.t}</strong><span>{p.d}</span></li>)}
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

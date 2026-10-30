import type { Metadata } from 'next'
import { Fragment } from 'react'
import { notFound } from 'next/navigation'
import Eyebrow from '@/components/ui/Eyebrow'
import SectionHead from '@/components/ui/SectionHead'
import Button from '@/components/ui/Button'
import Reveal from '@/components/ui/Reveal'
import Icon from '@/components/ui/Icon'
import IndustryFaq from '@/components/industries/IndustryFaq'
import CompareLogo from '@/components/compare/CompareLogo'
import CompareHeroGraphic from '@/components/compare/CompareHeroGraphic'
import { compareContent, bySlug } from '@/content/compare'
import { apartCards } from '@/content/compare/shared'
import type { FlaggedPoint } from '@/content/compare/types'
import styles from '@/pages/Compare.module.css'

const ANVAX_LOGO = { kind: 'image' as const, src: '/compare/anvax-logo.png', alt: 'Anvax' }

export function generateStaticParams() {
  return compareContent.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = bySlug((await params).slug)
  if (!c) return {}
  const url = `https://www.anvax.in/compare/${c.slug}`
  return {
    title: `${c.metaTitle} | Anvax`,
    description: c.metaDescription,
    openGraph: { title: `${c.metaTitle} | Anvax`, description: c.metaDescription, url },
    twitter: { card: 'summary_large_image', title: `${c.metaTitle} | Anvax`, description: c.metaDescription },
    alternates: { canonical: url },
  }
}

function FlaggedRow({ point }: { point: FlaggedPoint }) {
  return (
    <li className={styles.point}>
      <span className={`${styles.pointFlag} ${point.ok ? styles.ok : styles.warn}`}>{point.ok ? '✓' : '!'}</span>
      <span>{point.text}</span>
    </li>
  )
}

function FlaggedCellRow({ point }: { point: FlaggedPoint }) {
  return (
    <div className={styles.point}>
      <span className={`${styles.pointFlag} ${point.ok ? styles.ok : styles.warn}`}>{point.ok ? '✓' : '!'}</span>
      <span>{point.text}</span>
    </div>
  )
}

export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const c = bySlug((await params).slug)
  if (!c) notFound()

  return (
    <>
      <header className={styles.hero}>
        <div className={styles.heroGrid} />
        <div className={`container ${styles.heroInner}`}>
          <div>
            <h1 className={styles.h1}>
              Anvax <span className={styles.vsWord}>vs.</span> {c.competitorName}
            </h1>
            <p className={styles.lede}>{c.heroLede}</p>
            <div className={styles.ctas}>
              <Button variant="primary" href="/contact" arrow>Book a demo</Button>
              <Button variant="secondary" href="#detailed-comparison">See the full comparison</Button>
            </div>
          </div>
          <CompareHeroGraphic competitorLogo={c.competitorLogo} />
        </div>
      </header>

      <section className="section alt">
        <div className="container">
          <Reveal>
            <SectionHead eyebrow="At a glance" title={c.atAGlanceTitle} />
          </Reveal>
          <Reveal className={styles.glanceGrid}>
            <div className={styles.glanceCard}>
              <div className={styles.glanceHead}>
                <CompareLogo logo={ANVAX_LOGO} size={34} />
                <span>Anvax</span>
              </div>
              <ul className={styles.glanceList}>
                {c.atAGlanceAnvax.map(p => <FlaggedRow key={p.text} point={p} />)}
              </ul>
            </div>
            <div className={styles.glanceCard}>
              <div className={styles.glanceHead}>
                <CompareLogo logo={c.competitorLogo} size={34} />
                <span>{c.competitorName}</span>
              </div>
              <ul className={styles.glanceList}>
                {c.atAGlanceCompetitor.map(p => <FlaggedRow key={p.text} point={p} />)}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHead eyebrow="What sets Anvax apart" title="AI your regulator can inspect, on infrastructure you control." />
          </Reveal>
          <Reveal className={styles.pillars}>
            {apartCards.map(card => (
              <div key={card.title} className={styles.pillar}>
                <span className={styles.iconSquare}><Icon name={card.icon} size={22} /></span>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section alt" id="detailed-comparison">
        <div className="container">
          <Reveal>
            <Eyebrow>Detailed comparison</Eyebrow>
            <h2 className={styles.h2}>{c.detailedTitle}</h2>
            <p className={styles.detailedLede}>{c.detailedLede}</p>
          </Reveal>
          <Reveal className={styles.jumpLinks}>
            {c.detailedGroups.map((g, i) => (
              <a key={g.title} href={`#cat-${i + 1}`} className={styles.jumpLink}>
                <span className={styles.jumpIndex}>{i + 1}</span>
                <span className={styles.jumpLabel}>{g.title}</span>
              </a>
            ))}
          </Reveal>

          {c.detailedGroups.map((g, gi) => (
            <Reveal key={g.title} className={styles.group} as="div">
              <div id={`cat-${gi + 1}`} style={{ scrollMarginTop: 'calc(var(--nav-height) + 28px)' }}>
                <div className={styles.groupHead}>
                  <span className={styles.groupIndex}>{gi + 1}</span>
                  <h3 className={styles.groupTitle}>{g.title}</h3>
                </div>
                <div className={styles.matrixScroll}>
                  <div className={styles.matrix}>
                    <div className={styles.matrixHeadRow}>
                      <div className={styles.matrixHeadCell}>Parameter</div>
                      <div className={styles.matrixHeadCell}>
                        <span className={styles.matrixHeadLogo}><CompareLogo logo={ANVAX_LOGO} size={20} /></span>
                        <span className={styles.matrixHeadName}>Anvax</span>
                      </div>
                      <div className={styles.matrixHeadCell}>
                        <span className={styles.matrixHeadLogo}><CompareLogo logo={c.competitorLogo} size={20} /></span>
                        <span className={styles.matrixHeadName}>{c.competitorName}</span>
                      </div>
                    </div>
                    {g.parameters.map(p => (
                      <Fragment key={p.name}>
                        <div className={styles.matrixRow}>
                          <div className={styles.matrixParam}>{p.name}</div>
                          <div className={`${styles.matrixCell} ${styles.anvaxCell}`}>
                            {p.anvax.map(pt => <FlaggedCellRow key={pt.text} point={pt} />)}
                          </div>
                          <div className={`${styles.matrixCell} ${styles.competitorCell}`}>
                            {p.competitor.map(pt => <FlaggedCellRow key={pt.text} point={pt} />)}
                          </div>
                        </div>
                      </Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
          <p className={styles.sourcesNote}>{c.sourcesNote}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHead eyebrow="Which is right for you" title="Choose by your constraint." />
          </Reveal>
          <Reveal className={styles.fitGrid}>
            <div className={styles.fitCol}>
              <div className={styles.fitHead}>
                <CompareLogo logo={ANVAX_LOGO} size={30} />
                <span>{c.bestForAnvax.heading}</span>
              </div>
              <ul className={styles.fitList}>
                {c.bestForAnvax.items.map(item => (
                  <li key={item}><span className={styles.fitArrow}>&#8594;</span><span>{item}</span></li>
                ))}
              </ul>
            </div>
            <div className={styles.fitCol}>
              <div className={styles.fitHead}>
                <CompareLogo logo={c.competitorLogo} size={30} />
                <span>{c.bestForCompetitor.heading}</span>
              </div>
              <ul className={styles.fitList}>
                {c.bestForCompetitor.items.map(item => (
                  <li key={item}><span className={styles.fitArrow}>&#8594;</span><span>{item}</span></li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <Reveal className={styles.secGrid}>
            <h2 className={styles.h2}>FAQs</h2>
            <IndustryFaq items={c.faqs} />
          </Reveal>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={`container ${styles.ctaInner}`}>
          <h2>{c.ctaTitle}</h2>
          <p>{c.ctaBody}</p>
          <div className={styles.ctas}>
            <Button href="/contact" arrow variant="primary">Book a demo</Button>
            <Button href="/deployment" variant="secondaryDark">See deployment options</Button>
          </div>
        </div>
      </section>
    </>
  )
}

import styles from './HeroSection.module.css'

const navItems = [
  {
    label: 'Search',
    active: true,
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <path d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0" />
      </svg>
    ),
  },
  {
    label: 'Chat',
    active: false,
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    label: 'Agents',
    active: false,
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 8V4H8M2 4h20M20 4v16M4 4v16M2 20h20M9 12h6M9 16h6" />
      </svg>
    ),
  },
  {
    label: 'Audit trail',
    active: false,
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 12l2 2 4-4M5 3h14v18l-4-2-3 2-3-2-4 2z" />
      </svg>
    ),
  },
]

const connectors = [
  { name: 'SharePoint', logo: '/assets/logos/sharepoint.svg' },
  { name: 'Confluence', logo: '/assets/logos/confluence.svg' },
  { name: 'Snowflake',  logo: '/assets/logos/snowflake.svg' },
  { name: 'Salesforce', logo: '/assets/logos/salesforce.svg' },
  { name: 'Slack',      logo: '/assets/logos/slack.svg' },
]

const results = [
  {
    n: 1,
    logo: '/assets/logos/sharepoint.svg',
    title: 'Q3 credit review consumer lending.pdf',
    ref: 'p. 14',
    excerpt: '"Eleven files were flagged for incomplete refresh documentation…"',
  },
  {
    n: 2,
    logo: '/assets/logos/confluence.svg',
    title: 'Refresh SOP v4.docx',
    ref: '§ 3.2',
    excerpt: '"Documentation must be re-verified every 24 months…"',
  },
  {
    n: 3,
    logo: '/assets/logos/snowflake.svg',
    title: 'Risk committee minutes 19 Aug',
    ref: 'row 6',
    excerpt: '"Desk to clear the backlog before the October cycle."',
  },
]

export default function HeroSection() {
  return (
    <header className={styles.hero}>
      <div className={styles.lattice} aria-hidden="true" />

      <div className={styles.inner}>
        {/* ── Copy block ── */}
        <div className={styles.copy}>
          <h1 className={styles.h1}>
            Governed AI your data<br />never has to leave for.
          </h1>
          <p className={styles.lede}>
            Your teams search, chat, and run real work across your own documents
            and systems. Every query logged, every prompt policy-checked, nothing
            crossing your perimeter.
          </p>
          <div className={styles.ctaRow}>
            <a href="/contact" className={styles.btnPrimary}>
              Book a demo <span className={styles.arrow}>→</span>
            </a>
            <a href="/product" className={styles.btnGhost}>
              Take the product tour
            </a>
          </div>
          <p className={styles.tagline}>
            Runs in your VPC, your sovereign cloud, or fully air-gapped. No data
            leaves your tenancy.
          </p>
        </div>

        {/* ── Product mock ── */}
        <div className={styles.mockWrap} aria-hidden="true">
          <div className={styles.mock}>
            {/* Title bar */}
            <div className={styles.mockBar}>
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.mockBrand}>anvax · your tenancy · eu-central-1</span>
              <span className={styles.governed}>
                <span className={styles.governedDot} />
                Governed
              </span>
            </div>

            {/* Three-column body */}
            <div className={styles.mockGrid}>
              {/* Left nav */}
              <div className={styles.mockSidebar}>
                <div className={styles.mockSectionLabel}>Workspace</div>
                {navItems.map(({ label, active, icon }) => (
                  <div
                    key={label}
                    className={active ? styles.mockNavActive : styles.mockNav}
                  >
                    {icon}
                    {label}
                  </div>
                ))}

                <div className={styles.mockSectionLabel} style={{ marginTop: 18 }}>
                  Connected
                </div>
                <div className={styles.mockConnectors}>
                  {connectors.map(({ name, logo }) => (
                    <div key={name} className={styles.mockConnector}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={logo} alt="" width="15" height="15" className={styles.mockLogo} />
                      {name}
                    </div>
                  ))}
                </div>
                <div className={styles.mockSidebarFooter}>
                  5 of 180 connectors · in region
                </div>
              </div>

              {/* Center search panel */}
              <div className={styles.mockCenter}>
                <div className={styles.mockSearchBox}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--slate-400)" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0 }}>
                    <path d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0" />
                  </svg>
                  <span className={styles.mockSearchText}>Which credit files were flagged in Q3</span>
                  <span className={styles.mockCaret} aria-hidden="true" />
                  <span className={styles.mockKbd}>⌘K</span>
                </div>

                <div className={styles.mockChips}>
                  <span className={styles.mockChipActive}>All sources</span>
                  <span className={styles.mockChip}>Last 90 days</span>
                  <span className={styles.mockChip}>Credit risk</span>
                </div>

                <div className={styles.mockAnswer}>
                  <div className={styles.mockAnswerLabel}>Answer · grounded in 3 sources</div>
                  <p className={styles.mockAnswerText}>
                    Eleven credit files were flagged in Q3, nine for incomplete
                    refresh documentation and two for expired verification. All
                    eleven sit with the consumer lending desk.
                  </p>
                </div>

                <div className={styles.mockResults}>
                  {results.map(({ n, logo, title, ref, excerpt }) => (
                    <div key={n} className={styles.mockResult}>
                      <div className={styles.mockResultHead}>
                        <span className={styles.mockResultN}>{n}</span>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={logo} alt="" width="14" height="14" className={styles.mockLogo} />
                        <span className={styles.mockResultTitle}>{title}</span>
                        <span className={styles.mockResultRef}>{ref}</span>
                      </div>
                      <p className={styles.mockResultExcerpt}>{excerpt}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right metadata panel */}
              <div className={styles.mockRight}>
                <div className={styles.mockSectionLabel}>This query</div>
                <div className={styles.mockMeta}>
                  {[
                    { label: 'Scoped to your entitlements', sub: '214 of 1,908 documents' },
                    { label: 'Redaction applied', sub: '2 identifiers removed' },
                    { label: 'Written to audit trail', sub: 'Entry 4,412,908' },
                  ].map(({ label, sub }) => (
                    <div key={label} className={styles.mockMetaRow}>
                      <span className={styles.mockMetaDot} />
                      <span className={styles.mockMetaText}>
                        {label}
                        <br />
                        <span className={styles.mockMetaSub}>{sub}</span>
                      </span>
                    </div>
                  ))}
                </div>
                <div className={styles.mockRightFooter}>
                  Model self-hosted in eu-central-1. No egress.
                </div>
                <div className={styles.mockProgress}>
                  <div className={styles.mockProgressFill} />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.mockFade} aria-hidden="true" />
        </div>
      </div>
    </header>
  )
}

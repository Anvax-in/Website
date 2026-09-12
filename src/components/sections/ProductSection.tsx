'use client'

import { useEffect, useRef } from 'react'
import styles from './ProductSection.module.css'

function Check() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--sage-600)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 4 }} aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

function GovernedBadge() {
  return (
    <span className={styles.mockGoverned}>
      <span className={styles.mockGovernedDot} />
      Governed
    </span>
  )
}

function SearchMock() {
  return (
    <div className={styles.mockPanel}>
      <div className={styles.mockBar}>
        <span className={styles.mockBarLabel}>Search · cited results</span>
        <GovernedBadge />
      </div>
      <div className={styles.mockBody}>
        <div className={styles.mockSearchBox}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--slate-400)" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0 }} aria-hidden="true">
            <path d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0" />
          </svg>
          <span className={styles.mockSearchQuery}>exposure to the October rate change</span>
          <span className={styles.mockCaret} aria-hidden="true" />
        </div>

        <div className={`${styles.mockChips} ${styles.srChips}`}>
          <span className={styles.mockChipDark}>3 sources</span>
          <span className={styles.mockChipLogo}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/logos/sharepoint.svg" alt="" width="12" height="12" style={{ objectFit: 'contain' }} />
            SharePoint
          </span>
          <span className={styles.mockChipLogo}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/logos/snowflake.svg" alt="" width="12" height="12" style={{ objectFit: 'contain' }} />
            Snowflake
          </span>
          <span className={styles.mockChip}>Scoped to you</span>
        </div>

        <div className={`${styles.mockResults} ${styles.srResults}`}>
          <div className={styles.mockResult}>
            <div className={styles.mockResultHead}>
              <span className={styles.mockResultN}>1</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/logos/snowflake.svg" alt="" width="14" height="14" style={{ objectFit: 'contain', flexShrink: 0 }} />
              <span className={styles.mockResultTitle}>Treasury exposure October.xlsx</span>
              <span className={styles.mockResultRef}>Sheet 2</span>
            </div>
            <p className={styles.mockResultExcerpt}>&ldquo;Floating-rate book stands at 38% of total exposure.&rdquo;</p>
          </div>
          <div className={styles.mockResult}>
            <div className={styles.mockResultHead}>
              <span className={styles.mockResultN}>2</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/logos/sharepoint.svg" alt="" width="14" height="14" style={{ objectFit: 'contain', flexShrink: 0 }} />
              <span className={styles.mockResultTitle}>ALCO pack 02 Sep.pdf</span>
              <span className={styles.mockResultRef}>p. 7</span>
            </div>
            <p className={styles.mockResultExcerpt}>&ldquo;Committee agreed a 25bp pass-through scenario.&rdquo;</p>
          </div>
          <div className={styles.mockWithheld}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--slate-400)" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0 }} aria-hidden="true">
              <path d="M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>2 further matches withheld, outside your entitlements</span>
          </div>
        </div>

        <div className={`${styles.mockFooter} ${styles.srFooter}`}>Returned in 0.9 s · logged as entry 4,412,911</div>
      </div>
    </div>
  )
}

function ChatMock() {
  return (
    <div className={styles.mockPanel}>
      <div className={styles.mockBar}>
        <span className={styles.mockBarLabel}>Chat · grounded thread</span>
        <GovernedBadge />
      </div>
      <div className={styles.mockBody}>
        <div className={`${styles.mockChatBubble} ${styles.crBubble}`}>
          Summarise the outstanding exceptions on account 4417-88-2301 and tell me who owns them.
        </div>

        <div className={`${styles.mockRedactPill} ${styles.crPill}`}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--sage-600)" strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink: 0 }} aria-hidden="true">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          Account number redacted before the model saw it
        </div>

        <div className={`${styles.mockStepCard} ${styles.crStep}`}>
          <div className={styles.mockStepHead}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--sage-600)" strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink: 0 }} aria-hidden="true">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            <span className={styles.mockStepTitle}>Completed · 3 steps · 2 sources</span>
            <span className={styles.mockStepTime}>16:56</span>
          </div>
          <div className={styles.mockStepChips}>
            <span className={styles.mockChipLogo}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/logos/salesforce.svg" alt="" width="12" height="12" style={{ objectFit: 'contain' }} />
              Exceptions register
            </span>
            <span className={styles.mockChipLogo}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/logos/sharepoint.svg" alt="" width="12" height="12" style={{ objectFit: 'contain' }} />
              Financial crime log
            </span>
          </div>
        </div>

        <p className={`${styles.mockChatAnswer} ${styles.crAnswer}`}>
          Three exceptions are open. Two are documentation refreshes owned by the onboarding desk, both past their 30-day window. The third is a sanctions re-screen owned by financial crime, raised 6 September.
        </p>

        <div className={styles.mockChatInput}>
          <div className={styles.mockChatInputTop}>
            <span className={styles.mockChatGovernedPill}>
              <span className={styles.mockChatGovernedDot} />
              Governed
            </span>
            <span className={styles.mockChatCorpora}>All corpora</span>
          </div>
          <div className={styles.mockChatInputRow}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--slate-400)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }} aria-hidden="true">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
            </svg>
            <span className={styles.mockChatPlaceholder}>Ask about a policy, a contract or a control…</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--slate-400)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginLeft: 'auto' }} aria-hidden="true">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2M12 19v4" />
            </svg>
            <span className={styles.mockSendBtn} aria-hidden="true">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </span>
          </div>
          <div className={styles.mockChatMeta}>
            <span>Llama 3.1 70B · self-hosted</span>
            <span>·</span>
            <span>Retention: 90 days</span>
            <span>·</span>
            <span className={styles.mockChatLogged}>Thread logged</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function AgentsMock() {
  return (
    <div className={styles.mockPanel}>
      <div className={styles.mockBar}>
        <span className={styles.mockBarLabel}>Agents · run 4417</span>
        <GovernedBadge />
      </div>
      <div className={styles.mockBody}>
        <div className={styles.mockAgentHead}>
          <span className={styles.mockAgentTitle}>Quarterly access review</span>
          <span className={styles.mockRunningPill}>
            <span className={styles.mockRunningDot} aria-hidden="true" />
            Running
          </span>
        </div>

        <div className={styles.mockRunCard}>
          <div className={styles.mockRunSummary}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--ink-900)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }} aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M9 12l2 2 4-4" />
            </svg>
            <span className={styles.mockRunLabel}>Run 4417 · 3 of 4 steps · 214 records</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--slate-400)" strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink: 0, marginLeft: 'auto' }} aria-hidden="true">
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </div>

          {/* Step 1 */}
          <div className={`${styles.mockStep} ${styles.arStep1}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--ink-900)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }} aria-hidden="true">
              <path d="M12 5C8.13 5 5 6.34 5 8s3.13 3 7 3 7-1.34 7-3S15.87 5 12 5zM5 8v4c0 1.66 3.13 3 7 3s7-1.34 7-3V8M5 12v4c0 1.66 3.13 3 7 3s7-1.34 7-3v-4" />
            </svg>
            <div className={styles.mockStepBody}>
              <div className={styles.mockStepRow}>
                <span className={styles.mockStepName}>Read entitlement records</span>
                <span className={styles.mockStepTime}>16:52</span>
              </div>
              <div className={styles.mockStepDesc}>Pulled 214 role assignments across three systems.</div>
              <div className={styles.mockStepChips}>
                {[
                  { logo: '/assets/logos/snowflake.svg', name: 'Snowflake' },
                  { logo: '/assets/logos/sharepoint.svg', name: 'SharePoint' },
                  { logo: '/assets/logos/slack.svg', name: 'Slack' },
                ].map(({ logo, name }) => (
                  <span key={name} className={styles.mockChipLogo}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={logo} alt="" width="12" height="12" style={{ objectFit: 'contain' }} />
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className={`${styles.mockStep} ${styles.arStep2}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--ink-900)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }} aria-hidden="true">
              <path d="M12 2 3 6v6c0 5 4 9 9 10 5-1 9-5 9-10V6z" />
            </svg>
            <div className={styles.mockStepBody}>
              <div className={styles.mockStepRow}>
                <span className={styles.mockStepName}>Policy check passed</span>
                <span className={styles.mockStepTime}>16:53</span>
              </div>
              <div className={styles.mockStepDesc}>Scope limited to finance. No write access granted.</div>
            </div>
          </div>

          {/* Step 3 */}
          <div className={`${styles.mockStep} ${styles.arStep3}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--ink-900)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }} aria-hidden="true">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M9 15h6" />
            </svg>
            <div className={styles.mockStepBody}>
              <div className={styles.mockStepRow}>
                <span className={styles.mockStepName}>Drafted revocation list</span>
                <span className={styles.mockStepTime}>16:54</span>
              </div>
              <div className={styles.mockStepDesc}>18 users and 3 dormant service accounts.</div>
            </div>
          </div>

          {/* Step 4 — pending */}
          <div className={`${styles.mockStep} ${styles.arStep4}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--blue-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }} aria-hidden="true">
              <path d="M12 8v4l3 2M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
            </svg>
            <div className={styles.mockStepBody}>
              <div className={styles.mockStepRow}>
                <span className={styles.mockStepNameBlue}>Waiting on your approval</span>
                <span className={styles.mockStepTime}>16:55</span>
              </div>
              <div className={styles.mockStepDesc}>Nothing is revoked until a human signs off.</div>
            </div>
          </div>
        </div>

        <div className={styles.mockAgentActions}>
          <span className={styles.mockApproveBtn}>Approve</span>
          <span className={styles.mockReviewBtn}>Review list</span>
          <span className={styles.mockEveryAction}>Every action logged</span>
        </div>
      </div>
    </div>
  )
}

export default function ProductSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const panels = sectionRef.current.querySelectorAll<HTMLElement>(`.${styles.mockPanel}`)
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
    panels.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.inner}>
        {/* Head */}
        <div className={styles.head}>
          <div className={styles.eyebrow}>The product</div>
          <h2 className={styles.h2}>One workspace. Three things your teams do every day.</h2>
          <p className={styles.lede}>
            Not a chatbot bolted onto a wiki. A working surface that reads your
            systems, answers with citations, and takes action under policy.
          </p>
        </div>

        {/* Feature rows */}
        <div className={styles.rows}>
          {/* Row 1 — Search: copy left, mock right */}
          <div className={styles.row}>
            <div className={styles.copy}>
              <span className={styles.iconWrap}>
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="var(--blue-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0" />
                </svg>
              </span>
              <h3 className={styles.h3}>Search</h3>
              <p className={styles.copyBody}>
                One query across every connected system, answered with citations
                back to the source document and the permissions the asker actually
                holds.
              </p>
              <ul className={styles.bullets}>
                <li><Check />Results scoped to each user&apos;s existing entitlements</li>
                <li><Check />Every answer cites the document and revision it came from</li>
                <li><Check />Hybrid retrieval across files, tickets, and structured records</li>
              </ul>
              <a href="/search" className={styles.exploreLink}>Explore Search <Arrow /></a>
            </div>
            <SearchMock />
          </div>

          {/* Row 2 — Chat: mock left, copy right */}
          <div className={`${styles.row} ${styles.rowReverse}`}>
            <ChatMock />
            <div className={styles.copy}>
              <span className={styles.iconWrap}>
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="var(--blue-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </span>
              <h3 className={styles.h3}>Chat</h3>
              <p className={styles.copyBody}>
                A working conversation grounded in your corpus, with redaction
                applied before anything reaches a model and the whole exchange
                written to the trail.
              </p>
              <ul className={styles.bullets}>
                <li><Check />PII, PCI, and PHI removed pre-inference</li>
                <li><Check />Threads retained under your own retention policy</li>
                <li><Check />Model choice governed by role, not by the user</li>
              </ul>
              <a href="/chat" className={styles.exploreLink}>Explore Chat <Arrow /></a>
            </div>
          </div>

          {/* Row 3 — Agents: copy left, mock right */}
          <div className={styles.row}>
            <div className={styles.copy}>
              <span className={styles.iconWrap}>
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="var(--blue-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 8V4H8M2 4h20M20 4v16M4 4v16M2 20h20M9 12h6M9 16h6" />
                </svg>
              </span>
              <h3 className={styles.h3}>Agents</h3>
              <p className={styles.copyBody}>
                Agents that do the step, not just describe it. Each action is
                checked against policy before it runs and recorded after it does.
              </p>
              <ul className={styles.bullets}>
                <li><Check />Scoped tool access per role and per system</li>
                <li><Check />Pre-flight policy check on every action</li>
                <li><Check />Human approval gates on anything you designate</li>
              </ul>
              <a href="/agents" className={styles.exploreLink}>Explore Agents <Arrow /></a>
            </div>
            <AgentsMock />
          </div>
        </div>
      </div>
    </section>
  )
}

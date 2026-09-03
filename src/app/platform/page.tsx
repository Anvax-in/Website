import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import SectionHead from '@/components/ui/SectionHead'
import Tag from '@/components/ui/Tag'
import styles from '@/pages/Platform.module.css'

const capabilities = [
  {
    href: '/platform/search',
    tag: 'Search',
    tagVariant: 'live' as const,
    h3: 'Find it in seconds. Cite the source.',
    desc: 'Hybrid retrieval across your entire document corpus, policies, contracts, circulars, emails, and structured data, with paragraph-level citations on every result.',
    color: 'var(--blue)',
    icon: 'M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0',
  },
  {
    href: '/platform/chat',
    tag: 'Chat',
    tagVariant: 'live' as const,
    h3: 'Ask your corpus. Get a cited answer.',
    desc: 'Multi-turn grounded chat anchored to retrieved context. The model says "not found in corpus" rather than fabricating. Thread history stays scoped to your tenant.',
    color: 'var(--teal)',
    icon: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
  },
  {
    href: '/platform/agents',
    tag: 'Agents',
    tagVariant: 'live' as const,
    h3: 'Your regulatory environment, monitored 24/7.',
    desc: 'Persistent agents watch regulatory feeds for your jurisdiction. When a new circular drops, they classify, summarise, and route before your compliance officer opens email.',
    color: 'var(--ink-900)',
    icon: 'M12 8V4H8M2 4h20M20 4v16M4 4v16M2 20h20M9 12h6M9 16h6',
  },
  {
    href: '/platform/governance',
    tag: 'Governance',
    tagVariant: 'live' as const,
    h3: 'Compliance by construction. Not configuration.',
    desc: 'The governance layer sits between every user and every piece of data, audit trail, policy engine, PII redaction, and framework mappings wired into every capability from day one.',
    color: 'var(--blue)',
    icon: 'M12 2 3 6v6c0 5 4 9 9 10 5-1 9-5 9-10V6z',
  },
]

const moats = [
  {
    icon: '🧠',
    h3: 'Persistent memory',
    desc: 'Every query, decision, and approval becomes part of a continuously updated corpus. The longer you use Anvax, the smarter your tenant instance gets, without any data leaving your boundary.',
  },
  {
    icon: '🔌',
    h3: 'Enterprise connector depth',
    desc: 'Microsoft 365, Google Workspace, Slack, Confluence, SharePoint, Salesforce, Snowflake, and Jira are pre-connected. Each integration takes weeks to build correctly, all of them ship on day one.',
  },
  {
    icon: '🗺️',
    h3: 'Jurisdiction packs',
    desc: 'Not a horizontal AI with a compliance checkbox. Control mappings, regulatory feeds, and workflow templates ship per jurisdiction, EU, UK, Gulf, Singapore, India, US, built from real customer requirements.',
  },
  {
    icon: '📋',
    h3: 'Compliance by construction',
    desc: 'Postgres RLS, per-tenant encryption keys, immutable audit chain, framework control mappings: not features you configure. They are the foundation. You cannot turn them off.',
  },
]

const logoTiles = [
  // Row 1
  { src: '/assets/logos/google-drive.svg', name: 'Google Drive', kind: 'Storage' },
  { src: '/assets/logos/slack-new.svg', name: 'Slack', kind: 'Messaging' },
  { src: '/assets/logos/microsoft-teams.svg', name: 'Microsoft Teams', kind: 'Messaging' },
  { src: '/assets/logos/gmail.svg', name: 'Gmail', kind: 'Email' },
  { src: '/assets/logos/dropbox.svg', name: 'Dropbox', kind: 'Storage' },
  { src: '/assets/logos/salesforce.svg', name: 'Salesforce', kind: 'CRM' },
  // Row 2
  { src: '/assets/logos/sharepoint-new.svg', name: 'SharePoint', kind: 'Storage' },
  { src: '/assets/logos/github.svg', name: 'GitHub', kind: 'Code' },
  { src: '/assets/logos/notion.svg', name: 'Notion', kind: 'Knowledge' },
  { src: '/assets/logos/jira.svg', name: 'Jira', kind: 'Project mgmt' },
  { src: '/assets/logos/confluence.svg', name: 'Confluence', kind: 'Knowledge' },
  { src: '/assets/logos/discord.svg', name: 'Discord', kind: 'Messaging' },
  // Row 3
  { src: '/assets/logos/aws-s3.svg', name: 'AWS S3', kind: 'Storage' },
  { src: '/assets/logos/hubspot.svg', name: 'HubSpot', kind: 'CRM' },
  { src: '/assets/logos/gitlab.svg', name: 'GitLab', kind: 'Code' },
  { src: '/assets/logos/google-storage.svg', name: 'Google Storage', kind: 'Storage' },
  { src: '/assets/logos/box.svg', name: 'Box', kind: 'Storage' },
  { src: '/assets/logos/airtable.svg', name: 'Airtable', kind: 'Database' },
  // Row 4
  { src: '/assets/logos/asana.svg', name: 'Asana', kind: 'Project mgmt' },
  { src: '/assets/logos/zendesk.svg', name: 'Zendesk', kind: 'Support' },
  { src: '/assets/logos/snowflake.svg', name: 'Snowflake', kind: 'Data warehouse' },
  { src: '/assets/logos/bitbucket.svg', name: 'Bitbucket', kind: 'Code' },
  { src: '/assets/logos/clickup.svg', name: 'ClickUp', kind: 'Project mgmt' },
  { src: '/assets/logos/linear.svg', name: 'Linear', kind: 'Project mgmt' },
  // Row 5
  { src: '/assets/logos/oracle-storage.svg', name: 'Oracle Storage', kind: 'Storage' },
  { src: '/assets/logos/cloudflare-r2.svg', name: 'Cloudflare R2', kind: 'Storage' },
  { src: '/assets/logos/coda.svg', name: 'Coda', kind: 'Knowledge' },
  { src: '/assets/logos/rbi.png', name: 'RBI', kind: 'Regional · Regulator' },
  { src: '/assets/logos/sebi.jpg', name: 'SEBI', kind: 'Regional · Regulator' },
  { src: '/assets/logos/irdai.png', name: 'IRDAI', kind: 'Regional · Regulator' },
  // Row 6
  { src: '/assets/logos/npci.svg', name: 'NPCI', kind: 'Regional · Payments' },
  { src: '/assets/logos/gst.png', name: 'GST Portal', kind: 'Regional · Tax' },
  { src: '/assets/logos/digilocker.svg', name: 'DigiLocker', kind: 'Regional · Identity' },
  { src: '/assets/logos/mca.png', name: 'MCA21', kind: 'Regional · Corporate' },
  { src: '/assets/logos/account-aggregator.svg', name: 'Account Aggregator', kind: 'Regional · Finance' },
  { src: '/assets/logos/tally.png', name: 'Tally', kind: 'Regional · Ledger' },
  // Row 7
  { src: '/assets/logos/zoho.svg', name: 'Zoho Books', kind: 'Ledger' },
  { src: '/assets/logos/freshdesk.svg', name: 'Freshdesk', kind: 'Support' },
  { src: '/assets/logos/zulip.svg', name: 'Zulip', kind: 'Messaging' },
  { src: '/assets/logos/gong.svg', name: 'Gong', kind: 'Revenue intel' },
  { src: '/assets/logos/fireflies.svg', name: 'Fireflies', kind: 'Meeting intel' },
  { src: '/assets/logos/gitbook.svg', name: 'GitBook', kind: 'Knowledge' },
  // Row 8
  { src: '/assets/logos/guru.svg', name: 'Guru', kind: 'Knowledge' },
  { src: '/assets/logos/outline.svg', name: 'Outline', kind: 'Knowledge' },
  { src: '/assets/logos/google-sites.svg', name: 'Google Sites', kind: 'Knowledge' },
  { src: '/assets/logos/discourse.svg', name: 'Discourse', kind: 'Community' },
  { src: '/assets/logos/egnyte.svg', name: 'Egnyte', kind: 'Storage' },
  { src: '/assets/logos/document360.svg', name: 'Document360', kind: 'Knowledge' },
  // Row 9
  { src: '/assets/logos/bookstack.svg', name: 'BookStack', kind: 'Knowledge' },
  { src: '/assets/logos/slab.svg', name: 'Slab', kind: 'Knowledge' },
  { src: '/assets/logos/highspot.svg', name: 'Highspot', kind: 'Sales enablement' },
  { src: '/assets/logos/productboard.svg', name: 'ProductBoard', kind: 'Product mgmt' },
  { src: '/assets/logos/braintrust.svg', name: 'Braintrust', kind: 'Knowledge' },
  { src: '/assets/logos/drupal-wiki.svg', name: 'Drupal Wiki', kind: 'Knowledge' },
  // Row 10
  { src: '/assets/logos/web-scraper.svg', name: 'Web Scraper', kind: 'Web' },
  { src: '/assets/logos/email-imap.svg', name: 'Email / IMAP', kind: 'Email' },
  { src: '/assets/logos/file-upload.svg', name: 'File Upload', kind: 'Storage' },
  { src: '/assets/logos/wikipedia.svg', name: 'Wikipedia', kind: 'Web' },
  { src: '/assets/logos/mediawiki.svg', name: 'MediaWiki', kind: 'Knowledge' },
  { src: '/assets/logos/loopio.svg', name: 'Loopio', kind: 'RFP' },
]

export const metadata: Metadata = {
  title: 'Platform | Anvax',
  description: 'Four capabilities for enterprises that cannot use public AI, search, chat, agents, and governance, with audit trail and data residency baked in.',
  openGraph: {
    title: 'Platform | Anvax',
    description: 'Four capabilities for enterprises that cannot use public AI, governed, audited, inside your perimeter.',
    url: 'https://www.anvax.in/platform',
  },
  twitter: { card: 'summary_large_image', title: 'Platform | Anvax', description: 'Search, chat, agents, and governance, inside your perimeter.' },
  alternates: { canonical: 'https://www.anvax.in/platform' },
}

export default function Platform() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <p className={styles.heroEyebrow}>Platform</p>
            <h1 className={styles.heroH1}>
              Four capabilities.<br />
              One governed platform.<br />
              Inside your perimeter.
            </h1>
            <p className={styles.heroLede}>
              Search, Chat, Agents, and Governance, each with an enterprise
              connector layer, framework-mapped audit trail, and per-tenant data isolation
              baked in by construction.
            </p>
          </div>
        </div>
      </section>

      {/* Capability overview grid */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Capabilities"
            title="Four surfaces. Each designed for a specific job."
            lede="Select a capability to go deeper, feature detail, technical specs, and how each one is governed."
          />
          <div className={styles.capabilityGrid}>
            {capabilities.map((cap) => (
              <Link key={cap.href} href={cap.href} className={styles.capabilityCard}>
                <div className={styles.capabilityCardTop}>
                  <div className={styles.capabilityIconWrap}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={cap.color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d={cap.icon} />
                    </svg>
                  </div>
                  <Tag variant={cap.tagVariant}>{cap.tag}</Tag>
                </div>
                <h3 className={styles.capabilityH3}>{cap.h3}</h3>
                <p className={styles.capabilityDesc}>{cap.desc}</p>
                <span className={styles.capabilityArrow}>See {cap.tag} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Moats */}
      <section className="section alt">
        <div className="container">
          <SectionHead
            eyebrow="Moats"
            title="Advantages that compound the longer you use Anvax."
            lede="Each layer deepens with every query, every workflow, every integration added to your instance."
          />
          <div className={styles.moatsGrid}>
            {moats.map((m) => (
              <div key={m.h3} className={styles.moatCard}>
                <div className={styles.moatHeader}>
                  <div className={styles.moatIcon}>{m.icon}</div>
                  <h3 className={styles.moatH3}>{m.h3}</h3>
                </div>
                <p className={styles.moatDesc}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connector logo wall */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Connectors"
            title="60+ sources. Pre-connected on day one."
            lede="Enterprise connectors, cloud storage, messaging, code platforms, and regional packs, India, Gulf, EU, ship in every deployment."
          />
          <div className={styles.logoGrid}>
            {logoTiles.map((tile) => (
              <div key={tile.name} className={styles.logoTile}>
                {'mono' in tile ? (
                  <div className={styles.logoMark}>{tile.mono}</div>
                ) : (
                  <Image src={tile.src} alt={tile.name} width={48} height={48} className={styles.logoImg} style={{ objectFit: 'contain' }} />
                )}
                <span className={styles.logoName}>{tile.name}</span>
                <span className={styles.logoKind}>{tile.kind}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

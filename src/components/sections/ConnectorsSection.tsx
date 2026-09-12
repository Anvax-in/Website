import styles from './ConnectorsSection.module.css'

const featured = [
  { name: 'SharePoint',    logo: '/assets/logos/sharepoint.svg' },
  { name: 'Confluence',    logo: '/assets/logos/confluence.svg' },
  { name: 'Slack',         logo: '/assets/logos/slack.svg' },
  { name: 'Snowflake',     logo: '/assets/logos/snowflake.svg' },
  { name: 'Salesforce',    logo: '/assets/logos/salesforce.svg' },
  { name: 'Google Drive',  logo: '/assets/logos/drive.svg' },
]

const more = [
  'Microsoft 365', 'Outlook', 'Teams', 'Jira', 'ServiceNow',
  'Box', 'Dropbox', 'Notion', 'GitHub', 'Workday',
  'SAP', 'Oracle', 'Postgres', 'S3', 'Databricks', 'Zendesk',
]

export default function ConnectorsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {/* Header row */}
        <div className={styles.head}>
          <div className={styles.headLeft}>
            <div className={styles.eyebrow}>Connectors</div>
            <h2 className={styles.h2}>Reads the systems you already run.</h2>
            <p className={styles.lede}>
              Permissions are inherited from the source system on every query,
              so a connector never widens what someone can already see.
            </p>
          </div>
          <a href="/platform#connectors" className={styles.browseLink}>
            Browse all 180 connectors
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>

        {/* Logo grid */}
        <div className={styles.grid}>
          {featured.map(({ name, logo }) => (
            <div key={name} className={styles.tile}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logo} alt={name} className={styles.logo} />
              <span className={styles.tileName}>{name}</span>
            </div>
          ))}
        </div>

        {/* Text chip list */}
        <div className={styles.chips}>
          {more.map(name => (
            <span key={name} className={styles.chip}>{name}</span>
          ))}
          <span className={styles.chipMore}>+ 158 more</span>
        </div>
      </div>
    </section>
  )
}

import styles from './DeploymentSection.module.css'

const tiers = [
  {
    kicker: 'Fastest to deploy',
    title: 'Shared cloud',
    body: 'Fully managed by Anvax in your preferred region. Get the complete Anvax platform without managing infrastructure, while your data and workloads remain isolated within your environment. Ideal for teams that want enterprise security with the simplicity of SaaS.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z" />
      </svg>
    ),
  },
  {
    kicker: 'Your cloud. Your control.',
    title: 'Sovereign / private cloud',
    body: 'Deploy Anvax directly into your AWS, Azure, or GCP environment, or through an approved sovereign cloud provider. You retain control of the infrastructure, data plane, network policies, and region while Anvax delivers the same product experience. Built for organisations with strict data-residency and regulatory requirements.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10" />
      </svg>
    ),
  },
  {
    kicker: 'Runs entirely inside your facility',
    title: 'On-prem / air-gapped',
    body: 'Deploy the complete Anvax platform on infrastructure you control, with no dependency on Anvax-hosted services. Supports isolated networks and fully air-gapped environments where data cannot leave the facility. Designed for government, defence, critical infrastructure, and highly regulated environments.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
]

export default function DeploymentSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <div className={styles.eyebrow}>Deployment</div>
          <h2 className={styles.h2}>One platform. Your infrastructure.</h2>
          <p className={styles.lede}>
            Capability does not degrade as you move down the tiers. Air-gapped
            customers get the same workspace as private cloud.
          </p>
        </div>

        <div className={styles.grid}>
          {tiers.map(({ kicker, title, body, icon }) => (
            <div key={title} className={styles.card}>
              <div className={styles.iconWrap}>{icon}</div>
              <div className={styles.kicker}>{kicker}</div>
              <h3 className={styles.h3}>{title}</h3>
              <p className={styles.body}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

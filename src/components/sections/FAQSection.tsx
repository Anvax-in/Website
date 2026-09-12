import styles from './FAQSection.module.css'

const faqs = [
  {
    q: 'Where does our data actually sit?',
    a: 'In your tenancy. Documents, embeddings, and inference traces are written to storage you own, in the region you choose. Anvax has no shared data plane and no cross-tenant index.',
  },
  {
    q: 'Which models can we use, and where do they run?',
    a: 'Open-weight models self-hosted alongside the workspace, or your own commercial gateway if you already hold that contract. Model access is gated per role.',
  },
  {
    q: 'What does the audit trail contain?',
    a: 'The prompt, the retrieved sources, the model and version, the redactions applied, the response, and any action taken. Tamper-evident and exportable.',
  },
  {
    q: 'Can it run air-gapped?',
    a: 'Yes. The on-prem tier requires no outbound connectivity, including for updates, which ship as signed offline bundles.',
  },
  {
    q: 'How long until our first department is live?',
    a: 'Three weeks is typical for private cloud, assuming your connectors are reachable and policy owners are available in week two.',
  },
]

export default function FAQSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.layout}>
          <h2 className={styles.h2}>The questions your security team asks first.</h2>
          <div className={styles.list}>
            {faqs.map(({ q, a }) => (
              <details key={q} className={styles.item}>
                <summary className={styles.summary}>
                  <span>{q}</span>
                  <svg
                    className={styles.chevron}
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </summary>
                <p className={styles.answer}>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

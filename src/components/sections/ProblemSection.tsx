import styles from './ProblemSection.module.css'

const problems = [
  {
    title: 'No scoped access',
    body: 'Employees get all-or-nothing access to internal systems. IT has no way to assign the right tools to the right people.',
  },
  {
    title: 'Shadow AI',
    body: 'When employees connect AI tools on their own, IT has no way to track, manage, or revoke connections.',
  },
  {
    title: 'No audit trail or logs',
    body: 'When an employee uses AI to take action in a system, there is no record of what happened or what data was shared.',
  },
  {
    title: 'No data guardrails',
    body: 'AI tool calls pass through third-party systems with no policy enforcement on what data is included.',
  },
]

export default function ProblemSection() {
  return (
    <section className="section">
      <div className="container">
        <div className={styles.head}>
          <h2 className={styles.title}>
            Employees want to move fast with AI.
            <br />IT can&apos;t enable it safely.
          </h2>
          <p className={styles.subtitle}>
            When employees connect AI to third-party systems, it&apos;s all or nothing. Most companies have no way to scope tool access by role, no guardrails on what data reaches third party APIs, and no audit trail.
          </p>
        </div>
        <div className={styles.cards}>
          {problems.map(({ title, body }) => (
            <div key={title} className={styles.card}>
              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.cardBody}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

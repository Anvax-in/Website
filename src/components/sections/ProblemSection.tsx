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
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <div className={styles.eyebrow}>The problem</div>
          <h2 className={styles.title}>
            Your people already use AI. You just can&apos;t see any of it.
          </h2>
          <p className={styles.lede}>
            The tools that make employees faster are the ones your policy cannot
            approve. So the work moves off-platform, and the risk moves with it.
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

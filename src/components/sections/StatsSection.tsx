import styles from './StatsSection.module.css'

const stats = [
  { value: '4.2M', label: 'Governed queries served across deployments' },
  { value: '180+', label: 'Enterprise connectors in the catalogue' },
  { value: '9',    label: 'Regulatory frameworks mapped to controls' },
  { value: '0',    label: 'Bytes of customer data leaving your perimeter' },
]

export default function StatsSection() {
  return (
    <section className={styles.band}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {stats.map(({ value, label }) => (
            <div key={value} className={styles.stat}>
              <span className={styles.value}>{value}</span>
              <span className={styles.label}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import type { Mock } from '@/content/industries/types'
import styles from '@/pages/Industry.module.css'

function Window({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className={styles.win}>
      <div className={styles.winBar}><i /><i /><i /><span>{title}</span></div>
      <div className={styles.winBody}>{children}</div>
    </div>
  )
}

const chipClass = (tone?: string) => (tone === 'sage' ? styles.chipSage : tone === 'ink' ? styles.chipInk : styles.chipBlue)

export default function IndustryMock({ mock }: { mock: Mock }) {
  switch (mock.kind) {
    case 'document':
      return (
        <Window title={mock.title}>
          <div className={styles.mockRow}><span className={styles.chipBlue}>{mock.status}</span><small>{mock.meta}</small></div>
          <h4>{mock.heading}</h4><p>{mock.body}</p>
          <div className={styles.miniTable}>
            <div className={styles.miniHead} style={{ gridTemplateColumns: '1.4fr 1fr 1fr' }}>{mock.table.head.map(h => <span key={h}>{h}</span>)}</div>
            {mock.table.rows.map(r => <div key={r[0]} style={{ gridTemplateColumns: '1.4fr 1fr 1fr' }}>{r.map((c, i) => <span key={i}>{c}</span>)}</div>)}
          </div>
          <h4>{mock.heading2}</h4><p>{mock.body2}</p>
          <div className={styles.mockRow}>{mock.sources.map(s => <span key={s} className={styles.chipInk}>{s}</span>)}</div>
        </Window>
      )
    case 'checklist':
      return (
        <Window title={mock.title}>
          <div className={styles.mockSpread}><h4>{mock.heading}</h4><small>{mock.score}</small></div>
          <div className={styles.bar}><div style={{ width: mock.pct + '%' }} /></div>
          {mock.items.map(it => (
            <div key={it.t} className={styles.check}>
              <span className={it.ok ? styles.ok : styles.warn}>{it.ok ? '\u2713' : '!'}</span>
              <div><strong>{it.t}</strong><small>{it.s}</small></div>
            </div>
          ))}
          {mock.footer.tone === 'dark'
            ? <div className={styles.mockBtn}>{mock.footer.text}<span>→</span></div>
            : <div className={styles.mockNote}><b>{mock.footer.label}</b> {mock.footer.text}</div>}
        </Window>
      )
    case 'brief':
      return (
        <Window title={mock.title}>
          <div className={styles.mockRow}><span className={styles.avatar}>{mock.initials}</span><div><h4>{mock.name}</h4><small>{mock.sub}</small></div></div>
          {mock.stats && <div className={styles.kvGrid}>{mock.stats.map(s => <div key={s.k}><small>{s.k}</small><strong>{s.v}</strong></div>)}</div>}
          {mock.quote && <div className={styles.mockQuote}>“{mock.quote}”</div>}
          <small className={styles.listTitle}>{mock.listTitle}</small>
          {mock.list && <ul className={styles.arrowList}>{mock.list.map(l => <li key={l}>{l}</li>)}</ul>}
          {mock.answer && <p>{mock.answer}</p>}
          {mock.chips && <div className={styles.mockRow}>{mock.chips.map(c => <span key={c} className={styles.chipInk}>{c}</span>)}</div>}
        </Window>
      )
    case 'diff':
      return (
        <Window title={mock.title}>
          <p>{mock.intro}</p>
          <div className={styles.diff}>{mock.lines.map(l => <div key={l.t} className={l.type === 'del' ? styles.del : styles.add}>{l.t}</div>)}</div>
          <div className={styles.mockRow}><small>Affects</small>{mock.affects.map(a => <span key={a} className={styles.chipBlue}>{a}</span>)}</div>
        </Window>
      )
    case 'timeline':
      return (
        <Window title={mock.title}>
          <div className={styles.mockRow}>{mock.chips.map(c => <span key={c.t} className={chipClass(c.tone)}>{c.t}</span>)}</div>
          <div className={styles.kvGrid3}>{mock.stats.map(s => <div key={s.k}><small>{s.k}</small><strong>{s.v}</strong></div>)}</div>
          <small className={styles.listTitle}>Claim timeline</small>
          {mock.events.map(e => <div key={e.time} className={styles.event}><i /><span>{e.t}</span><small>{e.time}</small></div>)}
          <div className={styles.mockBtn}>{mock.cta}<span>→</span></div>
        </Window>
      )
  }
}

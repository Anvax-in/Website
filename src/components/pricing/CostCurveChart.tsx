import { buildChartData, DEFAULT_SEATS, CHART_X0, CHART_X1, CHART_Y0, CHART_Y1 } from '@/lib/pricing'
import styles from './CostCurveChart.module.css'

// Static chart: not wired to the calculator's live slider state. Takes a
// `seats` prop (defaulting to DEFAULT_SEATS) and draws one vertical
// reference marker at that headcount — the canvas source has no markup for
// this chart to port from (see CLAUDE.md task brief / plan notes), so the
// layout below is this component's own call.
export default function CostCurveChart({ seats = DEFAULT_SEATS }: { seats?: number }) {
  const chart = buildChartData(seats)

  // Keep the marker's headcount label from running off the right edge of
  // the viewBox when seats is pushed toward CHART_NMAX.
  const markerLabelAnchor = chart.markerX > CHART_X1 - 150 ? 'end' : 'start'
  const markerLabelDx = markerLabelAnchor === 'end' ? -6 : 6

  return (
    <div className={styles.wrap}>
      <svg
        viewBox="0 0 980 450"
        className={styles.svg}
        role="img"
        aria-label="Annual cost by employee count: Anvax's flat fee against per-seat AI tools"
      >
        {chart.yTicks.map((t, i) => (
          <g key={`y-${i}`}>
            <line x1={CHART_X0} x2={CHART_X1} y1={t.y} y2={t.y} className={styles.gridline} />
            <text x={CHART_X0 - 10} y={t.ty} textAnchor="end" className={styles.axisLabel}>
              {t.label}
            </text>
          </g>
        ))}

        {chart.xTicks.map((t, i) => (
          <text key={`x-${i}`} x={t.x} y={CHART_Y0 + 20} textAnchor="middle" className={styles.axisLabel}>
            {t.label}
          </text>
        ))}

        <line
          x1={chart.markerX}
          x2={chart.markerX}
          y1={CHART_Y1}
          y2={CHART_Y0}
          className={styles.marker}
          style={{ opacity: chart.markerOpacity }}
        />
        <text
          x={chart.markerX}
          dx={markerLabelDx}
          y={CHART_Y1 + 14}
          textAnchor={markerLabelAnchor}
          className={styles.markerLabel}
          style={{ opacity: chart.markerOpacity }}
        >
          Your headcount: {seats.toLocaleString('en-US')}
        </text>

        {chart.lines.map((line, i) => (
          <g key={`line-${i}`}>
            <path d={line.d} stroke={line.color} strokeWidth={line.width} strokeDasharray={line.dash || undefined} fill="none" />
            <text x={CHART_X1 + 10} y={line.ly} fill={line.color} fontSize={12} className={styles.lineLabel}>
              {line.name}
            </text>
          </g>
        ))}

        {chart.breaks.map((b, i) => (
          <g key={`break-${i}`}>
            <circle cx={b.x} cy={b.y} r={5} fill={b.color} />
            <text x={b.x} y={b.y + 22} textAnchor="middle" className={styles.breakLabel}>
              {b.n.toLocaleString('en-US')}
            </text>
          </g>
        ))}
      </svg>
      <p className={styles.caption}>{chart.breakCaption}</p>
    </div>
  )
}

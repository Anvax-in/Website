// Shared pricing data and calculator math for the /pricing page.
//
// Ported verbatim (data + formulas) from the Claude Design canvas logic class
// at `handoff/pricing/Anvax Pricing.dc.html:279-388`. See
// `docs/pricing-spec/html/desktop/04-section.html` and `06-section.html` for
// the "beyond the seat price" bullets and the FAQ sources note.
//
// Colour values are expressed as CSS custom-property references (tokens),
// not raw hex, per the house rule in CLAUDE.md ("Tokens only. No raw hex...").
// Three of the four competitor colours already existed as tokens
// (`--ink-900`, `--clay-600`); the other two (`--chart-line-2`,
// `--chart-line-3`) were added in Task 1 specifically so this module could
// reference them instead of inlining `#4A515C` / `#8A8F98`.

export const ANVAX_ANNUAL_FEE_USD = 72000
export const SHOW_ANVAX_FEE = false
export const MIN_SEATS = 200
export const MAX_SEATS = 10000
export const DEFAULT_SEATS = 500

export type CompetitorId = 'copilot' | 'chatgpt' | 'claude' | 'glean'

export type Competitor = {
  id: CompetitorId
  name: string
  logo: string
  ratePerUserMonth: number
  minSeats: number
  note: string
  color: string
  dash: string
}

export const competitors: Competitor[] = [
  {
    id: 'copilot',
    name: 'Microsoft 365 Copilot',
    logo: '/compare/copilot-logo.png',
    ratePerUserMonth: 30,
    minSeats: 1,
    note: '$30 per user a month, plus a Microsoft 365 licence',
    color: 'var(--ink-900)',
    dash: '',
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT Enterprise',
    logo: '/compare/chatgpt-logo.png',
    ratePerUserMonth: 60,
    minSeats: 150,
    note: '~$60 per user a month reported, 150-seat minimum',
    color: 'var(--chart-line-2)',
    dash: '8 5',
  },
  {
    id: 'claude',
    name: 'Claude Enterprise',
    logo: '/compare/claude-logo.png',
    ratePerUserMonth: 40,
    minSeats: 1,
    note: '$20 seat fee plus ~$20 estimated usage',
    color: 'var(--chart-line-3)',
    dash: '2 4',
  },
  {
    id: 'glean',
    name: 'Glean',
    logo: '/compare/glean-logo.png',
    ratePerUserMonth: 50,
    minSeats: 100,
    note: '~$50 per user a month reported, ~100-seat floor',
    color: 'var(--clay-600)',
    dash: '12 4 2 4',
  },
]

export function annualCost(c: Competitor, seats: number): number {
  return c.ratePerUserMonth * 12 * Math.max(seats, c.minSeats)
}

export function seatsFromSlider(slider: number): number {
  const raw = 200 * Math.pow(50, slider / 1000)
  const step = raw < 1000 ? 50 : raw < 5000 ? 100 : 500
  return Math.max(200, Math.min(10000, Math.round(raw / step) * step))
}

export function sliderFromSeats(seats: number): number {
  return Math.round((1000 * Math.log(Math.max(seats, 200) / 200)) / Math.log(50))
}

export function formatUSD(n: number): string {
  return '$' + Math.round(n).toLocaleString('en-US')
}

// Short currency labels for chart y-axis ticks only (e.g. "$500K", "$1.5M").
function shortUSD(n: number): string {
  return n >= 1e6
    ? '$' + (n / 1e6).toFixed(n >= 1e7 ? 0 : 1).replace(/\.0$/, '') + 'M'
    : '$' + Math.round(n / 1000) + 'K'
}

export type BeyondSeatEntry = { rateLabel: string; bullets: string[] }

export const beyondSeatPrice: Record<CompetitorId, BeyondSeatEntry> = {
  copilot: {
    rateLabel: '$30 / user / month',
    bullets: [
      'A qualifying Microsoft 365 licence underneath, E3 or E5',
      'Copilot Studio agents licensed and metered separately',
      'Audit depth tied to your Purview tier',
      'Permissions clean-up before rollout, often with a partner',
    ],
  },
  chatgpt: {
    rateLabel: '~$60 / user / month, reported',
    bullets: [
      'A 150-seat minimum, paid annually up front',
      'Credits for agents, Codex and advanced features on top',
      'No public price, so every renewal is a negotiation',
    ],
  },
  claude: {
    rateLabel: '$20 / seat / month + usage',
    bullets: [
      'The seat fee covers access only',
      'Usage billed separately at API rates',
      'Spend rises with adoption, which makes budgets hard to fix',
    ],
  },
  glean: {
    rateLabel: '$40–75 / user / month, reported',
    bullets: [
      'Deployments commonly start around 100 seats',
      'A median contract near $99,000 a year',
      'Enterprise tiers needed for serious use',
    ],
  },
}

export const faqs: { q: string; a: string }[] = [
  {
    q: 'Why don’t you charge per seat?',
    a: 'Per-seat pricing makes every new team a budget decision, so most organisations ration access. Governance only works if everyone uses the governed tool, so we price the platform, not the headcount.',
  },
  {
    q: 'How is the annual fee set?',
    a: 'By the size and shape of the deployment: where it runs, how many source systems it connects to, and the support you need. Headcount does not change it.',
  },
  {
    q: 'What happens to the fee when we add more teams?',
    a: 'Nothing. Adding a department, a subsidiary or another thousand employees does not change the annual fee or need a new purchase order.',
  },
  {
    q: 'Can we start with a pilot before committing?',
    a: 'Yes. Most organisations start with one department and two or three workflows, are live within a few weeks, then roll out to everyone on the same contract.',
  },
  {
    q: 'Is the fee the same for on-premises and private cloud?',
    a: 'The product is the same in every deployment. The fee reflects the deployment you choose and the support it needs, which we agree with you before you sign.',
  },
]

export const faqSourcesNote =
  'Competitor prices from vendor pricing pages and published buyer reports (CloudZero, Vendr via Coworker, GoSearch, Tech Insider), checked November 2026. ChatGPT Enterprise and Glean do not publish prices; figures are reported averages. Claude Enterprise usage is estimated at $20 per user per month. Microsoft 365 Copilot excludes the base Microsoft 365 licence.'

export type ChartLine = { d: string; color: string; width: number; dash: string; name: string; ly: number }
export type ChartBreak = { x: number; y: number; color: string; n: number; name: string }
export type ChartData = {
  lines: ChartLine[]
  breaks: ChartBreak[]
  yTicks: { y: number; ty: number; label: string }[]
  xTicks: { x: number; label: string }[]
  markerX: number
  markerOpacity: number
  breakCaption: string
}

export const CHART_X0 = 70
export const CHART_X1 = 800
export const CHART_Y0 = 400
export const CHART_Y1 = 30
export const CHART_NMAX = 2000
const CHART_CMAX = 1500000

// Short display name for chart line labels / break captions. The canvas
// source only strips the "Microsoft 365 " prefix (`c.name.replace('Microsoft
// 365 ', '')`, handoff/pricing/Anvax Pricing.dc.html:342,348), which leaves
// "ChatGPT Enterprise" / "Claude Enterprise" unshortened. The verified golden
// breakCaption ("Copilot ... Claude ... Glean ...") requires the " Enterprise"
// suffix stripped too, so this also removes that — full names ("Claude
// Enterprise") are preserved everywhere else via `Competitor.name`.
function shortCompetitorName(name: string): string {
  return name.replace('Microsoft 365 ', '').replace(' Enterprise', '')
}

export function buildChartData(seats: number): ChartData {
  const fee = ANVAX_ANNUAL_FEE_USD
  const x = (n: number) => CHART_X0 + (n / CHART_NMAX) * (CHART_X1 - CHART_X0)
  const y = (v: number) => CHART_Y0 - (Math.min(v, CHART_CMAX) / CHART_CMAX) * (CHART_Y0 - CHART_Y1)

  const lines: ChartLine[] = competitors.map((c) => {
    const d =
      c.minSeats > 1
        ? `M${x(0)},${y(annualCost(c, 0))} L${x(c.minSeats)},${y(annualCost(c, c.minSeats))} L${x(CHART_NMAX)},${y(annualCost(c, CHART_NMAX))}`
        : `M${x(0)},${y(0)} L${x(CHART_NMAX)},${y(annualCost(c, CHART_NMAX))}`
    return {
      d,
      color: c.color,
      width: 2,
      dash: c.dash,
      name: shortCompetitorName(c.name),
      ly: y(annualCost(c, CHART_NMAX)) + 4,
    }
  })
  lines.push({
    d: `M${x(0)},${y(fee)} L${x(CHART_NMAX)},${y(fee)}`,
    color: 'var(--blue-600)',
    width: 3.5,
    dash: '',
    name: 'Anvax',
    ly: y(fee) + 4,
  })

  const breaks: ChartBreak[] = competitors
    .map((c) => {
      const n = fee / (c.ratePerUserMonth * 12)
      if (n <= c.minSeats || n > CHART_NMAX) return null
      return { x: x(n), y: y(fee), color: c.color, n: Math.round(n), name: shortCompetitorName(c.name) }
    })
    .filter((b): b is ChartBreak => b !== null)

  const breakCaption = breaks.length
    ? 'Circles mark where Anvax becomes cheaper: ' +
      breaks.map((b) => b.name + ' at ' + b.n.toLocaleString('en-US') + ' employees').join(', ') +
      '. Below that, a per-seat plan can cost less.'
    : 'Anvax costs less than every per-seat tool shown, from the first employee.'

  const yTicks = [0, 500000, 1000000, 1500000].map((v) => ({ y: y(v), ty: y(v) + 4, label: v === 0 ? '$0' : shortUSD(v) }))
  const xTicks = [0, 500, 1000, 1500, 2000].map((n) => ({ x: x(n), label: n.toLocaleString('en-US') }))

  return {
    lines,
    breaks,
    yTicks,
    xTicks,
    markerX: x(Math.min(seats, CHART_NMAX)),
    markerOpacity: seats <= CHART_NMAX ? 1 : 0,
    breakCaption,
  }
}

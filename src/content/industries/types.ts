export type Chip = { t: string; tone?: 'blue' | 'sage' | 'ink' }

export type Mock =
  | { kind: 'document'; title: string; status: string; meta: string; heading: string; body: string; table: { head: string[]; rows: string[][] }; heading2: string; body2: string; sources: string[] }
  | { kind: 'checklist'; title: string; heading: string; score: string; pct: number; items: { ok: boolean; t: string; s: string }[]; footer: { label: string; tone: 'dark' | 'blue'; text: string } }
  | { kind: 'brief'; title: string; initials: string; name: string; sub: string; stats?: { k: string; v: string }[]; quote?: string; listTitle: string; list?: string[]; answer?: string; chips?: string[] }
  | { kind: 'diff'; title: string; intro: string; lines: { type: 'del' | 'add'; t: string }[]; affects: string[] }
  | { kind: 'timeline'; title: string; chips: Chip[]; stats: { k: string; v: string }[]; events: { time: string; t: string }[]; cta: string }

export type ChatMock = {
  workspace: string
  question: string
  answer: string[]
  sources: { n: number; title: string; system: string }[]
  tags: { t: string; tone: 'ink' | 'sage' }[]
}

export type Industry = {
  slug: string
  name: string
  metaDescription: string
  hero: { h1: string; lede: string; chat: ChatMock }
  story: { label: string; title: string; challenge: string; result: string; stats: { figure: string; label: string }[] }
  benefitsEyebrow: string
  benefitsTitle: string
  benefits: { icon: string; title: string; body: string }[]
  teamsTitle: string
  teams: { team: string; title: string; body: string; points: { t: string; d: string; icon?: string }[]; tint: 'blue' | 'sage' | 'bone'; mock: Mock }[]
  quote: { text: string; role: string }
  securityNote: string
  faqs: { q: string; a: string }[]
  cta: { title: string; body: string }
}

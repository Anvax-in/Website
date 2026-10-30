export type FlaggedPoint = { text: string; ok: boolean }

export type ApartCard = { icon: string; title: string; body: string }

export type DetailedParameter = {
  name: string
  anvax: [FlaggedPoint, FlaggedPoint]
  competitor: [FlaggedPoint, FlaggedPoint]
}

export type DetailedGroup = {
  title: string
  parameters: DetailedParameter[]
}

export type BestForList = {
  heading: string
  items: string[]
}

export type Faq = { q: string; a: string }

export type CompareLogo =
  | { kind: 'image'; src: string; alt: string }
  | { kind: 'monogram'; label: string; alt: string }

export type CompareContent = {
  slug: string
  competitorName: string
  metaTitle: string
  metaDescription: string
  heroLede: string
  competitorLogo: CompareLogo
  atAGlanceTitle: string
  atAGlanceAnvax: FlaggedPoint[]
  atAGlanceCompetitor: FlaggedPoint[]
  detailedTitle: string
  detailedLede: string
  detailedGroups: DetailedGroup[]
  sourcesNote: string
  bestForAnvax: BestForList
  bestForCompetitor: BestForList
  faqs: Faq[]
  ctaTitle: string
  ctaBody: string
}

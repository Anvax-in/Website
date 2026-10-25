import type { Industry } from './types'
import { financialServices } from './financial-services'
import { insurance } from './insurance'
import { healthcare } from './healthcare'
import { legal } from './legal'
import { publicSectorGovernment } from './public-sector-government'
import { energy } from './energy'
import { education } from './education'

// Add a new industry: create content/industries/<slug>.ts and register it here.
export const industries: Industry[] = [financialServices, insurance, healthcare, legal, publicSectorGovernment, energy, education]
export const bySlug = (slug: string) => industries.find(i => i.slug === slug)
export type { Industry } from './types'

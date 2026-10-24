import type { Industry } from './types'
import { financialServices } from './financial-services'
import { insurance } from './insurance'

// Add a new industry: create content/industries/<slug>.ts and register it here.
export const industries: Industry[] = [financialServices, insurance]
export const bySlug = (slug: string) => industries.find(i => i.slug === slug)
export type { Industry } from './types'

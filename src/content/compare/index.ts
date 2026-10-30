import type { CompareContent } from './types'
import { microsoftCopilot } from './microsoft-copilot'
import { chatgptEnterprise } from './chatgpt-enterprise'
import { glean } from './glean'
import { claudeEnterprise } from './claude-enterprise'

// Add a new competitor: create content/compare/<slug>.ts and register it here.
export const compareContent: CompareContent[] = [microsoftCopilot, chatgptEnterprise, glean, claudeEnterprise]
export const bySlug = (slug: string) => compareContent.find(c => c.slug === slug)
export type { CompareContent } from './types'

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export const POSTS_PER_PAGE = 12

const CONTENT_DIR = path.join(process.cwd(), 'content/blog')

export interface PostFrontmatter {
  title: string
  description: string
  pubDate: Date
  updatedDate?: Date
  tags: string[]
  canonicalURL?: string
  draft: boolean
}

export interface Post {
  slug: string
  frontmatter: PostFrontmatter
  readingTime: number // minutes, minimum 1
}

export interface PostWithContent extends Post {
  content: string // MDX body, frontmatter already stripped
}

function calculateReadingTime(content: string): number {
  const wordCount = content.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(wordCount / 200))
}

function assertValidFrontmatter(data: Record<string, unknown>, slug: string): PostFrontmatter {
  if (!data.description) {
    throw new Error(`Blog post "${slug}" is missing a meta description`)
  }
  const description = data.description as string
  if (description.length < 140 || description.length > 155) {
    console.warn(
      `Blog post "${slug}" has a meta description of ${description.length} characters (expected 140-155)`
    )
  }
  return {
    title: data.title as string,
    description,
    pubDate: new Date(data.pubDate as string),
    updatedDate: data.updatedDate ? new Date(data.updatedDate as string) : undefined,
    tags: (data.tags as string[]) ?? [],
    canonicalURL: data.canonicalURL as string | undefined,
    draft: (data.draft as boolean) ?? false,
  }
}

function parsePost(filename: string): Post {
  const slug = filename.replace(/\.mdx?$/, '')
  const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), 'utf-8')
  const { data, content } = matter(raw)
  return {
    slug,
    frontmatter: assertValidFrontmatter(data, slug),
    readingTime: calculateReadingTime(content),
  }
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(CONTENT_DIR)) return []
  const files = fs.readdirSync(CONTENT_DIR).filter(f => /\.mdx?$/.test(f))
  const isDev = process.env.NODE_ENV === 'development'
  return files
    .map(parsePost)
    .filter(p => isDev || !p.frontmatter.draft)
    .sort((a, b) => b.frontmatter.pubDate.getTime() - a.frontmatter.pubDate.getTime())
}

export function getRelatedPosts(allPosts: Post[], current: Post, limit = 3): Post[] {
  const currentTags = new Set(current.frontmatter.tags)
  return allPosts
    .filter(p => p.slug !== current.slug && p.frontmatter.tags.some(tag => currentTags.has(tag)))
    .sort((a, b) => b.frontmatter.pubDate.getTime() - a.frontmatter.pubDate.getTime())
    .slice(0, limit)
}

export function getPostBySlug(slug: string): PostWithContent | null {
  for (const ext of ['mdx', 'md']) {
    const filepath = path.join(CONTENT_DIR, `${slug}.${ext}`)
    if (fs.existsSync(filepath)) {
      const raw = fs.readFileSync(filepath, 'utf-8')
      const { data, content } = matter(raw)
      const post: PostWithContent = {
        slug,
        frontmatter: assertValidFrontmatter(data, slug),
        readingTime: calculateReadingTime(content),
        content,
      }
      const isDev = process.env.NODE_ENV === 'development'
      if (!isDev && post.frontmatter.draft) return null
      return post
    }
  }
  return null
}

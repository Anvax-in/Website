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

function parsePost(filename: string): Post {
  const slug = filename.replace(/\.mdx?$/, '')
  const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), 'utf-8')
  const { data, content } = matter(raw)
  return {
    slug,
    frontmatter: {
      title: data.title as string,
      description: data.description as string,
      pubDate: new Date(data.pubDate as string),
      updatedDate: data.updatedDate ? new Date(data.updatedDate as string) : undefined,
      tags: (data.tags as string[]) ?? [],
      canonicalURL: data.canonicalURL as string | undefined,
      draft: (data.draft as boolean) ?? false,
    },
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

export function getPostBySlug(slug: string): PostWithContent | null {
  for (const ext of ['mdx', 'md']) {
    const filepath = path.join(CONTENT_DIR, `${slug}.${ext}`)
    if (fs.existsSync(filepath)) {
      const raw = fs.readFileSync(filepath, 'utf-8')
      const { data, content } = matter(raw)
      const post: PostWithContent = {
        slug,
        frontmatter: {
          title: data.title as string,
          description: data.description as string,
          pubDate: new Date(data.pubDate as string),
          updatedDate: data.updatedDate ? new Date(data.updatedDate as string) : undefined,
          tags: (data.tags as string[]) ?? [],
          canonicalURL: data.canonicalURL as string | undefined,
          draft: (data.draft as boolean) ?? false,
        },
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

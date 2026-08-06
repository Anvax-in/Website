import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Fragment } from 'react'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import JsonLd from '@/components/blog/JsonLd'
import styles from '@/pages/BlogPost.module.css'
import proseStyles from '@/components/blog/Prose.module.css'

export const dynamicParams = false

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

type Props = { params: Promise<{ slug: string }> }

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  const { frontmatter } = post
  const canonicalUrl = frontmatter.canonicalURL ?? `https://www.anvax.in/blog/${slug}`
  const ogImageUrl = `https://www.anvax.in/api/og?title=${encodeURIComponent(frontmatter.title)}`

  return {
    title: `${frontmatter.title} - Sovereign Stack`,
    description: frontmatter.description,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      url: `https://www.anvax.in/blog/${slug}`,
      type: 'article',
      publishedTime: frontmatter.pubDate.toISOString(),
      modifiedTime: frontmatter.updatedDate?.toISOString(),
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: frontmatter.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.description,
      images: [ogImageUrl],
    },
    alternates: { canonical: canonicalUrl },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const { content } = await compileMDX({ source: post.content, options: { mdxOptions: { remarkPlugins: [remarkGfm] } } })

  const { frontmatter, readingTime } = post
  const canonicalUrl = frontmatter.canonicalURL ?? `https://www.anvax.in/blog/${slug}`

  return (
    <>
      <JsonLd
        title={frontmatter.title}
        description={frontmatter.description}
        pubDateISO={frontmatter.pubDate.toISOString()}
        updatedDateISO={frontmatter.updatedDate?.toISOString()}
        postUrl={canonicalUrl}
      />

      <article>
        <header className={styles.header}>
          <div className="container">
            <div className={styles.headerInner}>
              <p className={styles.eyebrow}>Sovereign Stack</p>
              {/* Single H1 - never also rendered by layout */}
              <h1 className={styles.h1}>
                {frontmatter.title.split(/\.\s+/).map((part, i, arr) => (
                  <Fragment key={i}>
                    {part}{i < arr.length - 1 ? '.' : ''}
                    {i < arr.length - 1 && <br />}
                  </Fragment>
                ))}
              </h1>
              <div className={styles.meta}>
                <time dateTime={frontmatter.pubDate.toISOString()}>
                  {formatDate(frontmatter.pubDate)}
                </time>
                <span className={styles.sep}>·</span>
                <span>{readingTime} min read</span>
              </div>
              {frontmatter.tags.length > 0 && (
                <div className={styles.tags}>
                  {frontmatter.tags.map(tag => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="container">
          <div className={styles.body}>
            <div>
              <Link href="/blog" className={styles.backLink}>← All posts</Link>
              <div className={proseStyles.prose}>{content}</div>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}

import type { Post } from '@/lib/blog'
import BlogCard from '@/components/blog/BlogCard'
import styles from './RelatedPosts.module.css'

interface RelatedPostsProps {
  posts: Post[]
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null

  return (
    <div className={styles.related}>
      <h2 className={styles.heading}>Related reading</h2>
      <div className={styles.grid}>
        {posts.map(post => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}

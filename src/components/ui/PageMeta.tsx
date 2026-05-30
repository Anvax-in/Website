import { Head } from 'vite-react-ssg'

interface PageMetaProps {
  title: string
  description: string
}

export default function PageMeta({ title, description }: PageMetaProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Head>
  )
}

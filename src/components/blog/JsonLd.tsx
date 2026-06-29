interface JsonLdProps {
  title: string
  description: string
  pubDateISO: string
  updatedDateISO?: string
  postUrl: string // canonical URL for this post
}

export default function JsonLd({ title, description, pubDateISO, updatedDateISO, postUrl }: JsonLdProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    datePublished: pubDateISO,
    dateModified: updatedDateISO ?? pubDateISO,
    author: {
      '@type': 'Organization',
      name: 'Anvax',
      url: 'https://www.anvax.in',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Anvax',
      url: 'https://www.anvax.in',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.anvax.in/assets/anvax-wordmark-ink.svg',
      },
    },
    url: postUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}

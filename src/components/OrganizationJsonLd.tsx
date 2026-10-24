export default function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://www.anvax.in/#organization',
        name: 'Anvax',
        url: 'https://www.anvax.in',
        logo: 'https://www.anvax.in/assets/anvax-wordmark-ink.svg',
        sameAs: [
          'https://www.linkedin.com/company/anvax/',
          'https://medium.com/@anvax',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://www.anvax.in/#website',
        name: 'Anvax',
        url: 'https://www.anvax.in',
        publisher: { '@id': 'https://www.anvax.in/#organization' },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}

import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://anvax.in'
  const now = new Date()
  return [
    { url: base,                    lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/platform`,      lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/industries`,    lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/trust`,         lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/deployment`,    lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/pricing`,       lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/company`,       lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/contact`,       lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ]
}

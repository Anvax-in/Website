import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['next-mdx-remote'],
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'anvax.in' }],
        destination: 'https://www.anvax.in/:path*',
        permanent: true,
      },
      // Redirect removed test post so Google gets a 301 instead of a 404
      {
        source: '/blog/test-post',
        destination: '/blog',
        permanent: true,
      },
      // Status page hosted on external uptime service
      {
        source: '/status',
        destination: 'https://status.anvax.in',
        permanent: false,
      },
    ]
  },
}

export default nextConfig

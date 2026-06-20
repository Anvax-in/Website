import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'anvax.in' }],
        destination: 'https://www.anvax.in/:path*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig

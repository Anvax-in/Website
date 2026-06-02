import type { Metadata } from 'next'
import { Source_Serif_4 } from 'next/font/google'
import localFont from 'next/font/local'
import { GeistMono } from 'geist/font/mono'
import '@/styles/tokens.css'
import '@/styles/global.css'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'

const sourceSerif4 = Source_Serif_4({
  subsets: ['latin'],
  axes: ['opsz'],
  weight: ['300', '400', '600'],
  variable: '--font-serif',
  display: 'swap',
})

const generalSans = localFont({
  src: './fonts/GeneralSans-Variable.woff2',
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://anvax.in'),
  applicationName: 'Anvax',
  robots: { index: true, follow: true },
  openGraph: {
    siteName: 'Anvax',
    type: 'website',
    locale: 'en_IN',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${sourceSerif4.variable} ${generalSans.variable} ${GeistMono.variable}`}
    >
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

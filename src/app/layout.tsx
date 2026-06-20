import type { Metadata } from 'next'
import { Source_Serif_4 } from 'next/font/google'
import localFont from 'next/font/local'
import { GeistMono } from 'geist/font/mono'
import Script from 'next/script'
import '@/styles/tokens.css'
import '@/styles/global.css'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'

const sourceSerif4 = Source_Serif_4({
  subsets: ['latin'],
  axes: ['opsz'],
  weight: 'variable',
  variable: '--font-serif',
  display: 'swap',
})

const generalSans = localFont({
  src: './fonts/GeneralSans-Variable.woff2',
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.anvax.in'),
  applicationName: 'Anvax',
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
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
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","x1tb1j1qw0");`,
          }}
        />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Archivo } from 'next/font/google'
import { GeistMono } from 'geist/font/mono'
import Script from 'next/script'
import '@/styles/tokens.css'
import '@/styles/global.css'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import OrganizationJsonLd from '@/components/OrganizationJsonLd'

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '600', '800'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.anvax.in'),
  applicationName: 'Anvax',
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.png',
  },
  openGraph: {
    siteName: 'Anvax',
    type: 'website',
    locale: 'en_IN',
  },
}

const gaId = process.env.NEXT_PUBLIC_GA_ID || 'G-X136BCT4C9'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${GeistMono.variable}`}
    >
      <body>
        <OrganizationJsonLd />
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","x1tb1j1qw0");`,
          }}
        />
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`,
              }}
            />
          </>
        )}
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

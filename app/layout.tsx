import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script' // This fixes the "Cannot find name 'Script'" error

const inter = Inter({ subsets: ['latin'] }) // This fixes the "Cannot find name 'inter'" error

export const metadata: Metadata = {
  title: 'PearlFountain Events Centre - Premium Event Venue in Abeokuta',
  description: 'Host unforgettable events at PearlFountain Events Centre. Located in Graceland Estate, Kotopo - Abeokuta. Weddings, birthdays, corporate events & more.',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        
        {/* Readdy Agent Widget */}
        <Script 
          src="https://readdy.ai/api/public/assistant/widget?projectId=4e9dcdae-c1a7-4d87-9e47-363cfe7e5da8"
          strategy="afterInteractive"
          // @ts-ignore
          mode="hybrid"
          // @ts-ignore
          voice-show-transcript="true"
          theme="light"
          size="compact"
          accent-color="#ec4899"
          button-base-color="#000000"
          button-accent-color="#FFFFFF"
          main-label="Talk with PearlFountain"
          start-button-text="Start Chat"
          end-button-text="End Call"
        />
      </body>
    </html>
  )
}
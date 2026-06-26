import { JetBrains_Mono, Inter } from 'next/font/google'
import './globals.css'

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata = {
  title: 'AI Data Automation Platform',
  description: 'Advanced AI-driven data automation for the modern enterprise.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jetbrains.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}

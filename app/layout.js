import { JetBrains_Mono, Inter } from 'next/font/google'
import './globals.css'

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata = {
  title: 'NexaFlow AI — Advanced Data Automation Platform',
  description: 'NexaFlow is an advanced AI-driven data automation platform that unifies your enterprise data pipelines, accelerates model training, and delivers real-time analytics at scale.',
  keywords: ['AI', 'data automation', 'machine learning', 'data pipelines', 'enterprise AI', 'SaaS'],
  openGraph: {
    title: 'NexaFlow AI — Advanced Data Automation Platform',
    description: 'Automate your data. Elevate your AI.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jetbrains.variable} ${inter.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#172B36" />
      </head>
      <body>{children}</body>
    </html>
  )
}

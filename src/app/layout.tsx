import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AppProvider } from '@/contexts/AppContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Inspira.K - Project Management Dashboard',
  description: 'A modern project management dashboard with work and leisure modes',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16', type: 'image/x-icon' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><defs><linearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'><stop offset='0%25' style='stop-color:%236366f1;stop-opacity:1' /><stop offset='100%25' style='stop-color:%238b5cf6;stop-opacity:1' /></linearGradient></defs><rect width='32' height='32' rx='6' fill='url(%23grad)'/><text x='16' y='22' font-family='Arial' font-size='16' font-weight='bold' text-anchor='middle' fill='white'>IK</text><circle cx='26' cy='6' r='3' fill='%2310b981'/><path d='M24 6l1 1 2-2' stroke='white' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'/></svg>" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#6366f1" />
      </head>
      <body className={inter.className}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  )
}

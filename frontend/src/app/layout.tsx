import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GreenBallot - Decentralized Voting System',
  description: 'A comprehensive Web3 voting system powered by blockchain technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-light text-dark">{children}</body>
    </html>
  )
}

'use client'

import Link from 'next/link'
import { useState } from 'react'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">GB</span>
          </div>
          <span className="font-bold text-xl text-dark group-hover:text-primary transition-colors">
            GreenBallot
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <Link href="/#features" className="text-dark hover:text-primary transition-colors font-medium">
            Features
          </Link>
          <Link href="/dashboard" className="text-dark hover:text-primary transition-colors font-medium">
            Dashboard
          </Link>
          <Link href="/about" className="text-dark hover:text-primary transition-colors font-medium">
            About
          </Link>
          <button className="bg-primary hover:bg-secondary text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg">
            Connect Wallet
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-light border-t border-gray-200 p-4 space-y-4">
          <Link href="/#features" className="block text-dark hover:text-primary font-medium">
            Features
          </Link>
          <Link href="/dashboard" className="block text-dark hover:text-primary font-medium">
            Dashboard
          </Link>
          <Link href="/about" className="block text-dark hover:text-primary font-medium">
            About
          </Link>
          <button className="w-full bg-primary hover:bg-secondary text-white px-4 py-2 rounded-lg font-semibold transition-all">
            Connect Wallet
          </button>
        </div>
      )}
    </header>
  )
}

'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/Button'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Header />
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary via-light to-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="animate-fadeIn">
              <h1 className="text-5xl lg:text-6xl font-bold text-dark mb-6 leading-tight">
                Decentralized <span className="text-primary">Voting</span> System
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Experience transparent, secure, and blockchain-powered democratic voting. GreenBallot ensures every voice is heard and every vote is counted.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="animate-slideIn">
                  Launch App
                </Button>
                <Button size="lg" variant="outline" className="animate-slideIn">
                  Learn More
                </Button>
              </div>
              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-6">
                <div>
                  <p className="text-3xl font-bold text-primary">100%</p>
                  <p className="text-sm text-gray-600">Transparent</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">0% Fraud</p>
                  <p className="text-sm text-gray-600">Blockchain Verified</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">24/7</p>
                  <p className="text-sm text-gray-600">Available</p>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-96 h-96">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-3xl opacity-20 animate-pulse-glow" />
                <div className="absolute inset-8 bg-white rounded-2xl shadow-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🗳️</div>
                    <h3 className="text-2xl font-bold text-dark mb-2">Secure Voting</h3>
                    <p className="text-gray-600">Powered by Web3 Technology</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-dark mb-16">
            Why Choose GreenBallot?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-primary bg-opacity-20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-3xl">🔒</span>
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">Secure & Transparent</h3>
              <p className="text-gray-600">All votes are recorded on the blockchain, ensuring transparency and eliminating fraud.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-primary bg-opacity-20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">Instant Results</h3>
              <p className="text-gray-600">Get real-time voting results and analytics as votes are cast.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-primary bg-opacity-20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-3xl">🌍</span>
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">Global Access</h3>
              <p className="text-gray-600">Participate from anywhere in the world with just an internet connection.</p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-primary bg-opacity-20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-3xl">👥</span>
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">Easy Registration</h3>
              <p className="text-gray-600">Simple KYC process to ensure eligible voters participate.</p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-primary bg-opacity-20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">Advanced Analytics</h3>
              <p className="text-gray-600">Detailed voting analytics and demographic insights.</p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-primary bg-opacity-20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-3xl">🛡️</span>
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">Private & Secure</h3>
              <p className="text-gray-600">Your vote is confidential while remaining verifiable on the blockchain.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Vote?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of voters making a difference with secure, decentralized voting.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="bg-primary hover:bg-secondary">
              Enter Dashboard
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  )
}

'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function About() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-dark mb-4">About GreenBallot</h1>
            <p className="text-xl text-gray-600">
              Revolutionizing democracy through blockchain technology
            </p>
          </div>

          {/* Mission */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-dark mb-4">Our Mission</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              GreenBallot is dedicated to creating a secure, transparent, and accessible voting system that empowers citizens worldwide. By leveraging blockchain technology, we eliminate fraud, ensure transparency, and make voting accessible to everyone, regardless of location.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-dark mb-4">Our Vision</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              We envision a future where every citizen can participate in democratic processes with confidence. A world where voting is secure, transparent, and accessible from anywhere. A system where every vote counts and no fraud is possible.
            </p>
          </div>

          {/* Why Blockchain */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-dark mb-6">Why Blockchain?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">Transparency</h3>
                <p className="text-gray-600">
                  All transactions are recorded on an immutable ledger, making it impossible to alter votes.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">Security</h3>
                <p className="text-gray-600">
                  Advanced cryptography ensures that only authorized voters can participate.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">Accessibility</h3>
                <p className="text-gray-600">
                  Vote from anywhere in the world with just an internet connection and a web3 wallet.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">Auditability</h3>
                <p className="text-gray-600">
                  Every vote is verifiable and can be audited without compromising voter privacy.
                </p>
              </div>
            </div>
          </div>

          {/* Team */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-dark mb-6">Our Team</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              GreenBallot is built by a dedicated team of developers, blockchain engineers, and democracy advocates passionate about creating a better voting system.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4" />
                  <h3 className="font-bold text-dark">Team Member {i}</h3>
                  <p className="text-sm text-gray-600">Role</p>
                </div>
              ))}
            </div>
          </div>

          {/* Technology */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-dark mb-6">Technology Stack</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-primary mb-2">Smart Contracts</h3>
                <p className="text-gray-600">Solidity 0.8.0+ deployed on Ethereum-compatible networks</p>
              </div>
              <div>
                <h3 className="font-bold text-primary mb-2">Frontend</h3>
                <p className="text-gray-600">Next.js 14, React 18, Tailwind CSS, Wagmi, RainbowKit</p>
              </div>
              <div>
                <h3 className="font-bold text-primary mb-2">Web3 Integration</h3>
                <p className="text-gray-600">Ethers.js, Viem, Web3.js for blockchain interaction</p>
              </div>
              <div>
                <h3 className="font-bold text-primary mb-2">Infrastructure</h3>
                <p className="text-gray-600">IPFS for distributed data, Graph Protocol for indexing</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/Button'
import { CandidateCard } from '@/components/CandidateCard'
import { SessionCard } from '@/components/SessionCard'

interface Candidate {
  id: number
  name: string
  party: string
  platform: string
  votes: number
}

interface VotingSession {
  id: number
  name: string
  startTime: number
  endTime: number
  isActive: boolean
  totalVotes: number
  totalVoters: number
}

interface VoterInfo {
  name: string
  nationality: string
  age: number
  lga: string
  hasVoted: boolean
}

export default function Dashboard() {
  const [connected, setConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')
  const [voterInfo, setVoterInfo] = useState<VoterInfo | null>(null)
  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: 1,
      name: 'Alice Johnson',
      party: 'Democratic Party',
      platform: 'Education and Healthcare Reform',
      votes: 1245,
    },
    {
      id: 2,
      name: 'Bob Smith',
      party: 'Republican Party',
      platform: 'Economic Growth and Innovation',
      votes: 987,
    },
    {
      id: 3,
      name: 'Carol White',
      party: 'Independent',
      platform: 'Environmental Protection',
      votes: 654,
    },
  ])

  const [sessions, setSessions] = useState<VotingSession[]>([
    {
      id: 1,
      name: 'Presidential Election 2025',
      startTime: Math.floor(Date.now() / 1000) - 3600,
      endTime: Math.floor(Date.now() / 1000) + 7200,
      isActive: true,
      totalVotes: 2886,
      totalVoters: 5000,
    },
    {
      id: 2,
      name: 'Congressional Elections',
      startTime: Math.floor(Date.now() / 1000) + 86400,
      endTime: Math.floor(Date.now() / 1000) + 172800,
      isActive: false,
      totalVotes: 0,
      totalVoters: 3000,
    },
  ])

  const [votingFor, setVotingFor] = useState<number | null>(null)
  const [selectedSession, setSelectedSession] = useState<VotingSession | null>(null)
  const [showVoterForm, setShowVoterForm] = useState(!connected)
  const [formData, setFormData] = useState({
    name: '',
    nationality: '',
    age: '',
    lga: '',
  })

  // Simulate wallet connection
  const handleConnectWallet = () => {
    setConnected(true)
    setWalletAddress('0x' + Math.random().toString(16).slice(2, 10).toUpperCase())
    setShowVoterForm(true)
  }

  const handleRegisterVoter = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.nationality && formData.age && formData.lga) {
      setVoterInfo({
        name: formData.name,
        nationality: formData.nationality,
        age: parseInt(formData.age),
        lga: formData.lga,
        hasVoted: false,
      })
      setShowVoterForm(false)
    }
  }

  const handleVote = (candidateId: number) => {
    if (!voterInfo || voterInfo.hasVoted) return

    setVotingFor(candidateId)
    setTimeout(() => {
      setCandidates(
        candidates.map((c) =>
          c.id === candidateId ? { ...c, votes: c.votes + 1 } : c
        )
      )
      setVoterInfo({ ...voterInfo, hasVoted: true })
      setVotingFor(null)
    }, 1000)
  }

  const handleDisconnect = () => {
    setConnected(false)
    setWalletAddress('')
    setVoterInfo(null)
    setFormData({ name: '', nationality: '', age: '', lga: '' })
    setShowVoterForm(false)
  }

  const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0)
  const winner = candidates.reduce((prev, current) =>
    prev.votes > current.votes ? prev : current
  )

  return (
    <>
      <Header />
      <div className="min-h-screen bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Connection Section */}
          <div className="mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-dark">Dashboard</h2>
                {connected ? (
                  <div>
                    <p className="text-green-600 font-semibold mt-2">✓ Connected</p>
                    <p className="text-xs text-gray-600 mt-1">{walletAddress}</p>
                  </div>
                ) : (
                  <p className="text-gray-600 mt-2">Connect your wallet to participate</p>
                )}
              </div>
              {!connected ? (
                <Button size="lg" onClick={handleConnectWallet}>
                  Connect Wallet
                </Button>
              ) : (
                <Button size="lg" variant="outline" onClick={handleDisconnect}>
                  Disconnect
                </Button>
              )}
            </div>
          </div>

          {/* Voter Registration Form */}
          {connected && showVoterForm && !voterInfo && (
            <div className="mb-8 bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-dark mb-6">Register as Voter</h3>
              <form onSubmit={handleRegisterVoter} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nationality</label>
                  <input
                    type="text"
                    value={formData.nationality}
                    onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Local Government Area</label>
                  <input
                    type="text"
                    value={formData.lga}
                    onChange={(e) => setFormData({ ...formData, lga: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <Button type="submit" size="lg" className="w-full">
                    Register as Voter
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Voter Info */}
          {voterInfo && (
            <div className="mb-8 bg-gradient-to-r from-primary to-secondary rounded-xl shadow-lg p-6 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Welcome, {voterInfo.name}!</h3>
                  <p className="text-sm opacity-90">
                    {voterInfo.age} years old • {voterInfo.nationality} • {voterInfo.lga}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm opacity-90">Voting Status:</p>
                  <p className={`text-lg font-bold ${voterInfo.hasVoted ? 'text-yellow-300' : 'text-green-300'}`}>
                    {voterInfo.hasVoted ? '✓ Voted' : 'Ready to Vote'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Voting Sessions */}
          {connected && (
            <>
              <h2 className="text-3xl font-bold text-dark mb-6">Voting Sessions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {sessions.map((session) => (
                  <SessionCard
                    key={session.id}
                    {...session}
                    onClick={() => setSelectedSession(session)}
                  />
                ))}
              </div>
            </>
          )}

          {/* Candidates Section */}
          {connected && voterInfo && (
            <>
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-dark">Candidates</h2>
                  <p className="text-gray-600 mt-2">Total Votes Cast: {totalVotes}</p>
                </div>
                {!voterInfo.hasVoted && (
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Current Leader:</p>
                    <p className="text-xl font-bold text-primary">{winner.name}</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {candidates.map((candidate) => (
                  <CandidateCard
                    key={candidate.id}
                    {...candidate}
                    onVote={() => handleVote(candidate.id)}
                    isVoting={votingFor === candidate.id}
                    isDisabled={voterInfo.hasVoted || !voterInfo}
                  />
                ))}
              </div>

              {/* Results Chart */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-dark mb-6">Live Results</h3>
                <div className="space-y-6">
                  {candidates.map((candidate) => {
                    const percentage = totalVotes > 0 ? (candidate.votes / totalVotes) * 100 : 0
                    return (
                      <div key={candidate.id}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-dark">{candidate.name}</span>
                          <span className="text-lg font-bold text-primary">{candidate.votes} votes ({percentage.toFixed(1)}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </>
          )}

          {connected && !voterInfo && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">Register as a voter to start voting</p>
            </div>
          )}

          {!connected && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">Connect your wallet to access the voting dashboard</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

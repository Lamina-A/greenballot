'use client'

import { Button } from './Button'

interface CandidateCardProps {
  id: number
  name: string
  party: string
  platform: string
  votes: number
  onVote: () => void
  isVoting: boolean
  isDisabled: boolean
}

export function CandidateCard({
  id,
  name,
  party,
  platform,
  votes,
  onVote,
  isVoting,
  isDisabled,
}: CandidateCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-l-4 border-primary">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-dark">{name}</h3>
            <p className="text-primary font-semibold">{party}</p>
          </div>
          <div className="bg-primary bg-opacity-10 px-3 py-1 rounded-full">
            <span className="text-primary font-bold">#{id}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{platform}</p>

        {/* Vote Count */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-600">Votes</span>
            <span className="text-2xl font-bold text-primary">{votes}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((votes / 100) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Vote Button */}
        <Button
          onClick={onVote}
          disabled={isDisabled}
          className="w-full"
          size="lg"
        >
          {isVoting ? 'Voting...' : 'Cast Your Vote'}
        </Button>
      </div>
    </div>
  )
}

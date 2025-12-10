'use client'

interface SessionCardProps {
  id: number
  name: string
  startTime: number
  endTime: number
  isActive: boolean
  totalVotes: number
  totalVoters: number
  onClick: () => void
}

export function SessionCard({
  id,
  name,
  startTime,
  endTime,
  isActive,
  totalVotes,
  totalVoters,
  onClick,
}: SessionCardProps) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const participation = totalVoters > 0 ? Math.round((totalVotes / totalVoters) * 100) : 0

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 overflow-hidden"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-dark">{name}</h3>
            <p className={`text-sm font-semibold ${isActive ? 'text-green-600' : 'text-gray-500'}`}>
              {isActive ? '🔴 Live' : '✓ Completed'}
            </p>
          </div>
          <div className={`px-3 py-1 rounded-full ${isActive ? 'bg-green-100' : 'bg-gray-100'}`}>
            <span className={`text-xs font-bold ${isActive ? 'text-green-700' : 'text-gray-700'}`}>
              SESSION {id}
            </span>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-4 space-y-2">
          <p className="text-xs text-gray-600">
            <span className="font-semibold">Start:</span> {formatDate(startTime)}
          </p>
          <p className="text-xs text-gray-600">
            <span className="font-semibold">End:</span> {formatDate(endTime)}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-xs text-gray-600">Total Votes</p>
            <p className="text-2xl font-bold text-blue-600">{totalVotes}</p>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg">
            <p className="text-xs text-gray-600">Participation</p>
            <p className="text-2xl font-bold text-purple-600">{participation}%</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div
            className="bg-gradient-to-r from-primary to-secondary h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${participation}%` }}
          />
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { cn, getStatusColor } from '@/lib/utils'

interface Game {
  id: string
  title: string
  platform: string
  genre: string
  status: 'backlog' | 'playing' | 'completed' | 'paused'
  progress: number
  rating?: number
  hoursPlayed?: number
  coverImage?: string
  notes?: string
}

interface GameCardProps {
  game: Game
  onUpdate: (gameId: string, updates: Partial<Game>) => void
}

export default function GameCard({ game, onUpdate }: GameCardProps) {
  const [showDetails, setShowDetails] = useState(false)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'playing':
        return 'fas fa-play text-blue-500'
      case 'completed':
        return 'fas fa-check text-green-500'
      case 'paused':
        return 'fas fa-pause text-yellow-500'
      default:
        return 'fas fa-clock text-gray-500'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'playing':
        return 'Playing'
      case 'completed':
        return 'Completed'
      case 'paused':
        return 'Paused'
      default:
        return 'Backlog'
    }
  }

  const handleStatusChange = () => {
    const statusOrder: Game['status'][] = ['backlog', 'playing', 'paused', 'completed']
    const currentIndex = statusOrder.indexOf(game.status)
    const nextIndex = (currentIndex + 1) % statusOrder.length
    onUpdate(game.id, { status: statusOrder[nextIndex] })
  }

  const renderStars = (rating?: number) => {
    if (!rating) return null
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <i
            key={star}
            className={cn(
              'fas fa-star text-xs',
              star <= rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
            )}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-200">
      {/* Cover Image */}
      <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
        {game.coverImage ? (
          <img
            src={game.coverImage}
            alt={game.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <i className="fas fa-gamepad text-4xl text-gray-400"></i>
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-2 right-2">
          <button
            onClick={handleStatusChange}
            className={cn(
              'px-2 py-1 rounded-full text-xs font-medium transition-colors',
              getStatusColor(game.status),
              'hover:opacity-80'
            )}
          >
            <i className={cn(getStatusIcon(game.status), 'mr-1')}></i>
            {getStatusLabel(game.status)}
          </button>
        </div>

        {/* Progress Bar */}
        {game.progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
            <div className="w-full bg-gray-600 rounded-full h-1.5">
              <div 
                className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${game.progress}%` }}
              ></div>
            </div>
            <p className="text-white text-xs mt-1">{game.progress}% Complete</p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1">
          {game.title}
        </h4>
        
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>{game.platform}</span>
          <span>{game.genre}</span>
        </div>

        {/* Rating */}
        {game.rating && (
          <div className="flex items-center justify-between mb-2">
            {renderStars(game.rating)}
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {game.rating}/5
            </span>
          </div>
        )}

        {/* Hours Played */}
        {game.hoursPlayed && (
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mb-2">
            <i className="fas fa-clock"></i>
            <span>{game.hoursPlayed}h played</span>
          </div>
        )}

        {/* Notes */}
        {game.notes && (
          <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
            {game.notes}
          </p>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 text-sm"
          >
            {showDetails ? 'Less' : 'More'}
          </button>
          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <i className="fas fa-ellipsis-h"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

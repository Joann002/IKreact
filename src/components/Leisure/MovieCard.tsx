'use client'

import { cn, getStatusColor } from '@/lib/utils'

interface Movie {
  id: string
  title: string
  type: 'movie' | 'series' | 'anime'
  status: 'watchlist' | 'watching' | 'completed' | 'dropped'
  rating?: number
  year?: number
  genre: string
  director?: string
  episodes?: number
  currentEpisode?: number
  posterImage?: string
  notes?: string
}

interface MovieCardProps {
  movie: Movie
  onUpdate: (movieId: string, updates: Partial<Movie>) => void
}

export default function MovieCard({ movie, onUpdate }: MovieCardProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'watching':
        return 'fas fa-play text-blue-500'
      case 'completed':
        return 'fas fa-check text-green-500'
      case 'dropped':
        return 'fas fa-times text-red-500'
      default:
        return 'fas fa-bookmark text-yellow-500'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'watching':
        return 'Watching'
      case 'completed':
        return 'Completed'
      case 'dropped':
        return 'Dropped'
      default:
        return 'Watchlist'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'series':
        return 'fas fa-tv'
      case 'anime':
        return 'fas fa-dragon'
      default:
        return 'fas fa-film'
    }
  }

  const handleStatusChange = () => {
    const statusOrder: Movie['status'][] = ['watchlist', 'watching', 'completed', 'dropped']
    const currentIndex = statusOrder.indexOf(movie.status)
    const nextIndex = (currentIndex + 1) % statusOrder.length
    onUpdate(movie.id, { status: statusOrder[nextIndex] })
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

  const progress = movie.episodes && movie.currentEpisode 
    ? (movie.currentEpisode / movie.episodes) * 100 
    : 0

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-200">
      {/* Poster Image */}
      <div className="relative h-64 bg-gray-200 dark:bg-gray-700">
        {movie.posterImage ? (
          <img
            src={movie.posterImage}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <i className={cn(getTypeIcon(movie.type), 'text-4xl text-gray-400')}></i>
          </div>
        )}
        
        {/* Type Badge */}
        <div className="absolute top-2 left-2">
          <span className="bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full">
            <i className={cn(getTypeIcon(movie.type), 'mr-1')}></i>
            {movie.type.charAt(0).toUpperCase() + movie.type.slice(1)}
          </span>
        </div>

        {/* Status Badge */}
        <div className="absolute top-2 right-2">
          <button
            onClick={handleStatusChange}
            className={cn(
              'px-2 py-1 rounded-full text-xs font-medium transition-colors',
              getStatusColor(movie.status),
              'hover:opacity-80'
            )}
          >
            <i className={cn(getStatusIcon(movie.status), 'mr-1')}></i>
            {getStatusLabel(movie.status)}
          </button>
        </div>

        {/* Progress Bar for Series */}
        {movie.type !== 'movie' && movie.episodes && movie.currentEpisode && (
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
            <div className="w-full bg-gray-600 rounded-full h-1.5">
              <div 
                className="bg-red-500 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-white text-xs mt-1">
              {movie.currentEpisode}/{movie.episodes} episodes
            </p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1">
          {movie.title}
        </h4>
        
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>{movie.year}</span>
          <span>{movie.genre}</span>
        </div>

        {/* Director */}
        {movie.director && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            Dir. {movie.director}
          </p>
        )}

        {/* Rating */}
        {movie.rating && (
          <div className="flex items-center justify-between mb-2">
            {renderStars(movie.rating)}
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {movie.rating}/5
            </span>
          </div>
        )}

        {/* Notes */}
        {movie.notes && (
          <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
            {movie.notes}
          </p>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
          <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 text-sm">
            Details
          </button>
          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <i className="fas fa-ellipsis-h"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

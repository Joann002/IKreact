'use client'

import { useState } from 'react'
import MainLayout from '@/components/Layout/MainLayout'
import MovieCard from '@/components/Leisure/MovieCard'
import AddMovieModal from '@/components/Leisure/AddMovieModal'

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

export default function MoviesPage() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [movies, setMovies] = useState<Movie[]>([
    {
      id: '1',
      title: 'Oppenheimer',
      type: 'movie',
      status: 'completed',
      rating: 5,
      year: 2023,
      genre: 'Biography/Drama',
      director: 'Christopher Nolan',
      posterImage: 'https://images.unsplash.com/photo-1489599904472-84978f312f2e?w=300&h=450&fit=crop',
      notes: 'Masterpiece of cinematography and storytelling'
    },
    {
      id: '2',
      title: 'The Bear',
      type: 'series',
      status: 'watching',
      rating: 4,
      year: 2022,
      genre: 'Comedy-Drama',
      episodes: 28,
      currentEpisode: 15,
      posterImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=450&fit=crop',
      notes: 'Intense kitchen drama with great character development'
    },
    {
      id: '3',
      title: 'Attack on Titan',
      type: 'anime',
      status: 'completed',
      rating: 5,
      year: 2013,
      genre: 'Action/Drama',
      episodes: 87,
      currentEpisode: 87,
      posterImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=450&fit=crop',
      notes: 'Epic finale to an incredible series'
    },
    {
      id: '4',
      title: 'Dune: Part Two',
      type: 'movie',
      status: 'watchlist',
      year: 2024,
      genre: 'Sci-Fi',
      director: 'Denis Villeneuve',
      posterImage: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=450&fit=crop'
    }
  ])

  const handleAddMovie = (movieData: Omit<Movie, 'id'>) => {
    const newMovie: Movie = {
      ...movieData,
      id: Date.now().toString(),
    }
    setMovies([...movies, newMovie])
    setShowAddModal(false)
  }

  const handleUpdateMovie = (movieId: string, updates: Partial<Movie>) => {
    setMovies(movies.map(movie => 
      movie.id === movieId ? { ...movie, ...updates } : movie
    ))
  }

  const groupedMovies = {
    watchlist: movies.filter(movie => movie.status === 'watchlist'),
    watching: movies.filter(movie => movie.status === 'watching'),
    completed: movies.filter(movie => movie.status === 'completed'),
    dropped: movies.filter(movie => movie.status === 'dropped')
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Movies & Series</h2>
            <p className="text-gray-600 dark:text-gray-400">Your entertainment watchlist and reviews</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-200 flex items-center gap-2"
          >
            <i className="fas fa-plus"></i>
            Add Movie/Series
          </button>
        </div>

        {/* Movie Sections */}
        <div className="space-y-8">
          {/* Watchlist */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <i className="fas fa-bookmark text-yellow-500"></i>
                Watchlist
              </h3>
              <span className="bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 text-sm px-2 py-1 rounded-full">
                {groupedMovies.watchlist.length}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {groupedMovies.watchlist.map((movie) => (
                <MovieCard key={movie.id} movie={movie} onUpdate={handleUpdateMovie} />
              ))}
            </div>
          </div>

          {/* Currently Watching */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <i className="fas fa-play text-blue-500"></i>
                Currently Watching
              </h3>
              <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm px-2 py-1 rounded-full">
                {groupedMovies.watching.length}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {groupedMovies.watching.map((movie) => (
                <MovieCard key={movie.id} movie={movie} onUpdate={handleUpdateMovie} />
              ))}
            </div>
          </div>

          {/* Completed */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <i className="fas fa-check text-green-500"></i>
                Completed
              </h3>
              <span className="bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm px-2 py-1 rounded-full">
                {groupedMovies.completed.length}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {groupedMovies.completed.map((movie) => (
                <MovieCard key={movie.id} movie={movie} onUpdate={handleUpdateMovie} />
              ))}
            </div>
          </div>

          {/* Dropped */}
          {groupedMovies.dropped.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <i className="fas fa-times text-red-500"></i>
                  Dropped
                </h3>
                <span className="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm px-2 py-1 rounded-full">
                  {groupedMovies.dropped.length}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {groupedMovies.dropped.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} onUpdate={handleUpdateMovie} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Add Movie Modal */}
        {showAddModal && (
          <AddMovieModal
            onClose={() => setShowAddModal(false)}
            onAdd={handleAddMovie}
          />
        )}
      </div>
    </MainLayout>
  )
}

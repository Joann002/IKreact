'use client'

import { useState } from 'react'
import MainLayout from '@/components/Layout/MainLayout'

interface Playlist {
  id: string
  name: string
  description: string
  trackCount: number
  duration: string
  genre: string
  coverImage?: string
  createdAt: string
}

interface ListeningStats {
  totalHours: number
  topGenre: string
  topArtist: string
  songsPlayed: number
}

export default function MusicPage() {
  const [playlists] = useState<Playlist[]>([
    {
      id: '1',
      name: 'Chill Vibes',
      description: 'Perfect for relaxing and unwinding',
      trackCount: 45,
      duration: '2h 34m',
      genre: 'Chill/Ambient',
      coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Workout Pump',
      description: 'High energy tracks for gym sessions',
      trackCount: 32,
      duration: '1h 58m',
      genre: 'Electronic/Rock',
      coverImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop',
      createdAt: '2024-01-10'
    },
    {
      id: '3',
      name: 'Focus Flow',
      description: 'Instrumental music for deep work',
      trackCount: 28,
      duration: '1h 45m',
      genre: 'Instrumental',
      coverImage: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop',
      createdAt: '2024-01-08'
    }
  ])

  const [stats] = useState<ListeningStats>({
    totalHours: 127,
    topGenre: 'Electronic',
    topArtist: 'Daft Punk',
    songsPlayed: 1543
  })

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Music</h2>
            <p className="text-gray-600 dark:text-gray-400">Your playlists and listening stats</p>
          </div>
          <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-200 flex items-center gap-2">
            <i className="fas fa-plus"></i>
            New Playlist
          </button>
        </div>

        {/* Listening Stats */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
          <h3 className="text-xl font-semibold mb-4">This Month's Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{stats.totalHours}h</div>
              <div className="text-purple-100 text-sm">Total Listening</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{stats.songsPlayed}</div>
              <div className="text-purple-100 text-sm">Songs Played</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{stats.topGenre}</div>
              <div className="text-purple-100 text-sm">Top Genre</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{stats.topArtist}</div>
              <div className="text-purple-100 text-sm">Top Artist</div>
            </div>
          </div>
        </div>

        {/* Playlists */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <i className="fas fa-music text-green-500"></i>
              My Playlists
            </h3>
            <span className="bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm px-2 py-1 rounded-full">
              {playlists.length}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {playlists.map((playlist) => (
              <div key={playlist.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200">
                {/* Cover */}
                <div className="relative mb-4">
                  {playlist.coverImage ? (
                    <img
                      src={playlist.coverImage}
                      alt={playlist.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                      <i className="fas fa-music text-4xl text-white"></i>
                    </div>
                  )}
                  
                  {/* Play Button */}
                  <button className="absolute bottom-2 right-2 w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white transition-colors">
                    <i className="fas fa-play ml-1"></i>
                  </button>
                </div>

                {/* Info */}
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {playlist.name}
                </h4>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {playlist.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <span>{playlist.trackCount} tracks</span>
                  <span>{playlist.duration}</span>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{playlist.genre}</span>
                  <span>Created {new Date(playlist.createdAt).toLocaleDateString()}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 text-sm">
                    Edit
                  </button>
                  <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <i className="fas fa-ellipsis-h"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recently Played
          </h3>
          
          <div className="space-y-3">
            {[
              { song: 'Midnight City', artist: 'M83', album: 'Hurry Up, We\'re Dreaming', duration: '4:03' },
              { song: 'Strobe', artist: 'Deadmau5', album: 'For Lack of a Better Name', duration: '10:32' },
              { song: 'Porcelain', artist: 'Moby', album: 'Play', duration: '4:01' },
              { song: 'Teardrop', artist: 'Massive Attack', album: 'Mezzanine', duration: '5:29' }
            ].map((track, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <i className="fas fa-music text-white"></i>
                </div>
                
                <div className="flex-1">
                  <h5 className="font-medium text-gray-900 dark:text-white">{track.song}</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{track.artist} • {track.album}</p>
                </div>
                
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {track.duration}
                </div>
                
                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <i className="fas fa-play"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

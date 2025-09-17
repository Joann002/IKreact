'use client'

import { useState } from 'react'
import MainLayout from '@/components/Layout/MainLayout'
import GameCard from '@/components/Leisure/GameCard'
import AddGameModal from '@/components/Leisure/AddGameModal'

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

export default function GamesPage() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [games, setGames] = useState<Game[]>([
    {
      id: '1',
      title: 'The Legend of Zelda: Tears of the Kingdom',
      platform: 'Nintendo Switch',
      genre: 'Action-Adventure',
      status: 'playing',
      progress: 65,
      rating: 5,
      hoursPlayed: 45,
      coverImage: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=300&h=400&fit=crop',
      notes: 'Amazing sequel with incredible physics system'
    },
    {
      id: '2',
      title: 'Cyberpunk 2077',
      platform: 'PC',
      genre: 'RPG',
      status: 'completed',
      progress: 100,
      rating: 4,
      hoursPlayed: 80,
      coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=400&fit=crop',
      notes: 'Great story, much improved since launch'
    },
    {
      id: '3',
      title: 'Elden Ring',
      platform: 'PlayStation 5',
      genre: 'Action RPG',
      status: 'backlog',
      progress: 0,
      coverImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=400&fit=crop'
    },
    {
      id: '4',
      title: 'Hades',
      platform: 'PC',
      genre: 'Roguelike',
      status: 'paused',
      progress: 40,
      rating: 5,
      hoursPlayed: 25,
      coverImage: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=300&h=400&fit=crop',
      notes: 'Incredible art style and gameplay loop'
    }
  ])

  const handleAddGame = (gameData: Omit<Game, 'id'>) => {
    const newGame: Game = {
      ...gameData,
      id: Date.now().toString(),
    }
    setGames([...games, newGame])
    setShowAddModal(false)
  }

  const handleUpdateGame = (gameId: string, updates: Partial<Game>) => {
    setGames(games.map(game => 
      game.id === gameId ? { ...game, ...updates } : game
    ))
  }

  const groupedGames = {
    backlog: games.filter(game => game.status === 'backlog'),
    playing: games.filter(game => game.status === 'playing'),
    paused: games.filter(game => game.status === 'paused'),
    completed: games.filter(game => game.status === 'completed')
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Video Games</h2>
            <p className="text-gray-600 dark:text-gray-400">Track your gaming journey</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 flex items-center gap-2"
          >
            <i className="fas fa-plus"></i>
            Add Game
          </button>
        </div>

        {/* Game Sections */}
        <div className="space-y-8">
          {/* Backlog */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <i className="fas fa-list text-gray-500"></i>
                Backlog
              </h3>
              <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-sm px-2 py-1 rounded-full">
                {groupedGames.backlog.length}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {groupedGames.backlog.map((game) => (
                <GameCard key={game.id} game={game} onUpdate={handleUpdateGame} />
              ))}
            </div>
          </div>

          {/* Currently Playing */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <i className="fas fa-play text-blue-500"></i>
                Currently Playing
              </h3>
              <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm px-2 py-1 rounded-full">
                {groupedGames.playing.length}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {groupedGames.playing.map((game) => (
                <GameCard key={game.id} game={game} onUpdate={handleUpdateGame} />
              ))}
            </div>
          </div>

          {/* Paused */}
          {groupedGames.paused.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <i className="fas fa-pause text-yellow-500"></i>
                  Paused
                </h3>
                <span className="bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 text-sm px-2 py-1 rounded-full">
                  {groupedGames.paused.length}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {groupedGames.paused.map((game) => (
                  <GameCard key={game.id} game={game} onUpdate={handleUpdateGame} />
                ))}
              </div>
            </div>
          )}

          {/* Completed */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <i className="fas fa-check text-green-500"></i>
                Completed
              </h3>
              <span className="bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm px-2 py-1 rounded-full">
                {groupedGames.completed.length}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {groupedGames.completed.map((game) => (
                <GameCard key={game.id} game={game} onUpdate={handleUpdateGame} />
              ))}
            </div>
          </div>
        </div>

        {/* Add Game Modal */}
        {showAddModal && (
          <AddGameModal
            onClose={() => setShowAddModal(false)}
            onAdd={handleAddGame}
          />
        )}
      </div>
    </MainLayout>
  )
}

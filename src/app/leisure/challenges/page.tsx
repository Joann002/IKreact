'use client'

import { useEffect, useState } from 'react'
import MainLayout from '@/components/Layout/MainLayout'

interface Challenge {
  id: string
  title: string
  description: string
  type: 'bucket-list' | 'monthly' | 'yearly' | 'habit'
  status: 'not-started' | 'in-progress' | 'completed' | 'failed'
  progress: number
  targetDate?: string
  completedDate?: string
  difficulty: 'easy' | 'medium' | 'hard'
  category: string
  notes?: string
}

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState<Challenge[]>([])

  const handleUpdateChallenge = async (challengeId: string, updates: Partial<Challenge>) => {
    await fetch(`/api/challenges/${challengeId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    })
    await loadChallenges()
  }

  const groupedChallenges = {
    'bucket-list': challenges.filter(c => c.type === 'bucket-list'),
    'monthly': challenges.filter(c => c.type === 'monthly'),
    'yearly': challenges.filter(c => c.type === 'yearly'),
    'habit': challenges.filter(c => c.type === 'habit')
  }

  const ChallengeCard = ({ challenge }: { challenge: Challenge }) => {
    const handleStatusChange = () => {
      const statusOrder: Challenge['status'][] = ['not-started', 'in-progress', 'completed', 'failed']
      const currentIndex = statusOrder.indexOf(challenge.status)
      const nextIndex = (currentIndex + 1) % statusOrder.length
      handleUpdateChallenge(challenge.id, { status: statusOrder[nextIndex] })
    }

    const getStatusColor = (status: string) => {
      switch (status) {
        case 'in-progress':
          return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
        case 'completed':
          return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
        case 'failed':
          return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
        default:
          return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
      }
    }

    const getDifficultyColor = (difficulty: string) => {
      switch (difficulty) {
        case 'easy':
          return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
        case 'medium':
          return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
        case 'hard':
          return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
        default:
          return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
      }
    }

    const getTypeIcon = (type: string) => {
      switch (type) {
        case 'bucket-list':
          return 'fas fa-star'
        case 'monthly':
          return 'fas fa-calendar-alt'
        case 'yearly':
          return 'fas fa-calendar'
        case 'habit':
          return 'fas fa-sync-alt'
        default:
          return 'fas fa-flag'
      }
    }

    const isOverdue = challenge.targetDate && new Date(challenge.targetDate) < new Date() && challenge.status !== 'completed'

    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <i className={`${getTypeIcon(challenge.type)} text-purple-500`}></i>
            <h4 className="font-semibold text-gray-900 dark:text-white">
              {challenge.title}
            </h4>
          </div>
          <div className="flex gap-2 items-center">
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${getDifficultyColor(challenge.difficulty)}`}>
              {challenge.difficulty}
            </span>
            <button
              onClick={handleStatusChange}
              className={`text-xs font-medium px-2 py-1 rounded-full transition-colors hover:opacity-80 ${getStatusColor(challenge.status)}`}
            >
              {challenge.status === 'not-started' ? 'Not Started' :
               challenge.status === 'in-progress' ? 'In Progress' :
               challenge.status === 'completed' ? 'Completed' : 'Failed'}
            </button>
            <button
              onClick={async () => {
                await fetch(`/api/challenges/${challenge.id}`, { method: 'DELETE' })
                document.dispatchEvent(new CustomEvent('challenges:refresh'))
              }}
              className="text-gray-400 hover:text-red-600"
              title="Delete"
            >
              <i className="fas fa-trash"></i>
            </button>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {challenge.description}
        </p>

        {/* Progress */}
        {challenge.progress > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Progress
              </span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {challenge.progress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  challenge.status === 'completed' 
                    ? 'bg-gradient-to-r from-green-400 to-green-600'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500'
                }`}
                style={{ width: `${challenge.progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Category */}
        <div className="flex items-center gap-2 mb-3">
          <i className="fas fa-tag text-gray-400 text-xs"></i>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {challenge.category}
          </span>
        </div>

        {/* Dates */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
          {challenge.targetDate && (
            <div className={`flex items-center gap-1 ${isOverdue ? 'text-red-600 dark:text-red-400' : ''}`}>
              <i className="fas fa-calendar-alt text-xs"></i>
              <span>Target: {new Date(challenge.targetDate).toLocaleDateString()}</span>
              {isOverdue && (
                <span className="text-xs bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 px-1 py-0.5 rounded ml-2">
                  Overdue
                </span>
              )}
            </div>
          )}
          {challenge.completedDate && (
            <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
              <i className="fas fa-check text-xs"></i>
              <span>Completed: {new Date(challenge.completedDate).toLocaleDateString()}</span>
            </div>
          )}
        </div>

        {/* Notes */}
        {challenge.notes && (
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 p-2 bg-gray-50 dark:bg-gray-700/50 rounded">
            {challenge.notes}
          </p>
        )}

        {/* Achievement Badge */}
        {challenge.status === 'completed' && (
          <div className="flex items-center justify-center">
            <div className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 px-3 py-2 rounded-lg flex items-center gap-2">
              <i className="fas fa-trophy"></i>
              <span className="text-sm font-medium">Challenge Completed!</span>
            </div>
          </div>
        )}

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
    )
  }

  const loadChallenges = async () => {
    const res = await fetch('/api/challenges', { cache: 'no-store' })
    const data: Challenge[] = await res.json()
    setChallenges(data)
  }

  useEffect(() => {
    const onRefresh = () => loadChallenges()
    document.addEventListener('challenges:refresh', onRefresh as EventListener)
    loadChallenges()
    return () => document.removeEventListener('challenges:refresh', onRefresh as EventListener)
  }, [])

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Personal Challenges</h2>
            <p className="text-gray-600 dark:text-gray-400">Set and conquer your personal goals</p>
          </div>
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center gap-2">
            <i className="fas fa-plus"></i>
            New Challenge
          </button>
        </div>

        {/* Challenge Stats */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
          <h3 className="text-xl font-semibold mb-4">Challenge Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">
                {challenges.filter(c => c.status === 'in-progress').length}
              </div>
              <div className="text-purple-100 text-sm">Active</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {challenges.filter(c => c.status === 'completed').length}
              </div>
              <div className="text-purple-100 text-sm">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {challenges.length === 0 ? 0 : Math.round(challenges.reduce((sum, c) => sum + c.progress, 0) / challenges.length)}%
              </div>
              <div className="text-purple-100 text-sm">Avg Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {challenges.filter(c => c.type === 'bucket-list').length}
              </div>
              <div className="text-purple-100 text-sm">Bucket List</div>
            </div>
          </div>
        </div>

        {/* Challenge Sections */}
        <div className="space-y-8">
          {/* Bucket List */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <i className="fas fa-star text-yellow-500"></i>
                Bucket List
              </h3>
              <span className="bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 text-sm px-2 py-1 rounded-full">
                {groupedChallenges['bucket-list'].length}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedChallenges['bucket-list'].map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
            </div>
          </div>

          {/* Monthly Challenges */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <i className="fas fa-calendar-alt text-blue-500"></i>
                Monthly Challenges
              </h3>
              <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm px-2 py-1 rounded-full">
                {groupedChallenges.monthly.length}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedChallenges.monthly.map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
            </div>
          </div>

          {/* Yearly Goals */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <i className="fas fa-calendar text-green-500"></i>
                Yearly Goals
              </h3>
              <span className="bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm px-2 py-1 rounded-full">
                {groupedChallenges.yearly.length}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedChallenges.yearly.map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
            </div>
          </div>

          {/* Habit Building */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <i className="fas fa-sync-alt text-purple-500"></i>
                Habit Building
              </h3>
              <span className="bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-sm px-2 py-1 rounded-full">
                {groupedChallenges.habit.length}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedChallenges.habit.map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

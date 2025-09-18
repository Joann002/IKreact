'use client'

import { useEffect, useState } from 'react'
import MainLayout from '@/components/Layout/MainLayout'
import GoalCard from '@/components/Goals/GoalCard'
import AddGoalModal from '@/components/Goals/AddGoalModal'

interface Goal {
  id: string
  title: string
  description: string
  targetValue: number
  currentValue: number
  unit: string
  targetDate: string
  status: 'completed' | 'in-progress' | 'pending'
  category: string
}

export default function GoalsPage() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [goals, setGoals] = useState<Goal[]>([])

  const handleAddGoal = async (goalData: Omit<Goal, 'id'>) => {
    await fetch('/api/goals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(goalData),
    })
    await loadGoals()
    setShowAddModal(false)
  }

  const handleProgressUpdate = async (goalId: string, newValue: number) => {
    await fetch(`/api/goals/${goalId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentValue: newValue, status: 'in-progress' }),
    })
    await loadGoals()
  }

  const loadGoals = async () => {
    const res = await fetch('/api/goals', { cache: 'no-store' })
    const data: Goal[] = await res.json()
    setGoals(data)
  }

  useEffect(() => {
    const onRefresh = () => loadGoals()
    document.addEventListener('goals:refresh', onRefresh as EventListener)
    loadGoals()
    return () => document.removeEventListener('goals:refresh', onRefresh as EventListener)
  }, [])

  const categories = [...new Set(goals.map(goal => goal.category))]

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Goals</h2>
            <p className="text-gray-600 dark:text-gray-400">Set and track your objectives</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 flex items-center gap-2"
          >
            <i className="fas fa-plus"></i>
            New Goal
          </button>
        </div>

        {/* Goals by Category */}
        {categories.map(category => (
          <div key={category} className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <i className="fas fa-bullseye text-indigo-600"></i>
              {category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {goals
                .filter(goal => goal.category === category)
                .map((goal) => (
                  <GoalCard 
                    key={goal.id} 
                    goal={goal} 
                    onProgressUpdate={handleProgressUpdate}
                  />
                ))}
            </div>
          </div>
        ))}

        {/* Add Goal Modal */}
        {showAddModal && (
          <AddGoalModal
            onClose={() => setShowAddModal(false)}
            onAdd={handleAddGoal}
          />
        )}
      </div>
    </MainLayout>
  )
}

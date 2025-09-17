'use client'

import { useState } from 'react'
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
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Complete 50 Projects',
      description: 'Finish 50 client projects by the end of the year',
      targetValue: 50,
      currentValue: 32,
      unit: 'projects',
      targetDate: '2024-12-31',
      status: 'in-progress',
      category: 'Professional'
    },
    {
      id: '2',
      title: 'Learn 3 New Technologies',
      description: 'Master React, Node.js, and TypeScript',
      targetValue: 3,
      currentValue: 2,
      unit: 'technologies',
      targetDate: '2024-06-30',
      status: 'in-progress',
      category: 'Learning'
    },
    {
      id: '3',
      title: 'Increase Team Productivity',
      description: 'Improve team productivity by 25%',
      targetValue: 25,
      currentValue: 25,
      unit: '%',
      targetDate: '2024-03-31',
      status: 'completed',
      category: 'Management'
    },
    {
      id: '4',
      title: 'Client Satisfaction Score',
      description: 'Achieve 95% client satisfaction rating',
      targetValue: 95,
      currentValue: 87,
      unit: '%',
      targetDate: '2024-08-31',
      status: 'in-progress',
      category: 'Quality'
    }
  ])

  const handleAddGoal = (goalData: Omit<Goal, 'id'>) => {
    const newGoal: Goal = {
      ...goalData,
      id: Date.now().toString(),
    }
    setGoals([...goals, newGoal])
    setShowAddModal(false)
  }

  const handleProgressUpdate = (goalId: string, newValue: number) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const updatedGoal = { ...goal, currentValue: newValue }
        // Auto-complete if target is reached
        if (newValue >= goal.targetValue && goal.status !== 'completed') {
          updatedGoal.status = 'completed'
        }
        return updatedGoal
      }
      return goal
    }))
  }

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

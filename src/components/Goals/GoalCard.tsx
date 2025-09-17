'use client'

import { useState } from 'react'
import { cn, getStatusColor, formatShortDate } from '@/lib/utils'

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

interface GoalCardProps {
  goal: Goal
  onProgressUpdate: (goalId: string, newValue: number) => void
}

export default function GoalCard({ goal, onProgressUpdate }: GoalCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(goal.currentValue.toString())

  const progress = Math.min((goal.currentValue / goal.targetValue) * 100, 100)
  const targetDate = new Date(goal.targetDate)
  const isOverdue = targetDate < new Date() && goal.status !== 'completed'

  const handleSaveProgress = () => {
    const newValue = parseFloat(editValue)
    if (!isNaN(newValue) && newValue >= 0) {
      onProgressUpdate(goal.id, newValue)
    }
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditValue(goal.currentValue.toString())
    setIsEditing(false)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
          {goal.title}
        </h4>
        <span className={cn(
          'text-xs font-medium px-2 py-1 rounded-full',
          getStatusColor(goal.status)
        )}>
          {goal.status === 'in-progress' ? 'In Progress' : 
           goal.status === 'completed' ? 'Completed' : 'Pending'}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        {goal.description}
      </p>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Progress
          </span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2">
          <div 
            className={cn(
              'h-3 rounded-full transition-all duration-300',
              goal.status === 'completed' 
                ? 'bg-gradient-to-r from-green-400 to-green-600'
                : 'bg-gradient-to-r from-indigo-500 to-purple-500'
            )}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        {/* Current/Target Values */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            {isEditing ? (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-16 px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  min="0"
                  max={goal.targetValue}
                />
                <button
                  onClick={handleSaveProgress}
                  className="text-green-600 hover:text-green-700"
                >
                  <i className="fas fa-check text-xs"></i>
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="text-red-600 hover:text-red-700"
                >
                  <i className="fas fa-times text-xs"></i>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-gray-600 dark:text-gray-400">
                  {goal.currentValue} / {goal.targetValue} {goal.unit}
                </span>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                >
                  <i className="fas fa-edit text-xs"></i>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Target Date */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <i className="fas fa-calendar-alt text-gray-400"></i>
          <span className={cn(
            'text-sm',
            isOverdue ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'
          )}>
            Target: {formatShortDate(targetDate)}
          </span>
        </div>
        {isOverdue && (
          <span className="text-xs bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 px-2 py-1 rounded-full">
            Overdue
          </span>
        )}
      </div>

      {/* Achievement Badge */}
      {goal.status === 'completed' && (
        <div className="mt-4 flex items-center justify-center">
          <div className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 px-3 py-2 rounded-lg flex items-center gap-2">
            <i className="fas fa-trophy"></i>
            <span className="text-sm font-medium">Goal Achieved!</span>
          </div>
        </div>
      )}
    </div>
  )
}

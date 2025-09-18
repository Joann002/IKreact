'use client'

import { cn, getStatusColor, formatShortDate } from '@/lib/utils'

interface Task {
  id: string
  title: string
  description: string
  status: 'completed' | 'in-progress' | 'pending'
  priority: 'low' | 'medium' | 'high'
  dueDate: string
  project?: string
}

interface TaskCardProps {
  task: Task
  onStatusChange: (taskId: string, newStatus: Task['status']) => void
}

export default function TaskCard({ task, onStatusChange }: TaskCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const dueDate = new Date(task.dueDate)
  const isOverdue = dueDate < new Date() && task.status !== 'completed'

  const handleStatusClick = () => {
    const statusOrder: Task['status'][] = ['pending', 'in-progress', 'completed']
    const currentIndex = statusOrder.indexOf(task.status)
    const nextIndex = (currentIndex + 1) % statusOrder.length
    onStatusChange(task.id, statusOrder[nextIndex])
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-medium text-gray-900 dark:text-white">
          {task.title}
        </h4>
        <div className="flex gap-2 items-center">
          <span className={cn(
            'text-xs font-medium px-2 py-1 rounded-full',
            getPriorityColor(task.priority)
          )}>
            {task.priority}
          </span>
          <form action={`/api/tasks/${task.id}`} method="post" onSubmit={async (e) => {
            e.preventDefault()
            await fetch(`/api/tasks/${task.id}`, { method: 'DELETE' })
            // let parent list decide refresh via a custom event
            document.dispatchEvent(new CustomEvent('tasks:refresh'))
          }}>
            <button type="submit" className="text-gray-400 hover:text-red-600" title="Delete">
              <i className="fas fa-trash"></i>
            </button>
          </form>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
        {task.description}
      </p>

      {/* Project */}
      {task.project && (
        <div className="flex items-center gap-2 mb-3">
          <i className="fas fa-folder text-xs text-gray-400"></i>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {task.project}
          </span>
        </div>
      )}

      {/* Due Date */}
      <div className="flex items-center gap-2 mb-3">
        <i className="fas fa-calendar-alt text-xs text-gray-400"></i>
        <span className={cn(
          'text-xs',
          isOverdue ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'
        )}>
          {formatShortDate(dueDate)}
        </span>
        {isOverdue && (
          <span className="text-xs bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 px-1 py-0.5 rounded">
            Overdue
          </span>
        )}
      </div>

      {/* Status Button */}
      <button
        onClick={handleStatusClick}
        className={cn(
          'w-full text-xs font-medium px-3 py-2 rounded-lg transition-colors',
          getStatusColor(task.status),
          'hover:opacity-80'
        )}
      >
        {task.status === 'in-progress' ? 'In Progress' : 
         task.status === 'completed' ? 'Completed' : 'Pending'}
      </button>
    </div>
  )
}

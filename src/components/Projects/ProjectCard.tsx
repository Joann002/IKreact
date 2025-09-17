'use client'

import { cn, getStatusColor, formatShortDate } from '@/lib/utils'

interface Project {
  id: string
  title: string
  description: string
  progress: number
  status: 'completed' | 'in-progress' | 'pending'
  dueDate: string
  priority: 'low' | 'medium' | 'high'
  team: string[]
}

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
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

  const dueDate = new Date(project.dueDate)
  const isOverdue = dueDate < new Date() && project.status !== 'completed'

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
          {project.title}
        </h3>
        <div className="flex gap-2">
          <span className={cn(
            'text-xs font-medium px-2 py-1 rounded-full',
            getPriorityColor(project.priority)
          )}>
            {project.priority}
          </span>
          <span className={cn(
            'text-xs font-medium px-2 py-1 rounded-full',
            getStatusColor(project.status)
          )}>
            {project.status === 'in-progress' ? 'In Progress' : 
             project.status === 'completed' ? 'Completed' : 'Pending'}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
        {project.description}
      </p>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Progress
          </span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {project.progress}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
      </div>

      {/* Due Date */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <i className="fas fa-calendar-alt text-gray-400"></i>
          <span className={cn(
            'text-sm',
            isOverdue ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'
          )}>
            Due {formatShortDate(dueDate)}
          </span>
        </div>
        {isOverdue && (
          <span className="text-xs bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 px-2 py-1 rounded-full">
            Overdue
          </span>
        )}
      </div>

      {/* Team */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {project.team.slice(0, 3).map((member, index) => (
            <img
              key={index}
              src={member}
              alt="Team member"
              className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-700 -ml-1 first:ml-0"
            />
          ))}
          {project.team.length > 3 && (
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
              +{project.team.length - 3} more
            </span>
          )}
        </div>
        <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
          <i className="fas fa-ellipsis-h"></i>
        </button>
      </div>
    </div>
  )
}

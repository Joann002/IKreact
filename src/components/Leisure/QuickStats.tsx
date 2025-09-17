'use client'

import { cn } from '@/lib/utils'

interface StatCardProps {
  title: string
  value: string
  subtitle: string
  icon: string
  color: string
  bgColor: string
}

const StatCard = ({ title, value, subtitle, icon, color, bgColor }: StatCardProps) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
          {title}
        </p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          {value}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {subtitle}
        </p>
      </div>
      <div className={cn(
        'w-12 h-12 rounded-lg flex items-center justify-center',
        bgColor
      )}>
        <i className={cn(icon, 'text-xl', color)}></i>
      </div>
    </div>
  </div>
)

export default function QuickStats() {
  const stats = [
    {
      title: 'Games This Week',
      value: '12h',
      subtitle: '+2h from last week',
      icon: 'fas fa-gamepad',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20'
    },
    {
      title: 'Movies Watched',
      value: '8',
      subtitle: 'This month',
      icon: 'fas fa-film',
      color: 'text-red-600',
      bgColor: 'bg-red-100 dark:bg-red-900/20'
    },
    {
      title: 'Books Reading',
      value: '3',
      subtitle: 'Currently active',
      icon: 'fas fa-book-open',
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/20'
    },
    {
      title: 'Challenges',
      value: '5',
      subtitle: 'In progress',
      icon: 'fas fa-flag-checkered',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  )
}

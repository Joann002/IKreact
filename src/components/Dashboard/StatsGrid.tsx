'use client'

import { cn } from '@/lib/utils'
import { FaUsers, FaProjectDiagram, FaTasks, FaBullseye, FaArrowRight } from 'react-icons/fa'

interface StatCardProps {
  title: string
  value: string
  change: string
  changeType: 'positive' | 'negative'
  icon: React.ComponentType<any>
  gradient: string
}

const StatCard = ({ title, value, change, changeType, icon: IconComponent, gradient }: StatCardProps) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
    <div className="flex items-center justify-between mb-4">
      <div className={cn(
        'w-12 h-12 rounded-lg flex items-center justify-center text-white',
        gradient
      )}>
        <IconComponent className="text-xl" />
      </div>
      <span className={cn(
        'text-sm font-medium px-2 py-1 rounded-full',
        changeType === 'positive' 
          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      )}>
        {change}
      </span>
    </div>
    
    <div className="space-y-1">
      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
        {title}
      </h3>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">
        {value}
      </p>
    </div>
    
    <button className="w-full mt-4 flex items-center justify-between text-indigo-600 dark:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors">
      <span className="text-sm font-medium">View Detail</span>
      <FaArrowRight className="text-xs" />
    </button>
  </div>
)

export default function StatsGrid() {
  const stats = [
    {
      title: 'Active Users',
      value: '1,234',
      change: '+12%',
      changeType: 'positive' as const,
      icon: FaUsers,
      gradient: 'bg-gradient-to-br from-orange-400 to-orange-600'
    },
    {
      title: 'Active Projects',
      value: '45',
      change: '+5%',
      changeType: 'positive' as const,
      icon: FaProjectDiagram,
      gradient: 'bg-gradient-to-br from-green-400 to-green-600'
    },
    {
      title: 'Completed Tasks',
      value: '89',
      change: '+23%',
      changeType: 'positive' as const,
      icon: FaTasks,
      gradient: 'bg-gradient-to-br from-blue-400 to-blue-600'
    },
    {
      title: 'Goals Achieved',
      value: '12',
      change: '+8%',
      changeType: 'positive' as const,
      icon: FaBullseye,
      gradient: 'bg-gradient-to-br from-purple-400 to-purple-600'
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

'use client'

import { formatShortDate } from '@/lib/utils'

interface Activity {
  id: string
  type: 'game' | 'movie' | 'book' | 'music' | 'challenge'
  title: string
  action: string
  date: string
  icon: string
  color: string
}

const ActivityItem = ({ activity }: { activity: Activity }) => (
  <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.color}`}>
      <i className={`${activity.icon} text-white`}></i>
    </div>
    
    <div className="flex-1">
      <p className="font-medium text-gray-900 dark:text-white">
        {activity.action} <span className="text-indigo-600 dark:text-indigo-400">{activity.title}</span>
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {formatShortDate(new Date(activity.date))}
      </p>
    </div>
  </div>
)

export default function RecentActivity() {
  const activities: Activity[] = [
    {
      id: '1',
      type: 'game',
      title: 'The Legend of Zelda: Tears of the Kingdom',
      action: 'Started playing',
      date: '2024-01-20',
      icon: 'fas fa-gamepad',
      color: 'bg-blue-500'
    },
    {
      id: '2',
      type: 'movie',
      title: 'Oppenheimer',
      action: 'Watched',
      date: '2024-01-19',
      icon: 'fas fa-film',
      color: 'bg-red-500'
    },
    {
      id: '3',
      type: 'book',
      title: 'Atomic Habits',
      action: 'Finished reading',
      date: '2024-01-18',
      icon: 'fas fa-book-open',
      color: 'bg-green-500'
    },
    {
      id: '4',
      type: 'challenge',
      title: 'Learn TypeScript',
      action: 'Completed',
      date: '2024-01-17',
      icon: 'fas fa-flag-checkered',
      color: 'bg-purple-500'
    },
    {
      id: '5',
      type: 'music',
      title: 'Chill Vibes Playlist',
      action: 'Created',
      date: '2024-01-16',
      icon: 'fas fa-music',
      color: 'bg-yellow-500'
    }
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Recent Activity
        </h3>
        <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 text-sm font-medium">
          View all
        </button>
      </div>
      
      <div className="space-y-3">
        {activities.map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  )
}

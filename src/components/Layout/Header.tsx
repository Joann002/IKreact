'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useAppContext } from '@/contexts/AppContext'
import { clsx } from 'clsx'
import { FaBriefcase, FaGamepad, FaSearch, FaBell } from 'react-icons/fa'

const pageTitle: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/projects': 'Projects',
  '/tasks': 'Tasks',
  '/goals': 'Goals',
  '/calendar': 'Calendar',
  '/stats': 'Statistics',
  '/leisure/hub': 'Leisure Hub',
  '/leisure/games': 'Video Games',
  '/leisure/movies': 'Movies & Series',
  '/leisure/music': 'Music',
  '/leisure/books': 'Books / Manga',
  '/leisure/challenges': 'Personal Challenges',
  '/settings': 'Settings',
}

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const { currentMode, setCurrentMode } = useAppContext()

  const title = pageTitle[pathname] || 'Dashboard'

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {title}
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Mode Toggle */}
          <button
            onClick={() => {
              if (currentMode === 'work') {
                setCurrentMode('leisure')
                router.push('/leisure/hub')
              } else {
                setCurrentMode('work')
                router.push('/dashboard')
              }
            }}
            className={clsx(
              'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors',
              currentMode === 'work'
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                : 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
            )}
          >
            {currentMode === 'work' ? (
              <FaBriefcase className="w-4 h-4" />
            ) : (
              <FaGamepad className="w-4 h-4" />
            )}
            <span>{currentMode === 'work' ? 'Work Mode' : 'Leisure Mode'}</span>
          </button>

          {/* Search Bar */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-64 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <FaBell className="text-gray-600 dark:text-gray-400" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face"
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-medium text-gray-900 dark:text-white hidden sm:block">
              John Doe
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

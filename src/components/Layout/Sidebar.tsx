'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useAppContext } from '@/contexts/AppContext'
import { clsx } from 'clsx'
import { 
  FaTachometerAlt, FaProjectDiagram, FaTasks, FaBullseye, FaCalendarAlt, FaChartBar,
  FaStar, FaGamepad, FaFilm, FaMusic, FaBookOpen, FaFlagCheckered, FaCog,
  FaMagic, FaBars, FaSun, FaMoon
} from 'react-icons/fa'

interface NavItem {
  id: string
  label: string
  icon: React.ComponentType<any>
  path: string
  mode: 'work' | 'leisure' | 'both'
}

const navigationItems: NavItem[] = [
  // Work mode items
  { id: 'dashboard', label: 'Dashboard', icon: FaTachometerAlt, path: '/dashboard', mode: 'work' },
  { id: 'projects', label: 'Projects', icon: FaProjectDiagram, path: '/projects', mode: 'work' },
  { id: 'tasks', label: 'Tasks', icon: FaTasks, path: '/tasks', mode: 'work' },
  { id: 'goals', label: 'Goals', icon: FaBullseye, path: '/goals', mode: 'work' },
  { id: 'calendar', label: 'Calendar', icon: FaCalendarAlt, path: '/calendar', mode: 'work' },
  { id: 'stats', label: 'Stats', icon: FaChartBar, path: '/stats', mode: 'work' },
  
  // Leisure mode items
  { id: 'leisure-hub', label: 'Leisure Hub', icon: FaStar, path: '/leisure/hub', mode: 'leisure' },
  { id: 'games', label: 'Video Games', icon: FaGamepad, path: '/leisure/games', mode: 'leisure' },
  { id: 'movies', label: 'Movies & Series', icon: FaFilm, path: '/leisure/movies', mode: 'leisure' },
  { id: 'music', label: 'Music', icon: FaMusic, path: '/leisure/music', mode: 'leisure' },
  { id: 'books', label: 'Books / Manga', icon: FaBookOpen, path: '/leisure/books', mode: 'leisure' },
  { id: 'challenges', label: 'Personal Challenges', icon: FaFlagCheckered, path: '/leisure/challenges', mode: 'leisure' },
  
  // Shared items
  { id: 'settings', label: 'Settings', icon: FaCog, path: '/settings', mode: 'both' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { currentMode, sidebarCollapsed, toggleSidebar, toggleTheme, theme } = useAppContext()

  const filteredItems = navigationItems.filter(
    item => item.mode === currentMode || item.mode === 'both'
  )

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  return (
    <aside className={clsx(
      'fixed left-0 top-0 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 z-50 flex flex-col',
      sidebarCollapsed ? 'w-20' : 'w-72'
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        {!sidebarCollapsed && (
          <div className="flex items-center gap-3">
            <FaMagic className="text-2xl text-indigo-600" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">Inspira.K</span>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <FaBars className="text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {!sidebarCollapsed && (
            <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Navigation
            </h3>
          )}
          {filteredItems.map((item) => {
            const isActive = pathname === item.path
            const IconComponent = item.icon
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className={clsx(
                  'w-full flex items-center gap-3 px-3 rounded-lg font-medium transition-colors',
                  sidebarCollapsed ? 'py-2.5 text-sm' : 'py-3 text-base',
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 border-r-2 border-indigo-600'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
                  sidebarCollapsed && 'justify-center'
                )}
              >
                <IconComponent className="w-6 h-6" />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </button>
            )
          })}
        </div>
      </nav>

      {/* Footer - Theme Toggle */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        {sidebarCollapsed ? (
          <div className="flex justify-center">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title={theme === 'light' ? 'Passer au mode sombre' : 'Passer au mode clair'}
            >
              {theme === 'light' ? (
                <FaMoon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <FaSun className="w-5 h-5 text-yellow-500" />
              )}
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <FaSun className={clsx(
              'text-sm',
              theme === 'light' ? 'text-indigo-600' : 'text-gray-400'
            )} />
            <button
              onClick={toggleTheme}
              className={clsx(
                'relative w-10 h-5 rounded-full transition-colors',
                theme === 'dark' ? 'bg-indigo-600' : 'bg-gray-300'
              )}
            >
              <div className={clsx(
                'absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform',
                theme === 'dark' ? 'translate-x-5' : 'translate-x-0.5'
              )}></div>
            </button>
            <FaMoon className={clsx(
              'text-sm',
              theme === 'dark' ? 'text-indigo-600' : 'text-gray-400'
            )} />
          </div>
        )}
      </div>
    </aside>
  )
}

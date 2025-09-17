'use client'

import Link from 'next/link'
import { FaGamepad, FaFilm, FaMusic, FaBookOpen, FaFlagCheckered, FaArrowRight } from 'react-icons/fa'

interface CategoryCardProps {
  title: string
  description: string
  icon: React.ComponentType<any>
  count: number
  href: string
  color: string
}

const CategoryCard = ({ title, description, icon: IconComponent, count, href, color }: CategoryCardProps) => (
  <Link href={href}>
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
          <IconComponent className="text-xl text-white" />
        </div>
        <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-sm px-2 py-1 rounded-full">
          {count} items
        </span>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        {description}
      </p>
      
      <div className="flex items-center text-indigo-600 dark:text-indigo-400 text-sm font-medium">
        <span>View all</span>
        <FaArrowRight className="ml-2" />
      </div>
    </div>
  </Link>
)

export default function LeisureOverview() {
  const categories = [
    {
      title: 'Video Games',
      description: 'Track your gaming progress and backlog',
      icon: FaGamepad,
      count: 15,
      href: '/leisure/games',
      color: 'bg-gradient-to-br from-blue-500 to-blue-600'
    },
    {
      title: 'Movies & Series',
      description: 'Your watchlist and reviews',
      icon: FaFilm,
      count: 23,
      href: '/leisure/movies',
      color: 'bg-gradient-to-br from-red-500 to-red-600'
    },
    {
      title: 'Music',
      description: 'Playlists and listening stats',
      icon: FaMusic,
      count: 8,
      href: '/leisure/music',
      color: 'bg-gradient-to-br from-green-500 to-green-600'
    },
    {
      title: 'Books & Manga',
      description: 'Reading progress and library',
      icon: FaBookOpen,
      count: 12,
      href: '/leisure/books',
      color: 'bg-gradient-to-br from-yellow-500 to-yellow-600'
    },
    {
      title: 'Personal Challenges',
      description: 'Goals and bucket list items',
      icon: FaFlagCheckered,
      count: 7,
      href: '/leisure/challenges',
      color: 'bg-gradient-to-br from-purple-500 to-purple-600'
    }
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
        Leisure Categories
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <CategoryCard key={index} {...category} />
        ))}
      </div>
    </div>
  )
}

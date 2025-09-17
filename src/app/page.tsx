'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppContext } from '@/contexts/AppContext'

export default function Home() {
  const router = useRouter()
  const { currentMode } = useAppContext()

  useEffect(() => {
    // Redirect to appropriate dashboard based on mode
    const targetRoute = currentMode === 'work' ? '/dashboard' : '/leisure/hub'
    router.push(targetRoute)
  }, [currentMode, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading Inspira.K...</p>
      </div>
    </div>
  )
}

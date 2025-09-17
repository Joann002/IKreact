'use client'

import MainLayout from '@/components/Layout/MainLayout'
import LeisureOverview from '@/components/Leisure/LeisureOverview'
import QuickStats from '@/components/Leisure/QuickStats'
import RecentActivity from '@/components/Leisure/RecentActivity'

export default function LeisureHubPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Welcome to your Leisure Hub! 🎉</h2>
          <p className="text-purple-100">
            Track your entertainment, hobbies, and personal challenges all in one place.
          </p>
        </div>

        <QuickStats />
        <LeisureOverview />
        <RecentActivity />
      </div>
    </MainLayout>
  )
}

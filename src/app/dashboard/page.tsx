'use client'

import MainLayout from '@/components/Layout/MainLayout'
import StatsGrid from '@/components/Dashboard/StatsGrid'
import ChartsSection from '@/components/Dashboard/ChartsSection'
import RecentProjects from '@/components/Dashboard/RecentProjects'

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <StatsGrid />
        <ChartsSection />
        <RecentProjects />
      </div>
    </MainLayout>
  )
}

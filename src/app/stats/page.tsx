'use client'

import { useState, useEffect } from 'react'
import MainLayout from '@/components/Layout/MainLayout'
import dynamic from 'next/dynamic'
import { FaTrophy, FaBullseye, FaClock, FaStar } from 'react-icons/fa'

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface ProgressCircleProps {
  percentage: number
  title: string
  color: string
}

const ProgressCircle = ({ percentage, title, color }: ProgressCircleProps) => (
  <div className="text-center">
    <div className="relative w-32 h-32 mx-auto mb-4">
      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r="50"
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          className="text-gray-200 dark:text-gray-700"
        />
        <circle
          cx="60"
          cy="60"
          r="50"
          stroke={color}
          strokeWidth="8"
          fill="none"
          strokeDasharray={`${2 * Math.PI * 50}`}
          strokeDashoffset={`${2 * Math.PI * 50 * (1 - percentage / 100)}`}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-gray-900 dark:text-white">
          {percentage}%
        </span>
      </div>
    </div>
    <h4 className="font-semibold text-gray-900 dark:text-white">{title}</h4>
  </div>
)

export default function StatsPage() {
  const [mounted, setMounted] = useState(false)
  const [chartReady, setChartReady] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Add a small delay to ensure DOM is fully ready
    const timer = setTimeout(() => {
      setChartReady(true)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  const progressData = [
    { percentage: 75, title: 'Project Completion', color: '#10b981' },
    { percentage: 60, title: 'Task Completion', color: '#3b82f6' },
    { percentage: 85, title: 'Goal Achievement', color: '#8b5cf6' }
  ]

  const productivityChartOptions = {
    chart: {
      type: 'line' as const,
      height: 350,
      toolbar: { show: false },
      background: 'transparent',
    },
    colors: ['#6366f1', '#10b981', '#f59e0b'],
    dataLabels: { enabled: false },
    stroke: {
      curve: 'smooth' as const,
      width: 3,
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      labels: {
        style: {
          colors: '#64748b',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#64748b',
        },
      },
    },
    grid: {
      borderColor: '#e2e8f0',
      strokeDashArray: 4,
    },
    legend: {
      position: 'top' as const,
      labels: {
        colors: '#64748b',
      },
    },
  }

  const productivityChartSeries = [
    {
      name: 'Projects',
      data: [12, 15, 18, 22, 25, 28, 32, 35, 38, 42, 45, 48].map(val => isNaN(val) ? 0 : val),
    },
    {
      name: 'Tasks',
      data: [45, 52, 48, 61, 55, 67, 73, 78, 82, 89, 95, 102].map(val => isNaN(val) ? 0 : val),
    },
    {
      name: 'Goals',
      data: [8, 10, 12, 15, 18, 20, 22, 25, 28, 30, 32, 35].map(val => isNaN(val) ? 0 : val),
    },
  ]

  const categoryChartOptions = {
    chart: {
      type: 'donut' as const,
      height: 350,
    },
    colors: ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'],
    labels: ['Development', 'Design', 'Marketing', 'Management', 'Learning'],
    legend: {
      position: 'bottom' as const,
      labels: {
        colors: '#64748b',
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
        },
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#ffffff'],
      },
    },
  }

  const categoryChartSeries = [35, 25, 20, 12, 8].map(val => isNaN(val) ? 0 : val)

  const timeSpentChartOptions = {
    chart: {
      type: 'bar' as const,
      height: 350,
      toolbar: { show: false },
    },
    colors: ['#6366f1'],
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      labels: {
        style: {
          colors: '#64748b',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#64748b',
        },
      },
    },
    grid: {
      borderColor: '#e2e8f0',
      strokeDashArray: 4,
    },
  }

  const timeSpentChartSeries = [
    {
      name: 'Hours',
      data: [8.5, 7.2, 9.1, 8.8, 7.5, 4.2, 3.8].map(val => isNaN(val) ? 0 : val),
    },
  ]

  if (!mounted || !chartReady) {
    return (
      <MainLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Statistics</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="animate-pulse">
                  <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-full w-32 mx-auto mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mx-auto"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Statistics</h2>
            <p className="text-gray-600 dark:text-gray-400">Track your productivity and progress</p>
          </div>
          <div className="flex gap-2">
            <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm">
              <option>This Month</option>
              <option>Last 3 Months</option>
              <option>This Year</option>
            </select>
          </div>
        </div>

        {/* Progress Circles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {progressData.map((item, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <ProgressCircle {...item} />
            </div>
          ))}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Projects', value: '48', change: '+12%', positive: true },
            { label: 'Completed Tasks', value: '342', change: '+23%', positive: true },
            { label: 'Hours Worked', value: '156h', change: '+8%', positive: true },
            { label: 'Efficiency', value: '87%', change: '-2%', positive: false }
          ].map((metric, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">{metric.label}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
              <p className={`text-sm ${metric.positive ? 'text-green-600' : 'text-red-600'}`}>
                {metric.change}
              </p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Productivity Trend */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Productivity Trend
            </h3>
            <div style={{ minHeight: '350px', width: '100%' }}>
              <Chart
                options={productivityChartOptions}
                series={productivityChartSeries}
                type="line"
                height={350}
                width="100%"
              />
            </div>
          </div>

          {/* Time by Category */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Time by Category
            </h3>
            <div style={{ minHeight: '350px', width: '100%' }}>
              <Chart
                options={categoryChartOptions}
                series={categoryChartSeries}
                type="donut"
                height={350}
                width="100%"
              />
            </div>
          </div>
        </div>

        {/* Weekly Time Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Weekly Time Distribution
          </h3>
          <div style={{ minHeight: '350px', width: '100%' }}>
            <Chart
              options={timeSpentChartOptions}
              series={timeSpentChartSeries}
              type="bar"
              height={350}
              width="100%"
            />
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Achievements
          </h3>
          
          <div className="space-y-3">
            {[
              { icon: FaTrophy, title: 'Completed 50 Tasks', description: 'Milestone reached this month', color: 'text-yellow-500' },
              { icon: FaBullseye, title: 'Goal Achievement Rate: 85%', description: 'Above average performance', color: 'text-green-500' },
              { icon: FaClock, title: 'Productivity Streak: 7 days', description: 'Keep up the great work!', color: 'text-blue-500' },
              { icon: FaStar, title: 'Perfect Week', description: 'All planned tasks completed', color: 'text-purple-500' }
            ].map((achievement, index) => {
              const IconComponent = achievement.icon
              return (
                <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className={`w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-600 flex items-center justify-center ${achievement.color}`}>
                    <IconComponent />
                  </div>
                
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900 dark:text-white">
                      {achievement.title}
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {achievement.description}
                    </p>
                  </div>
                  
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Today
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

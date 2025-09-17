'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function ChartsSection() {
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

  const progressChartOptions = {
    chart: {
      type: 'area' as const,
      height: 300,
      toolbar: { show: false },
      background: 'transparent',
    },
    colors: ['#6366f1', '#8b5cf6'],
    dataLabels: { enabled: false },
    stroke: {
      curve: 'smooth' as const,
      width: 2,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
      },
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
    legend: {
      show: false,
    },
  }

  const progressChartSeries = [
    {
      name: 'Progress',
      data: [30, 40, 35, 50, 49, 60, 70].map(val => isNaN(val) ? 0 : val),
    },
  ]

  const taskChartOptions = {
    chart: {
      type: 'donut' as const,
      height: 300,
    },
    colors: ['#10b981', '#f59e0b', '#ef4444'],
    labels: ['Completed', 'In Progress', 'Pending'],
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

  const taskChartSeries = [65, 25, 10].map(val => isNaN(val) ? 0 : val)

  if (!mounted || !chartReady) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Progress Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Progress Overview
          </h3>
          <select className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
          </select>
        </div>
        <div style={{ minHeight: '300px', width: '100%' }}>
          <Chart
            options={progressChartOptions}
            series={progressChartSeries}
            type="area"
            height={300}
            width="100%"
          />
        </div>
      </div>

      {/* Task Completion Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Task Completion
          </h3>
          <select className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
            <option>This week</option>
            <option>This month</option>
            <option>This quarter</option>
          </select>
        </div>
        <div style={{ minHeight: '300px', width: '100%' }}>
          <Chart
            options={taskChartOptions}
            series={taskChartSeries}
            type="donut"
            height={300}
            width="100%"
          />
        </div>
      </div>
    </div>
  )
}

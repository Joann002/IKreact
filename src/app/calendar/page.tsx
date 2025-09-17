'use client'

import { useState, useEffect } from 'react'
import MainLayout from '@/components/Layout/MainLayout'
import dynamic from 'next/dynamic'
import { FaPlus, FaCalendarAlt, FaTasks, FaProjectDiagram, FaBullseye, FaUsers, FaUser, FaTimes } from 'react-icons/fa'

// Dynamically import the entire FullCalendar component with plugins
const DynamicFullCalendar = dynamic(() => import('@/components/Calendar/FullCalendarWrapper'), { 
  ssr: false,
  loading: () => (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
      <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
  )
})

interface CalendarEvent {
  id: string
  title: string
  start: string
  end?: string
  allDay?: boolean
  backgroundColor?: string
  borderColor?: string
  type: 'task' | 'project' | 'goal' | 'meeting' | 'personal'
}

export default function CalendarPage() {
  const [mounted, setMounted] = useState(false)
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Team Meeting',
      start: '2025-09-18T10:00:00',
      end: '2025-09-18T11:00:00',
      type: 'meeting',
      backgroundColor: '#3b82f6',
      borderColor: '#2563eb'
    },
    {
      id: '2',
      title: 'Project Deadline: Website Redesign',
      start: '2025-09-20',
      allDay: true,
      type: 'project',
      backgroundColor: '#10b981',
      borderColor: '#059669'
    },
    {
      id: '3',
      title: 'Complete Task: API Documentation',
      start: '2025-09-19T14:00:00',
      end: '2025-09-19T16:00:00',
      type: 'task',
      backgroundColor: '#f59e0b',
      borderColor: '#d97706'
    },
    {
      id: '4',
      title: 'Goal Review: Q4 Objectives',
      start: '2025-09-22T09:00:00',
      end: '2025-09-22T10:00:00',
      type: 'goal',
      backgroundColor: '#8b5cf6',
      borderColor: '#7c3aed'
    },
    {
      id: '5',
      title: 'Dentist Appointment',
      start: '2025-09-21T15:30:00',
      end: '2025-09-21T16:30:00',
      type: 'personal',
      backgroundColor: '#ef4444',
      borderColor: '#dc2626'
    }
  ])

  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [showEventModal, setShowEventModal] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleDateClick = (arg: any) => {
    setSelectedDate(arg.dateStr)
    setShowEventModal(true)
  }

  const handleEventClick = (arg: any) => {
    console.log('Event clicked:', arg.event)
    // Handle event click - could open edit modal
  }

  const getEventTypeStats = () => {
    const stats = events.reduce((acc, event) => {
      acc[event.type] = (acc[event.type] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    return [
      { type: 'Tasks', count: stats.task || 0, color: 'bg-yellow-500', IconComponent: FaTasks },
      { type: 'Projects', count: stats.project || 0, color: 'bg-green-500', IconComponent: FaProjectDiagram },
      { type: 'Goals', count: stats.goal || 0, color: 'bg-purple-500', IconComponent: FaBullseye },
      { type: 'Meetings', count: stats.meeting || 0, color: 'bg-blue-500', IconComponent: FaUsers },
      { type: 'Personal', count: stats.personal || 0, color: 'bg-red-500', IconComponent: FaUser }
    ]
  }

  if (!mounted) {
    return (
      <MainLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Calendar</h2>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
              <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
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
          <div className="flex items-center gap-3">
            <FaCalendarAlt className="text-indigo-500" size={32} />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Calendar</h2>
              <p className="text-gray-600 dark:text-gray-400">Manage your schedule and deadlines</p>
            </div>
          </div>
          <button 
            onClick={() => setShowEventModal(true)}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 flex items-center gap-2"
          >
            <FaPlus size={16} />
            Add Event
          </button>
        </div>

        {/* Event Type Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {getEventTypeStats().map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <stat.IconComponent className="text-white" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.type}</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{stat.count}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Calendar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <DynamicFullCalendar
            events={events}
            onDateClick={handleDateClick}
            onEventClick={handleEventClick}
          />
        </div>

        {/* Upcoming Events */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Upcoming Events
          </h3>
          
          <div className="space-y-3">
            {events
              .filter(event => new Date(event.start) >= new Date())
              .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
              .slice(0, 5)
              .map((event) => (
                <div key={event.id} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: event.backgroundColor }}
                  ></div>
                  
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900 dark:text-white">
                      {event.title}
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(event.start).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        hour: event.allDay ? undefined : '2-digit',
                        minute: event.allDay ? undefined : '2-digit'
                      })}
                    </p>
                  </div>
                  
                  <span className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full capitalize">
                    {event.type}
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* Simple Event Modal */}
        {showEventModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Add Event
                </h3>
                <button
                  onClick={() => setShowEventModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <FaTimes size={20} />
                </button>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Event creation functionality would be implemented here.
                {selectedDate && ` Selected date: ${selectedDate}`}
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowEventModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowEventModal(false)}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-200"
                >
                  Add Event
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  )
}

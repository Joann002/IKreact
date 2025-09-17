'use client'

import { useState } from 'react'
import MainLayout from '@/components/Layout/MainLayout'
import TaskCard from '@/components/Tasks/TaskCard'
import AddTaskModal from '@/components/Tasks/AddTaskModal'

interface Task {
  id: string
  title: string
  description: string
  status: 'completed' | 'in-progress' | 'pending'
  priority: 'low' | 'medium' | 'high'
  dueDate: string
  project?: string
}

export default function TasksPage() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Design Homepage Layout',
      description: 'Create wireframes and mockups for the new homepage design',
      status: 'completed',
      priority: 'high',
      dueDate: '2024-01-25',
      project: 'Website Redesign'
    },
    {
      id: '2',
      title: 'Implement User Authentication',
      description: 'Set up login/register functionality with JWT tokens',
      status: 'in-progress',
      priority: 'high',
      dueDate: '2024-02-10',
      project: 'Mobile App Development'
    },
    {
      id: '3',
      title: 'Write API Documentation',
      description: 'Document all REST API endpoints with examples',
      status: 'pending',
      priority: 'medium',
      dueDate: '2024-02-15',
      project: 'Mobile App Development'
    },
    {
      id: '4',
      title: 'Database Performance Testing',
      description: 'Run performance tests on the new database setup',
      status: 'in-progress',
      priority: 'medium',
      dueDate: '2024-02-05',
      project: 'Database Migration'
    }
  ])

  const handleAddTask = (taskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
    }
    setTasks([...tasks, newTask])
    setShowAddModal(false)
  }

  const handleStatusChange = (taskId: string, newStatus: Task['status']) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ))
  }

  const groupedTasks = {
    pending: tasks.filter(task => task.status === 'pending'),
    'in-progress': tasks.filter(task => task.status === 'in-progress'),
    completed: tasks.filter(task => task.status === 'completed')
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Tasks</h2>
            <p className="text-gray-600 dark:text-gray-400">Organize and track your tasks</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 flex items-center gap-2"
          >
            <i className="fas fa-plus"></i>
            New Task
          </button>
        </div>

        {/* Task Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pending Tasks */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Pending
              </h3>
              <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-sm px-2 py-1 rounded-full">
                {groupedTasks.pending.length}
              </span>
            </div>
            <div className="space-y-3">
              {groupedTasks.pending.map((task) => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          </div>

          {/* In Progress Tasks */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                In Progress
              </h3>
              <span className="bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 text-sm px-2 py-1 rounded-full">
                {groupedTasks['in-progress'].length}
              </span>
            </div>
            <div className="space-y-3">
              {groupedTasks['in-progress'].map((task) => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          </div>

          {/* Completed Tasks */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Completed
              </h3>
              <span className="bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm px-2 py-1 rounded-full">
                {groupedTasks.completed.length}
              </span>
            </div>
            <div className="space-y-3">
              {groupedTasks.completed.map((task) => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Add Task Modal */}
        {showAddModal && (
          <AddTaskModal
            onClose={() => setShowAddModal(false)}
            onAdd={handleAddTask}
          />
        )}
      </div>
    </MainLayout>
  )
}

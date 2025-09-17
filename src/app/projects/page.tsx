'use client'

import { useState } from 'react'
import MainLayout from '@/components/Layout/MainLayout'
import ProjectCard from '@/components/Projects/ProjectCard'
import AddProjectModal from '@/components/Projects/AddProjectModal'

interface Project {
  id: string
  title: string
  description: string
  progress: number
  status: 'completed' | 'in-progress' | 'pending'
  dueDate: string
  priority: 'low' | 'medium' | 'high'
  team: string[]
}

export default function ProjectsPage() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'Website Redesign',
      description: 'Complete redesign of company website with modern UI/UX principles and responsive design.',
      progress: 85,
      status: 'in-progress',
      dueDate: '2024-02-15',
      priority: 'high',
      team: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face'
      ]
    },
    {
      id: '2',
      title: 'Mobile App Development',
      description: 'iOS and Android app for customer management and real-time communication.',
      progress: 60,
      status: 'in-progress',
      dueDate: '2024-03-20',
      priority: 'medium',
      team: [
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face'
      ]
    },
    {
      id: '3',
      title: 'Database Migration',
      description: 'Migrate legacy database to new cloud infrastructure with improved performance.',
      progress: 100,
      status: 'completed',
      dueDate: '2024-01-30',
      priority: 'high',
      team: [
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face'
      ]
    }
  ])

  const handleAddProject = (projectData: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
    }
    setProjects([...projects, newProject])
    setShowAddModal(false)
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h2>
            <p className="text-gray-600 dark:text-gray-400">Manage and track your project progress</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 flex items-center gap-2"
          >
            <i className="fas fa-plus"></i>
            New Project
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Add Project Modal */}
        {showAddModal && (
          <AddProjectModal
            onClose={() => setShowAddModal(false)}
            onAdd={handleAddProject}
          />
        )}
      </div>
    </MainLayout>
  )
}

'use client'

import { useEffect, useState } from 'react'
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
  const [projects, setProjects] = useState<Project[]>([])

  const handleAddProject = async (projectData: Omit<Project, 'id'>) => {
    await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectData),
    })
    await loadProjects()
    setShowAddModal(false)
  }

  const loadProjects = async () => {
    const res = await fetch('/api/projects', { cache: 'no-store' })
    const data = await res.json()
    // Normalize team from JSON string to array
    const normalized = data.map((p: any) => ({ ...p, team: JSON.parse(p.team || '[]') }))
    setProjects(normalized)
  }

  useEffect(() => {
    const onRefresh = () => loadProjects()
    document.addEventListener('projects:refresh', onRefresh as EventListener)
    loadProjects()
    return () => document.removeEventListener('projects:refresh', onRefresh as EventListener)
  }, [])

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


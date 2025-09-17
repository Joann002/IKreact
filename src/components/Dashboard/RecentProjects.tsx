'use client'

import { cn, getStatusColor } from '@/lib/utils'

interface Project {
  id: string
  title: string
  description: string
  progress: number
  status: 'completed' | 'in-progress' | 'pending'
  team: string[]
  teamCount: number
}

const ProjectCard = ({ project }: { project: Project }) => (
  <div className="bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:border-indigo-300 dark:hover:border-indigo-500 transition-all duration-200 hover:shadow-md">
    <div className="flex items-center justify-between mb-2">
      <h4 className="font-semibold text-gray-900 dark:text-white">
        {project.title}
      </h4>
      <span className={cn(
        'text-xs font-medium px-2 py-1 rounded-full',
        getStatusColor(project.status)
      )}>
        {project.status === 'in-progress' ? 'In Progress' : 
         project.status === 'completed' ? 'Completed' : 'Pending'}
      </span>
    </div>
    
    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
      {project.description}
    </p>
    
    <div className="flex items-center gap-3 mb-3">
      <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${project.progress}%` }}
        ></div>
      </div>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {project.progress}%
      </span>
    </div>
    
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        {project.team.slice(0, 3).map((member, index) => (
          <img
            key={index}
            src={member}
            alt="Team member"
            className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-700 -ml-1 first:ml-0"
          />
        ))}
        {project.teamCount > 3 && (
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
            +{project.teamCount - 3} more
          </span>
        )}
      </div>
    </div>
  </div>
)

export default function RecentProjects() {
  const projects: Project[] = [
    {
      id: '1',
      title: 'Website Redesign',
      description: 'Complete redesign of company website with modern UI/UX',
      progress: 100,
      status: 'completed',
      team: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face'
      ],
      teamCount: 5
    },
    {
      id: '2',
      title: 'Mobile App Development',
      description: 'iOS and Android app for customer management',
      progress: 65,
      status: 'in-progress',
      team: [
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face'
      ],
      teamCount: 3
    }
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Recent Projects
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}

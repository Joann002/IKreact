'use client'

import MainLayout from '@/components/Layout/MainLayout'
import { 
  IKLogo,
  TaskIcon, 
  ProjectIcon, 
  GoalIcon, 
  MeetingIcon, 
  PersonalIcon,
  CalendarIcon,
  StatsIcon,
  HomeIcon,
  SettingsIcon,
  AddIcon,
  CheckIcon,
  ClockIcon,
  StarIcon,
  TrophyIcon
} from '@/components/Icons/ProjectIcon'

export default function IconsPage() {
  const iconList = [
    { name: 'IK Logo', component: IKLogo, description: 'Logo principal de l\'application' },
    { name: 'Tasks', component: TaskIcon, description: 'Icône pour les tâches' },
    { name: 'Projects', component: ProjectIcon, description: 'Icône pour les projets' },
    { name: 'Goals', component: GoalIcon, description: 'Icône pour les objectifs' },
    { name: 'Meetings', component: MeetingIcon, description: 'Icône pour les réunions' },
    { name: 'Personal', component: PersonalIcon, description: 'Icône pour les éléments personnels' },
    { name: 'Calendar', component: CalendarIcon, description: 'Icône pour le calendrier' },
    { name: 'Statistics', component: StatsIcon, description: 'Icône pour les statistiques' },
    { name: 'Home', component: HomeIcon, description: 'Icône pour l\'accueil' },
    { name: 'Settings', component: SettingsIcon, description: 'Icône pour les paramètres' },
    { name: 'Add', component: AddIcon, description: 'Icône pour ajouter' },
    { name: 'Check', component: CheckIcon, description: 'Icône pour valider' },
    { name: 'Clock', component: ClockIcon, description: 'Icône pour le temps' },
    { name: 'Star', component: StarIcon, description: 'Icône pour les favoris' },
    { name: 'Trophy', component: TrophyIcon, description: 'Icône pour les réussites' }
  ]

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <IKLogo size={40} />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Icônes du Projet</h2>
            <p className="text-gray-600 dark:text-gray-400">Collection d'icônes React Icons pour Inspira.K</p>
          </div>
        </div>

        {/* Icon Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {iconList.map((icon, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center space-y-4">
                {/* Icon Display */}
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl">
                  <icon.component className="text-indigo-600 dark:text-indigo-400" size={32} />
                </div>
                
                {/* Icon Info */}
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{icon.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{icon.description}</p>
                </div>

                {/* Usage Examples */}
                <div className="flex gap-2 items-center">
                  <div className="bg-yellow-500 p-2 rounded-lg">
                    <icon.component className="text-white" size={16} />
                  </div>
                  <div className="bg-green-500 p-2 rounded-lg">
                    <icon.component className="text-white" size={16} />
                  </div>
                  <div className="bg-blue-500 p-2 rounded-lg">
                    <icon.component className="text-white" size={16} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Usage Guide */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Guide d'utilisation
          </h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Import</h4>
              <code className="block bg-gray-100 dark:bg-gray-700 p-2 rounded mt-1 text-sm">
                import {`{ TaskIcon, ProjectIcon }`} from '@/components/Icons/ProjectIcon'
              </code>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Utilisation</h4>
              <code className="block bg-gray-100 dark:bg-gray-700 p-2 rounded mt-1 text-sm">
                {`<TaskIcon className="text-blue-500" size={24} />`}
              </code>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Props disponibles</h4>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 mt-1">
                <li><code>className</code> - Classes CSS personnalisées</li>
                <li><code>size</code> - Taille de l'icône (nombre en pixels)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

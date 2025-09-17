'use client'

import { useState } from 'react'
import MainLayout from '@/components/Layout/MainLayout'
import { useAppContext } from '@/contexts/AppContext'

export default function SettingsPage() {
  const { theme, toggleTheme, currentMode, toggleMode } = useAppContext()
  
  const [profileData, setProfileData] = useState({
    displayName: 'John Doe',
    email: 'john@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face',
    bio: 'Product Manager passionate about productivity and design'
  })

  const [preferences, setPreferences] = useState({
    language: 'en',
    timeFormat: '24',
    dateFormat: 'DD/MM/YYYY',
    notifications: true,
    emailNotifications: false,
    weekStart: 'monday',
    autoSave: true
  })

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    activityTracking: true,
    dataSharing: false,
    analyticsOptIn: true
  })

  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }))
  }

  const handlePreferenceChange = (field: string, value: string | boolean) => {
    setPreferences(prev => ({ ...prev, [field]: value }))
  }

  const handlePrivacyChange = (field: string, value: string | boolean) => {
    setPrivacy(prev => ({ ...prev, [field]: value }))
  }

  const ToggleSwitch = ({ checked, onChange, label }: { checked: boolean, onChange: (checked: boolean) => void, label: string }) => (
    <div className="flex items-center justify-between">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors ${
          checked ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'
        }`}
      >
        <div
          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  )

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
            <p className="text-gray-600 dark:text-gray-400">Manage your account and preferences</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Information */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Profile Information
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={profileData.avatarUrl}
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 text-sm font-medium">
                      Change Avatar
                    </button>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      JPG, PNG or GIF. Max size 2MB.
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={profileData.displayName}
                    onChange={(e) => handleProfileChange('displayName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleProfileChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Bio
                  </label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => handleProfileChange('bio', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Preferences
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Language
                  </label>
                  <select
                    value={preferences.language}
                    onChange={(e) => handlePreferenceChange('language', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                    <option value="es">Español</option>
                    <option value="de">Deutsch</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Time Format
                    </label>
                    <select
                      value={preferences.timeFormat}
                      onChange={(e) => handlePreferenceChange('timeFormat', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="12">12-hour</option>
                      <option value="24">24-hour</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Date Format
                    </label>
                    <select
                      value={preferences.dateFormat}
                      onChange={(e) => handlePreferenceChange('dateFormat', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Week Starts On
                  </label>
                  <select
                    value={preferences.weekStart}
                    onChange={(e) => handlePreferenceChange('weekStart', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="sunday">Sunday</option>
                    <option value="monday">Monday</option>
                  </select>
                </div>

                <div className="space-y-3 pt-2">
                  <ToggleSwitch
                    checked={preferences.notifications}
                    onChange={(checked) => handlePreferenceChange('notifications', checked)}
                    label="Push Notifications"
                  />
                  
                  <ToggleSwitch
                    checked={preferences.emailNotifications}
                    onChange={(checked) => handlePreferenceChange('emailNotifications', checked)}
                    label="Email Notifications"
                  />
                  
                  <ToggleSwitch
                    checked={preferences.autoSave}
                    onChange={(checked) => handlePreferenceChange('autoSave', checked)}
                    label="Auto-save Changes"
                  />
                </div>
              </div>
            </div>

            {/* Privacy & Security */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Privacy & Security
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Profile Visibility
                  </label>
                  <select
                    value={privacy.profileVisibility}
                    onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="public">Public</option>
                    <option value="friends">Friends Only</option>
                    <option value="private">Private</option>
                  </select>
                </div>

                <div className="space-y-3 pt-2">
                  <ToggleSwitch
                    checked={privacy.activityTracking}
                    onChange={(checked) => handlePrivacyChange('activityTracking', checked)}
                    label="Activity Tracking"
                  />
                  
                  <ToggleSwitch
                    checked={privacy.dataSharing}
                    onChange={(checked) => handlePrivacyChange('dataSharing', checked)}
                    label="Data Sharing with Partners"
                  />
                  
                  <ToggleSwitch
                    checked={privacy.analyticsOptIn}
                    onChange={(checked) => handlePrivacyChange('analyticsOptIn', checked)}
                    label="Analytics & Performance"
                  />
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm font-medium">
                    Delete Account
                  </button>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Settings Sidebar */}
          <div className="space-y-6">
            {/* App Mode */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                App Mode
              </h3>
              
              <div className="space-y-3">
                <button
                  onClick={toggleMode}
                  className={`w-full p-3 rounded-lg border-2 transition-colors ${
                    currentMode === 'work'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <i className="fas fa-briefcase text-blue-500"></i>
                    <div className="text-left">
                      <div className="font-medium text-gray-900 dark:text-white">Work Mode</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Projects, tasks, and goals</div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={toggleMode}
                  className={`w-full p-3 rounded-lg border-2 transition-colors ${
                    currentMode === 'leisure'
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <i className="fas fa-gamepad text-purple-500"></i>
                    <div className="text-left">
                      <div className="font-medium text-gray-900 dark:text-white">Leisure Mode</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Entertainment and hobbies</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Theme */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Appearance
              </h3>
              
              <div className="space-y-3">
                <button
                  onClick={theme === 'dark' ? toggleTheme : undefined}
                  className={`w-full p-3 rounded-lg border-2 transition-colors ${
                    theme === 'light'
                      ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <i className="fas fa-sun text-yellow-500"></i>
                    <div className="text-left">
                      <div className="font-medium text-gray-900 dark:text-white">Light Mode</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Clean and bright interface</div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={theme === 'light' ? toggleTheme : undefined}
                  className={`w-full p-3 rounded-lg border-2 transition-colors ${
                    theme === 'dark'
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <i className="fas fa-moon text-indigo-500"></i>
                    <div className="text-left">
                      <div className="font-medium text-gray-900 dark:text-white">Dark Mode</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Easy on the eyes</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Account Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Account
              </h3>
              
              <div className="space-y-3">
                <button className="w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <i className="fas fa-download mr-3 text-gray-400"></i>
                  Export Data
                </button>
                
                <button className="w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <i className="fas fa-shield-alt mr-3 text-gray-400"></i>
                  Privacy Policy
                </button>
                
                <button className="w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <i className="fas fa-question-circle mr-3 text-gray-400"></i>
                  Help & Support
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-200">
            Save Changes
          </button>
        </div>
      </div>
    </MainLayout>
  )
}

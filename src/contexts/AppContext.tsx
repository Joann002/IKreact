'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type AppMode = 'work' | 'leisure'
export type Theme = 'light' | 'dark'

interface AppContextType {
  currentMode: AppMode
  setCurrentMode: (mode: AppMode) => void
  theme: Theme
  setTheme: (theme: Theme) => void
  sidebarCollapsed: boolean
  setSidebarCollapsed: (collapsed: boolean) => void
  toggleSidebar: () => void
  toggleTheme: () => void
  toggleMode: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentMode, setCurrentMode] = useState<AppMode>('work')
  const [theme, setTheme] = useState<Theme>('light')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Load saved preferences from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('appMode') as AppMode
    const savedTheme = localStorage.getItem('theme') as Theme
    const savedSidebarState = localStorage.getItem('sidebarCollapsed')

    if (savedMode) setCurrentMode(savedMode)
    if (savedTheme) setTheme(savedTheme)
    if (savedSidebarState) setSidebarCollapsed(JSON.parse(savedSidebarState))
  }, [])

  // Apply theme to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem('appMode', currentMode)
  }, [currentMode])

  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(sidebarCollapsed))
  }, [sidebarCollapsed])

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const toggleMode = () => {
    setCurrentMode(currentMode === 'work' ? 'leisure' : 'work')
  }

  const value: AppContextType = {
    currentMode,
    setCurrentMode,
    theme,
    setTheme,
    sidebarCollapsed,
    setSidebarCollapsed,
    toggleSidebar,
    toggleTheme,
    toggleMode,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}

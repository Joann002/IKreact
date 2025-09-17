'use client'

import React from 'react'
import { 
  FaTasks, 
  FaProjectDiagram, 
  FaBullseye, 
  FaUsers, 
  FaUser,
  FaCalendarAlt,
  FaChartLine,
  FaHome,
  FaCog,
  FaPlus,
  FaCheck,
  FaClock,
  FaStar,
  FaTrophy
} from 'react-icons/fa'

interface IconProps {
  className?: string
  size?: number
}

// Icône principale du projet IK
export const IKLogo: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <div className={`inline-flex items-center justify-center ${className}`}>
    <div 
      className="rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold flex items-center justify-center"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      IK
    </div>
  </div>
)

// Icônes pour les différentes sections
export const TaskIcon: React.FC<IconProps> = ({ className, size }) => (
  <FaTasks className={className} size={size} />
)

export const ProjectIcon: React.FC<IconProps> = ({ className, size }) => (
  <FaProjectDiagram className={className} size={size} />
)

export const GoalIcon: React.FC<IconProps> = ({ className, size }) => (
  <FaBullseye className={className} size={size} />
)

export const MeetingIcon: React.FC<IconProps> = ({ className, size }) => (
  <FaUsers className={className} size={size} />
)

export const PersonalIcon: React.FC<IconProps> = ({ className, size }) => (
  <FaUser className={className} size={size} />
)

export const CalendarIcon: React.FC<IconProps> = ({ className, size }) => (
  <FaCalendarAlt className={className} size={size} />
)

export const StatsIcon: React.FC<IconProps> = ({ className, size }) => (
  <FaChartLine className={className} size={size} />
)

export const HomeIcon: React.FC<IconProps> = ({ className, size }) => (
  <FaHome className={className} size={size} />
)

export const SettingsIcon: React.FC<IconProps> = ({ className, size }) => (
  <FaCog className={className} size={size} />
)

export const AddIcon: React.FC<IconProps> = ({ className, size }) => (
  <FaPlus className={className} size={size} />
)

export const CheckIcon: React.FC<IconProps> = ({ className, size }) => (
  <FaCheck className={className} size={size} />
)

export const ClockIcon: React.FC<IconProps> = ({ className, size }) => (
  <FaClock className={className} size={size} />
)

export const StarIcon: React.FC<IconProps> = ({ className, size }) => (
  <FaStar className={className} size={size} />
)

export const TrophyIcon: React.FC<IconProps> = ({ className, size }) => (
  <FaTrophy className={className} size={size} />
)

// Composant pour générer un favicon SVG dynamique
export const generateFaviconSVG = (size: number = 32) => {
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#6366f1;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="url(#grad)"/>
    <text x="${size/2}" y="${size * 0.7}" font-family="Arial, sans-serif" font-size="${size * 0.5}" font-weight="bold" text-anchor="middle" fill="white">IK</text>
    <circle cx="${size * 0.8}" cy="${size * 0.2}" r="${size * 0.1}" fill="#10b981"/>
    <path d="M${size * 0.75} ${size * 0.2}l${size * 0.03} ${size * 0.03} ${size * 0.06} -${size * 0.06}" stroke="white" stroke-width="${size * 0.02}" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`
}

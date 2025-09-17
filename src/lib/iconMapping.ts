// Mapping des icônes Font Awesome vers React Icons
import React from 'react'
import {
  FaTachometerAlt, FaProjectDiagram, FaTasks, FaBullseye, FaCalendarAlt, FaChartBar,
  FaStar, FaGamepad, FaFilm, FaMusic, FaBookOpen, FaFlagCheckered, FaCog,
  FaMagic, FaBars, FaSun, FaMoon, FaPlus, FaTimes, FaEdit, FaTrash, FaCheck,
  FaUser, FaUsers, FaHeart, FaPlay, FaPause, FaStop, FaForward, FaBackward,
  FaVolumeUp, FaVolumeDown, FaVolumeMute, FaSearch, FaFilter, FaSortUp, FaSortDown,
  FaHome, FaArrowLeft, FaArrowRight, FaArrowUp, FaArrowDown, FaEye, FaEyeSlash,
  FaLock, FaUnlock, FaBell, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendar,
  FaClock, FaDownload, FaUpload, FaShare, FaCopy, FaPrint, FaSave, FaUndo, FaRedo
} from 'react-icons/fa'

// Type pour les composants d'icônes
export type IconComponent = React.ComponentType<any>

// Mapping des classes Font Awesome vers les composants React Icons
export const iconMapping: Record<string, IconComponent> = {
  // Navigation et interface
  'fas fa-tachometer-alt': FaTachometerAlt,
  'fas fa-project-diagram': FaProjectDiagram,
  'fas fa-tasks': FaTasks,
  'fas fa-bullseye': FaBullseye,
  'fas fa-calendar-alt': FaCalendarAlt,
  'fas fa-chart-bar': FaChartBar,
  'fas fa-star': FaStar,
  'fas fa-gamepad': FaGamepad,
  'fas fa-film': FaFilm,
  'fas fa-music': FaMusic,
  'fas fa-book-open': FaBookOpen,
  'fas fa-flag-checkered': FaFlagCheckered,
  'fas fa-cog': FaCog,
  'fas fa-wand-sparkles': FaMagic,
  'fas fa-bars': FaBars,
  'fas fa-sun': FaSun,
  'fas fa-moon': FaMoon,
  
  // Actions communes
  'fas fa-plus': FaPlus,
  'fas fa-times': FaTimes,
  'fas fa-edit': FaEdit,
  'fas fa-trash': FaTrash,
  'fas fa-check': FaCheck,
  'fas fa-user': FaUser,
  'fas fa-users': FaUsers,
  'fas fa-heart': FaHeart,
  
  // Contrôles média
  'fas fa-play': FaPlay,
  'fas fa-pause': FaPause,
  'fas fa-stop': FaStop,
  'fas fa-forward': FaForward,
  'fas fa-backward': FaBackward,
  'fas fa-volume-up': FaVolumeUp,
  'fas fa-volume-down': FaVolumeDown,
  'fas fa-volume-mute': FaVolumeMute,
  
  // Utilitaires
  'fas fa-search': FaSearch,
  'fas fa-filter': FaFilter,
  'fas fa-sort-up': FaSortUp,
  'fas fa-sort-down': FaSortDown,
  'fas fa-home': FaHome,
  'fas fa-arrow-left': FaArrowLeft,
  'fas fa-arrow-right': FaArrowRight,
  'fas fa-arrow-up': FaArrowUp,
  'fas fa-arrow-down': FaArrowDown,
  'fas fa-eye': FaEye,
  'fas fa-eye-slash': FaEyeSlash,
  'fas fa-lock': FaLock,
  'fas fa-unlock': FaUnlock,
  'fas fa-bell': FaBell,
  'fas fa-envelope': FaEnvelope,
  'fas fa-phone': FaPhone,
  'fas fa-map-marker-alt': FaMapMarkerAlt,
  'fas fa-calendar': FaCalendar,
  'fas fa-clock': FaClock,
  'fas fa-download': FaDownload,
  'fas fa-upload': FaUpload,
  'fas fa-share': FaShare,
  'fas fa-copy': FaCopy,
  'fas fa-print': FaPrint,
  'fas fa-save': FaSave,
  'fas fa-undo': FaUndo,
  'fas fa-redo': FaRedo,
}

// Fonction utilitaire pour obtenir une icône React à partir d'une classe Font Awesome
export function getReactIcon(fontAwesomeClass: string): IconComponent | null {
  return iconMapping[fontAwesomeClass] || null
}

// Composant wrapper pour afficher une icône à partir d'une classe Font Awesome
interface FontAwesomeToReactIconProps {
  className: string
  size?: number
  color?: string
  style?: React.CSSProperties
}

export function FontAwesomeToReactIcon({ 
  className, 
  size, 
  color, 
  style,
  ...props 
}: FontAwesomeToReactIconProps) {
  const IconComponent = getReactIcon(className)
  
  if (!IconComponent) {
    console.warn(`Icône non trouvée pour la classe: ${className}`)
    return null
  }
  
  return React.createElement(IconComponent, { 
    size, 
    color, 
    style,
    ...props 
  })
}

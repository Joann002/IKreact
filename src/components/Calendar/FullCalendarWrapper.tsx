'use client'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

// Import FullCalendar styles - v6 uses different approach
import '@/styles/fullcalendar.css'

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

interface FullCalendarWrapperProps {
  events: CalendarEvent[]
  onDateClick?: (arg: any) => void
  onEventClick?: (arg: any) => void
}

export default function FullCalendarWrapper({ 
  events, 
  onDateClick, 
  onEventClick 
}: FullCalendarWrapperProps) {
  return (
    <div className="fullcalendar-wrapper">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        events={events}
        dateClick={onDateClick}
        eventClick={onEventClick}
        height="600px"
        aspectRatio={1.8}
        themeSystem="standard"
        eventDisplay="block"
        displayEventTime={true}
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }}
        dayHeaderFormat={{ weekday: 'short' }}
        titleFormat={{ year: 'numeric', month: 'long' }}
        buttonText={{
          today: 'Today',
          month: 'Month',
          week: 'Week',
          day: 'Day'
        }}
        locale="en"
        firstDay={0}
        dayHeaderContent={(arg) => {
          return arg.text
        }}
        dayCellContent={(arg) => {
          return arg.dayNumberText
        }}
      />
      
    </div>
  )
}

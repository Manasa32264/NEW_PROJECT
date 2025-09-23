/**
 * Calendar App Entry Point
 * 
 * This file serves as the entry point for the EventBuddy calendar application which includes:
 * - Event management and scheduling
 * - Smart notifications for important dates
 * - College event tracking
 * 
 * The app is rendered into the 'calendar-root' element in calendar.html
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import CalendarPage from './modules/calendar/pages/CalendarPage.jsx'
import './styles.css'

// Create React root and render the CalendarPage component
ReactDOM.createRoot(document.getElementById('calendar-root')).render(
  <React.StrictMode>
    <CalendarPage />
  </React.StrictMode>,
)

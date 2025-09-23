/**
 * Calendar Page Component
 * 
 * This page component serves as the main wrapper for the EventBuddy calendar application.
 * It provides:
 * - Navigation bar for easy access to other modules
 * - Consistent page layout with title and description
 * - Integration with the main Calendar component
 * 
 * The page is accessed via calendar.html and provides event management functionality.
 */

import React from 'react'
import Calendar from '../components/Calendar.jsx'
import '../../../styles.css'

const CalendarPage = () => {
  const handleBackToHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="page-layout">
      <div className="page-container">
        {/* Header with title and back button */}
        <div className="grade-header">
          <h2 className="grade-title">📅 EventBuddy</h2>
          <button className="btn back-btn" onClick={handleBackToHome}>← Back to Home</button>
        </div>
        {/* Main content area for calendar component */}
        <div className="page-content">
          <Calendar />
        </div>
      </div>
    </div>
  )
}

export default CalendarPage

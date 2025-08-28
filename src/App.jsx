import React, { useState } from 'react'
import Calendar from './components/Calendar.jsx'
import GradePredictor from './components/GradePredictor.jsx'
import Attendance from './components/Attendance.jsx'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const HomePage = () => (
    <div className="container hero">
      <div className="left-half">
        <h1 className="title">
          <span className="title-main">A NEW WAY<br />TO MANAGE</span>
          <span className="title-sub">College Life</span>
        </h1>
        <p className="subtitle">Your complete digital companion for academic success and event planning.</p>
      </div>

      <div className="right-half">
  <div className="track-container">
    <div className="cute-tab tab1" onClick={() => setCurrentPage('calendar')}>
      <div className="tab-icon">📅</div>
      <div className="tab-title">EventBuddy</div>
      <div className="tab-desc">Manage events and get notifications</div>
    </div>
    <div className="cute-tab tab2" onClick={() => setCurrentPage('grades')}>
      <div className="tab-icon">🎓</div>
      <div className="tab-title">GradeGenie</div>
      <div className="tab-desc">Calculate grades from CIE marks</div>
    </div>
    <div className="cute-tab tab3" onClick={() => setCurrentPage('attendance')}>
      <div className="tab-icon">📊</div>
      <div className="tab-title">Attendify</div>
      <div className="tab-desc">Track your class attendance</div>
    </div>
  </div>
</div>

    </div>
  )

  return (
    <>
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'calendar' && <Calendar onBack={() => setCurrentPage('home')} />}
      {currentPage === 'grades' && <GradePredictor onBack={() => setCurrentPage('home')} />}
      {currentPage === 'attendance' && <Attendance onBack={() => setCurrentPage('home')} />}
    </>
  )
}

export default App

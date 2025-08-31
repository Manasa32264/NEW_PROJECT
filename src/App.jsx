import React, { useState } from 'react'
import Calendar from './components/Calendar.jsx'
import GradePredictor from './components/GradePredictor.jsx'
import Attendance from './components/Attendance.jsx'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const HomePage = () => (
    <div className="container hero">
      {/* Enhanced Floating Particles */}
      <div className="floating-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle particle-small"></div>
        <div className="particle particle-small"></div>
        <div className="particle particle-small"></div>
      </div>
      
      {/* Animated Background Elements */}
      <div className="animated-bg">
        <div className="bg-circle bg-circle-1"></div>
        <div className="bg-circle bg-circle-2"></div>
        <div className="bg-circle bg-circle-3"></div>
      </div>
      
      <div className="left-half">
        <h1 className="title">
          <span className="title-main">A NEW WAY<br />TO MANAGE</span>
          <span className="title-sub">College Life</span>
        </h1>
        <p className="subtitle">
          Your complete digital companion for academic success and event planning. 
          Track attendance, predict grades, and never miss important events again.
        </p>
        
        {/* Decorative Elements */}
        <div className="decorative-elements">
          <div className="decor-dot"></div>
          <div className="decor-line"></div>
          <div className="decor-dot"></div>
        </div>
      </div>
      
      <div className="right-half">
        {/* Enhanced Track Path Animation */}
        <div className="track-path"></div>
        <div className="track-path track-path-secondary"></div>
        
        <div className="track-container">
          <div className="cute-tab tab1" onClick={() => setCurrentPage('calendar')}>
            <div className="tab-icon calendar-icon">📅</div>
            <div className="tab-title">EventBuddy</div>
            <div className="tab-desc">Manage events and get smart notifications</div>
            <div className="tab-glow"></div>
          </div>
          
          <div className="cute-tab tab2" onClick={() => setCurrentPage('grades')}>
            <div className="tab-icon grade-icon">🎓</div>
            <div className="tab-title">GradeGenie</div>
            <div className="tab-desc">Calculate grades from CIE marks instantly</div>
            <div className="tab-glow"></div>
          </div>
          
          <div className="cute-tab tab3" onClick={() => setCurrentPage('attendance')}>
            <div className="tab-icon attendance-icon">📊</div>
            <div className="tab-title">Attendify</div>
            <div className="tab-desc">Track your class attendance percentage</div>
            <div className="tab-glow"></div>
          </div>
        </div>
      </div>
    </div>
  )

  const Header = () => (
    <header className="app-header">
      <div className="container">
        {/* <button 
          className="btn btn--back" 
          onClick={() => setCurrentPage('home')}
        >
          ← Back to Home
        </button> */}
      </div>
    </header>
  )

  return (
    <>
      {currentPage === 'home' && <HomePage />}
      
      {currentPage !== 'home' && (
        <>
          <Header />
          {currentPage === 'calendar' && <Calendar onBack={() => setCurrentPage('home')} />}
          {currentPage === 'grades' && <GradePredictor onBack={() => setCurrentPage('home')} />}
          {currentPage === 'attendance' && <Attendance onBack={() => setCurrentPage('home')} />}
        </>
      )}
    </>
  )
}

export default App

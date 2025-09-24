/**
 * Main Task Manager Application
 * 
 * This is the main application component that manages the task manager module including:
 * - Home page with navigation cards for GradeGenie and Attendify
 * - Grade prediction tool for calculating grades from CIE marks
 * - Attendance tracking system for monitoring class attendance
 * 
 * Features:
 * - Interactive home page with animated cards
 * - Page routing between different tools
 * - Responsive design with modern UI elements
 */

import React, { useState } from 'react'
import GradePredictor from '../components/GradePredictor.jsx'
import Attendance from '../components/Attendance.jsx'
import '../styles/App.css'

function App() {
  // State to manage which page is currently being displayed
  const [currentPage, setCurrentPage] = useState('home')

  /**
   * HomePage Component
   * 
   * Renders the main landing page with:
   * - Animated background with floating particles and circles
   * - Hero section with title and description
   * - Interactive navigation cards for different tools
   * - Modern UI with hover effects and animations
   */
  const HomePage = () => (
    <div className="container hero">
      {/* Enhanced Floating Particles - Creates dynamic background animation */}
      <div className="floating-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle particle-small"></div>
        <div className="particle particle-small"></div>
        <div className="particle particle-small"></div>
      </div>
      
      {/* Animated Background Elements - Decorative circles for visual appeal */}
      <div className="animated-bg">
        <div className="bg-circle bg-circle-1"></div>
        <div className="bg-circle bg-circle-2"></div>
        <div className="bg-circle bg-circle-3"></div>
      </div>
      
      {/* Left Half - Hero Content Section */}
      <div className="left-half">
        <h1 className="title">
          <span className="title-main">A NEW WAY<br />TO MANAGE</span>
          <span className="title-sub">College Life</span>
        </h1>
        <p className="subtitle">
          Your complete digital companion for academic success and event planning. 
          Track attendance, predict grades, and never miss important events again.
        </p>
        
        {/* Decorative Elements - Visual enhancement dots and lines */}
        <div className="decorative-elements">
          <div className="decor-dot"></div>
          <div className="decor-line"></div>
          <div className="decor-dot"></div>
        </div>
      </div>
      
      {/* Right Half - Navigation Cards Section */}
      <div className="right-half">
        {/* Enhanced Track Path Animation - Background track for cards */}
        <div className="track-path"></div>
        <div className="track-path track-path-secondary"></div>
        
        <div className="track-container">
          {/* GradeGenie Card - Navigate to grade prediction tool */}
          <div className="cute-tab tab1" onClick={() => setCurrentPage('grades')}>
            <div className="tab-icon grade-icon">🎓</div>
            <div className="tab-title">GradeGenie</div>
            <div className="tab-desc">Calculate grades from CIE marks instantly</div>
            <div className="tab-glow"></div>
          </div>
          
          {/* Attendify Card - Navigate to attendance tracking tool */}
          <div className="cute-tab tab2" onClick={() => setCurrentPage('attendance')}>
            <div className="tab-icon attendance-icon">📊</div>
            <div className="tab-title">Attendify</div>
            <div className="tab-desc">Track your class attendance percentage</div>
            <div className="tab-glow"></div>
          </div>
        </div>
      </div>
    </div>
  )


  /**
   * Main Render Function
   * 
   * Conditionally renders different pages based on currentPage state:
   * - 'home': Shows the HomePage component with navigation cards
   * - 'grades': Shows the GradePredictor component
   * - 'attendance': Shows the Attendance component
   */
  return (
    <>
      {/* Render HomePage when currentPage is 'home' */}
      {currentPage === 'home' && <HomePage />}
      
      {/* Render specific tools when not on home page */}
      {currentPage !== 'home' && (
        <>
          {/* Grade Prediction Tool - Calculate grades from CIE marks */}
          {currentPage === 'grades' && <GradePredictor onBack={() => setCurrentPage('home')} />}
          {/* Attendance Tracking Tool - Monitor class attendance */}
          {currentPage === 'attendance' && <Attendance onBack={() => setCurrentPage('home')} />}
        </>
      )}
    </>
  )
}

export default App

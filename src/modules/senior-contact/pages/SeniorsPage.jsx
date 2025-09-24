/**
 * Senior Contact Page Component
 * 
 * This page component serves as the main wrapper for the Senior Care contact application.
 * It provides:
 * - Navigation bar for easy access to other modules
 * - Consistent page layout with title and description
 * - Integration with the SeniorsProfiles component
 * 
 * The page is accessed via seniors.html and provides senior contact information and support.
 */

import React from 'react'
import SeniorsProfiles from '../components/SeniorsProfiles.jsx'
import '../../../styles.css'

const SeniorsPage = () => {
  const handleBackToHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="page-layout">
      <div className="page-container">
        {/* Header with title and back button */}
        <div className="grade-header">
          <h2 className="grade-title">👥 Meet Our Senior Mentors</h2>
          <button className="btn back-btn" onClick={handleBackToHome}>← Back to Home</button>
        </div>
        {/* Main content area for seniors profiles component */}
        <div className="page-content">
          <SeniorsProfiles />
        </div>
      </div>
    </div>
  )
}

export default SeniorsPage

/**
 * Senior Contact App Entry Point
 * 
 * This file serves as the entry point for the Senior Care contact application which includes:
 * - Senior profile display and information
 * - Contact details and communication options
 * - Support and assistance information
 * 
 * The app is rendered into the 'seniors-root' element in seniors.html
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import SeniorsPage from './modules/senior-contact/pages/SeniorsPage.jsx'
import './styles.css'

// Create React root and render the SeniorsPage component
ReactDOM.createRoot(document.getElementById('seniors-root')).render(
  <React.StrictMode>
    <SeniorsPage />
  </React.StrictMode>,
)

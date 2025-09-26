/**
 * Main Entry Point for AcadMate Task Manager
 * 
 * This file serves as the entry point for the main application which includes:
 * - GradeGenie: Grade prediction and calculation tool
 * - Attendify: Attendance tracking and management
 * 
 * The app is rendered into the 'root' element in index.html
 */

import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './modules/task-manager/pages/App.jsx'

// Create React root and render the main App component
createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)



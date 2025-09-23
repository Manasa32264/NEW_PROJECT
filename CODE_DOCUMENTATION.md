# AcadMate - Code Documentation

## Overview
This document provides comprehensive documentation for all JSX files in the AcadMate project, explaining what each component does and how it contributes to the overall application.

## File Structure with Comments

### Entry Points

#### `src/main.jsx`
**Purpose**: Main entry point for the Task Manager application
- Renders the main App component into the 'root' element
- Includes GradeGenie and Attendify tools
- Entry point for `index.html`

#### `src/calendar-main.jsx`
**Purpose**: Entry point for the EventBuddy calendar application
- Renders the CalendarPage component into the 'calendar-root' element
- Provides event management and scheduling functionality
- Entry point for `calendar.html`

#### `src/seniors-main.jsx`
**Purpose**: Entry point for the Senior Care contact application
- Renders the SeniorsPage component into the 'seniors-root' element
- Provides senior profile display and contact information
- Entry point for `seniors.html`

### Task Manager Module (`src/modules/task-manager/`)

#### `pages/App.jsx`
**Purpose**: Main Task Manager application component
- Manages home page with navigation cards for GradeGenie and Attendify
- Handles page routing between different tools
- Features animated background with floating particles and interactive cards
- Includes hero section with title, description, and decorative elements

**Key Features**:
- Interactive home page with animated cards
- Page routing between different tools
- Responsive design with modern UI elements

#### `components/GradePredictor.jsx`
**Purpose**: GradeGenie - Grade prediction and calculation tool
- Calculates grades based on CIE (Continuous Internal Evaluation) marks
- Predicts required SEE (Semester End Examination) marks for different grade bands
- Displays grade bands from S to F with color-coded visualization
- Enforces minimum CIE and SEE requirements as per academic rules

**Key Features**:
- Real-time calculation as user inputs marks
- Interactive grade band visualization
- Minimum requirement validation
- Responsive design with modern UI

#### `components/Attendance.jsx`
**Purpose**: Attendify - Attendance tracking and management system
- Tracks class attendance for multiple subjects
- Manages timetable with scheduled classes
- Calculates attendance percentages in real-time
- Provides manual attendance entry and editing
- Shows attendance statistics and warnings
- Supports undo functionality for recent actions

**Key Features**:
- Interactive timetable management
- Real-time attendance calculation
- Data persistence with localStorage
- Action history and undo functionality

### Calendar Module (`src/modules/calendar/`)

#### `pages/CalendarPage.jsx`
**Purpose**: Calendar page wrapper for EventBuddy application
- Provides navigation bar for easy access to other modules
- Uses consistent page layout with title and description
- Integrates with the main Calendar component
- Accessed via `calendar.html`

#### `components/Calendar.jsx`
**Purpose**: Main calendar component for event management
- Manages events and scheduling
- Provides smart notifications for important dates
- Tracks college events
- Interactive calendar interface

### Senior Contact Module (`src/modules/senior-contact/`)

#### `pages/SeniorsPage.jsx`
**Purpose**: Senior Contact page wrapper for Senior Care application
- Provides navigation bar for easy access to other modules
- Uses consistent page layout with title and description
- Integrates with the SeniorsProfiles component
- Accessed via `seniors.html`

#### `components/SeniorsProfiles.jsx`
**Purpose**: Senior profile display and contact information
- Displays senior profiles with detailed information
- Provides contact details and communication options
- Shows support and assistance information
- Interactive profile cards with expand/collapse functionality

### Shared Components

*Note: Navigation components have been removed as they are no longer needed for the standalone pages.*

#### `src/layouts/PageLayout.jsx`
**Purpose**: Shared layout component for consistent page structure
- Provides consistent structure for all pages in AcadMate
- Includes page header with title and description
- Content area for page-specific components
- Consistent styling and spacing
- Responsive design

**Props**:
- `title`: Page title to display in header
- `description`: Page description to display in header
- `children`: Page content to render in the content area

## Comment Style Guide

### File Header Comments
Each file includes a comprehensive header comment that explains:
- Component purpose and functionality
- Key features and capabilities
- Usage context and integration points

### Inline Comments
Inline comments explain:
- Complex logic and calculations
- State management decisions
- UI element purposes
- Integration points between components

### Function Comments
Key functions include comments explaining:
- Purpose and functionality
- Parameters and return values
- Side effects and state changes
- Usage examples where applicable

## Benefits of Documentation

1. **Code Understanding**: Easy to understand what each component does
2. **Maintenance**: Easier to maintain and modify code
3. **Onboarding**: New developers can quickly understand the codebase
4. **Debugging**: Easier to identify issues and their locations
5. **Collaboration**: Better team collaboration and code reviews

## Maintenance

- Update comments when modifying functionality
- Keep documentation in sync with code changes
- Add new comments for new features
- Remove outdated comments during refactoring

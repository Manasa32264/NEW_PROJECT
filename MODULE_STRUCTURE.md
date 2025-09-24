# AcadMate - Modular Structure

## Overview
AcadMate has been reorganized into a modular structure where each major feature is contained within its own module. This provides better code organization, maintainability, and scalability.

## Module Structure

```
src/
├── modules/
│   ├── senior-contact/          # Senior Contact Module
│   │   ├── components/
│   │   │   └── SeniorsProfiles.jsx
│   │   ├── pages/
│   │   │   └── SeniorsPage.jsx
│   │   └── styles/
│   │       └── SeniorsProfiles.css
│   │
│   ├── calendar/                # Calendar Module
│   │   ├── components/
│   │   │   └── Calendar.jsx
│   │   ├── pages/
│   │   │   └── CalendarPage.jsx
│   │   └── styles/
│   │       └── Calendar.css
│   │
│   └── task-manager/            # Task Manager Module
│       ├── components/
│       │   ├── GradePredictor.jsx
│       │   └── Attendance.jsx
│       ├── pages/
│       │   └── App.jsx
│       └── styles/
│           ├── App.css
│           ├── GradePredictor.css
│           └── AttendanceTracker.css
│
├── components/                  # Shared Components (Empty - Navigation removed)
├── layouts/                     # Shared Layouts
│   ├── PageLayout.jsx
│   └── PageLayout.css
├── main.jsx                     # Main App Entry
├── calendar-main.jsx            # Calendar Entry
├── seniors-main.jsx             # Seniors Entry
└── styles.css                   # Global Styles
```

## Module Descriptions

### 1. Senior Contact Module (`src/modules/senior-contact/`)
**Purpose**: Handles senior profile display and contact information
- **Components**: `SeniorsProfiles.jsx` - Main component for displaying senior profiles
- **Pages**: `SeniorsPage.jsx` - Page wrapper with navigation and layout
- **Styles**: `SeniorsProfiles.css` - Module-specific styling
- **Entry Point**: `seniors.html` → `src/seniors-main.jsx`

### 2. Calendar Module (`src/modules/calendar/`)
**Purpose**: Manages calendar events and scheduling
- **Components**: `Calendar.jsx` - Main calendar component with event management
- **Pages**: `CalendarPage.jsx` - Page wrapper with navigation and layout
- **Styles**: `Calendar.css` - Module-specific styling
- **Entry Point**: `calendar.html` → `src/calendar-main.jsx`

### 3. Task Manager Module (`src/modules/task-manager/`)
**Purpose**: Handles academic tasks like grade prediction and attendance tracking
- **Components**: 
  - `GradePredictor.jsx` - Grade calculation component
  - `Attendance.jsx` - Attendance tracking component
- **Pages**: `App.jsx` - Main app with home page and navigation
- **Styles**: 
  - `App.css` - Main app styling
  - `GradePredictor.css` - Grade predictor styling
  - `AttendanceTracker.css` - Attendance tracker styling
- **Entry Point**: `index.html` → `src/main.jsx`

## Entry Points

### Main App (Task Manager)
- **File**: `index.html`
- **Entry**: `src/main.jsx`
- **Features**: GradeGenie, Attendify
- **URL**: `http://localhost:5173/`

### Calendar App
- **File**: `calendar.html`
- **Entry**: `src/calendar-main.jsx`
- **Features**: EventBuddy calendar
- **URL**: `http://localhost:5173/calendar.html`

### Seniors App
- **File**: `seniors.html`
- **Entry**: `src/seniors-main.jsx`
- **Features**: Senior Care contact
- **URL**: `http://localhost:5173/seniors.html`

## Benefits of Modular Structure

1. **Separation of Concerns**: Each module handles its own functionality
2. **Independent Development**: Modules can be developed separately
3. **Easy Maintenance**: Changes in one module don't affect others
4. **Scalability**: Easy to add new modules or features
5. **Code Reusability**: Shared components and layouts
6. **Clear Organization**: Easy to find and understand code structure

## Development Workflow

1. **Main App**: Work in `src/modules/task-manager/`
2. **Calendar**: Work in `src/modules/calendar/`
3. **Senior Contact**: Work in `src/modules/senior-contact/`
4. **Shared Components**: Work in `src/components/` and `src/layouts/`

## File Naming Convention

- **Components**: PascalCase (e.g., `GradePredictor.jsx`)
- **Pages**: PascalCase with "Page" suffix (e.g., `CalendarPage.jsx`)
- **Styles**: PascalCase matching component (e.g., `GradePredictor.css`)
- **Modules**: kebab-case (e.g., `task-manager`, `senior-contact`)

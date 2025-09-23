# AcadMate Project Structure

## Overview
AcadMate has been restructured to separate the Calendar and Senior Profile features into standalone pages, making the project more modular and maintainable.

## Directory Structure

```
AcadMate/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Attendance.jsx
│   │   ├── Calendar.jsx
│   │   ├── GradePredictor.jsx
│   │   ├── Navigation.jsx
│   │   ├── SeniorsProfiles.jsx
│   │   └── *.css files
│   ├── layouts/             # Layout components
│   │   ├── PageLayout.jsx
│   │   └── PageLayout.css
│   ├── pages/               # Page components
│   │   ├── CalendarPage.jsx
│   │   ├── SeniorsPage.jsx
│   │   ├── CalendarPage.css
│   │   └── SeniorsPage.css
│   ├── utils/               # Utility functions
│   ├── assets/              # Static assets
│   ├── App.jsx              # Main app (simplified)
│   ├── main.jsx             # Main entry point
│   ├── calendar-main.jsx    # Calendar page entry
│   ├── seniors-main.jsx     # Seniors page entry
│   └── styles.css           # Global styles
├── calendar.html            # Calendar page HTML
├── seniors.html             # Seniors page HTML
├── index.html               # Main page HTML
└── package.json
```

## Page Structure

### Main App (index.html)
- **Entry Point**: `src/main.jsx`
- **Component**: `src/App.jsx`
- **Features**: GradeGenie, Attendify
- **Navigation**: Internal routing

### Calendar Page (calendar.html)
- **Entry Point**: `src/calendar-main.jsx`
- **Component**: `src/pages/CalendarPage.jsx`
- **Features**: EventBuddy calendar functionality
- **Navigation**: Standalone with navigation bar

### Seniors Page (seniors.html)
- **Entry Point**: `src/seniors-main.jsx`
- **Component**: `src/pages/SeniorsPage.jsx`
- **Features**: Senior Care contact information
- **Navigation**: Standalone with navigation bar

## Key Changes

1. **Separated Pages**: Calendar and Senior Profile are now independent pages
2. **Shared Layout**: Common layout component for consistent styling
3. **Navigation**: Added navigation component for page switching
4. **Modular Structure**: Better organization with separate directories
5. **No Internal Links**: Pages are completely independent

## Running the Project

1. **Main App**: `npm run dev` (runs on default port)
2. **Calendar Page**: Access via `calendar.html`
3. **Seniors Page**: Access via `seniors.html`

## Benefits

- ✅ Better code organization
- ✅ Independent page development
- ✅ Easier maintenance
- ✅ Scalable structure
- ✅ Clean separation of concerns

import React, { useState, useEffect } from 'react'
import './Calendar.css'

const Calendar = ({ onBack }) => {
  const [events, setEvents] = useState([
    // College events (pre-populated)
    { id: 1, title: 'Fee Due Date', date: '2025-02-15', type: 'fee', isCollege: true },
    { id: 2, title: 'Mid-term Exams', date: '2025-02-20', type: 'exam', isCollege: true },
    { id: 3, title: 'Sports Day', date: '2025-02-28', type: 'event', isCollege: true }
  ])
  
  const [newEvent, setNewEvent] = useState({ title: '', date: '', type: 'event' })
  const [notification, setNotification] = useState('')
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Check for upcoming fee dues
  useEffect(() => {
    const today = new Date()
    const feeEvents = events.filter(event => 
      event.type === 'fee' && 
      new Date(event.date) > today &&
      new Date(event.date) <= new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000) // Next 7 days
    )
    
    if (feeEvents.length > 0) {
      setNotification(`⚠️ Fee due in ${Math.ceil((new Date(feeEvents[0].date) - today) / (1000 * 60 * 60 * 24))} days!`)
      setTimeout(() => setNotification(''), 5000)
    }
  }, [events])

  const addEvent = () => {
    if (newEvent.title && newEvent.date) {
      setEvents([...events, {
        id: Date.now(),
        ...newEvent,
        isCollege: false
      }])
      setNewEvent({ title: '', date: '', type: 'event' })
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addEvent()
    }
  }

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()
    
    const days = []
    
    // Empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      const dayEvents = events.filter(event => event.date === dateStr)
      days.push({ day, events: dayEvents })
    }
    
    return days
  }

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h2 className="calendar-title">📅 EventBuddy</h2>
        <button className="btn back-btn" onClick={onBack}>← Back to Home</button>
      </div>

      {notification && (
        <div className="notification-banner">
          <span>{notification}</span>
        </div>
      )}

      {/* Add Event Form */}
      <div className="event-form-section">
        <h3>Add New Event</h3>
        <div className="event-form">
          <div className="form-row">
            <div className="input-group">
              <label htmlFor="event-title">Event Title</label>
              <input
                id="event-title"
                type="text"
                placeholder="Enter event title (press Enter to add)"
                value={newEvent.title}
                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                onKeyPress={handleKeyPress}
                className="form-input"
              />
            </div>
            <div className="input-group">
              <label htmlFor="event-date">Date</label>
              <input
                id="event-date"
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                className="form-input"
              />
            </div>
            <div className="input-group">
              <label htmlFor="event-type">Type</label>
              <select
                id="event-type"
                value={newEvent.type}
                onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
                className="form-input"
              >
                <option value="event">Event</option>
                <option value="exam">Exam</option>
                <option value="assignment">Assignment</option>
                <option value="fee">Fee Due</option>
                <option value="other">Other</option>
              </select>
            </div>
            <button onClick={addEvent} className="btn btn-add">Add Event</button>
          </div>
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className="calendar-nav-section">
        <div className="calendar-nav">
          <button 
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
            className="btn nav-btn"
          >
            ←
          </button>
          <h3>{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h3>
          <button 
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
            className="btn nav-btn"
          >
            →
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="calendar-grid-section">
        <div className="calendar-grid">
          {weekDays.map(day => (
            <div key={day} className="calendar-header-day">{day}</div>
          ))}
          {getDaysInMonth(currentMonth).map((day, index) => (
            <div key={index} className={`calendar-day ${day?.events?.length ? 'has-event' : ''}`}>
              {day && (
                <>
                  <div className="day-number">{day.day}</div>
                  {day.events.map(event => (
                    <div key={event.id} className={`event-item ${event.type}`}>
                      {event.title}
                      {event.isCollege && <span className="college-badge">📚</span>}
                    </div>
                  ))}
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events List */}
      <div className="upcoming-events-section">
        <h3>Upcoming Events</h3>
        <div className="events-grid">
          {events
            .filter(event => new Date(event.date) >= new Date())
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, 6)
            .map(event => (
              <div key={event.id} className={`event-card ${event.type}`}>
                <div className="event-info">
                  <strong>{event.title}</strong>
                  <span className="event-date">{new Date(event.date).toLocaleDateString()}</span>
                  {event.isCollege && <span className="college-badge">College Event</span>}
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Calendar

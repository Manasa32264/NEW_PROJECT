import React, { useState, useEffect } from 'react'
import './AttendanceTracker.css'

const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

const AttendanceTracker = ({ onBack }) => {
  const [timetable, setTimetable] = useState([])
  const [sessions, setSessions] = useState([])
  const [targetAttendance, setTargetAttendance] = useState(75)
  const [manualDay, setManualDay] = useState('')
  const [manualSubject, setManualSubject] = useState('')
  const [showTimetable, setShowTimetable] = useState(true)
  const [showExtraOptions, setShowExtraOptions] = useState({})
  const [selectedDates, setSelectedDates] = useState({})

  useEffect(() => {
    const savedTimetable = localStorage.getItem('timetable')
    const savedSessions = localStorage.getItem('sessions')
    const savedTarget = localStorage.getItem('targetAttendance')
    const savedSelectedDates = localStorage.getItem('selectedDates')
    
    if (savedTimetable) setTimetable(JSON.parse(savedTimetable))
    if (savedSessions) setSessions(JSON.parse(savedSessions))
    if (savedTarget) setTargetAttendance(parseInt(savedTarget))
    if (savedSelectedDates) setSelectedDates(JSON.parse(savedSelectedDates))
  }, [])

  useEffect(() => {
    localStorage.setItem('timetable', JSON.stringify(timetable))
  }, [timetable])

  useEffect(() => {
    localStorage.setItem('sessions', JSON.stringify(sessions))
  }, [sessions])

  useEffect(() => {
    localStorage.setItem('targetAttendance', targetAttendance.toString())
  }, [targetAttendance])

  useEffect(() => {
    localStorage.setItem('selectedDates', JSON.stringify(selectedDates))
  }, [selectedDates])

  const addManualEntry = () => {
    console.log('addManualEntry called with:', { manualDay, manualSubject, timetable })
    
    if (!manualSubject.trim()) {
      alert('Please enter subject name.')
      return
    }
    if (!manualDay) {
      alert('Please select a day.')
      return
    }
    
    console.log('Checking for existing entry...')
    const existingEntry = timetable.some(t => t.day === manualDay && t.subject.toLowerCase() === manualSubject.trim().toLowerCase())
    console.log('Existing entry found:', existingEntry)
    
    if(existingEntry) {
      alert('Entry already exists')
      return
    }
    
    const newEntry = { day: manualDay, subject: manualSubject.trim() }
    console.log('Adding new entry:', newEntry)
    
    setTimetable(prev => {
      const newTimetable = [...prev, newEntry]
      console.log('New timetable:', newTimetable)
      return newTimetable
    })
    
    // Set today's date as default for the new subject
    const today = new Date().toISOString().split('T')[0]
    setSelectedDates(prev => ({
      ...prev,
      [manualSubject.trim()]: today
    }))
    
    setManualSubject('')
    setManualDay('')
    setShowTimetable(true) // Show timetable after adding subject
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addManualEntry()
    }
  }

  const removeTimetableEntry = (day, subject) => {
    setTimetable(timetable.filter(t => !(t.day === day && t.subject === subject)))
  }

  const addSession = (subject, date, type = 'scheduled') => {
    console.log('addSession called:', { subject, date, type, currentSessions: sessions })
    
    if (type === 'extra') {
      setSessions(prev => {
        const newSession = {
          subject,
          date,
          status: 'extra',
          attendance: null
        }
        console.log('Adding extra session:', newSession)
        const newSessions = [...prev, newSession]
        console.log('New sessions array:', newSessions)
        return newSessions
      })
      return
    }
    
    if (sessions.some(s => s.subject === subject && s.date === date && s.status === 'scheduled')) {
      alert('Scheduled class already exists for this subject and date')
      return
    }
    
    setSessions(prev => {
      const newSession = {
        subject,
        date,
        status: type,
        attendance: null
      }
      console.log('Adding scheduled session:', newSession)
      const newSessions = [...prev, newSession]
      console.log('New sessions array:', newSessions)
      return newSessions
    })
  }

  const markAttendance = (subject, date, status) => {
    console.log('markAttendance called:', { subject, date, status, currentSessions: sessions })
    setSessions(prev => {
      const newSessions = prev.map(s => 
        s.subject === subject && s.date === date 
          ? {...s, attendance: status} 
          : s
      )
      console.log('Updated sessions after markAttendance:', newSessions)
      return newSessions
    })
  }

  const calcStats = subject => {
    const subjSessions = sessions.filter(s => s.subject === subject)
    const totalSessions = subjSessions.length
    const attended = subjSessions.filter(s => s.attendance === 'present').length
    const absent = subjSessions.filter(s => s.attendance === 'absent').length
    const extra = subjSessions.filter(s => s.status === 'extra').length
    
    if(totalSessions === 0) return { 
      percentage: 0, 
      attended: 0, 
      total: 0, 
      absent: 0,
      extra: 0,
      effectiveTotal: 0,
      classesNeeded: 0 
    }
    
    const effectiveTotal = totalSessions
    const percentage = effectiveTotal > 0 ? (attended / effectiveTotal) * 100 : 0
    const classesNeeded = effectiveTotal > 0 && percentage < targetAttendance 
      ? Math.ceil((targetAttendance * effectiveTotal - 100 * attended) / (100 - targetAttendance))
      : 0
    
    return { 
      percentage, 
      attended, 
      total: totalSessions, 
      absent,
      extra,
      effectiveTotal,
      classesNeeded 
    }
  }

  const subjects = [...new Set(timetable.map(t => t.subject))]

  return (
    <div className="attendance-container">
      <div className="attendance-header">
        <h2 className="attendance-title">📋 Attendance Tracker</h2>
        <button className="btn back-btn" onClick={onBack}>← Back to Home</button>
      </div>

      <div className="upload-section">
        <h3>Target Attendance Percentage</h3>
        <div className="target-input">
          <input 
            type="number" 
            min="0" 
            max="100" 
            value={targetAttendance} 
            onChange={e => setTargetAttendance(parseInt(e.target.value) || 75)}
            className="target-slider"
          />
          <span className="target-label">%</span>
        </div>

        <h3>Add Subject to Timetable</h3>
        <div className="manual-input">
          <select value={manualDay} onChange={e => {
            console.log('Day selected:', e.target.value)
            setManualDay(e.target.value)
          }}>
            <option value="">Select a day</option>
            {DAYS.slice(0,6).map(day => <option key={day} value={day}>{day}</option>)}
          </select>
          <input 
            type="text" 
            placeholder="Subject name (press Enter to add)" 
            value={manualSubject} 
            onChange={e => setManualSubject(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="btn btn-add" onClick={addManualEntry}>Add Subject</button>
        </div>
        
        {manualDay && (
          <p className="selected-day-info">Selected day: <strong>{manualDay}</strong></p>
        )}

        {timetable.length > 0 && (
          <div className="timetable-display">
            <div className="timetable-header">
              <h4>Current Timetable</h4>
              <button 
                className="btn-toggle"
                onClick={() => setShowTimetable(!showTimetable)}
              >
                {showTimetable ? 'Hide Timetable' : 'Show Timetable'}
              </button>
            </div>
            {showTimetable && (
              <div className="timetable-grid">
                {DAYS.slice(0,6).map(day => {
                  const daySubjects = timetable.filter(t => t.day === day)
                  if (daySubjects.length === 0) return null
                  return (
                    <div key={day} className="day-column">
                      <h5>{day}</h5>
                      {daySubjects.map(subject => (
                        <div key={subject.subject} className="timetable-item">
                          <span>{subject.subject}</span>
                          <button 
                            className="btn-remove" 
                            onClick={() => removeTimetableEntry(day, subject.subject)}
                            title="Remove subject"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {timetable.length > 0 && !showTimetable && (
          <div className="timetable-toggle">
            <button 
              className="btn-toggle"
              onClick={() => setShowTimetable(true)}
            >
              Show Timetable
            </button>
          </div>
        )}
      </div>

      <div className="subjects-grid">
        {subjects.length === 0 
          ? <p className="no-classes-text">No subjects added yet. Add subjects above to start tracking attendance.</p>
          : subjects.map((subject, index) => {
            const stat = calcStats(subject)
            
            return (
              <div key={subject} className="subject-card">
                <h3 className="subject-title">{subject}</h3>
                
                <div className="stats-overview">
                  <p className={`percentage ${stat.percentage >= targetAttendance ? 'good' : 'warning'}`}>
                    Attendance: {stat.percentage.toFixed(1)}%
                  </p>
                  <p className="total-classes">Total Classes: {stat.total}</p>
                </div>

                <div className="attendance-buttons-main">
                  <h4>Mark Attendance</h4>
                  
                  <div className="date-selector">
                    <label htmlFor={`date-${subject}`}>Select Date:</label>
                    <input 
                      type="date" 
                      id={`date-${subject}`}
                      className="date-picker"
                      value={selectedDates[subject] || new Date().toISOString().split('T')[0]}
                      onChange={(e) => {
                        // Store the selected date for this subject
                        setSelectedDates(prev => ({
                          ...prev,
                          [subject]: e.target.value
                        }))
                      }}
                    />
                  </div>
                  
                  <div className="main-attendance-buttons">
                    <button 
                      className="btn-present"
                      onClick={() => {
                        const selectedDate = selectedDates[subject] || new Date().toISOString().split('T')[0]
                        console.log('Present button clicked for:', subject, 'on date:', selectedDate)
                        addSession(subject, selectedDate, 'scheduled')
                        markAttendance(subject, selectedDate, 'present')
                      }}
                    >
                      Present
                    </button>
                    <button 
                      className="btn-absent"
                      onClick={() => {
                        const selectedDate = selectedDates[subject] || new Date().toISOString().split('T')[0]
                        console.log('Absent button clicked for:', subject, 'on date:', selectedDate)
                        addSession(subject, selectedDate, 'scheduled')
                        markAttendance(subject, selectedDate, 'absent')
                      }}
                    >
                      Absent
                    </button>
                    <button 
                      className="btn-extra"
                      onClick={() => {
                        console.log('Extra Class button clicked for:', subject)
                        setShowExtraOptions({...showExtraOptions, [subject]: !showExtraOptions[subject]})
                      }}
                    >
                      Extra Class
                    </button>
                  </div>
                  
                  {showExtraOptions[subject] && (
                    <div className="extra-options">
                      <div className="extra-buttons">
                        <button 
                          className="btn-present-small"
                          onClick={() => {
                            const selectedDate = selectedDates[subject] || new Date().toISOString().split('T')[0]
                            addSession(subject, selectedDate, 'extra')
                            markAttendance(subject, selectedDate, 'present')
                            setShowExtraOptions({...showExtraOptions, [subject]: false})
                          }}
                        >
                          Present
                        </button>
                        <button 
                          className="btn-absent-small"
                          onClick={() => {
                            const selectedDate = selectedDates[subject] || new Date().toISOString().split('T')[0]
                            addSession(subject, selectedDate, 'extra')
                            markAttendance(subject, selectedDate, 'absent')
                            setShowExtraOptions({...showExtraOptions, [subject]: false})
                          }}
                        >
                          Absent
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {stat.percentage < targetAttendance && stat.effectiveTotal > 0 && (
                  <p className="need-attend">
                    Need to attend {stat.classesNeeded} more {stat.classesNeeded === 1 ? 'class' : 'classes'} to reach {targetAttendance}%
                  </p>
                )}
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default AttendanceTracker

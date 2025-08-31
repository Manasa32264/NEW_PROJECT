import React, { useState, useEffect } from 'react'
import './AttendanceTracker.css'

const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

const AttendanceTracker = ({ onBack }) => {
  const [timetable, setTimetable] = useState([])
  const [sessions, setSessions] = useState([])
  const [targetAttendance, setTargetAttendance] = useState(75)
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
    console.log('addManualEntry called with:', { manualSubject, timetable })
    
    if (!manualSubject.trim()) {
      alert('Please enter subject name.')
      return
    }
    
    console.log('Checking for existing entry...')
    const existingEntry = timetable.some(t => t.subject.toLowerCase() === manualSubject.trim().toLowerCase())
    console.log('Existing entry found:', existingEntry)
    
    if(existingEntry) {
      alert('Subject already exists')
      return
    }
    
    const newEntry = { day: 'General', subject: manualSubject.trim() }
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
    if (type !== 'extra') {
      const existingSessionIndex = sessions.findIndex(s =>
        s.subject === subject && s.date === date && s.status === type
      )
      if (existingSessionIndex !== -1) {
        // Session exists, return to prevent duplicates for scheduled sessions
        return
      }
    }

    // Add session (allow duplicates for extra sessions)
    setSessions(prev => {
      const newSession = {
        subject,
        date,
        status: type,
        attendance: null
      }
      console.log(`Adding ${type} session:`, newSession)
      const newSessions = [...prev, newSession]
      console.log('New sessions array:', newSessions)
      return newSessions
    })
  }


  const markAttendance = (subject, date, status, sessionType = 'scheduled') => {
    console.log('markAttendance called:', { subject, date, status, sessionType, currentSessions: sessions })
    
    // First, ensure the session exists
    const sessionExists = sessions.some(s => 
      s.subject === subject && s.date === date && s.status === sessionType
    )
    
    if (!sessionExists) {
      // Create the session first
      addSession(subject, date, sessionType)
    }
    
    // Now update the attendance
    setSessions(prev => {
      const newSessions = prev.map(s => 
        s.subject === subject && s.date === date && s.status === sessionType
          ? {...s, attendance: status} 
          : s
      )
      console.log('Updated sessions after markAttendance:', newSessions)
      return newSessions
    })
  }

  const calcStats = subject => {
    // Count both scheduled and extra classes for total attendance percentage
    const scheduledSessions = sessions.filter(s => s.subject === subject && s.status === 'scheduled')
    const extraSessions = sessions.filter(s => s.subject === subject && s.status === 'extra')
    
    const totalScheduled = scheduledSessions.length
    const attendedScheduled = scheduledSessions.filter(s => s.attendance === 'present').length
    const absentScheduled = scheduledSessions.filter(s => s.attendance === 'absent').length
    const totalExtra = extraSessions.length
    const attendedExtra = extraSessions.filter(s => s.attendance === 'present').length
    const absentExtra = extraSessions.filter(s => s.attendance === 'absent').length
    
    // Calculate total classes (scheduled + extra)
    const totalClasses = totalScheduled + totalExtra
    const totalAttended = attendedScheduled + attendedExtra
    const totalAbsent = absentScheduled + absentExtra
    
    if(totalClasses === 0) return { 
      percentage: 0, 
      attended: 0, 
      total: 0, 
      absent: 0,
      extra: totalExtra,
      extraAttended: attendedExtra,
      extraAbsent: absentExtra,
      effectiveTotal: 0,
      classesNeeded: 0 
    }
    
    // Calculate percentage based on ALL classes (scheduled + extra)
    const percentage = (totalAttended / totalClasses) * 100
    const classesNeeded = percentage < targetAttendance 
      ? Math.ceil((targetAttendance * totalClasses - 100 * totalAttended) / (100 - targetAttendance))
      : 0
    
    return { 
      percentage, 
      attended: totalAttended, 
      total: totalClasses, 
      absent: totalAbsent,
      extra: totalExtra,
      extraAttended: attendedExtra,
      extraAbsent: absentExtra,
      effectiveTotal: totalClasses,
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

        <h3>Enter All Your Subjects</h3>
        <div className="manual-input">
          <input 
            type="text" 
            placeholder="Type subject name and press Enter to add" 
            value={manualSubject} 
            onChange={e => setManualSubject(e.target.value)}
            onKeyPress={handleKeyPress}
            className="subject-input"
          />
          <button className="btn btn-add" onClick={addManualEntry}>Add Subject</button>
        </div>
        
        <p className="subject-info">Simply type the subject name and add it to start tracking attendance.</p>

        {timetable.length > 0 && (
          <div className="timetable-display">
            <div className="timetable-header">
              <h4>Your Subjects ({timetable.length})</h4>
              <button 
                className="btn-toggle"
                onClick={() => setShowTimetable(!showTimetable)}
              >
                {showTimetable ? 'Hide Subjects' : 'Show Subjects'}
              </button>
            </div>
            {showTimetable && (
              <div className="subjects-list">
                {subjects.map((subject, index) => (
                  <div key={subject} className="subject-item">
                    <span className="subject-name">{subject}</span>
                    <button 
                      className="btn-remove" 
                      onClick={() => removeTimetableEntry('General', subject)}
                      title="Remove subject"
                    >
                      ×
                    </button>
                  </div>
                ))}
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
              Show Subjects
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
                  {stat.extra > 0 && (
                    <p className="extra-classes">Extra Classes: {stat.extra} (Present: {stat.extraAttended}, Absent: {stat.extraAbsent})</p>
                  )}
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
                        markAttendance(subject, selectedDate, 'present', 'scheduled')
                      }}
                    >
                      Present
                    </button>
                    <button 
                      className="btn-absent"
                      onClick={() => {
                        const selectedDate = selectedDates[subject] || new Date().toISOString().split('T')[0]
                        console.log('Absent button clicked for:', subject, 'on date:', selectedDate)
                        markAttendance(subject, selectedDate, 'absent', 'scheduled')
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
                            markAttendance(subject, selectedDate, 'present', 'extra')
                            setShowExtraOptions({...showExtraOptions, [subject]: false})
                          }}
                        >
                          Present
                        </button>
                        <button 
                          className="btn-absent-small"
                          onClick={() => {
                            const selectedDate = selectedDates[subject] || new Date().toISOString().split('T')[0]
                            markAttendance(subject, selectedDate, 'absent', 'extra')
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

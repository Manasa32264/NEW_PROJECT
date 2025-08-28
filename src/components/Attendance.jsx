import React, { useState, useEffect } from 'react'
import './Attendance.css'

const Attendance = ({ onBack }) => {
  const [subjects, setSubjects] = useState([
    { id: 1, name: 'Mathematics', attended: 0, total: 0 },
    { id: 2, name: 'Physics', attended: 0, total: 0 },
    { id: 3, name: 'Chemistry', attended: 0, total: 0 },
    { id: 4, name: 'Computer Science', attended: 0, total: 0 }
  ])
  
  const [newSubject, setNewSubject] = useState('')
  const [targetAttendance, setTargetAttendance] = useState(75)

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('academate-attendance')
    if (savedData) {
      const { subjects: savedSubjects, target } = JSON.parse(savedData)
      setSubjects(savedSubjects)
      setTargetAttendance(target || 75)
    }
  }, [])

  // Save data to localStorage whenever subjects or target changes
  useEffect(() => {
    localStorage.setItem('academate-attendance', JSON.stringify({
      subjects,
      target: targetAttendance
    }))
  }, [subjects, targetAttendance])

  const addSubject = () => {
    if (newSubject.trim()) {
      setSubjects([...subjects, {
        id: Date.now(),
        name: newSubject.trim(),
        attended: 0,
        total: 0
      }])
      setNewSubject('')
    }
  }

  const updateAttendance = (id, field, value) => {
    setSubjects(subjects.map(subject => {
      if (subject.id === id) {
        const updated = { ...subject, [field]: Math.max(0, parseInt(value) || 0) }
        // Ensure attended doesn't exceed total
        if (field === 'attended' && updated.attended > updated.total) {
          updated.total = updated.attended
        }
        return updated
      }
      return subject
    }))
  }

  const markAttendance = (id, present) => {
    setSubjects(subjects.map(subject => {
      if (subject.id === id) {
        return {
          ...subject,
          total: subject.total + 1,
          attended: present ? subject.attended + 1 : subject.attended
        }
      }
      return subject
    }))
  }

  const removeSubject = (id) => {
    setSubjects(subjects.filter(subject => subject.id !== id))
  }

  const calculateStats = (subject) => {
    const percentage = subject.total > 0 ? (subject.attended / subject.total) * 100 : 0
    const classesNeeded = Math.max(0, Math.ceil((targetAttendance * subject.total - 100 * subject.attended) / (100 - targetAttendance)))
    const canSkip = percentage > targetAttendance ? 
      Math.floor((100 * subject.attended - targetAttendance * subject.total) / targetAttendance) : 0
    
    return { percentage, classesNeeded, canSkip }
  }

  const overallStats = () => {
    const totalAttended = subjects.reduce((sum, s) => sum + s.attended, 0)
    const totalClasses = subjects.reduce((sum, s) => sum + s.total, 0)
    const overallPercentage = totalClasses > 0 ? (totalAttended / totalClasses) * 100 : 0
    
    return { totalAttended, totalClasses, overallPercentage }
  }

  const stats = overallStats()

  return (
    <div className="attendance-container">
      <div className="attendance-header">
        <h2 className="attendance-title">📋 Attendance Tracker</h2>
        <button className="btn back-btn" onClick={onBack}>← Back to Home</button>
      </div>

      {/* Overall Stats */}
      <div className="overall-stats">
        <div className="stat-card">
          <h3>Overall Attendance</h3>
          <div className="stat-value">
            {stats.overallPercentage.toFixed(1)}%
          </div>
          <div className="stat-detail">
            {stats.totalAttended} / {stats.totalClasses} classes
          </div>
        </div>
        
        <div className="stat-card">
          <h3>Target</h3>
          <div className="stat-value target-input">
            <input
              type="number"
              min="0"
              max="100"
              value={targetAttendance}
              onChange={(e) => setTargetAttendance(Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
              className="target-input-field"
            />
            <span>%</span>
          </div>
        </div>
        
        <div className={`stat-card ${stats.overallPercentage >= targetAttendance ? 'good' : 'warning'}`}>
          <h3>Status</h3>
          <div className="stat-value">
            {stats.overallPercentage >= targetAttendance ? '✅' : '⚠️'}
          </div>
          <div className="stat-detail">
            {stats.overallPercentage >= targetAttendance ? 'On Track' : 'Below Target'}
          </div>
        </div>
      </div>

      {/* Add Subject */}
      <div className="add-subject-section">
        <h3>Add New Subject</h3>
        <div className="add-subject-form">
          <input
            type="text"
            placeholder="Subject name"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            className="subject-input"
            onKeyPress={(e) => e.key === 'Enter' && addSubject()}
          />
          <button onClick={addSubject} className="btn btn-add">Add Subject</button>
        </div>
      </div>

      {/* Subjects List */}
      <div className="subjects-section">
        <h3>Subjects</h3>
        <div className="subjects-grid">
          {subjects.map(subject => {
            const subjectStats = calculateStats(subject)
            return (
              <div key={subject.id} className="subject-card">
                <div className="subject-header">
                  <h4>{subject.name}</h4>
                  <button 
                    onClick={() => removeSubject(subject.id)}
                    className="remove-btn"
                    title="Remove subject"
                  >
                    ×
                  </button>
                </div>
                
                <div className="attendance-display">
                  <div className={`percentage ${subjectStats.percentage >= targetAttendance ? 'good' : 'warning'}`}>
                    {subjectStats.percentage.toFixed(1)}%
                  </div>
                  <div className="attendance-fraction">
                    {subject.attended} / {subject.total}
                  </div>
                </div>

                <div className="attendance-inputs">
                  <div className="input-group">
                    <label>Attended</label>
                    <input
                      type="number"
                      min="0"
                      max={subject.total}
                      value={subject.attended}
                      onChange={(e) => updateAttendance(subject.id, 'attended', e.target.value)}
                      className="attendance-input"
                    />
                  </div>
                  <div className="input-group">
                    <label>Total</label>
                    <input
                      type="number"
                      min={subject.attended}
                      value={subject.total}
                      onChange={(e) => updateAttendance(subject.id, 'total', e.target.value)}
                      className="attendance-input"
                    />
                  </div>
                </div>

                <div className="quick-actions">
                  <button
                    onClick={() => markAttendance(subject.id, true)}
                    className="btn btn-present"
                  >
                    ✅ Present
                  </button>
                  <button
                    onClick={() => markAttendance(subject.id, false)}
                    className="btn btn-absent"
                  >
                    ❌ Absent
                  </button>
                </div>

                <div className="attendance-advice">
                  {subjectStats.percentage >= targetAttendance ? (
                    <div className="advice good">
                      {subjectStats.canSkip > 0 ? 
                        `You can skip ${subjectStats.canSkip} classes` : 
                        'Maintain current attendance'
                      }
                    </div>
                  ) : (
                    <div className="advice warning">
                      Need {subjectStats.classesNeeded} more classes to reach {targetAttendance}%
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Tips */}
      <div className="tips-section">
        <h3>Attendance Tips</h3>
        <div className="tips-list">
          <div className="tip">
            <strong>📊 Track Daily:</strong> Mark attendance right after each class
          </div>
          <div className="tip">
            <strong>🎯 Set Goals:</strong> Most colleges require 75% minimum attendance
          </div>
          <div className="tip">
            <strong>⚡ Plan Ahead:</strong> Use predictions to plan when you can take breaks
          </div>
          <div className="tip">
            <strong>📱 Stay Updated:</strong> Your data is saved locally in your browser
          </div>
        </div>
      </div>
    </div>
  )
}

export default Attendance

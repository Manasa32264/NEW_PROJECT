/**
 * Attendify - Attendance Tracking Component
 * 
 * This component provides a comprehensive attendance management system that:
 * - Tracks class attendance for multiple subjects
 * - Manages timetable with scheduled classes
 * - Calculates attendance percentages in real-time
 * - Provides manual attendance entry and editing
 * - Shows attendance statistics and warnings
 * - Supports undo functionality for recent actions
 * 
 * Features:
 * - Interactive timetable management
 * - Real-time attendance calculation
 * - Data persistence with localStorage
 * - Responsive design with modern UI
 * - Action history and undo functionality
 */

import React, { useState, useEffect } from 'react';
import '../styles/AttendanceTracker.css';

const AttendanceTracker = ({ onBack }) => {
  // State management for attendance tracking
  const [timetable, setTimetable] = useState([]); // Scheduled classes timetable
  const [sessions, setSessions] = useState([]); // Attendance sessions/records
  const [targetAttendance, setTargetAttendance] = useState(75); // Target attendance percentage
  const [manualSubject, setManualSubject] = useState(''); // Manual subject entry
  const [showTimetable, setShowTimetable] = useState(true); // Toggle timetable view
  const [showExtraOptions, setShowExtraOptions] = useState({}); // Extra options visibility
  const [selectedDates, setSelectedDates] = useState({}); // Selected dates for attendance
  const [actionHistory, setActionHistory] = useState([]); // History for undo functionality
  const [showUndo, setShowUndo] = useState(false); // Show undo button state
  const [extraShowMore, setExtraShowMore] = useState({}); // Show more for extra classes
  const [scheduledShowMore, setScheduledShowMore] = useState({}); // Show more for scheduled classes

  // Load data from localStorage
  useEffect(() => {
    const savedTimetable = localStorage.getItem('timetable');
    const savedSessions = localStorage.getItem('sessions');
    const savedTarget = localStorage.getItem('targetAttendance');
    const savedSelectedDates = localStorage.getItem('selectedDates');
    const savedActionHistory = localStorage.getItem('actionHistory');

    if (savedTimetable) setTimetable(JSON.parse(savedTimetable));
    if (savedSessions) setSessions(JSON.parse(savedSessions));
    if (savedTarget) setTargetAttendance(parseInt(savedTarget));
    if (savedSelectedDates) setSelectedDates(JSON.parse(savedSelectedDates));
    if (savedActionHistory) setActionHistory(JSON.parse(savedActionHistory));
  }, []);

  // Save to localStorage
  useEffect(() => localStorage.setItem('timetable', JSON.stringify(timetable)), [timetable]);
  useEffect(() => localStorage.setItem('sessions', JSON.stringify(sessions)), [sessions]);
  useEffect(() => localStorage.setItem('targetAttendance', targetAttendance.toString()), [targetAttendance]);
  useEffect(() => localStorage.setItem('selectedDates', JSON.stringify(selectedDates)), [selectedDates]);
  useEffect(() => localStorage.setItem('actionHistory', JSON.stringify(actionHistory)), [actionHistory]);

  const addManualEntry = () => {
    if (!manualSubject.trim()) return alert('Please enter subject name.');
    const existingEntry = timetable.some(t => t.subject.toLowerCase() === manualSubject.trim().toLowerCase());
    if (existingEntry) return alert('Subject already exists');

    const newEntry = { day: 'General', subject: manualSubject.trim() };
    setTimetable(prev => [...prev, newEntry]);

    const today = new Date().toISOString().split('T')[0];
    setSelectedDates(prev => ({ ...prev, [manualSubject.trim()]: today }));

    setManualSubject('');
    setShowTimetable(true);
  };

  const handleKeyPress = e => { if (e.key === 'Enter') addManualEntry(); };
  const removeTimetableEntry = (day, subject) => setTimetable(timetable.filter(t => !(t.day === day && t.subject === subject)));

  const addToHistory = (action, sessionData) => {
    const historyEntry = { id: Date.now(), action, sessionData, timestamp: new Date().toISOString() };
    setActionHistory(prev => [historyEntry, ...prev].slice(0, 10));
    setShowUndo(true);
    setTimeout(() => setShowUndo(false), 5000);
  };

  const undoLastAction = () => {
    if (!actionHistory.length) return;
    const lastAction = actionHistory[0];
    const { action, sessionData } = lastAction;

    if (action === 'add_session') setSessions(prev => prev.filter(s => s.id !== sessionData.id));
    else if (action === 'mark_attendance')
      setSessions(prev => prev.map(s => s.id === sessionData.id ? { ...s, attendance: sessionData.previousAttendance } : s));

    setActionHistory(prev => prev.slice(1));
    setShowUndo(false);
  };

  const markAttendance = (subject, date, status, sessionType = 'scheduled') => {
    if (sessionType === 'extra') {
      const newSession = { id: Date.now() + Math.random(), subject, date, status: sessionType, attendance: status, timestamp: new Date().toISOString() };
      setSessions(prev => [...prev, newSession]);
      addToHistory('add_session', newSession);
      return;
    }

    let sessionExists = sessions.find(s => s.subject === subject && s.date === date && s.status === sessionType);
    if (!sessionExists) {
      const newSession = { id: Date.now() + Math.random(), subject, date, status: sessionType, attendance: status, timestamp: new Date().toISOString() };
      setSessions(prev => [...prev, newSession]);
      addToHistory('add_session', newSession);
      return;
    }

    const previousAttendance = sessionExists.attendance;
    setSessions(prev => prev.map(s => s.id === sessionExists.id ? { ...s, attendance: status } : s));
    addToHistory('mark_attendance', { id: sessionExists.id, subject, date, status: sessionType, previousAttendance, newAttendance: status });
  };

  const calcStats = subject => {
    const scheduledSessions = sessions.filter(s => s.subject === subject && s.status === 'scheduled');
    const extraSessions = sessions.filter(s => s.subject === subject && s.status === 'extra');

    const totalScheduled = scheduledSessions.length;
    const attendedScheduled = scheduledSessions.filter(s => s.attendance === 'present').length;
    const totalExtra = extraSessions.length;
    const attendedExtra = extraSessions.filter(s => s.attendance === 'present').length;
    const totalClasses = totalScheduled + totalExtra;
    const totalAttended = attendedScheduled + attendedExtra;
    const totalAbsent = (totalScheduled - attendedScheduled) + (totalExtra - attendedExtra);

    if (totalClasses === 0) return { percentage: 0, attended: 0, total: 0, absent: 0, extra: totalExtra, extraAttended: attendedExtra, extraAbsent: totalExtra - attendedExtra, effectiveTotal: 0, classesNeeded: 0 };

    const percentage = (totalAttended / totalClasses) * 100;
    const classesNeeded = percentage < targetAttendance ? Math.ceil((targetAttendance * totalClasses - 100 * totalAttended) / (100 - targetAttendance)) : 0;

    return { percentage, attended: totalAttended, total: totalClasses, absent: totalAbsent, extra: totalExtra, extraAttended: attendedExtra, extraAbsent: totalExtra - attendedExtra, effectiveTotal: totalClasses, classesNeeded };
  };

  const subjects = [...new Set(timetable.map(t => t.subject))];

  return (
    <div className="attendance-container">
      <div className="attendance-header">
        <h2 className="attendance-title">📋 Attendance Tracker</h2>
        <div className="header-actions">
          {showUndo && <button className="btn undo-btn" onClick={undoLastAction}>↶ Undo Last Action</button>}
          <button className="btn back-btn" onClick={onBack}>← Back to Home</button>
        </div>
      </div>

      <div className="upload-section">
        <h3>Target Attendance Percentage</h3>
        <div className="target-input">
          <input type="number" min="0" max="100" value={targetAttendance} onChange={e => setTargetAttendance(parseInt(e.target.value) || 75)} className="target-slider"/>
          <span className="target-label">%</span>
        </div>

        <h3>Enter All Your Subjects</h3>
        <div className="manual-input">
          <input type="text" placeholder="Type subject name and press Enter to add" value={manualSubject} onChange={e=>setManualSubject(e.target.value)} onKeyPress={handleKeyPress} className="subject-input"/>
          <button className="btn btn-add" onClick={addManualEntry}>Add Subject</button>
        </div>
        <p className="subject-info">Simply type the subject name and add it to start tracking attendance.</p>

        {timetable.length > 0 && (
          <div className="timetable-display">
            <div className="timetable-header">
              <h4>Your Subjects ({timetable.length})</h4>
              <button className="btn-toggle" onClick={()=>setShowTimetable(!showTimetable)}>{showTimetable?'Hide Subjects':'Show Subjects'}</button>
            </div>
            {showTimetable && (
              <div className="subjects-list">
                {subjects.map(subject => (
                  <div key={subject} className="subject-item">
                    <span className="subject-name">{subject}</span>
                    <button className="btn-remove" onClick={()=>removeTimetableEntry('General',subject)} title="Remove subject">×</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="subjects-grid">
        {subjects.length === 0 ? <p className="no-classes-text">No subjects added yet. Add subjects above to start tracking attendance.</p> : subjects.map(subject => {
          const stat = calcStats(subject);
          const scheduledSessions = sessions
            .filter(s => s.subject === subject && s.status === 'scheduled')
            .sort((a, b) => new Date(b.date) - new Date(a.date));

          return (
            <div key={subject} className="subject-card">
              <h3 className="subject-title">{subject}</h3>
              <div className="stats-overview">
                <p className={`percentage ${stat.percentage>=targetAttendance?'good':'warning'}`}>Attendance: {stat.percentage.toFixed(1)}%</p>
                <p className="total-classes">Total Classes: {stat.total}</p>
                {stat.extra>0 && <p className="extra-classes">Extra Classes: {stat.extra} (Present: {stat.extraAttended}, Absent: {stat.extraAbsent})</p>}
              </div>

              <div className="attendance-buttons-main">
                <h4>Mark Attendance</h4>
                <div className="date-selector">
                  <label htmlFor={`date-${subject}`}>Select Date:</label>
                  <input type="date" id={`date-${subject}`} className="date-picker" value={selectedDates[subject]||new Date().toISOString().split('T')[0]} onChange={e=>setSelectedDates(prev=>({...prev,[subject]:e.target.value}))}/>
                </div>
                <div className="main-attendance-buttons">
                  <button className="btn-present" onClick={()=>markAttendance(subject,selectedDates[subject]||new Date().toISOString().split('T')[0],'present','scheduled')}>Present</button>
                  <button className="btn-absent" onClick={()=>markAttendance(subject,selectedDates[subject]||new Date().toISOString().split('T')[0],'absent','scheduled')}>Absent</button>
                  <button className="btn-extra" onClick={()=>setShowExtraOptions({...showExtraOptions,[subject]:!showExtraOptions[subject]})}>Extra Class</button>
                </div>

                {/* Scheduled Class History */}
                {scheduledSessions.length > 0 && (
                  <div className="scheduled-history">
                    <h5>Scheduled Class History:</h5>
                    {scheduledSessions
                      .slice(0, scheduledShowMore[subject] ? undefined : 3)
                      .map(session => (
                        <div key={session.id} className="session-item">
                          <span>{session.date}</span>
                          <span className={session.attendance}>
                            {session.attendance === 'present' ? '✅ Present' : session.attendance === 'absent' ? '❌ Absent' : '⏳ Pending'}
                          </span>
                          <button
                            onClick={() => {
                              setSessions(prev => prev.filter(s => s.id !== session.id));
                              addToHistory('remove_session', session);
                            }}
                          >🗑️</button>
                        </div>
                      ))
                    }
                    {scheduledSessions.length > 3 && (
                      <button
                        className="btn-show-more"
                        onClick={() => setScheduledShowMore(prev => ({ ...prev, [subject]: !prev[subject] }))}
                      >
                        {scheduledShowMore[subject] ? 'Show Less' : 'Show More'}
                      </button>
                    )}
                  </div>
                )}

                {/* Extra Class Section */}
                {stat.extra > 0 && (
                  <div className="extra-history">
                    <h5>Extra Class History:</h5>
                    {sessions
                      .filter(s => s.subject === subject && s.status === 'extra')
                      .sort((a, b) => new Date(b.date) - new Date(a.date))
                      .slice(0, extraShowMore[subject] ? undefined : 3)
                      .map(session => (
                        <div key={session.id} className="extra-session-item">
                          <span>{session.date}</span>
                          <span className={session.attendance}>
                            {session.attendance === 'present' ? '✅ Present' : session.attendance === 'absent' ? '❌ Absent' : '⏳ Pending'}
                          </span>
                          <button
                            onClick={() => {
                              setSessions(prev => prev.filter(s => s.id !== session.id));
                              addToHistory('remove_session', session);
                            }}
                          >🗑️</button>
                        </div>
                      ))
                    }
                    {sessions.filter(s => s.subject === subject && s.status === 'extra').length > 3 && (
                      <button
                        className="btn-show-more"
                        onClick={() => setExtraShowMore(prev => ({ ...prev, [subject]: !prev[subject] }))}
                      >
                        {extraShowMore[subject] ? 'Show Less' : 'Show More'}
                      </button>
                    )}
                  </div>
                )}

                {/* Extra Mark Attendance Options */}
                {showExtraOptions[subject] && (
                  <div className="extra-options">
                    <button className="btn-present-small" onClick={()=>markAttendance(subject,selectedDates[subject]||new Date().toISOString().split('T')[0],'present','extra')}>Present</button>
                    <button className="btn-absent-small" onClick={()=>markAttendance(subject,selectedDates[subject]||new Date().toISOString().split('T')[0],'absent','extra')}>Absent</button>
                    <button className="btn-close-extra" onClick={()=>setShowExtraOptions({...showExtraOptions,[subject]:false})}>✕ Close</button>
                  </div>
                )}

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AttendanceTracker;

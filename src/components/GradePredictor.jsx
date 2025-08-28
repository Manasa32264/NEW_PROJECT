import React, { useState, useMemo } from 'react'
import './GradePredictor.css'

const GradePredictor = ({ onBack }) => {
  const [cie1, setCie1] = useState(0) // Out of 20
  const [cie2, setCie2] = useState(0) // Out of 30
  const [cie3, setCie3] = useState(0) // Out of 30
  
  // Grade bands as specified
  const gradeBands = [
    { grade: 'S', min: 90, max: 100, color: '#059669' },
    { grade: 'A', min: 80, max: 89, color: '#0891b2' },
    { grade: 'B', min: 70, max: 79, color: '#7c3aed' },
    { grade: 'C', min: 65, max: 69, color: '#dc2626' },
    { grade: 'D', min: 55, max: 64, color: '#ea580c' },
    { grade: 'E', min: 45, max: 54, color: '#ca8a04' },
    { grade: 'F', min: 0, max: 44, color: '#6b7280' }
  ]

  const calculations = useMemo(() => {
    // Total CIE: 20 + 30 + 30 = 80, but reduced to 40
    const totalCie = (cie1 + cie2 + cie3) * (40 / 80) // Scale to 40
    
    const results = gradeBands.map(band => {
      // Total needed = CIE (40) + SEE (60) = 100
      // So SEE needed = (band.min - totalCie) * (60/60) = band.min - totalCie
      const seeNeeded = Math.max(0, band.min - totalCie)
      const seeNeededOutOf100 = (seeNeeded / 60) * 100 // Convert to percentage of 100
      
      return {
        ...band,
        seeNeeded: Math.min(60, Math.max(0, seeNeeded)),
        seeNeededOutOf100: Math.min(100, Math.max(0, seeNeededOutOf100)),
        achievable: seeNeeded <= 60
      }
    })
    
    return { totalCie, results }
  }, [cie1, cie2, cie3])

  const currentGrade = useMemo(() => {
    const maxPossibleTotal = calculations.totalCie + 60 // If student gets full SEE
    for (const band of gradeBands) {
      if (maxPossibleTotal >= band.min) {
        return band.grade
      }
    }
    return 'F'
  }, [calculations.totalCie, gradeBands])

  return (
    <div className="grade-predictor-container">
      <div className="grade-header">
        <h2 className="grade-title">📊 Grade Predictor</h2>
        <button className="btn back-btn" onClick={onBack}>← Back to Home</button>
      </div>

      <div className="grade-content">
        {/* CIE Input Section */}
        <div className="cie-section">
          <h3>Enter your CIE Marks</h3>
          <div className="cie-inputs">
            <div className="input-group">
              <label className="input-label">CIE 1 (Out of 20)</label>
              <input
                type="number"
                min="0"
                max="20"
                value={cie1}
                onChange={(e) => setCie1(Math.min(20, Math.max(0, Number(e.target.value))))}
                className="grade-input"
              />
            </div>
            
            <div className="input-group">
              <label className="input-label">CIE 2 (Out of 30)</label>
              <input
                type="number"
                min="0"
                max="30"
                value={cie2}
                onChange={(e) => setCie2(Math.min(30, Math.max(0, Number(e.target.value))))}
                className="grade-input"
              />
            </div>
            
            <div className="input-group">
              <label className="input-label">CIE 3 (Out of 30)</label>
              <input
                type="number"
                min="0"
                max="30"
                value={cie3}
                onChange={(e) => setCie3(Math.min(30, Math.max(0, Number(e.target.value))))}
                className="grade-input"
              />
            </div>
          </div>
          
          <div className="cie-summary">
            <div className="summary-item">
              <span>Total CIE Raw: {cie1 + cie2 + cie3}/80</span>
            </div>
            <div className="summary-item">
              <span>CIE Scaled: {calculations.totalCie.toFixed(1)}/40</span>
            </div>
            <div className="summary-item best-possible">
              <span>Best Possible Grade: <strong>{currentGrade}</strong></span>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="results-section">
          <h3>SEE Requirements for Each Grade</h3>
          <div className="grade-results">
            {calculations.results.map(result => (
              <div 
                key={result.grade} 
                className={`grade-card ${result.achievable ? 'achievable' : 'not-achievable'}`}
                style={{ borderLeftColor: result.color }}
              >
                <div className="grade-header-card">
                  <span className="grade-letter" style={{ color: result.color }}>
                    {result.grade}
                  </span>
                  <span className="grade-range">
                    ({result.min}-{result.max}%)
                  </span>
                </div>
                
                <div className="grade-details">
                  <div className="see-requirement">
                    <strong>SEE Required:</strong>
                    <span className="see-score">
                      {result.seeNeeded.toFixed(1)}/60
                    </span>
                    <span className="see-percentage">
                      ({result.seeNeededOutOf100.toFixed(1)}%)
                    </span>
                  </div>
                  
                  {!result.achievable && (
                    <div className="not-achievable-note">
                      ❌ Not achievable with current CIE
                    </div>
                  )}
                  
                  {result.achievable && result.seeNeeded <= 36 && (
                    <div className="easy-target">
                      ✅ Easily achievable!
                    </div>
                  )}
                  
                  {result.achievable && result.seeNeeded > 36 && result.seeNeeded <= 48 && (
                    <div className="moderate-target">
                      ⚠️ Requires good preparation
                    </div>
                  )}
                  
                  {result.achievable && result.seeNeeded > 48 && (
                    <div className="hard-target">
                      🔥 Challenging target
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <div className="tips-section">
          <h3>Study Tips</h3>
          <div className="tips-grid">
            <div className="tip-card">
              <h4>📚 For S Grade (90%+)</h4>
              <p>Master all concepts, solve previous years, focus on application-based questions</p>
            </div>
            <div className="tip-card">
              <h4>🎯 For A Grade (80%+)</h4>
              <p>Strong fundamentals, regular practice, cover all important topics thoroughly</p>
            </div>
            <div className="tip-card">
              <h4>📝 For B Grade (70%+)</h4>
              <p>Focus on core concepts, practice standard problems, time management</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GradePredictor

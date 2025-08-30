import React, { useState, useMemo } from 'react'
import './GradePredictor.css'

const GradePredictor = ({ onBack }) => {
  const [focusedInput, setFocusedInput] = useState(null);
  const [cie1, setCie1] = useState(0) // Out of 30
  const [cie2, setCie2] = useState(0) // Out of 20
  const [cie3, setCie3] = useState(0) // Out of 30
  
  // Grade bands as specified
  const gradeBands = [
    { grade: 'S', min: 90, max: 100, color:'#f4b30c' },
    { grade: 'A', min: 75, max: 89, color: '#f4b30c' },
    { grade: 'B', min: 66, max: 74, color: '#f4b30c' },
    { grade: 'C', min: 56, max: 65, color: '#f4b30c' },
    { grade: 'D', min: 50, max: 55, color: '#f4b30c' },
    { grade: 'E', min: 45, max: 49, color: '#f4b30c' },
    { grade: 'F', min: 0, max: 45, color:  '#f4b30c' }
  ]

    const CIE_MIN = 21;
    const SEE_MIN = 24;

    const calculations = useMemo(() => {
      const totalCie = (cie1 + cie2 + cie3) * (40 / 80); // CIE scaled out of 40
      const cieFail = totalCie < CIE_MIN;

      const results = gradeBands.map(band => {
        const seeNeeded = Math.max(0, band.min - totalCie);
        // Enforce minimum SEE required as 24 out of 60 (per rules)
        const minSeeRequired = Math.max(seeNeeded, SEE_MIN);

        const seeNeededOutOf100 = (minSeeRequired / 60) * 100;

        // Fail if CIE or required SEE is below minimum
        const fail = cieFail || minSeeRequired < SEE_MIN;

        return {
          ...band,
          seeNeeded: Math.min(60, minSeeRequired),
          seeNeededOutOf100: Math.min(100, seeNeededOutOf100),
          achievable: !fail && minSeeRequired <= 60,
          fail
        };
      });

      return { totalCie, cieFail, results };
    }, [cie1, cie2, cie3]);

    const currentGrade = useMemo(() => {
      if (calculations.cieFail) return 'F';
      // Also check if SEE minimum is violated overall
      for (const band of gradeBands) {
        if (calculations.totalCie + 60 >= band.min) {
          return band.grade;
        }
      }
      return 'F';
    }, [calculations, gradeBands]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // Focus next input or submit
      const inputs = ['cie1', 'cie2', 'cie3'];
      const currentIndex = inputs.indexOf(focusedInput);
      if (currentIndex < inputs.length - 1) {
        document.getElementById(inputs[currentIndex + 1])?.focus();
      }
    }
  }

  return (
    <div className="grade-predictor-container">
      <div className="grade-header">
        <h2 className="grade-title">📊 GradeGenie</h2>
        <button className="btn back-btn" onClick={onBack}>← Back to Home</button>
      </div>

      <div className="grade-content">
        {/* CIE Input Section */}
        <div className="cie-section">
          <h3>Enter your CIE Marks</h3>
          <div className="cie-inputs">
            <div className="input-group">
              <label className="input-label">CIE 1 (Out of 30)</label>
              <input
                type="number"
                min="0"
                max="30"
                value={focusedInput === 'cie1' && cie1 === 0 ? '' : cie1}
                onFocus={() => setFocusedInput('cie1')}
                onBlur={() => setFocusedInput(null)}
                onChange={(e) => setCie1(Math.min(30, Math.max(0, Number(e.target.value))))}
                onKeyPress={handleKeyPress}
                className="grade-input"
                placeholder="0-30"
              />
            </div>
            
            <div className="input-group">
              <label className="input-label">Event 1 (Out of 20)</label>
              <input
                type="number"
                min="0"
                max="20"
                value={focusedInput === 'cie2' && cie2 === 0 ? '' : cie2}
                onFocus={() => setFocusedInput('cie2')}
                onBlur={() => setFocusedInput(null)}
                onChange={(e) => setCie2(Math.min(20, Math.max(0, Number(e.target.value))))}
                onKeyPress={handleKeyPress}
                className="grade-input"
                placeholder="0-20"
              />
            </div>
            
            <div className="input-group">
              <label className="input-label">CIE 2 (Out of 30)</label>
              <input
                type="number"
                min="0"
                max="30"
                value={focusedInput === 'cie3' && cie3 === 0 ? '' : cie3}
                onFocus={() => setFocusedInput('cie3')}
                onBlur={() => setFocusedInput(null)}
                onChange={(e) => setCie3(Math.min(30, Math.max(0, Number(e.target.value))))}
                onKeyPress={handleKeyPress}
                className="grade-input"
                placeholder="0-30"
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
                {result.fail && (
                  <div className="not-achievable-note" style={{ color: '#dc2626', fontWeight: '700' }}>
                    ❌ Fail: CIE below minimum required (21/40)
                  </div>
                )}
                <div className="grade-details">
                 <div className="see-requirement">
                  <strong>SEE Required:</strong>
                  <span className="see-score">
                    {result.seeNeeded.toFixed(1)}/60
                  </span>
                  <span className="see-score-100">
                    &nbsp;| {result.seeNeededOutOf100.toFixed(1)}/100
                  </span>
                  <span className="see-percentage">
                    ({result.seeNeededOutOf100.toFixed(1)}%)
                  </span>
                </div>
                  
                  {!result.achievable && (
                    <div className="not-achievable-note">
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

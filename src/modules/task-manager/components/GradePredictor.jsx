/**
 * GradeGenie - Grade Prediction Component
 * 
 * This component provides a comprehensive grade prediction tool that:
 * - Calculates grades based on CIE (Continuous Internal Evaluation) marks
 * - Predicts required SEE (Semester End Examination) marks for different grade bands
 * - Displays grade bands from S to F with color-coded visualization
 * - Enforces minimum CIE and SEE requirements as per academic rules
 * 
 * Features:
 * - Real-time calculation as user inputs marks
 * - Interactive grade band visualization
 * - Minimum requirement validation
 * - Responsive design with modern UI
 */

import React, { useState, useMemo } from 'react'

const GradePredictor = ({ onBack }) => {
  // GradePredictor CSS styles
  const gradePredictorStyles = `
    :root {
      --white: white;
      --beige: #fbf9f1;
      --accent: #f4b30c;
      --black: black;
      --brown: #1a1200;
      --beige-footer: #ddd9c5;
    }

    .grade-predictor-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .grade-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      padding: 1rem;
      background: var(--white);
      border-radius: 12px;
      box-shadow: 0 2px 8px #f4b30c;
    }

    .grade-title {
      margin: 0;
      color: var(--brown);
      font-size: 1.5rem;
      font-weight: 700;
    }

    .back-btn {
      background: var(--brown);
      color: var(--white);
      border: none;
      padding: 0.6rem 1.2rem;
      border-radius: 6px;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .back-btn:hover {
      background: #2a1a00;
      transform: translateY(-1px);
    }

    .grade-content {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    /* CIE Input Section */
    .cie-section {
      background: var(--white);
      padding: 1.2rem;
      border-radius: 12px;
      box-shadow: 0 2px 8px #f4b30c;
    }

    .cie-section h3 {
      margin: 0 0 1rem 0;
      color: var(--brown);
      font-size: 1.1rem;
      font-weight: 600;
    }

    .cie-inputs {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .input-group {
      display: flex;
      flex-direction: column;
    }

    .input-label {
      margin-bottom: 0.5rem;
      color: var(--brown);
      font-size: 0.9rem;
      font-weight: 600;
    }

    .grade-input {
      padding: 0.8rem;
      border: 2px solid var(--beige-footer);
      border-radius: 6px;
      font-size: 1rem;
      background: var(--white);
      color: var(--brown);
      transition: all 0.2s ease;
    }

    .grade-input:focus {
      outline: none;
      border-color: var(--accent);
      box-shadow: 0 0 0 2px #f4b30c;
    }

    .grade-input::placeholder {
      color: var(--beige-footer);
    }

    .cie-summary {
      background: var(--beige);
      padding: 1rem;
      border-radius: 8px;
      border-left: 4px solid var(--accent);
    }

    .summary-item {
      margin-bottom: 0.5rem;
      color: var(--brown);
      font-size: 0.9rem;
      font-weight: 500;
    }

    .summary-item:last-child {
      margin-bottom: 0;
    }

    .best-possible {
      font-weight: 600;
      color: var(--accent);
      font-size: 1rem;
    }

    /* Results Section */
    .results-section {
      background: var(--white);
      padding: 1.2rem;
      border-radius: 12px;
      box-shadow: 0 2px 8px #f4b30c;
    }

    .results-section h3 {
      margin: 0 0 1rem 0;
      color: var(--black);
      font-size: 1.1rem;
      font-weight: 600;
    }

    .grade-results {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1rem;
    }

    .grade-card {
      background: var(--beige);
      padding: 1rem;
      border-radius: 8px;
      border-left: 4px solid var(--accent);
      border-right: 1px solid var(--accent);  
      border-bottom: 1px solid var(--accent);
      border-top: 1px solid var(--accent);
      border-color: #f4b30c;
      transition: all 0.2s ease;
    }

    .grade-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px #f4b30c;
    }

    .grade-card.not-achievable {
      opacity: 0.7;
      background: var(--beige);
      border-top:#000000;
      border-color: #000000;
    }

    .grade-header-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.8rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid var(--beige-footer);
    }

    .grade-letter {
      font-size: 1.5rem;
      font-weight: 700;
    }

    .grade-range {
      color: var(--brown);
      font-size: 0.8rem;
      font-weight: 500;
    }

    .not-achievable-note {
      background: #fbf9f1;
      color: #f41e1e;
      padding: 0.5rem;
      border-radius: 4px;
      margin-bottom: 0.8rem;
      font-size: 0.8rem;
      text-align: center;
    }

    .grade-details {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .see-requirement {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      margin-bottom: 0.5rem;
    }

    .see-requirement strong {
      color: var(--brown);
      font-size: 0.9rem;
    }

    .see-score {
      color: var(--accent);
      font-weight: 600;
      font-size: 0.9rem;
    }

    .see-score-100 {
      color: var(--brown);
      font-size: 0.8rem;
    }

    .see-percentage {
      color: var(--brown);
      font-size: 0.8rem;
      opacity: 0.8;
    }

    .easy-target {
      background: #dcfce7;
      color: #059669;
      padding: 0.5rem;
      border-radius: 4px;
      text-align: center;
      font-size: 0.8rem;
      font-weight: 600;
    }

    .moderate-target {
      background: #fef3c7;
      color: #d97706;
      padding: 0.5rem;
      border-radius: 4px;
      text-align: center;
      font-size: 0.8rem;
      font-weight: 600;
    }

    .hard-target {
      background: #fee2e2;
      color: #dc2626;
      padding: 0.5rem;
      border-radius: 4px;
      text-align: center;
      font-size: 0.8rem;
      font-weight: 600;
    }

    /* Tips Section */
    .tips-section {
      background: var(--white);
      padding: 1.2rem;
      border-radius: 12px;
      box-shadow: 0 2px 8px #f4b30c;
    }

    .tips-section h3 {
      margin: 0 0 1rem 0;
      color: var(--brown);
      font-size: 1.1rem;
      font-weight: 600;
    }

    .tips-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1rem;
    }

    .tip-card {
      background: var(--beige);
      padding: 1rem;
      border-radius: 8px;
      border-left: 4px solid var(--accent);
      transition: all 0.2s ease;
    }

    .tip-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .tip-card h4 {
      margin: 0 0 0.5rem 0;
      color: var(--brown);
      font-size: 1rem;
      font-weight: 600;
    }

    .tip-card p {
      margin: 0;
      color: var(--brown);
      font-size: 0.9rem;
      line-height: 1.4;
    }

    @media (max-width: 768px) {
      .cie-inputs {
        grid-template-columns: 1fr;
      }
      
      .grade-results {
        grid-template-columns: 1fr;
      }
      
      .tips-grid {
        grid-template-columns: 1fr;
      }
      
      .grade-header {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }
    }
  `

  // State for managing input focus and CIE marks
  const [focusedInput, setFocusedInput] = useState(null);
  const [cie1, setCie1] = useState(0) // CIE 1 marks (out of 30)
  const [cie2, setCie2] = useState(0) // CIE 2 marks (out of 20)
  const [cie3, setCie3] = useState(0) // CIE 3 marks (out of 30)
  
  // Grade bands configuration - defines the grading system from S to F
  const gradeBands = [
    { grade: 'S', min: 90, max: 100, color:'#f4b30c' }, // Outstanding
    { grade: 'A', min: 75, max: 89, color: '#f4b30c' },  // Excellent
    { grade: 'B', min: 66, max: 74, color: '#f4b30c' },  // Good
    { grade: 'C', min: 56, max: 65, color: '#f4b30c' },  // Average
    { grade: 'D', min: 50, max: 55, color: '#f4b30c' },  // Below Average
    { grade: 'E', min: 45, max: 49, color: '#f4b30c' },  // Poor
    { grade: 'F', min: 0, max: 45, color:  '#f4b30c' }   // Fail
  ]

    // Minimum requirements as per academic rules
    const CIE_MIN = 21; // Minimum CIE marks required (out of 40)
    const SEE_MIN = 24; // Minimum SEE marks required (out of 60)

    /**
     * Grade Calculations
     * 
     * This useMemo hook calculates:
     * - Total CIE marks scaled to 40 points
     * - Required SEE marks for each grade band
     * - Whether each grade is achievable based on current CIE marks
     * - Validation against minimum requirements
     */
    const calculations = useMemo(() => {
      // Calculate total CIE marks scaled to 40 points (CIE is 40% of total)
      const totalCie = (cie1 + cie2 + cie3) * (40 / 80); // CIE scaled out of 40
      const cieFail = totalCie < CIE_MIN; // Check if CIE marks are below minimum

      // Calculate required SEE marks for each grade band
      const results = gradeBands.map(band => {
        const seeNeeded = Math.max(0, band.min - totalCie);
        // Enforce minimum SEE required as 24 out of 60 (per academic rules)
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

    /**
     * Current Grade Calculation
     * 
     * Determines the current achievable grade based on CIE marks
     * Returns 'F' if CIE marks are below minimum requirement
     */
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
    <>
      {/* GradePredictor CSS styles */}
      <style dangerouslySetInnerHTML={{ __html: gradePredictorStyles }} />
      
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
    </>
  )
}

export default GradePredictor

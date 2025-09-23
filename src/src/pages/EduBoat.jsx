import React from "react";
import { Link } from "react-router-dom";
import "./EduBoat.css";

const EduBoat = () => {
  return (
    <div className="eduboat-container">
      {/* Header */}
      <header className="header">
        <h1>EduBoat</h1>
        <p className="subtitle">Study made simple with smart support.</p>
      </header>

      {/* Cards */}
      <div className="card-section">
        <div className="card">
          <h3><Link to="/quickhelp">⚡ QuickHelp</Link></h3>
          <p>Quick explanations that make hard topics easy to understand.</p>
        </div>
        <div className="card">
          <h3><Link to="/deepdive">🔍 DeepDive</Link></h3>
          <p>Explore concepts deeply with clarity and precision.</p>
        </div>
        <div className="card">
          <h3><Link to="/examprep">📘 ExamPrep</Link></h3>
          <p>Structured notes and strategies to excel in exams.</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        🎉 Happy learning!
      </footer>
    </div>
  );
};

export default EduBoat;

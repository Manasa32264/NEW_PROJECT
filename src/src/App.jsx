import React from "react";
import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EduBoat from "./pages/EduBoat";
import QuickHelp from "./pages/QuickHelp";
import DeepDive from "./pages/DeepDive";
import ExamPrep from "./pages/ExamPrep";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EduBoat />} />
        <Route path="/quickhelp" element={<QuickHelp />} />
        <Route path="/deepdive" element={<DeepDive />} />
        <Route path="/examprep" element={<ExamPrep />} />
      </Routes>
    </Router>
  );
}

export default App;

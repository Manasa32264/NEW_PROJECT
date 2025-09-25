// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./Components/Dashboard";
import Subjects from "./Components/Subjects";
import PdfListPage from "./Components/PdfListPage.jsx";
import PdfViewer from "./Components/PdfViewer";

function App() {
  // Later you can pass real user state here
  const user = { username: "Student" };
  const handleLogout = () => {
    console.log("User logged out");
  };

  return (
    <Router>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={<Dashboard user={user} onLogout={handleLogout} />}
        />

        {/* Subject selection page (textbooks/notes/pyqs) */}
        <Route
          path="/subjects/:cycle/:type"
          element={<Subjects user={user} onLogout={handleLogout} />}
        />

        {/* PDF list page (specific subject OR all PYQs) */}
        <Route
          path="/pdfs/:cycle/:type/:subjectId"
          element={<PdfListPage user={user} onLogout={handleLogout} />}
        />

        {/* PDF viewer (for syllabus, textbooks, notes, PYQs) */}
        <Route
          path="/view/:cycle/:subjectId/:type/:pdfId"
          element={<PdfViewer user={user} onLogout={handleLogout} />}
        />

        {/* Special syllabus route */}
        <Route
          path="/view/syllabus/:cycle/syllabus/:pdfId"
          element={<PdfViewer user={user} onLogout={handleLogout} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
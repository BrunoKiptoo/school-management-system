import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import StudentManagement from './components/StudentManagement/StudentManagement';
import TeacherManagement from './components/TeacherManagement/TeacherManagement';
import GuardianManagement from './components/GuardianManagement/GuardianManagement';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/student-management" element={<StudentManagement />} />
          <Route path="/teacher-management" element={<TeacherManagement />} />
          <Route path="/guardian-management" element={<GuardianManagement />} />
          {/* Add more routes for other components */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

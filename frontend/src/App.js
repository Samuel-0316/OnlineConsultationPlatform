import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/landing';
import LoginPage from './pages/login';
import SignUpPage from './pages/signup';
import UserDashboard from './pages/dashboard';
import Consultants from './pages/consultants';
import ConsultantRegistration from './pages/consultantRegistration'
import './assets/styles/login.css';
import './assets/styles/landing.css';
import './assets/styles/signup.css';
import './assets/styles/dashboard.css';
import './assets/styles/consultants.css';
import './assets/styles/consultantRegistration.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/consultants" element={<Consultants />} />
        <Route path="/consultant-registration" element={<ConsultantRegistration />} />
      </Routes>
    </Router>
  );
}

export default App;
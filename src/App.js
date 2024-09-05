import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import PatientManagementPage from './pages/PatientManagementPage';
import AppointmentManagementPage from './pages/AppointmentManagementPage';
import PatientPortalPage from './pages/PatientPortalPage';

const App = () => {
  return (
    <div className="p-6">
      <Navbar />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/patients" element={<PatientManagementPage />} />
        <Route path="/appointments" element={<AppointmentManagementPage />} />
        <Route path="/patient-portal" element={<PatientPortalPage />} />
      </Routes>
    </div>
  );
};

export default App;

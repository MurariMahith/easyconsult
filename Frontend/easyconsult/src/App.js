import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/signup';
import LogIn from './components/login';
import PatientRoutes from './Routes/patientRoutes';
import DoctorRoutes from './Routes/doctorRoutes';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/signup" element={<SignUp />}/>
      <Route path="/login" element={<LogIn />}/>
      <Route path="/patient/*" element={<PatientRoutes />} />
      <Route path="/doctor/*" element={<DoctorRoutes />} />
    </Routes>
  </Router>
  );
}

export default App;

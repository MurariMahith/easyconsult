import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/signup';
import LogIn from './components/login';
import PatientRoutes from './Routes/patientRoutes';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/signup" element={<SignUp />}/>
      <Route path="/login" element={<LogIn />}/>
      <Route path="/patient/*" element={<PatientRoutes />} />
    </Routes>
  </Router>
  );
}

export default App;

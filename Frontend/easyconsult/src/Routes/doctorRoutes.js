import React from 'react';
import { Route, Routes } from 'react-router-dom';
import JoinConsultation from './../components/patient/joinconsultation'
import Profile from '../components/patient/profile';
import MyConsultations from '../components/patient/myconsultations';
import Home from '../components/patient/home';
import Consultation from '../components/patient/consultation';


const DoctorRoutes = () => {
  return (
    <Routes>
      <Route path="/joinconsultation" element={<JoinConsultation />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/myconsultations" element={<MyConsultations />} />
      <Route path="/home" element={<Home />} />
      <Route path="/consultation/:id" element={<Consultation />} />
      {/* Add more patient-specific routes here */}
    </Routes>
  );
};

export default DoctorRoutes;

//change to doctor specific routes and components.
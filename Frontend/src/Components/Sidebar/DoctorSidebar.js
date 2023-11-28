import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../Assets/Logo.jpeg';


const Sidebar = () => {
  const [showSettings, setShowSettings] = useState(false);
  const location = useLocation();

  // Define a function to check if the current route matches a given path
  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <div className='flex-center'>
        <h2 style={{color:"white"}}>Easy Consult</h2>
      </div>
      <div className='flex-center'>
        <h1 style={{color:"white"}}>Doctor App</h1>
      </div>
      <ul className="nav-items">
        <li>
          <Link to="/doctor/" className={isActive('/doctor/') ? 'active' : ''}>
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/doctor/consultations" className={isActive('/doctor/consultation') ? 'active' : ''}>
            Consultations
          </Link>
        </li>
        <li>
          <Link to="/doctor/patients" className={isActive('/doctor/patients') ? 'active' : ''}>
            Patients
          </Link>
        </li>
        <li>
          <Link to="/" className={isActive('/') ? 'active' : ''}>
            Log Out
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

// NavBar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="menu-toggle" onClick={toggleNav}>
        ☰
      </div>
      <ul className={`nav-list ${isOpen ? 'open' : ''}`}>
        <li>
          <Link to="/patient/">Dashboard</Link>
        </li>
        <li>
          <Link to="/patient/consultations">Consultations</Link>
        </li>
        {/* <li>
          <Link to="/patient/activeconsultation">Active Consultation</Link>
        </li> */}
        <li>
          <Link to="/patient/searchdoctor">Search for Doctor</Link>
        </li>
        <li>
          <Link to="/">Log Out</Link>
        </li>
      </ul>
      Patient App Easy Consult
    </nav>
  );
};

export default NavBar;
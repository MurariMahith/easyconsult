import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/PatientSidebar';
import NavBar from './NavBar'
import './SearchDoctor.css';
import axios from 'axios';

const SearchDoctor = () => {
  const [doctorsData, setDoctorsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(doctorsData); // Initialize with all doctors

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://easyconsultapi.onrender.com/doctor/');
        setDoctorsData(response.data);
        setSearchResults(response.data); // Set search results to all doctors
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const results = doctorsData.filter(
      (doctor) =>
        doctor.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.department.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  }, [searchQuery, doctorsData]);

  return (
    <div>
      <NavBar />
      <div className="main-content">
        <h1>Search for a Doctor</h1>
        <input
          className='doctorinput'
          type="text"
          placeholder="Search by Name or Department"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchResults.length > 0 ? (
          <div>
            {searchResults.map((doctor) => (
              <div className="doctor-card" key={doctor.id}>
                <h2>{doctor.firstName} {doctor.lastName}</h2>
                <p>Specialty: {doctor.department}</p>
                <p>Designation: {doctor.designation}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No doctors found. Try a different search query.</p>
        )}
      </div>
    </div>
  );
};

export default SearchDoctor;
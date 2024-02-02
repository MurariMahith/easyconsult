import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/DoctorSidebar';
import DataTable from 'react-data-table-component';
import './Patients.css';
import axios from 'axios';

const Patients = () => {
  const [patients, setPatients] = useState([
  ]);
  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.get(`https://easyconsultapi.onrender.com/patient/doctor/${window.localStorage.getItem("doctorID")}`);
      console.log(response.data)
      setPatients(response.data)
    }
    fetchdata()
  }, []);
  const patientContainerStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    margin: '10px',
    width:'max-content'
  };

  return (
    <div>
      <Sidebar />
      <div className="main-content">
      <h1>My Patients</h1>
      <div style={{display:'flex',justifyContent:'center',flexWrap:'no-wrap'}}>
      {patients.map((patient) => (
        <div key={patient._id} style={patientContainerStyle}>
          <div className='flex-center'><img src=" https://cdn1.vectorstock.com/i/1000x1000/51/05/male-profile-avatar-with-brown-hair-vector-12055105.jpg" alt="Image alt text" className='medium-pic'/></div>
          <h3>{`${patient.firstName} ${patient.lastName}`}</h3>
          <p><strong>Username:</strong> {patient.userName}</p>
          <p><strong>Email:</strong> {patient.email}</p>
          {patient.contactInformation && <p><strong>Phone:</strong> {patient.contactInformation.phone}</p>}
          {patient.contactInformation && <p><strong>Address:</strong> {patient.contactInformation.address}</p>}
          <p><strong>Gender:</strong> {patient.gender}</p>
          <p><strong>Date of Birth:</strong> {new Date(patient.dateOfBirth).toLocaleDateString()}</p>
          <p><strong>Medical History:</strong></p>
          {patient.medicalHistory && <ul>
            {patient.medicalHistory.map((historyItem, index) => (
              <li key={index}>{historyItem}</li>
            ))}
          </ul>}
        </div>
        ))}
      </div>

      </div>
    </div>
  );
};

export default Patients;

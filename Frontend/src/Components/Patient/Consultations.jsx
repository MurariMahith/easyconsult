import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/PatientSidebar';
import axios from 'axios';
import NavBar from './NavBar';

const Consultations = () => {
  const [consultations, setConsultations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        // Make a GET request using Axios
        var patientID = window.localStorage.getItem("patientID");
        console.log(patientID)

        const response = await axios.get('http://localhost:3030/consultation/patient/' + patientID);
        // Set the fetched data in the state
        setConsultations(response.data);
      } catch (error) {
        // Set error state if there is an issue with the fetch
        setError(error);
      } finally {
        // Set loading state to false once the fetch is complete
        setLoading(false);
      }
    };

    // Call the fetch function
    fetchData();
  }, []);

  if (!consultations || consultations.length === 0) {
    return <p>No consultations available.</p>;
  }
  return (
    <div>
        <NavBar/>
        <div className='consultmain-content'>
          
            <div className=".container-active-consultation-patient">
            <div className='main-content'>
            <h2>My Consultations</h2>
        <div className="consultation-cards-container">
          {consultations.map(consultation => (
            <div key={consultation._id} className="consultation-card">
              <h2>Disease Name: {consultation.diagnosis?.diseaseName || 'Incomplete Consultation'}</h2>
              <p>Time: {new Date(consultation.time).toLocaleString()}</p>
              <p>Disease Name: {consultation.diagnosis?.diseaseName || 'N/A'}</p>
              <p>Number of Selected Prescriptions: {consultation.selectedPrescriptions.length}</p>
              <p>Patient ID: {consultation.patientId}</p>
              <p>Doctor ID: {consultation.doctorId}</p>
              <p>Consultation ID: {consultation._id}</p>
              <p><a href={`http://localhost:3000/patient/consultation/${consultation._id}`}>Visit consultation</a></p>
            </div>
          ))}
        </div>
      </div>
    </div>
        </div>
    </div>
  )
}



export default Consultations;
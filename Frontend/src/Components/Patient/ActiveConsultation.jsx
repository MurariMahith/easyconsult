import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar/PatientSidebar';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import './ActiveConsultation.css';
import NavBar from './NavBar';

const ActiveConsultation = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  console.log(id)
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(`https://easyconsultapi.onrender.com/consultation/${id}`);
        var consultationObj = response.data
        if(response.data.isAvailableToJoin)
        {
            consultationObj.isAvailableToJoin = false;
            consultationObj.isPatientJoined = true;
            consultationObj.patientId = window.localStorage.getItem("patientID")
            const response = await axios.put(`https://easyconsultapi.onrender.com/consultation/${id}`, consultationObj);
            console.log(response.data)
        }
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    const socket = io('https://easyconsultapi.onrender.com');

    socket.on('consultationChanged', (newConsultation) => {
      console.log("Change detected.")
      fetchData(); 
    });
    fetchData();

    return () => {
      socket.disconnect();
    };
    
  }, []); 


  if (loading) {
    return <p>Loading...</p>;
  }


  if (error) {
    return (
        <div>

            <div className='main-content'>
                <h1>{error.message}</h1>
            </div>
    
        </div>
      );
  }

  // Render the fetched data
  return (
    <>
          <NavBar/>
          <div className="container-active-consultation-patient">

    <div className="main-content-single-consultation">
      <h1>Patient Active Consultation</h1>
      <div>
        <strong>Time:</strong> {new Date(data.time).toLocaleString()}
      </div>
      <div>
        <strong>Status:</strong> {data.isActive ? 'Active' : 'Inactive'}
      </div>
      <div>
        <strong>Patient ID:</strong> {data.patientId}
      </div>
      {data.diagnosis && (
        <>
          <h3>Diagnosis</h3>
          <div>
            <strong>Disease Name:</strong> {data.diagnosis.diseaseName}
          </div>
          <div>
            <strong>Symptoms:</strong> {data.diagnosis.symptoms.join(', ')}
          </div>
          
        </>
      )}
      {data.selectedPrescriptions.length > 0 && (<h3>Selected Prescriptions</h3>)}

      {data.selectedPrescriptions.map((prescription) => (
        <div key={prescription._id} className="prescription">
          <div>
            <h4>Name:{prescription.name}</h4> 
          </div>
          <div>
            <strong>Notes:</strong> {prescription.notes}
          </div>
          <div>
            <strong>Duration:</strong> {prescription.numberOfDays} days
          </div>
          {prescription.isMedication && (
            <div>
              <strong>Dosage:</strong> {prescription.dosage}<br></br>
              <strong>When:</strong> {prescription.when}
            </div>
            
          )}
          {prescription.isActivity && (
            <div>
              <strong>When:</strong> {prescription.when}
            </div>
          )}
          <br></br>
          {prescription.isYoutubeVideo && (
            <div>
              <iframe src={prescription.youtubeLink} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
          )}
          {prescription.isImage && (
            <div>
              <img src={prescription.imageUrl} width="300" height="200"></img>
            </div>
          )}
                    <br></br>
        </div>
      ))}
    </div>
  </div>
    </>

  );
};

export default ActiveConsultation;

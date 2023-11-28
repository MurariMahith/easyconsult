import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar/DoctorSidebar';
import { useParams } from 'react-router-dom';
import './DoctorSingleConsultation.css';

const DoctorSingleConsultation = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  console.log(id)
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3030/consultation/${id}`);
        var consultationObj = response.data
        if(response.data.isAvailableToJoin)
        {
            consultationObj.isAvailableToJoin = false;
            consultationObj.isPatientJoined = true;
            consultationObj.patientId = window.localStorage.getItem("patientID")
            const response = await axios.put(`http://localhost:3030/consultation/${id}`, consultationObj);
            console.log(response.data)
        }
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    
  }, []); 


  if (loading) {
    return <p>Loading...</p>;
  }


  if (error) {
    return (
        <div>
            <Sidebar></Sidebar>
            <div className='main-content'>
                <h1>{error.message}</h1>
            </div>
    
        </div>
      );
  }

  const deleteConsultationClick = (consultationId) => {
    // Navigate to the "abc" URL when the second button is clicked
    console.log(consultationId)
    axios.delete("http://localhost:3030/consultation/" + consultationId).then(res => window.location.href = "/doctor/consultations")
    //window.location.href = '/doctor/activeconsultation/' + newConsultationID;
  };

  // Render the fetched data
  return (

    <div class="container-single-consultation">
    <Sidebar />
    <div className="main-content-single-consultation">
      <h1>Patient Consultation</h1>
      <button className='createconsult-button' onClick={() => deleteConsultationClick(data._id)}>Delete</button><br></br><br></br>
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
           <h4>Name:  <strong>{prescription.name}</strong></h4>
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
              <iframe width="500" height="300" src={prescription.youtubeLink} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
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
  );
};

export default DoctorSingleConsultation;

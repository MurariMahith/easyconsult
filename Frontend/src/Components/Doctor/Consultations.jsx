import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/DoctorSidebar';
import './Consultations.css';

import ReactDOM from "react-dom";
import QRCode from "react-qr-code";
import axios from 'axios';

const Consultations = () => {
  const [consultations, setConsultations] = useState([]);
  const [showNavigateButton, setShowNavigateButton] = useState(false);
  const [newConsultationID, setNewConsultationID] = useState(0)


  // Simulated data (replace with actual API calls)
  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.get(`https://easyconsultapi.onrender.com/consultation/doctor/${window.localStorage.getItem("doctorID")}`);
      setConsultations(response.data)
    }
    fetchdata()
  }, [consultations]);

  const handleCreateConsultaion=()=>{
    // call to create new consultation object
    // https://easyconsultapi.onrender.com/consultation/createEmptyConsultation
    var patientQrLink = "QR is invalid please ask Doctor to generate QR again";
    axios.post("https://easyconsultapi.onrender.com/consultation/createEmptyConsultation", {
      "doctorId": "653b2aadc1aa1659057e5644",
      "time": "2023-10-25T10:00:00.000Z",
      "isAvailableToJoin": true,
      "isPatientJoined": false,
      "isActive" : true
    })
      .then(res => {
        var consultationID = res.data._id
        patientQrLink = "http://localhost:3000/patient/activeconsultation/" + consultationID;
        console.log(res.data._id)
        setNewConsultationID(res.data._id)
        ReactDOM.render(<QRCode value={patientQrLink} />, document.getElementById("qr-container"));
        setShowNavigateButton(true)
        // mukesh - write code here to fetch teh consultation object every 3 seconds and check if "isPatientJoined" property is true or not. 
        // url : https://easyconsultapi.onrender.com/consultation/:id here id is consultationID
        // if true "navigate doctor to "/doctor/activeconsultation" page or add one more button to UI upon clciking that we should navigate doctor to "/doctor/activeconsultation" page
      }, err => console.error(err))
    
  }

  const createConsultationsButton=(
    <
      button className='createconsult-button' 
      onClick={handleCreateConsultaion}
    >
    Create Consultation
    </button>
  )

  const handleSecondButtonClick = () => {
    // Navigate to the "abc" URL when the second button is clicked
    window.location.href = '/doctor/activeconsultation/' + newConsultationID;
  };

  const deleteConsultationClick = (consultationId) => {
    // Navigate to the "abc" URL when the second button is clicked
    console.log(consultationId)
    axios.delete("https://easyconsultapi.onrender.com/consultation/" + consultationId)
    //window.location.href = '/doctor/activeconsultation/' + newConsultationID;
  };



  return (
    <div>
      <Sidebar />
      
      <div className="main-content">
      {/* <h1>Doctor Consultations from db</h1>
      <pre>{JSON.stringify(consultations, null, 2)}</pre>  */}
        <h2>Consultations</h2>
        <table className="appointment-table">
          <thead>
            <tr>
              <th>Consultations ID</th>
              <th>Patient Name</th>
              <th>Patient ID</th>
              <th>No.of prescriptions</th>
              <th>Visit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {consultations.map(consultation => (

              <tr key={consultation._id}>
                <td>{consultation._id}</td>
                {consultation.diagnosis ? (<td>{consultation.diagnosis.diseaseName }</td>) : <td>Incomplete consultation</td>}
                <td>{consultation.patientId}</td>
                {consultation.diagnosis ? (<td>{consultation.selectedPrescriptions.length}</td>) : <td>Incomplete consultation</td>}
                <td><a href={"http://localhost:3000/doctor/consultation/" + consultation._id}>Visit</a></td>
                <td><button className='createconsult-button' onClick={() => deleteConsultationClick(consultation._id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <br/>
        
        <br/>

        {createConsultationsButton}
        <br/>
        <br/>
        <div id='qr-container'></div>

        <br></br>
        {showNavigateButton && (
        <button onClick={handleSecondButtonClick}>
          Navigate to new Consultation
          {/* Add your second button content and click handlers here */}
        </button>
      )}
      </div>
  
    </div>
  );
};

export default Consultations;

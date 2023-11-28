import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/PatientSidebar';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import './Home.css'; 
import axios from 'axios';


const PatientHomePage = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [patient, setPatient] = useState();

      // State to track loading state
      const [loading, setLoading] = useState(true);
      // State to track errors, if any
      const [error, setError] = useState(null);

  // Simulated data (replace with actual API calls)
  useEffect(() => {
    const fetchdata = async () => {
      try
      {
        const patientResponse = await axios.get(`http://localhost:3030/patient/${window.localStorage.getItem("patientID")}`);
        setPatient(patientResponse.data)

  
        const patientConsultations = await axios.get(`http://localhost:3030/consultation/consultpatient/${window.localStorage.getItem("patientID")}`);
        await setConsultations(patientConsultations.data)

        const patientDoctors = await axios.get(`http://localhost:3030/doctor/patient/${window.localStorage.getItem("patientID")}`);
        console.log(patientDoctors.data)
        setDoctors(patientDoctors.data)
        console.log(consultations)
        
      }
      catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }

    }
    fetchdata()
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }


  if (error) {
    return (
        <div>
            <Sidebar></Sidebar>
            <div className='main-content'>
                <h1 className="homeh1">{error.message}</h1>
            </div>
    
        </div>
      );
  }

  return (
    <div>
      {/* <Sidebar /> */}
      <NavBar />
      <div className='main-content'>
      <div className='flex-center'><h1 className="homeh1">Dashboard</h1></div>
      <div className="doctor-profile-container">
      <h1 className="homeh1">My Details</h1>

      <div className="patient-details-card">
        <div className='flex-center'><img src=" https://cdn1.vectorstock.com/i/1000x1000/51/05/male-profile-avatar-with-brown-hair-vector-12055105.jpg" alt="Image alt text" className='small-pic'/></div>
      
     <br></br><br></br>
        <div>
          <strong>ID:</strong> {patient._id}
        </div>
        <div>
          <strong>Name:</strong> {`${patient.firstName} ${patient.lastName}`}
        </div>
        <div>
          <strong>Gender:</strong> {patient.gender}
        </div>
        <div>
          <strong>Email:</strong> {patient.email}
        </div>
        <div>
          <strong>User Name:</strong> {patient.userName}
        </div>
        <div>
          <strong>Medical History:</strong> {patient.medicalHistory.join(" ,")}
        </div>
        {/* <div>
          <strong>Consultations:</strong> {patient.consultations.length}
        </div> */}
        <div>
          <strong>DOB:</strong> {new Date(patient.dateOfBirth).toLocaleString()}
        </div>
      </div>
        </div>

        <h1 className="homeh1">My Doctors</h1>
        <div className="doctor-cards-container">
        {doctors.map(doctor => (
          <div key={doctor._id} className="doctor-card">

<div className='flex-center'><img src="https://cdn3.vectorstock.com/i/1000x1000/78/32/male-doctor-with-stethoscope-avatar-vector-31657832.jpg" alt="Image alt text" className='small-pic' /></div>
            <h2>{`${doctor.firstName} ${doctor.lastName}`}</h2>
            {/* <p>ID: {doctor._id}</p> */}
            <p>Designation: {doctor.designation}</p>
          </div>
        ))}
      </div>

        <h1 className="homeh1">My Consultations</h1>
        
        <div className="consultation-cards-container">
        {consultations.map(consultation => (
          <div key={consultation._id} className="consultation-card">
            <img src="https://www.easymed.health/img/consultation-easymed-2.jpg" alt="Image alt text" className='small-pic'/>
            
            {/* <h2>Patient Name: {consultation.patientId.firstName}</h2> */}
            {consultation.diagnosis ? (
              <p>Disease: {consultation.diagnosis.diseaseName}</p>
            ) : (
              <p>Incomplete consultation</p>
            )}
            {/* <p>Patient ID: {consultation.patientId}</p> */}
            {consultation.diagnosis ? (
              <p>No of prescriptions: {consultation.selectedPrescriptions.length}</p>
            ) : (
              <p>Incomplete consultation</p>
            )}
            <p>
              <a href={"http://localhost:3000/patient/consultation/" + consultation._id}>
                Visit consultation
              </a>
            </p>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

// const AppointmentsList = ({ appointments }) => {
//   return (
//     <div>
//       <h2>Upcoming Appointments</h2>
//       <ul className="appointment-list">
//         {appointments.map(appointment => (
//           <li key={appointment.id}>
//             {appointment.patientName} - {appointment.appointmentTime}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// const PatientsList = ({ patients }) => {
//   return (
//     <div>
//       <h2>Patients List</h2>
//       <ul className="patients-list">
//         {patients.map(patient => (
//           <li key={patient.id}>
//             <Link to={`/doctor/patients/${patient.id}`}>{patient.name}</Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

export default PatientHomePage;
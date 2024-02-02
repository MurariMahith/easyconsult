import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/DoctorSidebar';
import { Link } from 'react-router-dom';
import './Home.css'; 
import axios from 'axios';

const DoctorHomePage = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [doctor, setDoctor] = useState();

      // State to track loading state
      const [loading, setLoading] = useState(true);
      // State to track errors, if any
      const [error, setError] = useState(null);

  // Simulated data (replace with actual API calls)
  useEffect(() => {
    const fetchdata = async () => {
      try
      {
        var doctorResponse = await axios.get(`https://easyconsultapi.onrender.com/doctor/${window.localStorage.getItem("doctorID")}`);
        setDoctor(await doctorResponse.data)

  
        var doctorConsultations = await axios.get(`https://easyconsultapi.onrender.com/consultation/doctor/${window.localStorage.getItem("doctorID")}`);
        setConsultations(await doctorConsultations.data)
  
        var doctorPatients = await axios.get(`https://easyconsultapi.onrender.com/patient/doctor/${window.localStorage.getItem("doctorID")}`);
        console.log(doctorPatients.data)
        setPatients(doctorPatients.data)
        
        console.log(doctor)
        console.log(patients)
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
                <h1>{error.message}</h1>
            </div>
    
        </div>
      );
  }
  const doctorContainerStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    margin: '10px',
  };

  return (
    <div>
      <Sidebar />
      <div className='main-content'>
        <h1>Dashboard</h1>
        <div className="doctor-profile-container">
      <h1>My Details</h1>
      <div className="doctor-details" style={doctorContainerStyle}>
      <img src="https://cdn3.vectorstock.com/i/1000x1000/78/32/male-doctor-with-stethoscope-avatar-vector-31657832.jpg" alt="Image alt text" className='medium-pic' />
        <div>
          <strong>ID:</strong> {doctor._id}
        </div>
        <div>
          <strong>Name:</strong> {`${doctor.firstName} ${doctor.lastName}`}
        </div>
        <div>
          <strong>Designation:</strong> {doctor.designation}
        </div>
        <div>
          <strong>Department:</strong> {doctor.department}
        </div>
        <div>
          <strong>Degree:</strong> {doctor.degree}
        </div>
        <div>
          <strong>Age:</strong> {doctor.age}
        </div>
        <div>
          <strong>Blood Group:</strong> {doctor.bloodgroup}
        </div>
        <div>
          <strong>Username:</strong> {doctor.userName}
        </div>
      </div>
    </div>
        <h1>My Consultations</h1>
        <table className="appointment-table">
          <thead>
            <tr>
              <th>Consultations ID</th>
              <th>Disease</th>
              <th>Patient ID</th>
              <th>No of prescriptions</th>
              <th>Visit</th>
            </tr>
          </thead>
          <tbody>
            {consultations.map(consultation => (

              <tr key={consultation._id}>
                <td>{consultation._id}</td>
                {consultation.diagnosis ? (<td>{consultation.diagnosis.diseaseName }</td>) : <td>Incomplete consultation</td>}
                <td>{consultation.patientId}</td>
                {consultation.diagnosis ? (<td>{consultation.selectedPrescriptions.length}</td>) : <td>Incomplete consultation</td>}
                <td><a href={"http://localhost:3000/doctor/consultation/" + consultation._id}>Visit consultation</a></td>
              </tr>
            ))}
          </tbody>
        </table>
        <h1>My Patients</h1>
        <div style={{display:'flex',justifyContent:'center',flexWrap:'no-wrap'}}>
      {patients.map((patient) => (
        <div key={patient._id} style={doctorContainerStyle}>
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

export default DoctorHomePage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar/DoctorSidebar';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";
import './ActiveConsultation.css';

const ActiveConsultation = () => {
  // State to store the fetched data
  const [data, setData] = useState(null);
  // State to track loading state
  const [loading, setLoading] = useState(true);
  // State to track errors, if any
  const [error, setError] = useState(null);
  const { id } = useParams();

  //console.log(id)

  const [diagnoses, setDiagnoses] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [patient, setPatient] = useState();
  const [doctor, setDoctor] = useState();
  const [selectedDiagnosis, setSelectedDiagnosis] = useState(null);
  const [consultation, setConsultation] = useState();
  const [selectedPrescriptions, setSelectedPrescriptions] = useState([]);

  useEffect(() => {

    
    //ReactDOM.render(<QRCode value={patientQrLink} />, document.getElementById("qr-container"));

    const fetchData = async () => {
      try {
        
        const response = await axios.get(`https://easyconsultapi.onrender.com/consultation/${id}`);
        if(response.data.isPatientJoined)
        {
            setData(response.data);
            setConsultation(response.data)

            // fetch diagnoses
            const diagnosesResponse = await axios.get(`https://easyconsultapi.onrender.com/diagnosis/`);
            setDiagnoses(diagnosesResponse.data)

            const prescriptionResponse = await axios.get(`https://easyconsultapi.onrender.com/prescription/`);
            setPrescriptions(prescriptionResponse.data)

            const patientResponse = await axios.get(`https://easyconsultapi.onrender.com/patient/${response.data.patientId}`);
            setPatient(patientResponse.data)

            const doctorResponse = await axios.get(`https://easyconsultapi.onrender.com/doctor/${window.localStorage.getItem("doctorID")}`);
            setDoctor(doctorResponse.data)

            // fetch prescriptions
            // fetch patient
            

        }
        else
            setError("Patient havent joined yet. please wait until patioent joins.")
        
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
      //window.location.reload();
    });
    fetchData();

    return () => {
      socket.disconnect();
    };
    
  }, []);

  useEffect(() => {

    // consultation.diagnosis.selectedPrescriptions = selectedPrescriptions
    console.log(consultation)
    console.log(selectedPrescriptions)
    //axios.put("https://easyconsultapi.onrender.com/consultation/" + id,consultation)

    //axios.put("https://easyconsultapi.onrender.com/consultation/selectedprescriptions/" + id,selectedPrescriptions).then(r => console.log(r.data))
  }, [consultation, selectedPrescriptions])

  if (loading) {
    return <p>Loading...</p>;
  }


  if (error) {
    return (
        <div>
            <Sidebar></Sidebar>
            <div className='main-content'>
                <h1>Patient haven't joined yet. Please wait until the patient joins</h1>
            </div>
    
        </div>
      );
  }


  const handleViewConsultaionButton = () => {
    var patientQrLink = "http://localhost:3000/patient/activeconsultation/" + id;
    ReactDOM.render(<QRCode value={patientQrLink} />, document.getElementById("qr-container"));
    console.log(selectedPrescriptions)
  }

  const viewConsultationsButton=(
    <
      button className='createconsult-button' 
      onClick={handleViewConsultaionButton}
    >
    See QR code for this Consultation
    </button>
  )

  const handleDiagnosisSelect = (diagnosis) => {
    setSelectedDiagnosis(diagnosis);
    consultation.diagnosis = diagnosis
    // if(consultation.diagnosis !== null)
    //   consultation.diagnosis.prescription = []
    if(diagnosis === null)
    consultation.selectedPrescriptions = []
    setConsultation(consultation)
    axios.put("https://easyconsultapi.onrender.com/consultation/" + id,consultation)
    
  };

  const getPrescriptionsForDiagnosis = () => {
    if (selectedDiagnosis) {
      //console.log(prescriptions.filter((prescription) => selectedDiagnosis.prescription.includes(prescription._id)))
      return prescriptions.filter((prescription) => selectedDiagnosis.prescription.includes(prescription._id));
    }
    return [];
  };

  const handleAddPrescription = (prescription) => {
    setSelectedPrescriptions([...selectedPrescriptions, prescription]);
    if(consultation.selectedPrescriptions)
    {
      consultation.selectedPrescriptions.push(prescription)
    }
    setConsultation(consultation)
    axios.put("https://easyconsultapi.onrender.com/consultation/" + id,consultation)
  };

  const isPrescriptionAdded = (prescription) => {
    return selectedPrescriptions.some((selectedPrescription) => selectedPrescription._id === prescription._id);
  };

  const handleRemovePrescription = (prescription) => {
    setSelectedPrescriptions(selectedPrescriptions.filter((selectedPrescription) => selectedPrescription._id !== prescription._id));
    if(consultation.selectedPrescriptions)
    {
      consultation.selectedPrescriptions = consultation.selectedPrescriptions.filter((selectedPrescription) => selectedPrescription._id !== prescription._id);
    }
    setConsultation(consultation)
    axios.put("https://easyconsultapi.onrender.com/consultation/" + id,consultation)
  };

  const handleDaysChange = (event) => {
    const newDays = parseInt(event.target.value, 10);
    // setDays(newDays);
    // onDaysChange(newDays);
  };

  const diagnosisButtonStyle = {
    padding: '10px',
    margin: '10px',
  };


  const PrescriptionDisplayComponent = ({ data }) => {
    return (
      <div className='prescription-display'>
        
        <h2>{data.name}</h2>
        <p><strong>Notes:</strong> {data.notes}</p>
        <p><strong>Is Medication:</strong> {data.isMedication ? 'Yes' : 'No'}</p>
        <p><strong>Is Activity:</strong> {data.isActivity ? 'Yes' : 'No'}</p>
        <p><strong>Number of Days:</strong> {data.numberOfDays}

        </p>
        <p><strong>Dosage:</strong> {data.dosage}</p>
        <p><strong>When:</strong> {data.when}</p>
        {isPrescriptionAdded(data) ? (
                <button onClick={() => handleRemovePrescription(data)}>Remove</button>
              ) : (
                <button onClick={() => handleAddPrescription(data)}>Add</button>
              )}

      </div>
    );
  };


  return (
    <div>
        <Sidebar></Sidebar>
        <div className='main-content'>
        <div class="half-container">
            <div class="half">
                    <h1>Doctor Active Consultation</h1>
                    <div className='flex-center'>{viewConsultationsButton}</div>
                    
                      <br/>
                      <br></br>
                    <div className='flex-center'><div id='qr-container'></div></div>
                    <h1>Patient Details</h1>
              <div className="doctor-details">
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
                  <strong>Medical History:</strong> {patient.medicalHistory.join(" ,")}
                </div>
                <div>
                  <strong>DOB:</strong> {new Date(patient.dateOfBirth).toLocaleString()}
                </div>
              </div>
                    {selectedDiagnosis ? (
                  <div>
                    <h2>Selected Diagnosis: {selectedDiagnosis.diseaseName}</h2>
                    <p>Symptoms: {selectedDiagnosis.symptoms.join(', ')}</p>
                    <button onClick={() => handleDiagnosisSelect(null)}>Deselect</button>
                  </div>
                ) : (
                  <div>
                    <h1>Diagnoses</h1>
                    <div className='flex-center'>
                    {diagnoses.map((diagnosis) => (
                      <button key={diagnosis._id} onClick={() => handleDiagnosisSelect(diagnosis)} style={diagnosisButtonStyle}>
                        {diagnosis.diseaseName}
                      </button>
                    ))}
                    </div>
 
                  </div>
                )}

                    <h1>Prescriptions</h1>
                    <ul className='prescription-container'>
                      {getPrescriptionsForDiagnosis().map((prescription) => (
                        // <li key={prescription._id}>{prescription.name}</li>
                        <li key={prescription._id}>
                          <PrescriptionDisplayComponent data={prescription} />
                        </li>
                      ))}
                    </ul>

            </div>
            <div class="half">
            <div className="main-content-single-consultation">
              <h1>Patient View</h1>
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
                      <iframe width="500" height="300" src={prescription.youtubeLink} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </div>
                  )}
                  {prescription.isImage && (
                    <div>
                      <img src={prescription.imageUrl} width="500" height="300"></img>
                    </div>
                  )}
                            <br></br>
                </div>
              ))}
            </div>
            </div>
        </div>
            
            {/* <h1>Doctor</h1> */}
            {/* <pre>{JSON.stringify(doctor, null, 2)}</pre> */}

            
        </div>

    </div>
  );
};

export default ActiveConsultation;

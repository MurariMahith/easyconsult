import React from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../appconstants';

const MyConsultations = () => {

  var apiUrl =  `${API_BASE_URL}/consultation/patient`
  apiUrl = `${apiUrl}/${window.localStorage.getItem("_id")}`;
  
  axios.get(apiUrl)
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error('Error fetching patient data:', error);
  });


  return (
    <div>
      <h1>MyConsultations Page</h1>
      <p>This is the MyConsultations page of your app.</p>
    </div>
  );
};

export default MyConsultations;
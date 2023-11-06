import React from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../appconstants';

const Home = () => {

  var apiUrl =  `${API_BASE_URL}/patient`
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
      <h1>Home Page</h1>
      <p>This is the Home page of your app.</p>
      <div className="card">
        <div className="card-header">
          Featured
        </div>
        <div className="card-body">
          <h5 className="card-title">Special title treatment</h5>
          <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <a href="#" className="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>
  );
};

export default Home;
import React from 'react';
import axios from 'axios';

const Profile = () => {
  var apiUrl = "http://localhost:3030/patient/"
  apiUrl = apiUrl + window.localStorage.getItem("_id");
  axios.get(apiUrl)
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error('Error fetching patient data:', error);
  });
  
  return (
    <div>
      <h1>Profile Page</h1>
      <p>This is the Profile page of your app.</p>
    </div>
  );
};

export default Profile;
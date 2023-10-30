import React from 'react';
import { useParams } from 'react-router-dom';

const Consultation = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>Consultation Page</h1>
      <p>id is {id}</p>
      <p>This is the Consultation page of your app.</p>
    </div>
  );
};

export default Consultation;
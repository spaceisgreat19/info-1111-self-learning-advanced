import React from 'react';
import Header from '../components/Header';

const ThankYou = () => {
  return (
    <div>
      <Header />
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h1>Thank you for your submission!</h1>
        <p>Your maintenance request has been successfully received. We will attend to it shortly.</p>
      </div>
    </div>
  );
};

export default ThankYou;
import React from 'react';
import { Spinner } from 'react-bootstrap';
import "./LoadingPage.css"

const LoadingPage = () => {
  return (
    <div className="spinner">
      <Spinner className="loading-symbol" animation="border" role="status">
    
      </Spinner>
    </div>
  );
};

export default LoadingPage;

import React from 'react';
import "./css/not-found.css";

const NotFound : React.FC = () => {
  return (
    <div className="notfound-container">
    <div className="notfound-content">
      <h1 className="notfound-title">404</h1>
      <p className="notfound-message">Page not found</p>
      <button onClick={() => window.history.back()} className="back-button">
        Go Back
      </button>
    </div>
  </div>
  )
}

export default NotFound
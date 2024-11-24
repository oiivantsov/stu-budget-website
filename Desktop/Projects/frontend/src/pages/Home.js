import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Home.css';

function Home({ onYesClick, onNoClick }) {
  return (
    <div className="home-container">
      <h2 className="home-title">Would you like to go out with me for a date?</h2>
      <div className="button-container">
        <Link to="/next">
          <button className="yes-button" onClick={onYesClick}><span>Yes</span></button>
        </Link>
        <Link to="/sad">
          <button className="no-button" onClick={onNoClick}><span>No</span></button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
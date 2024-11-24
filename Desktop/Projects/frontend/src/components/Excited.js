import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../css/Excited.css';

function Excited({ stopAudio }) {
  const location = useLocation();
  const { date, time, answer } = location.state || {};

  useEffect(() => {
    stopAudio();
  }, [stopAudio]);

  return (
    <div className="excited-container">
      <video width="600" autoPlay loop>
        <source src="/yay.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <h2 className="excited-title">See you soon!</h2>
      <p>Don't forget on {date} at {time}</p>
      <p>Your suggestion: {answer}</p>
    </div>
  );
}

export default Excited;
import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Huh.css';

function Next() {
  const videoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.8;
    }
  }, []);

  const handleButtonClick = () => {
    navigate('/want');
  };

  return (
    <div className="huh-container">
      <h2 className="huh-title">HUH?! Are you sure?</h2>
      <video ref={videoRef} width="600" autoPlay loop>
        <source src="/huh.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="button-container">
        <button className="huh-button" onClick={handleButtonClick}><span>YES! IM SURE!</span></button>
      </div>
    </div>
  );
}

export default Next;
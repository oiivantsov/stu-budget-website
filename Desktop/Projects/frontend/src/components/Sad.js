import React, { useRef, useEffect } from 'react';
import '../css/Sad.css';

function Sad() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0;
    }
  }, []);

  return (
    <div className="sad-container">
      <h2>Sorry to hear that. Maybe next time!</h2>
      <video ref={videoRef} width="600" autoPlay loop muted>
        <source src="/sad.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default Sad;
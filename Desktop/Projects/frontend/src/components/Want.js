import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Want.css';

function Want() {
  const [answer, setAnswer] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.6; // Set volume to 80%
    }
  }, []);

  const handleInputChange = (e) => {
    setAnswer(e.target.value);
    if (e.target.value) {
      setError('');
    }
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleSubmit = () => {
    if (!answer || !date || !time) {
      setError('Please fill out all :c');
      return;
    }
    console.log(`Answer: ${answer}, Date: ${date}, Time: ${time}`);
    navigate('/excited', { state: { date, time, answer } });
  };

  return (
    <div className="want-container">
      <h2 className="want-title">What do you want to do?</h2>
      <video ref={videoRef} width="600" autoPlay loop>
        <source src="/want.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="form-group">
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={handleDateChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="time">Time:</label>
        <input
          type="time"
          id="time"
          value={time}
          onChange={handleTimeChange}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          value={answer}
          onChange={handleInputChange}
          placeholder="Your date idea here"
        />
        {error && <p className="error">{error}</p>}
      </div>
      <button className="want-button" onClick={handleSubmit}><span>Submit</span></button>
    </div>
  );
}

export default Want;
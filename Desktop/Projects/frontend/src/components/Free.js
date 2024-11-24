
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Free.css';

function Free() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log(`Selected date: ${date}, Selected time: ${time}`);
    navigate('/');
  };

  return (
    <div className="free-container">
      <h2>When are you free?</h2>
      <div className="form-group">
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="time">Time:</label>
        <input
          type="time"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>
      <button onClick={handleSubmit}>Submit !</button>
    </div>
  );
}

export default Free;
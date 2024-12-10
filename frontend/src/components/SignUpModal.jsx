import './Modal.css';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

function SignUpModal({ closeSignUpModal, openLoginModal }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: {
      street: '',
      city: '',
    }
  });

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [addressField]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${API_BASE_URL}/user/register`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        login(data.token, data.id); // Assuming the response contains a JWT token and user ID
        closeSignUpModal();
      } else {
        console.error('Signup failed');
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <div className="modal-overlay" onClick={closeSignUpModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={closeSignUpModal}>×</button>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          {/* Address Fields */}
          <div className="form-group">
            <label htmlFor="street">Street (Optional):</label>
            <input
              type="text"
              id="street"
              name="address.street"
              value={formData.address.street}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City (Optional):</label>
            <input
              type="text"
              id="city"
              name="address.city"
              value={formData.address.city}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account?{' '}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              closeSignUpModal();
              openLoginModal();
            }}
          >
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignUpModal;

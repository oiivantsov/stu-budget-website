import './Modal.css';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

function LoginModal({ closeLoginModal, openSignUpModal }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email: formData.email,
      password: String(formData.password)
    };

    try {
      const response = await fetch(`${API_BASE_URL}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        login(data.token, data.id); // Assuming the response contains a JWT token and user ID
        closeLoginModal();
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData.msg);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="modal-overlay" onClick={closeLoginModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={closeLoginModal}>×</button>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>
        </form>
        <p>
          Don’t have an account?{' '}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              closeLoginModal();
              openSignUpModal();
            }}
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginModal;
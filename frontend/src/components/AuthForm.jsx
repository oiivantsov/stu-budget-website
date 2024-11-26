import React, { useState } from 'react';
import useRegister from '../hooks/useRegister'; // Adjusted the import path

const AuthForm = ({ isSignup, closeModal, switchModal }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { email, setEmail, password, setPassword, handleRegister } = useRegister(setIsAuthenticated, isSignup);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister();
  };

  return (
    <div>
      <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {isSignup && (
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              required
            />
          </div>
        )}
        <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
      </form>
      <p>
        {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            closeModal();
            switchModal();
          }}
        >
          {isSignup ? 'Log In' : 'Sign Up'}
        </a>
      </p>
    </div>
  );
};

export default AuthForm;
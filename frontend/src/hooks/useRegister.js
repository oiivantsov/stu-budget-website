import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useRegister = (setIsAuthenticated, isSignup = true) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    const endpoint = isSignup ? '/api/user/signup' : '/api/user/login';
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const user = await response.json();
        localStorage.setItem('user', JSON.stringify(user));
        console.log(`User ${isSignup ? 'signed up' : 'logged in'} successfully!`);
        setIsAuthenticated(true);
        navigate('/');
      } else {
        console.error(`${isSignup ? 'Signup' : 'Login'} failed`);
      }
    } catch (error) {
      console.error(`Error during ${isSignup ? 'signup' : 'login'}:`, error);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleRegister,
  };
};

export default useRegister;
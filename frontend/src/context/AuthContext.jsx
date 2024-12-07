import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUserId = localStorage.getItem('userId');
    if (savedToken && savedUserId) {
      setToken(savedToken);
      setUserId(savedUserId);
      setIsLoggedIn(true);
      fetchUsername(savedUserId, savedToken);
    }
  }, []);

  const fetchUsername = async (id, token) => {
    try {
      const response = await fetch(`/user/byId/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUsername(data.username);
        localStorage.setItem('username', data.username);
      } else {
        console.error('Failed to fetch username');
      }
    } catch (error) {
      console.error('Error fetching username:', error);
    }
  };

  const login = (jwtToken, id) => {
    setIsLoggedIn(true);
    setToken(jwtToken);
    setUserId(id);
    localStorage.setItem('token', jwtToken);
    localStorage.setItem('userId', id);
    fetchUsername(id, jwtToken);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setToken(null);
    setUserId(null);
    setUsername(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
  };

  const value = {
    isLoggedIn,
    token,
    userId,
    username,
    login,
    logout,
  };

  return <AuthContext.Provider value={value} {...props} />;
}
// context/AuthProvider.jsx
import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";

export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Tracks login state
  const [token, setToken] = useState(null); // Stores user's token
  const [email, setEmail] = useState(null); // Stores user's email
  const [isLoading, setIsLoading] = useState(true); // Tracks loading state

  // Load user data from local storage when the app starts
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.token) {
      setIsAuthenticated(true); // Set user as authenticated if token is found
      setToken(userData.token);
      setEmail(userData.email);
    }
    setIsLoading(false); // Set loading to false after checking local storage
  }, []);

  // Set the user's data after login/signup
  function setUser(userData) {
    setIsAuthenticated(true); // Mark the user as authenticated
    setToken(userData.token); // Store the token and email
    setEmail(userData.email);
    localStorage.setItem("user", JSON.stringify(userData)); // Save user info in local storage
  }

  // Clear the user's data during logout
  function clearUser() {
    setIsAuthenticated(false); // Mark the user as not authenticated
    setToken(null); // Clear token and email
    setEmail(null);
    localStorage.removeItem("user"); // Remove user info from local storage
  }

  // Provide authentication values to all children components
  const authValue = {
    isAuthenticated,
    setIsAuthenticated,
    token,
    email,
    isLoading,
    setUser,
    clearUser,
  };

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
}
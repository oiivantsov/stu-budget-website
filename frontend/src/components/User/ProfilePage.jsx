import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import FavoritesComponent from '../favorites/FavoritesComponent';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const ProfilePage = () => {
  const { userId, token } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/user/byId/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUserDetails(data);
        } else {
          console.error('Failed to fetch user details');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [userId, token]);

  return (
    <div>
      {userDetails ? (
        <div>
          <h1>Profile</h1>
          <h2>Username: {userDetails.username}</h2>
          <h2>Email: {userDetails.email}</h2>
          {userDetails.address ? (
            <div>
              <h2>Address:</h2>
              <p>Street: {userDetails.address.street || 'N/A'}</p>
              <p>City: {userDetails.address.city || 'N/A'}</p>
            </div>
          ) : (
            <p>No address available.</p>
          )}
          <FavoritesComponent />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfilePage;

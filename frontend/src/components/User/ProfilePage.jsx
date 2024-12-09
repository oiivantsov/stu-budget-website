import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import FavoritesComponent from '../favorites/FavoritesComponent';

const ProfilePage = () => {
  const { userId, token } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`/user/byId/${userId}`, {
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
          <FavoritesComponent />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfilePage;

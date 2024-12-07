import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get('userid');

    if (userId) {
      fetchUserDetails(userId);
    }
  }, [location]);

  const fetchUserDetails = async (userId) => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/user/byId/${userId}`);
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

  return (
    <div>
      {userDetails ? (
        <div>
          <h1>Profile</h1>
          <h2>Username: {userDetails.username}</h2>
          <h2>Email: {userDetails.email}</h2>
          <h2>Favorites</h2>
          <ul>
            {userDetails.favorites && userDetails.favorites.length > 0 ? (
              userDetails.favorites.map((favorite) => (
                <li key={favorite._id}>{favorite.name}</li>
              ))
            ) : (
              <p>No favorites added yet.</p>
            )}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfilePage;
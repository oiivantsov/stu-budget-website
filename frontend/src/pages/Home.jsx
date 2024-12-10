import React, { useEffect, useState, useContext } from 'react';
import { fetchAllCafes } from '../utils/CafesAPI';
import { AuthContext } from '../context/AuthContext';
import Hero from '../components/home/Hero';
import Nearby from '../components/home/Nearby';
import Categories from '../components/home/Categories';
import Recommended from '../components/home/Recommended';

function Home() {
  const [cafes, setCafes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userAddress, setUserAddress] = useState(null);

  const { userId, token } = useContext(AuthContext);

  // Fetch all cafes
  useEffect(() => {
    const loadCafes = async () => {
      try {
        const data = await fetchAllCafes();
        setCafes(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    loadCafes();
  }, []);

  // Fetch user address
  useEffect(() => {
    const fetchUserAddress = async () => {
      try {
        const response = await fetch(`/user/byId/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUserAddress(data.address); // Assuming the address is returned in the user object
        } else {
          console.error("Failed to fetch user details");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (userId && token) fetchUserAddress();
  }, [userId, token]);

  if (loading) return <p>Loading cafes...</p>;
  if (error) return <p>{error}</p>;

  // Filter recommended cafes
  const recommendedRestaurants = cafes
    .sort((a, b) => b.reviewsAverage - a.reviewsAverage) // Sort by highest rating
    .slice(0, 6); // Top 3

  return (
    <main className="main-content">
      <Hero />
      <Categories />
      {userAddress ? (
        <Nearby city={userAddress.city} street={userAddress.street} limit={5000} /> // Limit to 5km
      ) : (
        <p className="address-info">
          Set your address in your profile to find nearby restaurants!
        </p>
      )}
      <Recommended recommendedRestaurants={recommendedRestaurants} />
    </main>
  );
}

export default Home;

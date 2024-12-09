import React, { useEffect, useState } from 'react';
import { fetchAllCafes } from '../utils/CafesAPI';
import Hero from '../components/home/Hero';
import Nearby from '../components/home/Nearby';
import Categories from '../components/home/Categories';
import Recommended from '../components/home/Recommended';

function Home() {
  const [cafes, setCafes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p className="text-gray-600">Loading cafes...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  // Filter recommended and nearby cafes
  const recommendedRestaurants = cafes
    .sort((a, b) => b.reviewsAverage - a.reviewsAverage) // Sort by highest rating
    .slice(0, 3); // Top 3
  const nearbyRestaurants = cafes.slice(0, 3); // Arbitrary top 3 for nearby

  return (
    <main className="main-content bg-gray-100 dark:bg-gray-900">
      <Hero />
      <Categories />
      <Nearby nearbyRestaurants={nearbyRestaurants} />
      <Recommended recommendedRestaurants={recommendedRestaurants} />
    </main>
  );
}

export default Home;

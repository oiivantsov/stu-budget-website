import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchNearbyCafes } from "../../utils/CafesAPI";
import { capitalizeFirstLetter } from '../../utils/TextFormat';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

function Nearby({ city, street, limit }) {
  const [nearbyRestaurants, setNearbyRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const placeholderImage = "https://via.placeholder.com/150?text=No+Image";

  useEffect(() => {
    if (!city || !street) return;
  
    const fetchRestaurants = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchNearbyCafes(city, street, limit || 5000);
        const transformedData = data.map(({ restaurant, distance }) => ({
          ...restaurant,
          distance,
        }));
        console.log(transformedData);
        setNearbyRestaurants(transformedData);
      } catch (err) {
        setError("Failed to fetch nearby restaurants. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchRestaurants();
  }, [city, street, limit]);

  if (!city || !street) {
    return null; // Prevent rendering the section if address is not provided
  }

  return (
    <section className="nearby">
      <h2>Restaurants Near You</h2>
      {loading ? (
        <p>Loading nearby restaurants...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : nearbyRestaurants.length === 0 ? (
        <p>No nearby restaurants found.</p>
      ) : (
        <div className="nearby-cards">
          {nearbyRestaurants.slice(0, 6).map((restaurant) => (
            <Link
              to={`/business/${restaurant._id}`}
              key={restaurant._id}
              className="nearby-card-link"
            >
              <div className="nearby-card">
                <img
                  src={restaurant.images && restaurant.images.length > 0 ? `${API_BASE_URL}/public/${restaurant.images[0]}` : placeholderImage}
                  alt={restaurant.name}
                  className="restaurant-image"
                />
                <div className="restaurant-info">
                  <h3>{capitalizeFirstLetter(restaurant.name)}</h3>
                  <p>
                    {restaurant.reviewsAverage || "No ratings"} ⭐ •{" "}
                    {restaurant.city || "Unknown City"}
                  </p>
                  <p>{(restaurant.distance / 1000).toFixed(2)} km away</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

export default Nearby;

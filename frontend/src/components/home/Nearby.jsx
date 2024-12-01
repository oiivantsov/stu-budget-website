import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchNearbyCafes } from "../../utils/CafesAPI"; // Adjust the path to your API utility file

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
        const data = await fetchNearbyCafes(city, street, limit || 6);
        setNearbyRestaurants(data);
      } catch (err) {
        setError("Failed to fetch nearby restaurants. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [city, street, limit]);

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
          {nearbyRestaurants.map((restaurant) => (
            <Link
              to={`/business/${restaurant.id}`} // Link to the correct business page
              key={restaurant.id}
              className="nearby-card-link"
            >
              <div className="nearby-card">
                <img
                  src={
                    restaurant.images && restaurant.images.length > 0
                      ? restaurant.images[0]
                      : placeholderImage
                  }
                  alt={restaurant.name}
                  className="restaurant-image"
                />
                <div className="restaurant-info">
                  <h3>{restaurant.name}</h3>
                  <p>
                    {restaurant.reviews?.average || "No ratings"} ⭐ •{" "}
                    {restaurant.category || "Unknown Category"} •{" "}
                    {restaurant.address?.city || "Unknown City"}
                  </p>
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

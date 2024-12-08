import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import useFetchFavorites from '../../hooks/useFetchFavorites';

const FavoritesComponent = () => {
  const { userId, token } = useContext(AuthContext);
  const { favorites, loading, error } = useFetchFavorites(userId, token);

  const placeholderImage = "https://via.placeholder.com/150?text=No+Image";

  if (loading) return <p>Loading favorites...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <section className="favorites">
      <h2>Favorites</h2>
      <div className="favorites-cards">
        {favorites.length > 0 ? (
          favorites.map((restaurant) => (
            <Link
              to={`/business/${restaurant._id}`}
              key={restaurant._id}
              className="favorites-card-link"
            >
              <div className="favorites-card">
                <img
                  src={restaurant.images && restaurant.images.length > 0 ? restaurant.images[0] : placeholderImage}
                  alt={restaurant.name}
                  className="favorites-image"
                />
                <div className="restaurant-info">
                  <h3>{restaurant.name}</h3>
                  <p>{restaurant.reviewsAverage} ⭐ • {restaurant.category}</p>
                  <p className="location">
                    {restaurant.coordinates.lat}, {restaurant.coordinates.long}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No favorites yet.</p>
        )}
      </div>
    </section>
  );
};

export default FavoritesComponent;
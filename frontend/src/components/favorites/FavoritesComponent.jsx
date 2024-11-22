import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { businesses } from '../../data/businesses';

function FavoritesComponent() {
  const [favoriteIds, setFavoriteIds] = useState([1, 2, 3]); // Initialize with example IDs

  const favorites = businesses.filter((business) => favoriteIds.includes(business.id));

  const placeholderImage = "https://via.placeholder.com/150?text=No+Image";

  return (
    <section className="favorites">
      <h2>Favorites</h2>
      <div className="favorites-cards">
        {favorites.length > 0 ? (
          favorites.map((restaurant) => (
            <Link
              to={`/business/${restaurant.id}`}
              key={restaurant.id}
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
                  <p>{restaurant.reviews.average} ⭐ • {restaurant.category}</p>
                  <p className="location">
                    {restaurant.address.street}, {restaurant.address.city}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No favorite businesses yet! Add some to see them here.</p>
        )}
      </div>
    </section>
  );
}

export default FavoritesComponent;

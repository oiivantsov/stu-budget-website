// src/components/Favorites.js
import React from 'react';
import { Link } from 'react-router-dom';
import favoritesData from '../../data/favoritesData';

function FavoritesComponent() {
  return (
    <section className="favorites">
      <h2>Favorites</h2>
      <div className="favorites-cards">
        {favoritesData.map((restaurant) => (
          // <Link to={`/business/${restaurant.id}`} key={restaurant.id} className="favorites-card-link">
          <Link to={`/business`} key={restaurant.id} className="favorites-card-link">
            <div className="favorites-card">
              <img src={restaurant.image} alt={restaurant.name} />
              <div className="restaurant-info">
                <h3>{restaurant.name}</h3>
                <p>{restaurant.rating} • {restaurant.cuisine} • {restaurant.price}</p>
                <p className="location">{restaurant.location}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default FavoritesComponent;

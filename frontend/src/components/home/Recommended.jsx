import { Link } from 'react-router-dom';
import { capitalizeFirstLetter } from '../../utils/TextFormat';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

function Recommended({ recommendedRestaurants }) {
  const placeholderImage = "https://via.placeholder.com/150?text=No+Image";

  return (
    <section className="recommended">
      <h2>Recommended Restaurants</h2>
      <div className="recommended-cards">
        {recommendedRestaurants.map((restaurant) => (
          <Link
            to={`/business/${restaurant._id}`} // Link to the correct business page
            key={restaurant._id}
            className="recommended-card-link"
          >
            <div className="recommended-card">
              <img
                src={restaurant.images && restaurant.images.length > 0 ? `${API_BASE_URL}/public/${restaurant.images[0]}` : placeholderImage}
                alt={restaurant.name}
                className="restaurant-image"
              />
              <div className="restaurant-info">
                <h3>{capitalizeFirstLetter(restaurant.name)}</h3>
                <p>
                  {restaurant.reviewsAverage} ⭐ • {capitalizeFirstLetter(restaurant.city)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Recommended;

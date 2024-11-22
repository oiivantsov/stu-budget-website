import { Link } from 'react-router-dom';

function Recommended({ recommendedRestaurants }) {
  const placeholderImage = "https://via.placeholder.com/150?text=No+Image";

  return (
    <section className="recommended">
      <h2>Recommended Restaurants</h2>
      <div className="recommended-cards">
        {recommendedRestaurants.map((restaurant) => (
          <Link
            to={`/business/${restaurant.id}`} // Link to the correct business page
            key={restaurant.id}
            className="recommended-card-link"
          >
            <div className="recommended-card">
              <img
                src={restaurant.images && restaurant.images.length > 0 ? restaurant.images[0] : placeholderImage}
                alt={restaurant.name}
                className="restaurant-image"
              />
              <div className="restaurant-info">
                <h3>{restaurant.name}</h3>
                <p>
                  {restaurant.reviews.average} ⭐ • {restaurant.category} • {restaurant.address.city}
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

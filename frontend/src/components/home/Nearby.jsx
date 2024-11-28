import { Link } from 'react-router-dom';

function Nearby({ nearbyRestaurants }) {
  const placeholderImage = "https://via.placeholder.com/150?text=No+Image";

  return (
    <section className="nearby">
      <h2>Restaurants Near You</h2>
      <div className="nearby-cards">
        {nearbyRestaurants.map((restaurant) => (
          <Link
            to={`/business/${restaurant.id}`} // Link to the correct business page
            key={restaurant.id}
            className="nearby-card-link"
          >
            <div className="nearby-card">
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

export default Nearby;

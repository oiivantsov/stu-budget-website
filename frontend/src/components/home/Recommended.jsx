import { Link } from 'react-router-dom';

function Recommended({ recommendedRestaurants }) {
  return (
    <section className="recommended">
      <h2>Recommended Restaurants</h2>
      <div className="recommended-cards">
        {recommendedRestaurants.map((restaurant) => (
          <Link to="/business" key={restaurant.id} className="recommended-card-link">
            <div className="recommended-card">
              <img src={restaurant.image} alt={restaurant.name} />
              <div className="restaurant-info">
                <h3>{restaurant.name}</h3>
                <p>{restaurant.rating} • {restaurant.cuisine} • {restaurant.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Recommended;

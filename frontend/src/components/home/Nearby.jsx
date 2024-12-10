import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { fetchNearbyCafes } from "../../utils/CafesAPI";
import { capitalizeFirstLetter } from '../../utils/TextFormat';
import { LanguageContext } from "../../context/LanguageContext";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

function Nearby({ city, street, limit }) {
  const [nearbyRestaurants, setNearbyRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const placeholderImage = "https://via.placeholder.com/150?text=No+Image";
  const { language } = useContext(LanguageContext);

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

  const getText = (key) => {
    const texts = {
      title: {
        en: "Restaurants Near You",
        fi: "Lähelläsi olevat ravintolat",
        sv: "Restauranger nära dig"
      },
      loading: {
        en: "Loading nearby restaurants...",
        fi: "Ladataan lähellä olevia ravintoloita...",
        sv: "Laddar närliggande restauranger..."
      },
      noResults: {
        en: "No nearby restaurants found.",
        fi: "Lähellä ei löytynyt ravintoloita.",
        sv: "Inga närliggande restauranger hittades."
      },
      error: {
        en: "Failed to fetch nearby restaurants. Please try again later.",
        fi: "Lähellä olevien ravintoloiden haku epäonnistui. Yritä myöhemmin uudelleen.",
        sv: "Det gick inte att hämta närliggande restauranger. Försök igen senare."
      }
    };
    return texts[key][language];
  };

  return (
    <section className="nearby py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{getText("title")}</h2>
        {loading ? (
          <p className="text-gray-600">{getText("loading")}</p>
        ) : error ? (
          <p className="text-red-500">{getText("error")}</p>
        ) : nearbyRestaurants.length === 0 ? (
          <p className="text-gray-600">{getText("noResults")}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {nearbyRestaurants.slice(0, 3).map((restaurant) => (
              <Link
                to={`/business/${restaurant._id}`} // Link to the correct business page
                key={restaurant._id}
                className="block bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative pb-2/3">
                  <img
                    src={
                      restaurant.images && restaurant.images.length > 0
                        ? `${API_BASE_URL}/public/${restaurant.images[0]}`
                        : placeholderImage
                    }
                    alt={restaurant.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">{capitalizeFirstLetter(restaurant.name)}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {restaurant.reviewsAverage
                      ? `${parseFloat(restaurant.reviewsAverage).toFixed(1)} ⭐`
                      : "No ratings"} •{" "}
                    {restaurant.city || "Unknown City"}
                  </p>
                  <p>{(restaurant.distance / 1000).toFixed(2)} km away</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Nearby;
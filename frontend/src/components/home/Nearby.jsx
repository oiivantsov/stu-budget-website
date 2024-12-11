import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section className="nearby bg-gray-100 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          {getText('title')}
        </h2>
        {loading ? (
          <p className="text-gray-600 dark:text-gray-300">{getText("loading")}</p>
        ) : error ? (
          <p className="text-red-500">{getText("error")}</p>
        ) : nearbyRestaurants.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">{getText("noResults")}</p>
        ) : (
          <Slider {...sliderSettings} className="nearby-slider">
            {nearbyRestaurants.slice(0,6).map((restaurant) => (
              <Link
                to={`/business/${restaurant._id}`}
                key={restaurant._id}
                className="nearby-card-link block text-inherit"
              >
                <div className="nearby-card bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105 overflow-hidden border dark:border-white mx-2">
                  <img
                    src={
                      restaurant.images && restaurant.images.length > 0
                        ? `${API_BASE_URL}/public/${restaurant.images[0]}`
                        : placeholderImage
                    }
                    alt={restaurant.name || "No image available"}
                    className="nearby-card-image w-full h-64 object-cover"
                  />
                  <div className="restaurant-info p-4 text-center">
                    <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                      {capitalizeFirstLetter(restaurant.name)}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {restaurant.reviewsAverage
                        ? `${parseFloat(restaurant.reviewsAverage).toFixed(1)} ⭐`
                        : "No ratings"} • {capitalizeFirstLetter(restaurant.city || "Unknown City")}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      {(restaurant.distance / 1000).toFixed(2)} km away
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </Slider>
        )}
      </div>
    </section>
  );
}

export default Nearby;
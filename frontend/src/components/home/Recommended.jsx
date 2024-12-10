import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { capitalizeFirstLetter } from '../../utils/TextFormat';
import { LanguageContext } from '../../context/LanguageContext';
import Slider from 'react-slick';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

function Recommended({ recommendedRestaurants }) {
  const placeholderImage = "https://via.placeholder.com/150?text=No+Image";
  const { language } = useContext(LanguageContext);

  const getText = (key) => {
    const texts = {
      title: {
        en: "Recommended Restaurants",
        fi: "Suositellut Ravintolat",
        sv: "Rekommenderade Restauranger"
      }
    };
    return texts[key][language];
  };

  const settings = {
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
    <section className="recommended bg-gray-100 dark:bg-gray-900 py-8 mt-28">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{getText("title")}</h2>
        <Slider {...settings}>
          {recommendedRestaurants.map((restaurant) => (
            <Link
              to={`/business/${restaurant._id}`} // Link to the correct business page
              key={restaurant._id}
              className="recommended-card-link block text-inherit"
            >
              <div className="recommended-card bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105 overflow-hidden border dark:border-white mx-2">
                <img
                  src={restaurant.images && restaurant.images.length > 0 ? `${API_BASE_URL}/public/${restaurant.images[0]}` : placeholderImage}
                  alt={restaurant.name}
                  className="restaurant-image w-full h-64 object-cover"
                />
                <div className="restaurant-info p-4 text-center">
                  <h3 className="text-xl mb-2 text-gray-800 dark:text-white">{capitalizeFirstLetter(restaurant.name)}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {restaurant.reviewsAverage} ⭐ • {capitalizeFirstLetter(restaurant.city)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Recommended;
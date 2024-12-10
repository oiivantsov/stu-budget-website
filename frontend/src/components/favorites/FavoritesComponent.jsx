import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { AuthContext } from '../../context/AuthContext';
import { LanguageContext } from '../../context/LanguageContext';
import useFetchFavorites from '../../hooks/useFetchFavorites';
import useDeleteFavorite from '../../hooks/useDeleteFavorite';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FavoritesComponent = () => {
  const { userId, token } = useContext(AuthContext);
  const { language } = useContext(LanguageContext);
  const { favorites, loading, error, setFavorites } = useFetchFavorites(userId, token);
  const { deleteFavorite, loading: deleting, error: deleteError } = useDeleteFavorite(token, setFavorites);

  const placeholderImage = "https://via.placeholder.com/150?text=No+Image";

  const getText = (key) => {
    const texts = {
      loading: {
        en: 'Loading favorites...',
        fi: 'Ladataan suosikkeja...',
        sv: 'Laddar favoriter...'
      },
      error: {
        en: 'Failed to load favorites.',
        fi: 'Suosikkien lataaminen epäonnistui.',
        sv: 'Det gick inte att ladda favoriter.'
      },
      noFavorites: {
        en: 'No favorites found.',
        fi: 'Ei suosikkeja löytynyt.',
        sv: 'Inga favoriter hittades.'
      },
      delete: {
        en: 'Delete',
        fi: 'Poista',
        sv: 'Ta bort'
      },
      deleting: {
        en: 'Deleting...',
        fi: 'Poistetaan...',
        sv: 'Tas bort...'
      },
      favorites: {
        en: 'Favorites',
        fi: 'Suosikit',
        sv: 'Favoriter'
      }
    };
    return texts[key][language];
  };

  if (loading) return <p className="text-center py-4 text-gray-600 dark:text-gray-300">{getText('loading')}</p>;
  if (error) return <p className="text-center py-4 text-red-500">{getText('error')}</p>;

  const settings = {
    dots: true,
    infinite: favorites.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
  };

  return (
    <section className="favorites py-4">
      <div className="container mx-auto px-4 max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{getText('favorites')}</h2>
        <Slider {...settings}>
          {favorites.length > 0 ? (
            favorites.map((restaurant) => (
              <div 
                key={restaurant._id} 
                className="favorites-card bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-white"
              >
                <Link
                  to={`/business/${restaurant._id}`}
                  className="block"
                >
                  <div className="relative">
                    <img
                      src={restaurant.images && restaurant.images.length > 0 ? restaurant.images[0] : placeholderImage}
                      alt={restaurant.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-black mb-1">
                        {restaurant.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                        {restaurant.reviewsAverage} ⭐ • {restaurant.category}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                        {restaurant.website}
                      </p>
                    </div>
                  </div>
                </Link>
                <div className="px-4 pb-4">
                  <button
                    onClick={() => deleteFavorite(restaurant._id)}
                    className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                    disabled={deleting}
                  >
                    {deleting ? getText('deleting') : getText('delete')}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center py-4 text-gray-600 dark:text-gray-300">{getText('noFavorites')}</p>
          )}
        </Slider>
      </div>
    </section>
  );
};

export default FavoritesComponent;
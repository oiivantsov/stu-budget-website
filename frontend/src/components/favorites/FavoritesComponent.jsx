import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { LanguageContext } from '../../context/LanguageContext';
import useFetchFavorites from '../../hooks/useFetchFavorites';
import useDeleteFavorite from '../../hooks/useDeleteFavorite';

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
        sv: 'Radera'
      },
      deleting: {
        en: 'Deleting...',
        fi: 'Poistetaan...',
        sv: 'Raderar...'
      },
      favorites: {
        en: 'Favorites',
        fi: 'Suosikit',
        sv: 'Favoriter'
      }
    };
    return texts[key][language];
  };

  if (loading) return <p className="text-gray-600">{getText('loading')}</p>;
  if (error) return <p className="text-red-500">{getText('error')}</p>;

  return (
    <section className="favorites py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{getText('favorites')}</h2>
        <div className="favorites-cards grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {favorites.length > 0 ? (
            favorites.map((restaurant) => (
              <div key={restaurant._id} className="favorites-card-wrapper bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 text-center">
                <Link
                  to={`/business/${restaurant._id}`}
                  className="favorites-card-link block text-inherit"
                >
                  <div className="favorites-card overflow-hidden">
                    <img
                      src={restaurant.images && restaurant.images.length > 0 ? restaurant.images[0] : placeholderImage}
                      alt={restaurant.name}
                      className="favorites-image w-full h-64 object-cover"
                    />
                    <div className="restaurant-info p-4">
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white">{restaurant.name}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{restaurant.reviewsAverage} ⭐ • {restaurant.category}</p>
                      <p className="text-gray-600 dark:text-gray-300">{restaurant.website}</p>
                    </div>
                  </div>
                </Link>
                <button
                  onClick={() => deleteFavorite(restaurant._id)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  disabled={deleting}
                >
                  {deleting ? getText('deleting') : getText('delete')}
                </button>
                {deleteError && <p className="text-red-500 mt-2">{deleteError}</p>}
              </div>
            ))
          ) : (
            <p className="text-gray-600">{getText('noFavorites')}</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default FavoritesComponent;
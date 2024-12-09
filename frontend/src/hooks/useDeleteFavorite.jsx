import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { LanguageContext } from '../context/LanguageContext';

const useDeleteFavorite = (token, setFavorites) => {
  const { language } = useContext(LanguageContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getText = (key) => {
    const texts = {
      success: {
        en: 'Restaurant removed from favorites',
        fi: 'Ravintola poistettu suosikeista',
        sv: 'Restaurang borttagen från favoriter'
      },
      error: {
        en: 'Failed to delete favorite',
        fi: 'Suosikin poistaminen epäonnistui',
        sv: 'Det gick inte att ta bort favoriten'
      }
    };
    return texts[key][language];
  };

  const deleteFavorite = async (restaurantId) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/user/favorite/?restaurantId=${restaurantId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete favorite: ${errorText}`);
      }
      setFavorites((prevFavorites) => prevFavorites.filter((restaurant) => restaurant._id !== restaurantId));
      toast.success(getText('success'));
    } catch (error) {
      console.error('Error deleting favorite:', error);
      setError(`${getText('error')}: ${error.message}`);
      toast.error(`${getText('error')}: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return { deleteFavorite, loading, error };
};

export default useDeleteFavorite;
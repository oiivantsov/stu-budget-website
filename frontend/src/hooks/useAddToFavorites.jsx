import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { LanguageContext } from '../context/LanguageContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const useAddToFavorites = (token) => {
  const { language } = useContext(LanguageContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getText = (key) => {
    const texts = {
      success: {
        en: 'Restaurant added to favorites',
        fi: 'Ravintola lisätty suosikkeihin',
        sv: 'Restaurang tillagd i favoriter'
      },
      error: {
        en: 'Failed to add to favorites',
        fi: 'Lisääminen suosikkeihin epäonnistui',
        sv: 'Det gick inte att lägga till i favoriter'
      }
    };
    return texts[key][language];
  };

  const addToFavorites = async (restaurantId) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/user/favorite/?restaurantId=${restaurantId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to add to favorites: ${errorText}`);
      }
      toast.success(getText('success'));
    } catch (error) {
      console.error('Error adding to favorites:', error);
      setError(`${getText('error')}: ${error.message}`);
      toast.error(`${getText('error')}`);
    } finally {
      setLoading(false);
    }
  };

  return { addToFavorites, loading, error };
};

export default useAddToFavorites;
import { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { LanguageContext } from '../context/LanguageContext';

const useFetchFavorites = (userId, token) => {
  const { language } = useContext(LanguageContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getText = (key) => {
    const texts = {
      invalidUserId: {
        en: 'Invalid user id',
        fi: 'Virheellinen käyttäjätunnus',
        sv: 'Ogiltigt användar-ID'
      },
      fetchError: {
        en: 'Failed to fetch favorites',
        fi: 'Suosikkien haku epäonnistui',
        sv: 'Det gick inte att hämta favoriter'
      }
    };
    return texts[key][language];
  };

  useEffect(() => {
    if (!userId) {
      setError(getText('invalidUserId'));
      setLoading(false);
      return;
    }

    const fetchFavorites = async () => {
      try {
        const response = await fetch(`/user/favorite/?userId=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch favorites: ${errorText}`);
        }
        const data = await response.json();
        setFavorites(data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
        setError(getText('fetchError'));
        toast.error(`${getText('fetchError')}: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [userId, token, getText]);

  return { favorites, loading, error, setFavorites };
};

export default useFetchFavorites;
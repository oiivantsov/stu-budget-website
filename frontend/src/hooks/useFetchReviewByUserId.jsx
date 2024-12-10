import { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { LanguageContext } from '../context/LanguageContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const useFetchReviewByUserId = (userId, token) => {
  const { language } = useContext(LanguageContext);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');

  const getText = (key) => {
    const texts = {
      invalidUserId: {
        en: 'Invalid user id',
        fi: 'Virheellinen käyttäjätunnus',
        sv: 'Ogiltigt användar-ID'
      },
      fetchError: {
        en: 'Failed to fetch reviews',
        fi: 'Arvostelujen haku epäonnistui',
        sv: 'Det gick inte att hämta recensioner'
      }
    };
    return texts[key][language];
  };

  useEffect(() => {
    const fetchReviews = async () => {
      if (!userId) {
        setError(getText('invalidUserId'));
        toast.error(getText('invalidUserId'));
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/review/user?userId=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          const errorText = await response.text();
          console.log('Error response text:', errorText);
          throw new Error(`Failed to fetch reviews: ${errorText}`);
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Received non-JSON response');
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setError(getText('fetchError'));
        toast.error(`${getText('fetchError')}: ${error.message}`);
      }
    };

    fetchReviews();
  }, [userId, token, getText]);

  return { reviews, error, setReviews };
};

export default useFetchReviewByUserId;
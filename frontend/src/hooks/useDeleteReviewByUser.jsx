import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { LanguageContext } from '../context/LanguageContext';

const useDeleteReview = (token, setReviews) => {
  const { language } = useContext(LanguageContext);
  const [error, setError] = useState('');

  const getText = (key) => {
    const texts = {
      success: {
        en: 'Review deleted successfully',
        fi: 'Arvostelu poistettu onnistuneesti',
        sv: 'Recensionen raderades framgångsrikt'
      },
      error: {
        en: 'Failed to delete review',
        fi: 'Arvostelun poistaminen epäonnistui',
        sv: 'Det gick inte att radera recensionen'
      }
    };
    return texts[key][language];
  };

  const deleteReview = async (reviewId) => {
    try {
      const response = await fetch(`/review/?reviewId=${reviewId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete review: ${errorText}`);
      }
      setReviews((prevReviews) => prevReviews.filter((review) => review._id !== reviewId));
      toast.success(getText('success'));
    } catch (error) {
      console.error('Error deleting review:', error);
      setError(`${getText('error')}: ${error.message}`);
      toast.error(`${getText('error')}: ${error.message}`);
    }
  };

  return { deleteReview, error };
};

export default useDeleteReview;
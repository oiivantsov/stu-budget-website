
import React, { useState, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import './Modal.css';

function WriteReviewModal({ closeModal, addReview, cafeId }) {
  const { language } = useContext(LanguageContext);
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!rating || !comment) {
      setError(getText('error'));
      setLoading(false);
      return;
    }

    try {
      // Construct the review object
      const newReview = {
        restaurant: cafeId,
        rating: parseInt(rating, 10),
        comment,
      };

      // Pass the new review to the parent component
      await addReview(newReview);
      closeModal();
    } catch (err) {
      console.error('Failed to submit review:', err.message);
      setError(getText('submitError'));
    } finally {
      setLoading(false);
    }
  };

  const getText = (key) => {
    const texts = {
      title: {
        en: 'Write a Review',
        fi: 'Kirjoita arvostelu',
        sv: 'Skriv en recension'
      },
      rating: {
        en: 'Rating',
        fi: 'Arvosana',
        sv: 'Betyg'
      },
      comment: {
        en: 'Comment',
        fi: 'Kommentti',
        sv: 'Kommentar'
      },
      submit: {
        en: 'Submit',
        fi: 'Lähetä',
        sv: 'Skicka'
      },
      close: {
        en: 'Close',
        fi: 'Sulje',
        sv: 'Stäng'
      },
      error: {
        en: 'Please provide a rating and a comment.',
        fi: 'Anna arvosana ja kommentti.',
        sv: 'Vänligen ge ett betyg och en kommentar.'
      },
      submitError: {
        en: 'Failed to submit review. Please try again.',
        fi: 'Arvostelun lähettäminen epäonnistui. Yritä uudelleen.',
        sv: 'Det gick inte att skicka recensionen. Försök igen.'
      }
    };
    return texts[key][language];
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
        <button className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white focus:outline-none" onClick={closeModal}>×</button>
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{getText('title')}</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="rating" className="block text-gray-700 dark:text-gray-300 mb-2">{getText('rating')}</label>
            <input
              type="number"
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              min="1"
              max="5"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="comment" className="block text-gray-700 dark:text-gray-300 mb-2">{getText('comment')}</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
              onClick={closeModal}
            >
              {getText('close')}
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              {loading ? 'Loading...' : getText('submit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default WriteReviewModal;
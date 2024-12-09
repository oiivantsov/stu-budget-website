import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { LanguageContext } from '../../context/LanguageContext';
import ReviewDetails from './ReviewDetails';
import useFetchReviewByUserId from '../../hooks/useFetchReviewByUserId';
import useDeleteReviewByUser from '../../hooks/useDeleteReviewByUser';

const UserReviewsPage = () => {
  const { userId, token } = useContext(AuthContext);
  const { language } = useContext(LanguageContext);
  const { reviews, error: fetchError, setReviews } = useFetchReviewByUserId(userId, token);
  const { deleteReview, error: deleteError, success } = useDeleteReviewByUser(token, setReviews);

  const getText = (key) => {
    const texts = {
      title: {
        en: 'Your Reviews',
        fi: 'Arvostelusi',
        sv: 'Dina recensioner'
      },
      noReviews: {
        en: 'No reviews yet. Start exploring and sharing your experiences!',
        fi: 'Ei arvosteluja vielä. Aloita tutkiminen ja jaa kokemuksesi!',
        sv: 'Inga recensioner ännu. Börja utforska och dela dina upplevelser!'
      },
      fetchError: {
        en: 'Failed to fetch reviews.',
        fi: 'Arvostelujen haku epäonnistui.',
        sv: 'Det gick inte att hämta recensioner.'
      },
      deleteError: {
        en: 'Failed to delete review.',
        fi: 'Arvostelun poistaminen epäonnistui.',
        sv: 'Det gick inte att radera recensionen.'
      },
      success: {
        en: 'Review deleted successfully.',
        fi: 'Arvostelu poistettu onnistuneesti.',
        sv: 'Recensionen raderades framgångsrikt.'
      }
    };
    return texts[key][language];
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">{getText('title')}</h1>
      {fetchError && <p className="text-red-500 mb-4 p-4 bg-red-100 dark:bg-red-900 rounded-md">{getText('fetchError')}</p>}
      {deleteError && <p className="text-red-500 mb-4 p-4 bg-red-100 dark:bg-red-900 rounded-md">{getText('deleteError')}</p>}
      {success && <p className="text-green-500 mb-4 p-4 bg-green-100 dark:bg-green-900 rounded-md">{getText('success')}</p>}
      {reviews.length > 0 ? (
        <ul className="space-y-6">
          {reviews.map((review) => (
            <li key={review._id}>
              <ReviewDetails review={review} onDelete={deleteReview} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 dark:text-gray-400 text-lg text-center p-8 bg-gray-100 dark:bg-gray-700 rounded-md">
          {getText('noReviews')}
        </p>
      )}
    </div>
  );
};

export default UserReviewsPage;
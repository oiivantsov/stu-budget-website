import React, { useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import Review from './Review';

function ReviewsSection({ reviews }) {
  const { language } = useContext(LanguageContext);

  const getText = (key) => {
    const texts = {
      customerReviews: {
        en: 'Customer Reviews',
        fi: 'Asiakasarvostelut',
        sv: 'Kundrecensioner'
      },
      noReviews: {
        en: 'No reviews yet. Be the first to review!',
        fi: 'Ei arvosteluja vielä. Ole ensimmäinen arvostelija!',
        sv: 'Inga recensioner ännu. Bli den första att recensera!'
      }
    };
    return texts[key][language];
  };

  return (
    <section className="reviews bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{getText('customerReviews')}</h2>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <Review
            key={review.id || review._id}
            id={review.id || review._id}
            userName={review.user.username}
            rating={review.rating}
            comment={review.comment}
          />
        ))
      ) : (
        <p className="text-gray-600 dark:text-gray-300">{getText('noReviews')}</p>
      )}
    </section>
  );
}

export default ReviewsSection;
import React, { useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';

function Review({ id, userName, rating, comment }) {
  const { language } = useContext(LanguageContext);

  const getText = (key) => {
    const texts = {
      rating: {
        en: 'Rating',
        fi: 'Arvosana',
        sv: 'Betyg'
      }
    };
    return texts[key][language];
  };

  return (
    <div className="review bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
      <p className="text-gray-800 dark:text-white font-bold">
        {userName} - <span>{rating} ⭐</span>
      </p>
      <p className="text-gray-600 dark:text-gray-300">{comment}</p>
    </div>
  );
}

export default Review;
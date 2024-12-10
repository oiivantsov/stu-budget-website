import React, { useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';

function BusinessHeader({ name, rating, totalReviews, category }) {
  const { language } = useContext(LanguageContext);

  const getText = (key) => {
    const texts = {
      reviews: {
        en: 'reviews',
        fi: 'arvostelua',
        sv: 'recensioner'
      }
    };
    return texts[key][language];
  };

  return (

    <header className="business-header bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{name}</h1>
      <div className="rating text-gray-600 dark:text-gray-300 mt-2">
        <span>{rating
          ? `${parseFloat(rating).toFixed(1)}`
          : "No ratings"} ⭐</span>
        <span>({totalReviews} {getText('reviews')})</span>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mt-2">{category}</p>
    </header>
  );
}

export default BusinessHeader;
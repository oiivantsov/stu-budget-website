import React, { useContext } from 'react';
import { FaStar, FaTrash } from 'react-icons/fa';
import { LanguageContext } from '../../context/LanguageContext';

const ReviewDetails = ({ review, onDelete }) => {
  const { language } = useContext(LanguageContext);


  const getText = (key) => {
    const texts = {
      noComment: {
        en: 'No comment provided',
        fi: 'Ei kommenttia',
        sv: 'Ingen kommentar'
      },
      delete: {
        en: 'Delete',
        fi: 'Poista',
        sv: 'Ta bort'
      }
    };
    return texts[key][language];
  };


  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{review.restaurant.name}</h3>
        <div className="flex items-center">
          <span className="text-yellow-400 mr-1">
            <FaStar />
          </span>
          <span className="text-gray-600 dark:text-gray-300">{review.rating}</span>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{review.comment || getText('noComment')}</p>
      <button
        onClick={() => onDelete(review._id)}
        className="flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300"
      >
        <FaTrash className="mr-2" />
        {getText('delete')}
      </button>
    </div>
  );
};

export default ReviewDetails;

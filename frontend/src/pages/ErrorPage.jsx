import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';

function ErrorPage() {
  const { language } = useContext(LanguageContext);

  const getText = (key) => {
    const texts = {
      title: {
        en: '404',
        fi: '404',
        sv: '404'
      },
      message: {
        en: "Oops! The page you're looking for doesn't exist.",
        fi: 'Hups! Etsimääsi sivua ei löydy.',
        sv: 'Hoppsan! Sidan du letar efter finns inte.'
      },
      homeLink: {
        en: 'Go Back to Home',
        fi: 'Palaa etusivulle',
        sv: 'Gå tillbaka till startsidan'
      }
    };
    return texts[key][language];
  };

  return (
    <div className="error-page flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <h1 className="text-6xl font-bold mb-4">{getText('title')}</h1>
      <p className="text-lg mb-4">{getText('message')}</p>
      <Link to="/" className="home-link bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
        {getText('homeLink')}
      </Link>
    </div>
  );
}

export default ErrorPage;
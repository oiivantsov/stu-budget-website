import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../../context/LanguageContext';

function DropdownMenu({ logout, userId }) {
  const { language } = useContext(LanguageContext);

  const getText = (key) => {
    const texts = {
      profile: {
        en: 'Profile',
        fi: 'Profiili',
        sv: 'Profil'
      },
      reviews: {
        en: 'Reviews',
        fi: 'Arvostelut',
        sv: 'Recensioner'
      },
      logout: {
        en: 'Logout',
        fi: 'Kirjaudu ulos',
        sv: 'Logga ut'
      }
    };
    return texts[key][language];
  };

  return (
    <div className="dropdown-menu bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      <ul className="space-y-4">
        <li className="flex items-center space-x-2">
          <img src="/profile.png" alt="Profile" className="menu-icon w-6 h-6" />
          <Link to={`/user_details?userid=${userId}`} className="text-gray-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-400">
            {getText('profile')}
          </Link>
        </li>
        <li className="flex items-center space-x-2">
          <img src="/write-review-icon.png" alt="Reviews" className="menu-icon w-6 h-6" />
          <Link to="/reviews" className="text-gray-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-400">
            {getText('reviews')}
          </Link>
        </li>
        <li className="flex items-center space-x-2">
          <img src="/logout.jpeg" alt="Logout" className="menu-icon w-6 h-6" />
          <button onClick={logout} className="text-gray-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 focus:outline-none">
            {getText('logout')}
          </button>
        </li>
      </ul>
    </div>
  );
}

export default DropdownMenu;
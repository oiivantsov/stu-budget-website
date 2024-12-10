import React, { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

function Footer() {
  const { language } = useContext(LanguageContext);

  const getLinkText = (type) => {
    const links = {
      about: {
        en: 'About',
        fi: 'Tietoja',
        sv: 'Om'
      },
      support: {
        en: 'Support',
        fi: 'Tuki',
        sv: 'Support'
      },
      terms: {
        en: 'Terms',
        fi: 'Ehdot',
        sv: 'Villkor'
      },
      privacy: {
        en: 'Privacy Policy',
        fi: 'Tietosuojakäytäntö',
        sv: 'Integritetspolicy'
      }
    };
    return links[type][language];
  };

  return (
    <footer className="bg-white dark:bg-gray-800 py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-4">
          <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
            {getLinkText('about')}
          </a>
          <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
            {getLinkText('support')}
          </a>
          <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
            {getLinkText('terms')}
          </a>
          <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
            {getLinkText('privacy')}
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
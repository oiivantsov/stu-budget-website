import React, { useContext } from "react";
import { LanguageContext } from '../context/LanguageContext';

function LoginPromptModal({ isOpen, onClose }) {
  const { language } = useContext(LanguageContext);

  if (!isOpen) return null;

  const getText = (key) => {
    const texts = {
      title: {
        en: 'Authentication Required',
        fi: 'Kirjautuminen vaaditaan',
        sv: 'Autentisering krävs'
      },
      message: {
        en: 'You need to log in or sign up to perform this action.',
        fi: 'Sinun täytyy kirjautua sisään tai rekisteröityä suorittaaksesi tämän toiminnon.',
        sv: 'Du måste logga in eller registrera dig för att utföra denna åtgärd.'
      },
      close: {
        en: 'Close',
        fi: 'Sulje',
        sv: 'Stäng'
      }
    };
    return texts[key][language];
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
        <button className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white focus:outline-none" onClick={onClose}>×</button>
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{getText('title')}</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{getText('message')}</p>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => onClose("close")}
          >
            {getText('close')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPromptModal;
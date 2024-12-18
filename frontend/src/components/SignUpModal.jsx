import './Modal.css';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

function SignUpModal({ closeSignUpModal, openLoginModal }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: {
      street: '',
      city: '',
    }
  });

  const { login } = useContext(AuthContext);
  const { language } = useContext(LanguageContext);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [addressField]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${API_BASE_URL}/user/register`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        login(data.token, data.id); // Assuming the response contains a JWT token and user ID
        closeSignUpModal();
      } else {
        console.error('Signup failed');
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  const getLabelText = (field) => {
    const labels = {
      username: {
        en: 'Username',
        fi: 'Käyttäjänimi',
        sv: 'Användarnamn'
      },
      email: {
        en: 'Email',
        fi: 'Sähköposti',
        sv: 'E-post'
      },
      password: {
        en: 'Password',
        fi: 'Salasana',
        sv: 'Lösenord'
      },
      confirmPassword: {
        en: 'Confirm Password',
        fi: 'Vahvista salasana',
        sv: 'Bekräfta lösenord'
      }
    };
    return labels[field][language];
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={closeSignUpModal}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <button className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white focus:outline-none" onClick={closeSignUpModal}>×</button>
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{language === 'en' ? 'Sign Up' : language === 'fi' ? 'Rekisteröidy' : 'Registrera dig'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label htmlFor="username" className="block text-gray-700 dark:text-gray-300">{getLabelText('username')}:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="email" className="block text-gray-700 dark:text-gray-300">{getLabelText('email')}:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="password" className="block text-gray-700 dark:text-gray-300">{getLabelText('password')}:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 dark:text-gray-300">{getLabelText('confirmPassword')}:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          {/* Address Fields */}
          <div className="form-group mb-4">
            <label htmlFor="street" className="block text-gray-700 dark:text-gray-300">
              {language === 'en' ? 'Street' : language === 'fi' ? 'Katu' : 'Gata'}:
            </label>
            <input
              type="text"
              id="street"
              name="address.street"
              value={formData.address.street}
              onChange={handleChange}
              placeholder={
                language === 'en'
                  ? 'Enter your street address'
                  : language === 'fi'
                    ? 'Syötä katuosoite'
                    : 'Ange din gatuadress'
              }
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="city" className="block text-gray-700 dark:text-gray-300">
              {language === 'en' ? 'City' : language === 'fi' ? 'Kaupunki' : 'Stad'}:
            </label>
            <input
              type="text"
              id="city"
              name="address.city"
              value={formData.address.city}
              onChange={handleChange}
              placeholder={
                language === 'en'
                  ? 'Enter your city'
                  : language === 'fi'
                    ? 'Syötä kaupunki'
                    : 'Ange din stad'
              }
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">{language === 'en' ? 'Sign Up' : language === 'fi' ? 'Rekisteröidy' : 'Registrera dig'}</button>
        </form>
        <p className="mt-4 text-gray-700 dark:text-gray-300">
          {language === 'en' ? 'Already have an account?' : language === 'fi' ? 'Onko sinulla jo tili?' : 'Har du redan ett konto?'}{' '}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              closeSignUpModal();
              openLoginModal();
            }}
            className="text-blue-500 hover:underline"
          >
            {language === 'en' ? 'Log In' : language === 'fi' ? 'Kirjaudu' : 'Logga in'}
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignUpModal;

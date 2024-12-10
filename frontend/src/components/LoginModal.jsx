import './Modal.css';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';
import { toast } from 'react-toastify';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

function LoginModal({ closeLoginModal, openSignUpModal }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { login } = useContext(AuthContext);
  const { language } = useContext(LanguageContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email: formData.email,
      password: String(formData.password)
    };

    try {
      const response = await fetch(`${API_BASE_URL}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        login(data.token, data.id); // Assuming the response contains a JWT token and user ID
        closeLoginModal();
      } else {
        const errorData = await response.json();
        toast.error(`${getLabelText('loginFailed')} `);
        return;
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const getLabelText = (field) => {
    const labels = {
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
      loginFailed: {
        en: 'Login failed. Username or password is incorrect.',
        fi: 'Kirjautuminen epäonnistui. Käyttäjätunnus tai salasana on virheellinen.',
        sv: 'Inloggning misslyckades. Användarnamn eller lösenord är felaktigt.'
      }
    };
    return labels[field][language];
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={closeLoginModal}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <button className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white focus:outline-none" onClick={closeLoginModal}>×</button>
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{language === 'en' ? 'Login' : language === 'fi' ? 'Kirjaudu' : 'Logga in'}</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">{language === 'en' ? 'Login' : language === 'fi' ? 'Kirjaudu' : 'Logga in'}</button>
        </form>
        <p className="mt-4 text-gray-700 dark:text-gray-300">
          {language === 'en' ? 'Don’t have an account?' : language === 'fi' ? 'Eikö sinulla ole tiliä?' : 'Har du inget konto?'}{' '}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              closeLoginModal();
              openSignUpModal();
            }}
            className="text-blue-500 hover:underline"
          >
            {language === 'en' ? 'Sign up' : language === 'fi' ? 'Rekisteröidy' : 'Registrera dig'}
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginModal;
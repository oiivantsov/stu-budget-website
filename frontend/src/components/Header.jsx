import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaHeart, FaSun, FaMoon, FaBars } from 'react-icons/fa';
import LogoIcon from '/stubudget.png';
import DropdownMenu from '../components/User/DropdownMenu';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { LanguageContext } from '../context/LanguageContext';

function Header({ findText, nearText, setFindText, setNearText, openLoginModal, openSignUpModal }) {
  const navigate = useNavigate();
  const { isLoggedIn, username, userId, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { language, setLanguage } = useContext(LanguageContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const dropdownRef = useRef(null);

  const handleSearch = () => {
    navigate('/search', { state: { find: findText, near: nearText } });
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
      },
      login: {
        en: 'Login',
        fi: 'Kirjaudu',
        sv: 'Logga in'
      },
      signup: {
        en: 'Sign Up',
        fi: 'Rekisteröidy',
        sv: 'Registrera dig'
      },
      find: {
        en: 'Find...',
        fi: 'Etsi...',
        sv: 'Hitta...'
      },
      near: {
        en: 'Near...',
        fi: 'Lähellä...',
        sv: 'Nära...'
      },
      search: {
        en: 'Search',
        fi: 'Hae',
        sv: 'Sök'
      },
      favorites: {
        en: 'Favorites',
        fi: 'Suosikit',
        sv: 'Favoriter'
      }
    };
    return texts[key][language];
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-xl font-bold text-gray-800 dark:text-white">
              <img src={LogoIcon} alt="StuBudget Logo" className="h-8 w-8 mr-2" />
              <span className="hidden sm:inline">StuBudget</span>
            </Link>
          </div>
          <div className="hidden md:flex flex-grow max-w-xl mx-4">
            <div className="flex w-full">
              <input
                type="text"
                placeholder={getText('find')}
                value={findText}
                onChange={(e) => setFindText(e.target.value)}
                className="w-1/2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <input
                type="text"
                placeholder={getText('near')}
                value={nearText}
                onChange={(e) => setNearText(e.target.value)}
                className="w-1/2 px-4 py-2 border-t border-b border-r border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <button 
                className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={handleSearch}
              >
                {getText('search')}
              </button>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white focus:outline-none"
            >
              {theme === 'light' ? <FaMoon /> : <FaSun />}
            </button>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-white dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="en">EN</option>
              <option value="fi">FI</option>
              <option value="sv">SV</option>
            </select>
            {isLoggedIn ? (
              <>
                <Link to="/favorites" className="favorites-icon">
                  <FaHeart />
                </Link>
                <div className="user-menu" ref={dropdownRef}>
                  <span className="username text-gray-800 dark:text-white">{username}</span>
                  <span className="user-image" onClick={toggleDropdown}>
                    <img src={LogoIcon} alt="User" className="user-icon" />
                  </span>
                  {showDropdown && (
                    <DropdownMenu logout={handleLogout} userId={userId} />
                  )}
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={openLoginModal}
                  className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-2 rounded focus:outline-none"
                >
                  {getText('login')}
                </button>
                <button
                  onClick={openSignUpModal}
                  className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-2 rounded focus:outline-none"
                >
                  {getText('signup')}
                </button>
              </>
            )}
          </nav>
          <button
            className="md:hidden text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <FaBars />
          </button>
        </div>
        {showMobileMenu && (
          <div className="mt-4 md:hidden">
            <div className="flex flex-col space-y-4">
              <div className="flex">
                <input
                  type="text"
                  placeholder={getText('find')}
                  value={findText}
                  onChange={(e) => setFindText(e.target.value)}
                  className="w-1/2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
                <input
                  type="text"
                  placeholder={getText('near')}
                  value={nearText}
                  onChange={(e) => setNearText(e.target.value)}
                  className="w-1/2 px-4 py-2 border-t border-b border-r border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <button 
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={handleSearch}
              >
                {getText('search')}
              </button>
              <div className="flex justify-between items-center">
                <button
                  onClick={toggleTheme}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white focus:outline-none"
                >
                  {theme === 'light' ? <FaMoon /> : <FaSun />}
                </button>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-white dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="en">EN</option>
                  <option value="fi">FI</option>
                  <option value="sv">SV</option>
                </select>
              </div>
              {isLoggedIn ? (
                <div className="flex flex-col space-y-2">
                  <Link to="/favorites" className="favorites-icon flex items-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-2 rounded focus:outline-none">
                    <FaHeart className="mr-2" />
                    {getText('favorites')}
                  </Link>
                  <Link to={`/user_details?userid=${userId}`} className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-2 rounded focus:outline-none">
                    {getText('profile')}
                  </Link>
                  <Link to="/reviews" className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-2 rounded focus:outline-none">
                    {getText('reviews')}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-2 rounded focus:outline-none"
                  >
                    {getText('logout')}
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={openLoginModal}
                    className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-2 rounded focus:outline-none"
                  >
                    {getText('login')}
                  </button>
                  <button
                    onClick={openSignUpModal}
                    className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-2 rounded focus:outline-none"
                  >
                    {getText('signup')}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
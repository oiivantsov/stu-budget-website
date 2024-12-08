import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaHeart } from 'react-icons/fa';
import LogoIcon from '/stubudget.png';
import DropdownMenu from '../components/User/DropdownMenu';
import { AuthContext } from '../context/AuthContext';

function Header({ findText, nearText, setFindText, setNearText, openLoginModal, openSignUpModal }) {
  const navigate = useNavigate();
  const { isLoggedIn, username, userId, logout } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleSearch = () => {
    navigate('/search', { state: { find: findText, near: nearText } });
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
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

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src={LogoIcon} alt="StuBudget Logo" className="logo-icon" />
          StuBudget
        </Link>
      </div>
      <div className="header-center">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Find..."
            value={findText}
            onChange={(e) => setFindText(e.target.value)}
          />
          <input
            type="text"
            placeholder="Near..."
            value={nearText}
            onChange={(e) => setNearText(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>
            <FaSearch />
          </button>
        </div>
      </div>
      <nav className="nav-links">
        {isLoggedIn ? (
          <>
            <Link to="/favorites" className="favorites-icon">
              <FaHeart />
            </Link>
            <div className="user-menu" ref={dropdownRef}>
              <span className="username">{username}</span>
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
            <button onClick={openLoginModal}>Login</button>
            <button onClick={openSignUpModal}>Sign Up</button>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
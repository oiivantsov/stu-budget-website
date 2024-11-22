import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaHeart } from 'react-icons/fa';
import LogoIcon from '/stubudget.png'; // Adjust path if necessary
import { useState } from 'react';

function Header({ openLoginModal, openSignUpModal }) {
  const [findText, setFindText] = useState('');
  const [nearText, setNearText] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate('/search', { state: { find: findText, near: nearText } });
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src={LogoIcon} alt="StuBudget Logo" className="logo-icon" />
          StuBudget
        </Link>
      </div>

      {/* Centered Search Bar */}
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

      {/* Navigation Links with Heart Icon */}
      <nav className="nav-links">
        <Link to="/favorites" className="favorites-icon">
          <FaHeart />
        </Link>
        <button onClick={openLoginModal}>Login</button>
        <button onClick={openSignUpModal}>Sign Up</button>
      </nav>
    </header>
  );
}

export default Header;

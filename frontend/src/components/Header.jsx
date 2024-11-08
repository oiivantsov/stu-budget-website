import { Link } from 'react-router-dom';
import { FaSearch, FaHeart } from 'react-icons/fa';
import LogoIcon from '/stubudget.png'; // Adjust path if necessary

function Header({ openLoginModal, openSignUpModal }) {
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
          <input type="text" placeholder="Find..." />
          <input type="text" placeholder="Near..." />
          <Link to="/search">
            <FaSearch />
          </Link>
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

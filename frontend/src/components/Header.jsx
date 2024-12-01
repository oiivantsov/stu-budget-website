import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaHeart } from 'react-icons/fa';
import LogoIcon from '/stubudget.png';

function Header({ findText, nearText, setFindText, setNearText, openLoginModal, openSignUpModal }) {
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

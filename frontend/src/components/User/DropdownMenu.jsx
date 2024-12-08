import React from 'react';
import { Link } from 'react-router-dom';

function DropdownMenu({ logout, userId }) {
  return (
    <div className="dropdown-menu">
      <ul>
        <li>
          <img src="/profile.png" alt="Profile" className="menu-icon" />
          <Link to={`/user_details?userid=${userId}`}>Profile</Link>
        </li>
        <li>
          <img src="/write-review-icon.png" alt="Reviews" className="menu-icon" />
          <Link to="/reviews">Reviews</Link>
        </li>
        <li>
          <img src="/logout-icon.png" alt="Logout" className="menu-icon" />
          <button onClick={logout}>Logout</button>
        </li>
      </ul>
    </div>
  );
}

export default DropdownMenu;
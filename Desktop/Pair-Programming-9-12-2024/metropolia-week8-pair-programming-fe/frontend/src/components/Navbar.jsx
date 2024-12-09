import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { useContext } from "react";
// import ThemeContext from '../context/ThemeContext';
import AuthContext from "../context/AuthContext";

const Navbar = () => {
 //const { toggleTheme } = useContext(ThemeContext);
const { isAuthenticated, clearUser, email, isLoading } = useContext(AuthContext); // Access Auth

  // const isAuthenticated = false;

  //const toggleTheme = () => {
    
  //};
  const handleClick = (e) => {
   clearUser();
  };

if (isLoading) {
   return <LoadingSpinner />;
 }
  return (
    <nav className="navbar">
      <Link to="/">
        <h1>React Jobs</h1>
      </Link>
      <div className="links">
        <div>
          <Link to="/jobs/add-job">Add Job</Link>
          {email && <span>{email}</span>}
          <button onClick={handleClick}>Log out</button>
        </div>
        <div>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      </div>
      {/*<button onClick={toggleTheme}>Toggle</button>*/}
    </nav>
  );
};

export default Navbar;

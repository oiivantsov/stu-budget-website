// src/pages/ErrorPage.js
import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <div className="error-page">
      <h1>404</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="home-link">Go Back to Home</Link>
    </div>
  );
}

export default ErrorPage;

import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import ReviewDetails from './ReviewDetails';

const UserReviewsPage = () => {
  const { userId, token } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/reviews/user?userId=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setError('Failed to fetch reviews');
      }
    };

    fetchReviews();
  }, [userId, token]);

  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete review');
      }
      setReviews(reviews.filter((review) => review._id !== reviewId));
      setSuccess('Review deleted successfully');
    } catch (error) {
      console.error('Error deleting review:', error);
      setError('Failed to delete review');
    }
  };

  return (
    <div>
      <h1>Your Reviews</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
            <li key={review._id}>
              <ReviewDetails review={review} onDelete={handleDeleteReview} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default UserReviewsPage;
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import ReviewDetails from './ReviewDetails';
import useFetchReviewByUserId from '../../hooks/useFetchReviewByUserId';
import useDeleteReviewByUser from '../../hooks/useDeleteReviewByUser';

const UserReviewsPage = () => {
  const { userId, token } = useContext(AuthContext);
  const { reviews, error: fetchError, setReviews } = useFetchReviewByUserId(userId, token);
  const { deleteReview, error: deleteError, success } = useDeleteReviewByUser(token, setReviews);

  return (
    <div>
      <h1>Your Reviews</h1>
      {fetchError && <p style={{ color: 'red' }}>{fetchError}</p>}
      {deleteError && <p style={{ color: 'red' }}>{deleteError}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
            <li key={review._id}>
              <ReviewDetails review={review} onDelete={deleteReview} />
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
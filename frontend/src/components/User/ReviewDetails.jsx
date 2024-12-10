import React from 'react';

const ReviewDetails = ({ review, onDelete }) => {
  return (
    <div className="review-details">
      {/* use restaurant name instead of id */}
      <p>Restaurant name: {review.restaurant.name}</p>
      <p>Rating: {review.rating}</p>
      <p>Comment: {review.comment || 'No comment provided'}</p>
      <button onClick={() => onDelete(review._id)}>Delete</button>
    </div>
  );
};

export default ReviewDetails;
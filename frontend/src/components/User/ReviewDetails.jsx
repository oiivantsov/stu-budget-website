import React from 'react';

const ReviewDetails = ({ review, onDelete }) => {
  return (
    <div className="review-details">
      <p>Restaurant: {review.restaurant}</p>
      <p>Rating: {review.rating}</p>
      <p>Comment: {review.comment}</p>
      <button onClick={() => onDelete(review._id)}>Delete</button>
    </div>
  );
};

export default ReviewDetails;
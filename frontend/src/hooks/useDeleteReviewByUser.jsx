import { useState } from 'react';
import { toast } from 'react-toastify';

const useDeleteReview = (token, setReviews) => {
  const [error, setError] = useState('');

  const deleteReview = async (reviewId) => {
    try {
      const response = await fetch(`/review/?reviewId=${reviewId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete review: ${errorText}`);
      }
      setReviews((prevReviews) => prevReviews.filter((review) => review._id !== reviewId));
      toast.success('Review deleted successfully');
    } catch (error) {
      console.error('Error deleting review:', error);
      setError(`Failed to delete review: ${error.message}`);
      toast.error(`Failed to delete review: ${error.message}`);
    }
  };

  return { deleteReview, error };
};

export default useDeleteReview;
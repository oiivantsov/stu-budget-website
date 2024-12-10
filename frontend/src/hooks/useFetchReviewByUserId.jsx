import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const useFetchReviewByUserId = (userId, token) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/review/user?userId=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          const errorText = await response.text();
          console.log('Error response text:', errorText);
          throw new Error(`Failed to fetch reviews: ${errorText}`);
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Received non-JSON response');
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setError(`Failed to fetch reviews: ${error.message}`);
        toast.error(`Failed to fetch reviews: ${error.message}`);
      }
    };

    fetchReviews();
  }, [userId, token]);

  return { reviews, error, setReviews };
};

export default useFetchReviewByUserId;
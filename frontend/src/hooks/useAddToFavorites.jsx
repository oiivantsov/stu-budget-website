import { useState } from 'react';
import { toast } from 'react-toastify';

const useAddToFavorites = (token) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const addToFavorites = async (restaurantId) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/user/favorite/?restaurantId=${restaurantId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to add to favorites: ${errorText}`);
      }
      toast.success('Restaurant added to favorites');
    } catch (error) {
      console.error('Error adding to favorites:', error);
      setError(`Failed to add to favorites: ${error.message}`);
      toast.error(`Failed to add to favorites: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return { addToFavorites, loading, error };
};

export default useAddToFavorites;
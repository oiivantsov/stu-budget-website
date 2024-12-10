import { useState } from 'react';
import { toast } from 'react-toastify';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const useDeleteFavorite = (token, setFavorites) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const deleteFavorite = async (restaurantId) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/user/favorite/?restaurantId=${restaurantId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete favorite: ${errorText}`);
      }
      setFavorites((prevFavorites) => prevFavorites.filter((restaurant) => restaurant._id !== restaurantId));
      toast.success('Restaurant removed from favorites');
    } catch (error) {
      console.error('Error deleting favorite:', error);
      setError(`Failed to delete favorite: ${error.message}`);
      toast.error(`Failed to delete favorite: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return { deleteFavorite, loading, error };
};

export default useDeleteFavorite;
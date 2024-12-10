import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const useFetchFavorites = (userId, token) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/user/favorite/?userId=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch favorites: ${errorText}`);
        }
        const data = await response.json();
        setFavorites(data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
        setError(`Failed to fetch favorites: ${error.message}`);
        toast.error(`Failed to fetch favorites: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [userId, token]);

  return { favorites, loading, error, setFavorites };
};

export default useFetchFavorites;
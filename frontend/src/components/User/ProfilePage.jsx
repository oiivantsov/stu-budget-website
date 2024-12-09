import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { LanguageContext } from '../../context/LanguageContext';
import FavoritesComponent from '../favorites/FavoritesComponent';

const ProfilePage = () => {
  const { userId, token } = useContext(AuthContext);
  const { language } = useContext(LanguageContext);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`/user/byId/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUserDetails(data);
        } else {
          console.error('Failed to fetch user details');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [userId, token]);

  const getText = (key) => {
    const texts = {
      profile: {
        en: 'Profile',
        fi: 'Profiili',
        sv: 'Profil'
      },
      username: {
        en: 'Username',
        fi: 'Käyttäjänimi',
        sv: 'Användarnamn'
      },
      email: {
        en: 'Email',
        fi: 'Sähköposti',
        sv: 'E-post'
      },
      favorites: {
        en: 'Favorites',
        fi: 'Suosikit',
        sv: 'Favoriter'
      },
      loading: {
        en: 'Loading...',
        fi: 'Ladataan...',
        sv: 'Laddar...'
      }
    };
    return texts[key][language];
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {userDetails ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">{getText('profile')}</h1>
          <div className="space-y-4 mb-8">
            <div className="flex items-center">
              <span className="text-gray-600 dark:text-gray-400 w-32">{getText('username')}:</span>
              <span className="text-gray-800 dark:text-white font-medium">{userDetails.username}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 dark:text-gray-400 w-32">{getText('email')}:</span>
              <span className="text-gray-800 dark:text-white font-medium">{userDetails.email}</span>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{getText('favorites')}</h2>
            <FavoritesComponent />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-600 dark:text-gray-300">{getText('loading')}</p>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
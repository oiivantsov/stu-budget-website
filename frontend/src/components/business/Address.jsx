import React, { useState, useEffect } from 'react';

function Address({ address }) {
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await fetch(
          // small backend FastAPI server deployed on Render to fetch coordinates from google maps api, own server to avoid api key exposure
          `https://googlemap-dfje.onrender.com/api/maps?address=${encodeURIComponent(address.street + ', ' + address.city + ', ' + address.country)}`
        );
        const data = await response.json();

        if (data && data.candidates && data.candidates.length > 0) {
          const { lat, lng } = data.candidates[0].geometry.location;
          setCoordinates({ lat, lng });
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    fetchCoordinates();
  }, [address]);

  return (
    <div className="business-address-container">
      {coordinates ? (
        <iframe
          title="Map"
          // openstreetmap embed api - open source alternative to google maps
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${coordinates.lng - 0.01},${coordinates.lat - 0.01},${coordinates.lng + 0.01},${coordinates.lat + 0.01}&layer=mapnik&marker=${coordinates.lat},${coordinates.lng}`}
          className="map"
          allowFullScreen=""
          loading="lazy"
          style={{ width: '100%', height: '400px', border: 'none' }}
        ></iframe>
      ) : (
        <p>Loading map...</p>
      )}

      <div className="business-address">
        <p>{address.street}</p>
        <p>{address.city}, {address.country}</p>
        <p><a href={`tel:${address.phone}`}>{address.phone}</a></p>
        <p><a href={address.website} target="_blank" rel="noopener noreferrer">{address.website}</a></p>
      </div>
    </div>
  );
}

export default Address;

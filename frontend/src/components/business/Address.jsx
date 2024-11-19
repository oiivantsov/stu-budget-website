import React from 'react';

function Address({ address }) {
  // Hardcoded coordinates for the map
  const coordinates = { lat: 60.1699, lng: 24.9384 }; // Example: Helsinki, Finland

  return (
    <div className="business-address-container">
      <iframe
        title="Map"
        // openstreetmap embed API - open source alternative to Google Maps
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${coordinates.lng - 0.01},${coordinates.lat - 0.01},${coordinates.lng + 0.01},${coordinates.lat + 0.01}&layer=mapnik&marker=${coordinates.lat},${coordinates.lng}`}
        className="map"
        allowFullScreen=""
        loading="lazy"
        style={{ width: '100%', height: '400px', border: 'none' }}
      ></iframe>

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

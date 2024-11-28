function Address({ address, coordinates, phone, website }) {
  if (!address) {
    return <div>Address information is not available for this business.</div>;
  }

  const { street, postal, city, country } = address;

  return (
    <div className="business-address-container">
      {/* Map Integration */}
      {coordinates ? (
        <iframe
          title="Map"
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${coordinates.long - 0.01},${coordinates.lat - 0.01},${coordinates.long + 0.01},${coordinates.lat + 0.01}&layer=mapnik&marker=${coordinates.lat},${coordinates.long}`}
          className="map"
          allowFullScreen
          loading="lazy"
          style={{ width: '100%', height: '400px', border: 'none' }}
        ></iframe>
      ) : (
        <p>Map information is not available for this business.</p>
      )}

      {/* Address Details */}
      <div className="business-address">
        {street && <p><strong>Address:</strong> {street}, {postal}</p>}
        {(city || country) && <p>{city && `${city}, `}{country}</p>}
        {phone && (
          <p>
            <strong>Phone:</strong> {phone}
          </p>
        )}
        {website && (
          <p>
            <strong>Website:</strong>{" "}
            <a href={website} target="_blank" rel="noopener noreferrer">
              {website}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}

export default Address;

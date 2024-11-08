function Address({ address }) {
  return (
    <div className="business-address-container">
      <iframe
        title="Google Map"
        src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(address.street + ', ' + address.city + ', ' + address.country)}`}
        className="map"
        allowFullScreen=""
        loading="lazy"
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

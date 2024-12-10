import React, { useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';

function Address({ address, coordinates, phone, website }) {
  const { language } = useContext(LanguageContext);

  const getText = (key) => {
    const texts = {
      address: {
        en: 'Address',
        fi: 'Osoite',
        sv: 'Adress'
      },
      phone: {
        en: 'Phone',
        fi: 'Puhelin',
        sv: 'Telefon'
      },
      website: {
        en: 'Website',
        fi: 'Verkkosivu',
        sv: 'Webbplats'
      },
      noAddress: {
        en: 'Address information is not available for this business.',
        fi: 'Osoitetiedot eivät ole saatavilla tälle yritykselle.',
        sv: 'Adressinformation är inte tillgänglig för detta företag.'
      },
      noMap: {
        en: 'Map information is not available for this business.',
        fi: 'Karttatiedot eivät ole saatavilla tälle yritykselle.',
        sv: 'Kartinformation är inte tillgänglig för detta företag.'
      }
    };
    return texts[key][language];
  };

  if (!address) {
    return <div className="text-gray-600 dark:text-black">{getText('noAddress')}</div>;
  }

  const { street, postal, city, country } = address;

  return (
    <div className="business-address-container bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      {/* Map Integration */}
      {coordinates ? (
        <iframe
          title="Map"
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${coordinates.long - 0.01},${coordinates.lat - 0.01},${coordinates.long + 0.01},${coordinates.lat + 0.01}&layer=mapnik&marker=${coordinates.lat},${coordinates.long}`}
          className="map w-full h-64 rounded-md"
          allowFullScreen
          loading="lazy"
        ></iframe>
      ) : (
        <p className="text-gray-600 dark:text-black">{getText('noMap')}</p>
      )}

      {/* Address Details */}
      <div className="business-address">
        {street && <p className="text-gray-800 dark:text-black"><strong>{getText('address')}:</strong> {street}, {postal}</p>}
        {(city || country) && <p className="text-gray-800 dark:text-black">{city && `${city}, `}{country}</p>}
        {phone && (
          <p className="text-gray-800 dark:text-black">
            <strong>{getText('phone')}:</strong> {phone}
          </p>
        )}
        {website && (
          <p className="text-gray-800 dark:text-black mt-2">
            <strong>{getText('website')}:</strong>{" "}
            <a href={website} className="text-blue-500 hover:underline break-words" target="_blank" rel="noopener noreferrer">{website}</a>
        </p>
        )}
      </div>
    </div>
  );
}

export default Address;
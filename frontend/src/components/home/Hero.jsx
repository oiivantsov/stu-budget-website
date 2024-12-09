import React, { useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';

function Hero() {
  const { language } = useContext(LanguageContext);

  const getText = (key) => {
    const texts = {
      title: {
        en: 'The Most Affordable Student Restaurants in Finland',
        fi: 'Edullisimmat opiskelijaravintolat Suomessa',
        sv: 'De mest prisvärda studentrestaurangerna i Finland'
      },
      subtitle: {
        en: 'From restaurants to cafes, find it all here.',
        fi: 'Ravintoloista kahviloihin, löydät kaiken täältä.',
        sv: 'Från restauranger till kaféer, hitta allt här.'
      }
    };
    return texts[key][language];
  };

  return (
    <section className="hero bg-blue-500 text-white py-20">
      <div className="hero-content container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">{getText('title')}</h1>
        <p className="text-lg">{getText('subtitle')}</p>
      </div>
    </section>
  );
}

export default Hero;
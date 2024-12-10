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
    <section className="hero bg-blue-500 text-white py-20 sm:py-24 lg:py-32">
      <div className="hero-content container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 break-words tracking-wide py-2 leading-normal">{getText('title')}</h1>
        <p className="text-lg sm:text-xl lg:text-2xl break-words py-2 leading-normal">{getText('subtitle')}</p>
      </div>
    </section>
  );
}

export default Hero;
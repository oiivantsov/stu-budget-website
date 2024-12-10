import React, { useState, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import FilterSection from "../components/search/FilterSection";
import ResultItem from "../components/search/ResultItem";
import { useLocation } from "react-router-dom";
import { fetchAllCafes } from "../utils/CafesAPI";
import { capitalizeFirstLetter } from "../utils/TextFormat";
import { useFetchData } from "../hooks/useFetchData";
import { useFilters } from "../hooks/useFilters";
import { InfinitySpin } from 'react-loader-spinner';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

function SearchResults({ findText, nearText, clearSearchFields }) {
  const { language } = useContext(LanguageContext);
  const placeholderImage = "https://via.placeholder.com/150?text=No+Image";

  const [selectedFilters, setSelectedFilters] = useState({
    averageScore: [],
    reviewNumber: [],
  });

  const location = useLocation();
  const filterType = location.state?.filterType || null;

  const { data: allResults, loading, error } = useFetchData(fetchAllCafes);
  const filteredResults = useFilters(allResults, findText, nearText, selectedFilters, filterType);

  const handleFilterChange = (type, selectedOptions) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [type]: selectedOptions,
    }));
  };

  const clearFilters = () => {
    setSelectedFilters({
      averageScore: [],
      reviewNumber: [],
    });
    clearSearchFields();
  };

  const getText = (key) => {
    const texts = {
      filters: {
        en: 'Filters',
        fi: 'Suodattimet',
        sv: 'Filter'
      },
      averageScore: {
        en: 'Average Score',
        fi: 'Keskimääräinen Pisteet',
        sv: 'Genomsnittlig Poäng'
      },
      reviews: {
        en: 'Reviews',
        fi: 'Arvostelut',
        sv: 'Recensioner'
      },
      clearFilters: {
        en: 'Clear Filters',
        fi: 'Tyhjennä Suodattimet',
        sv: 'Rensa Filter'
      },
      noResults: {
        en: 'No results found.',
        fi: 'Ei tuloksia.',
        sv: 'Inga resultat funna.'
      }
    };
    return texts[key][language];
  };

  return (
    <main className="main-content search-page bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white flex flex-col md:flex-row">
      <aside className="sidebar p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-4 md:mb-0 md:mr-4 w-full md:w-1/4">
        <h3 className="text-xl font-bold mb-4">{getText('filters')}</h3>
        <FilterSection
          title={getText('averageScore')}
          options={["4.0 - 4.5", "4.6 - 5.0"]}
          onFilter={(selectedOptions) => handleFilterChange("averageScore", selectedOptions)}
          selectedOptions={selectedFilters.averageScore}
        />
        <FilterSection
          title={getText('reviews')}
          options={["1 - 5", "6 - 10", "10+"]}
          onFilter={(selectedOptions) => handleFilterChange("reviewNumber", selectedOptions)}
          selectedOptions={selectedFilters.reviewNumber}
        />
        <button
          onClick={clearFilters}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {getText('clearFilters')}
        </button>
      </aside>
      <section className="results flex-grow p-4">
        {loading ? (
          <div className="loading-container">
            <InfinitySpin width="200" color="#4fa94d" />
            <p className="text-gray-600 dark:text-gray-300">Loading...</p>
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : filteredResults.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">{getText('noResults')}</p>
        ) : (
          <div className="space-y-6">
            {filteredResults.map((result) => (
              <ResultItem
                key={result._id}
                id={result._id}
                name={result.name}
                category={result.category}
                rating={result.reviewsAverage}
                reviews={result.reviewsCount}
                description={result.description}
                image={result.images && result.images.length > 0 ? `${API_BASE_URL}/public/${result.images[0]}` : placeholderImage}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default SearchResults;
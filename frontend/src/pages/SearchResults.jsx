import React, { useState } from "react";
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

  const placeholderImage = "https://via.placeholder.com/150?text=No+Image";

  const [selectedFilters, setSelectedFilters] = useState({
    averageScore: [],
    reviewNumber: [],
  });

  const { data: allResults, loading, error } = useFetchData(fetchAllCafes);
  const filteredResults = useFilters(allResults, findText, nearText, selectedFilters);

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

  return (
    <main className="main-content search-page">
      <aside className="sidebar">
        <h3>Filters</h3>
        <FilterSection
          title="Average Score"
          options={["4.0 - 4.5", "4.6 - 5.0"]}
          onFilter={(selectedOptions) => handleFilterChange("averageScore", selectedOptions)}
          selectedOptions={selectedFilters.averageScore}
        />
        <FilterSection
          title="Reviews"
          options={["1 - 5", "6 - 10", "10+"]}
          onFilter={(selectedOptions) => handleFilterChange("reviewNumber", selectedOptions)}
          selectedOptions={selectedFilters.reviewNumber}
        />
        <button className="clear-filters-button" onClick={clearFilters}>
          Clear Filters
        </button>
      </aside>
      <section className="results">
        <h2>Search Results</h2>
        {loading ? (

          <div className="loading-container">
            <InfinitySpin width="200" color="#4fa94d" />
            <p>Loading results...</p>
          </div>
        ) : error ? (
          <p className="error">{error}</p>
        ) : filteredResults.length > 0 ? (
          filteredResults.map((business) => (
            <ResultItem
              key={business._id}
              id={business._id}
              name={capitalizeFirstLetter(business.name)}
              rating={business.reviewsAverage}
              reviews={business.reviewsTotal}
              description={`${capitalizeFirstLetter(business.address)}, ${capitalizeFirstLetter(business.city)}`}
              image={business.images && business.images.length > 0 ? `${API_BASE_URL}/public/${business.images[0]}` : placeholderImage}
            />
          ))
        ) : (
          <div className="no-results">
            <p>No results found. Try adjusting your search terms or filters!</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default SearchResults;

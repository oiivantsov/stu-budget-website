import React, { useState, useMemo, useEffect } from "react";
import FilterSection from "../components/search/FilterSection";
import ResultItem from "../components/search/ResultItem";
import { useLocation, useNavigate } from "react-router-dom";
import { businesses } from "../data/businesses";

function SearchResults() {
  const [selectedFilters, setSelectedFilters] = useState({
    averageScore: [],
    reviewNumber: [],
  });
  const [resetFilters, setResetFilters] = useState(false); // Track when to reset filters
  const [filteredResults, setFilteredResults] = useState(businesses); // Initialize with all businesses
  const location = useLocation();
  const navigate = useNavigate();
  const { find, near, filterType } = location.state || {}; // Get search input and pre-selected filters

  useEffect(() => {
    if (filterType === "mostLiked") {
      setSelectedFilters({ averageScore: ["4.6 - 5.0"], reviewNumber: [] });
    } else if (filterType === "mostReviewed") {
      setSelectedFilters({ averageScore: [], reviewNumber: ["10+"] });
    }
  }, [filterType]);

  useEffect(() => {
    // Filter businesses based on user input and pre-selected filters
    let results = businesses;

    // Search by "find" (business name or category)
    if (find) {
      results = results.filter(
        (business) =>
          business.name.toLowerCase().includes(find.toLowerCase()) ||
          business.category.toLowerCase().includes(find.toLowerCase())
      );
    }

    // Search by "near" (location/city)
    if (near) {
      results = results.filter((business) =>
        business.address.city.toLowerCase().includes(near.toLowerCase())
      );
    }

    // Filter by average score
    if (selectedFilters.averageScore.length > 0) {
      results = results.filter((business) =>
        selectedFilters.averageScore.some((range) => {
          const [min, max] = range.split(" - ").map(parseFloat);
          return business.reviews.average >= min && business.reviews.average <= max;
        })
      );
    }

    // Filter by review number
    if (selectedFilters.reviewNumber.length > 0) {
      results = results.filter((business) =>
        selectedFilters.reviewNumber.some((range) => {
          const [min, max] = range.includes("+") ? [parseInt(range), Infinity] : range.split(" - ").map(Number);
          return business.reviews.total >= min && business.reviews.total <= max;
        })
      );
    }

    setFilteredResults(results);
  }, [find, near, selectedFilters]); // Recalculate results when filters change

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
    setResetFilters(true); // Trigger reset for checkboxes
    setTimeout(() => setResetFilters(false), 0); // Reset the resetFilters flag
    setFilteredResults(businesses); // Reset the filtered results
    navigate("/search", { replace: true });
  };

  return (
    <main className="main-content search-page">
      <aside className="sidebar">
        <h3>Filters</h3>
        <FilterSection
          title="Average Score"
          options={["4.0 - 4.5", "4.6 - 5.0"]}
          onFilter={(selectedOptions) => handleFilterChange("averageScore", selectedOptions)}
          resetFilters={resetFilters}
        />
        <FilterSection
          title="Reviews"
          options={["1 - 5", "6 - 10", "10+"]}
          onFilter={(selectedOptions) => handleFilterChange("reviewNumber", selectedOptions)}
          resetFilters={resetFilters}
        />
        <button className="clear-filters-button" onClick={clearFilters}>
          Clear Filters
        </button>
      </aside>
      <section className="results">
        <h2>Search Results</h2>
        {filteredResults.length > 0 ? (
          filteredResults.map((business) => (
            <ResultItem
              key={business.id}
              id={business.id}
              name={business.name}
              category={business.category}
              rating={business.reviews.average}
              reviews={business.reviews.total}
              description={`${business.address.street}, ${business.address.city}`}
              image={business.images[0]}
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

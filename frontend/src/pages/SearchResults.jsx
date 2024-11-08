import FilterSection from '../components/search/FilterSection';
import ResultItem from '../components/search/ResultItem';
import filtersData from '../data/filtersData';
import searchResultsData from '../data/searchResultsData';

function SearchResults() {
  return (
    <main className="main-content search-page">
      <aside className="sidebar">
        <h3>Filters</h3>
        <FilterSection title="Categories" options={filtersData.categories} />
        <FilterSection title="Price Range" options={filtersData.priceRange} />
      </aside>
      <section className="results">
        <h2>Search Results</h2>
        {searchResultsData.map((result) => (
          <ResultItem 
            key={result.id} 
            name={result.name} 
            category={result.category} 
            rating={result.rating} 
            reviews={result.reviews} 
            description={result.description} 
            image={result.image} 
          />
        ))}
      </section>
    </main>
  );
}

export default SearchResults;

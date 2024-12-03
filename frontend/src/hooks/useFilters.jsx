import { useEffect, useState } from "react";
import { debounce } from "lodash";

export const useFilters = (allResults, findText, nearText, selectedFilters) => {
  const [filteredResults, setFilteredResults] = useState([]);

  const applyFilters = (data) => {
    let results = data;

    if (findText) {
      results = results.filter((business) =>
        business.name.toLowerCase().includes(findText.toLowerCase())
      );
    }

    if (nearText) {
      results = results.filter((business) =>
        business.city.toLowerCase().includes(nearText.toLowerCase()) ||
        business.address.toLowerCase().includes(nearText.toLowerCase()) ||
        business.postal_code.toLowerCase().includes(nearText.toLowerCase())
      );
    }

    if (selectedFilters.averageScore.length > 0) {
      results = results.filter((business) =>
        selectedFilters.averageScore.some((range) => {
          const [min, max] = range.split(" - ").map(Number);
          return business.reviewsAverage >= min && business.reviewsAverage <= max;
        })
      );
    }

    if (selectedFilters.reviewNumber.length > 0) {
      results = results.filter((business) =>
        selectedFilters.reviewNumber.some((range) => {
          const [min, max] = range.includes("+")
            ? [parseInt(range), Infinity]
            : range.split(" - ").map(Number);
          return business.reviewsTotal >= min && business.reviewsTotal <= max;
        })
      );
    }

    setFilteredResults(results);
  };

  const debouncedApplyFilters = debounce(() => applyFilters(allResults), 300);

  useEffect(() => {
    debouncedApplyFilters();
    return () => debouncedApplyFilters.cancel();
  }, [allResults, findText, nearText, selectedFilters]);

  return filteredResults;
};

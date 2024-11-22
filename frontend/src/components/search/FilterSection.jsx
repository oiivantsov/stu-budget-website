import React, { useState, useEffect } from "react";

function FilterSection({ title, options, onFilter, resetFilters }) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (option) => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((selected) => selected !== option)
      : [...selectedOptions, option];

    setSelectedOptions(updatedOptions);
    onFilter(updatedOptions); // Pass selected options to the parent
  };

  useEffect(() => {
    if (resetFilters) {
      setSelectedOptions([]); // Clear selected options
      onFilter([]); // Notify parent about the reset
    }
  }, [resetFilters, onFilter]);

  return (
    <div className="filter-section">
      <h4>{title}</h4>
      <ul>
        {options.map((option) => (
          <li key={option}>
            <label>
              <input
                type="checkbox"
                value={option}
                checked={selectedOptions.includes(option)}
                onChange={() => handleCheckboxChange(option)}
              />
              {option}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FilterSection;

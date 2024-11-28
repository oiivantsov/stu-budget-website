import React, { useState, useEffect } from "react";

function FilterSection({ title, options, onFilter, resetFilters, selectedOptions }) {
  const [localSelectedOptions, setLocalSelectedOptions] = useState([]);

  useEffect(() => {
    setLocalSelectedOptions(selectedOptions); // Sync with parent state
  }, [selectedOptions]);

  useEffect(() => {
    if (resetFilters) {
      setLocalSelectedOptions([]);
      onFilter([]); // Notify parent about the reset
    }
  }, [resetFilters, onFilter]);

  const handleCheckboxChange = (option) => {
    const updatedOptions = localSelectedOptions.includes(option)
      ? localSelectedOptions.filter((selected) => selected !== option)
      : [...localSelectedOptions, option];

    setLocalSelectedOptions(updatedOptions);
    onFilter(updatedOptions); // Pass selected options to the parent
  };

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
                checked={localSelectedOptions.includes(option)}
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

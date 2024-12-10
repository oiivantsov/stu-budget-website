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
    <div className="filter-section mb-4">
      <h4 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">{title}</h4>
      <ul className="space-y-2">
        {options.map((option) => (
          <li key={option} className="flex items-center">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={option}
                checked={localSelectedOptions.includes(option)}
                onChange={() => handleCheckboxChange(option)}
                className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
              />
              <span className="text-gray-800 dark:text-white">{option}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FilterSection;
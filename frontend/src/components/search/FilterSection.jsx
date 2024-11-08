function FilterSection({ title, options }) {
    return (
      <div className="filter-section">
        <h4>{title}</h4>
        {options.map((option, index) => (
          <label key={index}>
            <input type="checkbox" /> {option}
          </label>
        ))}
      </div>
    );
  }
  
  export default FilterSection;
  
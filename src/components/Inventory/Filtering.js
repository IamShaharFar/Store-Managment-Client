import React from "react";
import "./Filtering.css"; // Importing a CSS file for styling

const Filtering = ({
  searchTerm,
  handleSearchChange,
  showCategoryDropdown,
  setShowCategoryDropdown,
  categories,
  selectedCategories,
  toggleCategorySelection,
  sortOrder,
  toggleSortOrder,
  minPrice,
  maxPrice,
  topPrice,
  setMinPrice,
  setMaxPrice,
}) => {
  return (
    <div className="filter-container">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="filter-input"
      />
      <button
        onClick={() => toggleSortOrder("asc")}
        className="filter-button sort-asc-button"
      >
        Sort A-Z
      </button>
      <button
        onClick={() => toggleSortOrder("desc")}
        className="filter-button sort-desc-button"
      >
        Sort Z-A
      </button>
      <button
        onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
        className="filter-button category-filter-button"
      >
        Filter by Categories
      </button>

      {showCategoryDropdown && (
        <div className="categories-dropdown">
          {categories.map((category) => (
            <div key={category._id} className="category-item">
              <input
                type="checkbox"
                id={category._id}
                checked={selectedCategories.includes(category._id)}
                onChange={() => toggleCategorySelection(category._id)}
                className="category-checkbox"
              />
              <label htmlFor={category._id} className="category-label">
                {category.name}
              </label>
            </div>
          ))}
        </div>
      )}
      <div className="price-range">
        <div className="price-range-item">
          <label htmlFor="min-price" className="price-label">
            Min Price: ${minPrice}
          </label>
          <input
            type="range"
            min="0"
            max={topPrice}
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="price-input min-price-input"
            id="min-price"
          />
        </div>
        <div className="price-range-item">
          <label htmlFor="max-price" className="price-label">
            Max Price: ${maxPrice}
          </label>
          <input
            type="range"
            min="0"
            max={topPrice}
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="price-input max-price-input"
            id="max-price"
          />
        </div>
      </div>
    </div>
  );
};

export default Filtering;

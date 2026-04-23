import React, { useState } from 'react';
import '../styles/SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term, category);
  };

  const handleCategoryChange = (e) => {
    const cat = e.target.value;
    setCategory(cat);
    onSearch(searchTerm, cat);
  };

  const handleClear = () => {
    setSearchTerm('');
    setCategory('all');
    onSearch('', 'all');
  };

  return (
    <div className="search-container">
      <div className="search-inputs">
        <input
          type="text"
          placeholder="Search items by name or description..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <select
          value={category}
          onChange={handleCategoryChange}
          className="category-select"
        >
          <option value="all">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Accessories">Accessories</option>
          <option value="Documents">Documents</option>
          <option value="Books">Books</option>
          <option value="Sports">Sports</option>
          <option value="Other">Other</option>
        </select>
        <button onClick={handleClear} className="btn-clear">Clear</button>
      </div>
    </div>
  );
};

export default SearchBar;

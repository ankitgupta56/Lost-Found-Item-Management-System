import React from 'react';
import '../styles/Search.css';

const SearchFilter = ({ onSearch, loading }) => {
  const [name, setName] = React.useState('');
  const [category, setCategory] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(name, category);
  };

  const handleReset = () => {
    setName('');
    setCategory('');
    onSearch('', '');
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="form-row">
          <div className="form-group">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Search by item name..."
              className="search-input"
            />
          </div>

          <div className="form-group">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="search-select"
            >
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Accessories">Accessories</option>
              <option value="Documents">Documents</option>
              <option value="Books">Books</option>
              <option value="Sports">Sports</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-search"
          >
            Search
          </button>

          <button
            type="button"
            onClick={handleReset}
            disabled={loading}
            className="btn-reset"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchFilter;

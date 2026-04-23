import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { itemService } from '../services/api';
import ItemForm from './ItemForm';
import ItemList from './ItemList';
import SearchBar from './SearchBar';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token) {
      navigate('/login');
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
    }

    fetchItems();
  }, [navigate]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await itemService.getAllItems();
      setItems(response.data.items);
      setFilteredItems(response.data.items);
      setError('');
    } catch (err) {
      setError('Failed to load items');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm, category) => {
    let filtered = items;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category && category !== 'all') {
      filtered = filtered.filter(item => item.category === category);
    }

    if (filter !== 'all') {
      filtered = filtered.filter(item => item.status === filter);
    }

    setFilteredItems(filtered);
  };

  const handleFilter = (status) => {
    setFilter(status);
    let filtered = items;

    if (status !== 'all') {
      filtered = filtered.filter(item => item.status === status);
    }

    setFilteredItems(filtered);
  };

  const handleItemAdded = () => {
    setShowForm(false);
    setEditingItem(null);
    fetchItems();
  };

  const handleDeleteItem = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await itemService.deleteItem(id);
        fetchItems();
      } catch (err) {
        setError('Failed to delete item');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="navbar-content">
          <h1>Lost & Found System</h1>
          <div className="navbar-right">
            <span className="user-name">{user?.name}</span>
            <button onClick={handleLogout} className="btn-logout">Logout</button>
          </div>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="dashboard-header">
          <h2>Item Management</h2>
          <button
            onClick={() => {
              setEditingItem(null);
              setShowForm(!showForm);
            }}
            className="btn-primary"
          >
            {showForm ? 'Cancel' : '+ Add New Item'}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {showForm && (
          <ItemForm
            onItemAdded={handleItemAdded}
            editingItem={editingItem}
            setEditingItem={setEditingItem}
          />
        )}

        <SearchBar onSearch={handleSearch} />

        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => handleFilter('all')}
          >
            All Items
          </button>
          <button
            className={`filter-btn ${filter === 'Lost' ? 'active' : ''}`}
            onClick={() => handleFilter('Lost')}
          >
            Lost Items
          </button>
          <button
            className={`filter-btn ${filter === 'Found' ? 'active' : ''}`}
            onClick={() => handleFilter('Found')}
          >
            Found Items
          </button>
        </div>

        {loading ? (
          <div className="loading">Loading items...</div>
        ) : (
          <ItemList
            items={filteredItems}
            onDelete={handleDeleteItem}
            currentUser={user}
            onEdit={(item) => {
              setEditingItem(item);
              setShowForm(true);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;

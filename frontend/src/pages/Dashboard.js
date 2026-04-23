import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import SearchFilter from '../components/SearchFilter';
import ItemList from '../components/ItemList';
import AddItemForm from '../components/AddItemForm';
import {
  getAllItems,
  searchItems,
  createItem,
  updateItem,
  deleteItem,
  getUserItems
} from '../api';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState(null);
  const [items, setItems] = React.useState([]);
  const [userItems, setUserItems] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [view, setView] = React.useState('all'); // 'all', 'myItems', 'add'
  const [editingItem, setEditingItem] = React.useState(null);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      navigate('/login');
      return;
    }

    setUser(JSON.parse(userData));
    loadAllItems();
  }, [navigate]);

  const loadAllItems = async () => {
    setLoading(true);
    try {
      const response = await getAllItems();
      setItems(response.data.items);
      setError('');
    } catch (err) {
      setError('Failed to load items');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadUserItems = async () => {
    setLoading(true);
    try {
      const response = await getUserItems();
      setUserItems(response.data.items);
      setError('');
    } catch (err) {
      setError('Failed to load your items');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (name, category) => {
    setLoading(true);
    try {
      const response = await searchItems(name, category);
      setItems(response.data.items);
      setError('');
    } catch (err) {
      setError('Search failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async (formData) => {
    setLoading(true);
    try {
      await createItem(formData);
      setView('all');
      loadAllItems();
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add item');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateItem = async (formData) => {
    setLoading(true);
    try {
      await updateItem(editingItem._id, formData);
      setEditingItem(null);
      setView('all');
      loadAllItems();
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update item');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setLoading(true);
      try {
        await deleteItem(id);
        if (view === 'myItems') {
          loadUserItems();
        } else {
          loadAllItems();
        }
        setError('');
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to delete item');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleViewChange = (newView) => {
    setView(newView);
    setEditingItem(null);
    if (newView === 'myItems') {
      loadUserItems();
    } else if (newView === 'all') {
      loadAllItems();
    }
  };

  return (
    <div className="dashboard">
      <Navigation user={user} onLogout={handleLogout} />
      
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Lost & Found Management System</h1>
          <div className="view-tabs">
            <button
              className={`tab ${view === 'all' ? 'active' : ''}`}
              onClick={() => handleViewChange('all')}
            >
              All Items
            </button>
            <button
              className={`tab ${view === 'myItems' ? 'active' : ''}`}
              onClick={() => handleViewChange('myItems')}
            >
              My Items
            </button>
            <button
              className={`tab ${view === 'add' ? 'active' : ''}`}
              onClick={() => handleViewChange('add')}
            >
              Add Item
            </button>
          </div>
        </div>

        {error && <div className="error-alert">{error}</div>}

        {view === 'all' && (
          <div className="dashboard-section">
            <SearchFilter onSearch={handleSearch} loading={loading} />
            <ItemList items={items} loading={loading} />
          </div>
        )}

        {view === 'myItems' && (
          <div className="dashboard-section">
            <h2>Your Items</h2>
            <ItemList
              items={userItems}
              onEdit={(item) => {
                setEditingItem(item);
                setView('edit');
              }}
              onDelete={handleDeleteItem}
              loading={loading}
              showActions={true}
            />
          </div>
        )}

        {view === 'add' && (
          <AddItemForm
            onSubmit={handleAddItem}
            loading={loading}
          />
        )}

        {view === 'edit' && editingItem && (
          <AddItemForm
            isUpdate={true}
            initialData={editingItem}
            onSubmit={handleUpdateItem}
            loading={loading}
            onCancel={() => {
              setEditingItem(null);
              setView('myItems');
              loadUserItems();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;

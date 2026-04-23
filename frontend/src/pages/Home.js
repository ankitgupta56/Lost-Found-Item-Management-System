import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <nav className="home-nav">
        <div className="nav-brand">Lost & Found</div>
        <div className="nav-links">
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/register" className="nav-link">Register</Link>
        </div>
      </nav>

      <div className="hero-section">
        <div className="hero-content">
          <h1>Lost & Found Item Management System</h1>
          <p>Help students find their lost belongings on campus</p>
          <div className="hero-buttons">
            <Link to="/login" className="btn-primary">Login</Link>
            <Link to="/register" className="btn-secondary">Create Account</Link>
          </div>
        </div>
      </div>

      <div className="features-section">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>📝 Report Items</h3>
            <p>Report lost or found items with detailed information</p>
          </div>
          <div className="feature-card">
            <h3>🔍 Search</h3>
            <p>Search items by name, category, or location</p>
          </div>
          <div className="feature-card">
            <h3>✏️ Manage</h3>
            <p>Update or delete your posted items</p>
          </div>
          <div className="feature-card">
            <h3>🔒 Secure</h3>
            <p>Secure authentication with JWT tokens</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

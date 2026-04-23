import React from 'react';
import '../styles/Navigation.css';

const Navigation = ({ user, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          🔍 Lost & Found
        </div>
        <div className="nav-menu">
          {user ? (
            <>
              <span className="nav-user">Welcome, {user.name}!</span>
              <button onClick={onLogout} className="btn-logout">
                Logout
              </button>
            </>
          ) : (
            <span className="nav-user">Not logged in</span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

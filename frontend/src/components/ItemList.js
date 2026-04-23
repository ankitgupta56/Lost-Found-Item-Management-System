import React from 'react';
import '../styles/ItemList.css';

const ItemList = ({ items, onEdit, onDelete, loading, showActions = false, currentUser }) => {
  if (items.length === 0) {
    return <div className="no-items">No items found. Try searching or adding a new item.</div>;
  }

  return (
    <div className="items-grid">
      {items.map((item) => (
        <div key={item._id} className="item-card">
          <div className={`item-status ${item.status.toLowerCase()}`}>
            {item.status}
          </div>
          
          <h3>{item.title}</h3>
          
          <p className="item-description">{item.description}</p>
          
          <div className="item-details">
            <div className="detail-row">
              <span className="label">Category:</span>
              <span>{item.category}</span>
            </div>
            <div className="detail-row">
              <span className="label">Location:</span>
              <span>{item.location}</span>
            </div>
            {item.color && (
              <div className="detail-row">
                <span className="label">Color:</span>
                <span>{item.color}</span>
              </div>
            )}
            {item.size && (
              <div className="detail-row">
                <span className="label">Size:</span>
                <span>{item.size}</span>
              </div>
            )}
            <div className="detail-row">
              <span className="label">Posted by:</span>
              <span>{item.userName}</span>
            </div>
            <div className="detail-row">
              <span className="label">Contact:</span>
              <span>{item.userEmail}</span>
            </div>
            <div className="detail-row">
              <span className="label">Posted on:</span>
              <span>{new Date(item.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          {showActions && (
            <div className="item-actions">
              <button
                onClick={() => onEdit(item)}
                className="btn-edit"
                disabled={loading}
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(item._id)}
                className="btn-delete"
                disabled={loading}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ItemList;

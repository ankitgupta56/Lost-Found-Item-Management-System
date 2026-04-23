const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide item title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide item description']
  },
  category: {
    type: String,
    enum: ['Electronics', 'Clothing', 'Accessories', 'Documents', 'Books', 'Sports', 'Other'],
    required: [true, 'Please select a category']
  },
  status: {
    type: String,
    enum: ['Lost', 'Found'],
    required: true
  },
  location: {
    type: String,
    required: [true, 'Please provide location']
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: String,
  userEmail: String,
  color: {
    type: String,
    default: 'Not specified'
  },
  size: {
    type: String,
    default: 'Not specified'
  },
  image: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Item', itemSchema);

const express = require('express');
const {
  createItem,
  getAllItems,
  getItem,
  searchItems,
  updateItem,
  deleteItem,
  getUserItems
} = require('../controllers/itemController');
const auth = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getAllItems);
router.get('/search', searchItems);
router.get('/:id', getItem);

// Protected routes
router.post('/', auth, createItem);
router.put('/:id', auth, updateItem);
router.delete('/:id', auth, deleteItem);
router.get('/user/my-items', auth, getUserItems);

module.exports = router;

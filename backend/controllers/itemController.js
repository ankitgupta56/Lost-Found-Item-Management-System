const Item = require('../models/Item');
const User = require('../models/User');

// @desc    Create an item
// @route   POST /api/items
exports.createItem = async (req, res) => {
  try {
    const { title, description, category, status, location, color, size, image } = req.body;

    // Validation
    if (!title || !description || !category || !status || !location) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    // Get user info
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const item = new Item({
      title,
      description,
      category,
      status,
      location,
      color,
      size,
      image,
      userId: req.userId,
      userName: user.name,
      userEmail: user.email
    });

    await item.save();

    res.status(201).json({
      success: true,
      item
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Get all items
// @route   GET /api/items
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find().populate('userId', 'name email').sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: items.length,
      items
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Get single item
// @route   GET /api/items/:id
exports.getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('userId', 'name email');
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.status(200).json({
      success: true,
      item
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Search items by name or category
// @route   GET /api/items/search?name=xyz&category=abc
exports.searchItems = async (req, res) => {
  try {
    const { name, category } = req.query;
    let query = {};

    if (name) {
      query.title = { $regex: name, $options: 'i' };
    }
    if (category) {
      query.category = category;
    }

    const items = await Item.find(query).populate('userId', 'name email').sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: items.length,
      items
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Update item
// @route   PUT /api/items/:id
exports.updateItem = async (req, res) => {
  try {
    let item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Check if user owns this item
    if (item.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized to update this item' });
    }

    item = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      item
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Delete item
// @route   DELETE /api/items/:id
exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Check if user owns this item
    if (item.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized to delete this item' });
    }

    await Item.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Item deleted successfully'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Get user's items
// @route   GET /api/items/user/my-items
exports.getUserItems = async (req, res) => {
  try {
    const items = await Item.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: items.length,
      items
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const express = require('express');
const User = require('../models/User');
const router = express.Router();

// ✅ Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: '❌ Failed to fetch users', error: err.message });
  }
});

// ✅ Update a user (e.g., update fee, time, dietPlan, etc.)
router.put('/user/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ message: '✅ User updated successfully', user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: '❌ Update failed', error: err.message });
  }
});

// ✅ Delete a user
router.delete('/user/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: '✅ User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: '❌ Failed to delete user', error: err.message });
  }
});

// ✅ Update user's diet (now just a string text)
router.put('/user/:id/diet', async (req, res) => {
  const { dietPlan } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { dietPlan: dietPlan },
      { new: true }
    );

    res.json({ message: '✅ Diet updated successfully', user });
  } catch (err) {
    res.status(500).json({ message: '❌ Failed to update diet', error: err.message });
  }
});

module.exports = router;

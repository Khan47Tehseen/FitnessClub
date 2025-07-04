const express = require('express')
const router = express.Router()
const User = require('../models/User')

// Get user details by ID (populate dietPlan)
router.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('dietPlan')
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user details.' })
  }
})

// Update profile photo
router.put('/user/:id/photo', async (req, res) => {
  try {
    const { photo } = req.body
    await User.findByIdAndUpdate(req.params.id, { photo })
    res.json({ message: 'Profile photo updated successfully.' })
  } catch (err) {
    res.status(500).json({ message: 'Failed to update photo.' })
  }
})

// Request time change
router.put('/user/:id/request-time', async (req, res) => {
  try {
    const { requestedTime } = req.body
    await User.findByIdAndUpdate(req.params.id, { requestedTime })
    res.json({ message: 'Gym time request submitted.' })
  } catch (err) {
    res.status(500).json({ message: 'Failed to request time.' })
  }
})

module.exports = router

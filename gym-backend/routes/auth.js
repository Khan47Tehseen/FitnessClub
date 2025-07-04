// routes/auth.js
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const router = express.Router()

// ✅ REGISTER
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const role = email === 'ratherseenu16@gmail.com' ? 'admin' : 'user'

    const user = new User({ name, email, password: hashedPassword, role })
    await user.save()

    res.status(201).json({ message: '✅ User registered successfully' })
  } catch (err) {
    console.error("❌ Register Error:", err.message)
    res.status(500).json({ message: '❌ Server error', error: err.message })
  }
})

// ✅ LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ message: 'User not found' })

    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid password' })

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    res.status(200).json({
      message: '✅ Login successful',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (err) {
    console.error("❌ Login Error:", err.message)
    res.status(500).json({ message: '❌ Server error', error: err.message })
  }
})

module.exports = router

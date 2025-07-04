// routes/contact.js
const express = require('express')
const Contact = require('../models/Contact')

const router = express.Router()

// @POST /api/contact
router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" })
  }

  try {
    const newMessage = new Contact({ name, email, message })
    await newMessage.save()
    res.status(201).json({ message: "Message saved successfully" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router

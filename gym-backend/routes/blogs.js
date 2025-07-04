const express = require("express")
const router = express.Router()
const Blog = require("../models/Blog")

// POST: Add a new blog
router.post("/", async (req, res) => {
  try {
    const blog = new Blog(req.body)
    await blog.save()
    res.status(201).json({ message: "✅ Blog saved successfully!" })
  } catch (err) {
    res.status(500).json({ message: "❌ Failed to save blog", error: err.message })
  }
})

// GET: Fetch all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }) // newest first
    res.status(200).json(blogs)
  } catch (err) {
    res.status(500).json({ message: "❌ Failed to fetch blogs", error: err.message })
  }
})

module.exports = router

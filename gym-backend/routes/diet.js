const express = require("express")
const router = express.Router()
const Diet = require("../models/Diet")

// POST: Add a new diet plan
router.post("/", async (req, res) => {
  try {
    const diet = new Diet(req.body)
    await diet.save()
    res.status(201).json({ message: "✅ Diet plan saved successfully!" })
  } catch (err) {
    res.status(500).json({ message: "❌ Failed to save diet", error: err.message })
  }
})

// GET: Get all diet plans
router.get("/", async (req, res) => {
  try {
    const diets = await Diet.find().sort({ createdAt: -1 }) // newest first
    res.status(200).json(diets)
  } catch (err) {
    res.status(500).json({ message: "❌ Failed to fetch diets", error: err.message })
  }
})

module.exports = router

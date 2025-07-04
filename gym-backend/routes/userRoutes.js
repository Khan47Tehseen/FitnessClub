const express = require("express")
const router = express.Router()
const User = require("../models/User")

// GET live user details with populated diet
router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("dietPlan")
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user." })
  }
})

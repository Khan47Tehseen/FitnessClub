const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  date: { type: String, required: true }
}, { timestamps: true })

module.exports = mongoose.model("Blog", blogSchema)
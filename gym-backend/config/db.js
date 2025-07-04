// config/db.js
const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('✅ MongoDB Connected (from config/db.js)')
  } catch (error) {
    console.error('❌ MongoDB Error:', error.message)
    process.exit(1) // Exit if DB fails
  }
}

module.exports = connectDB

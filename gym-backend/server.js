const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

// Load environment variables from .env file
dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err))

// Import Routes
const authRoutes = require('./routes/auth')
const contactRoutes = require('./routes/contact')
const blogRoutes = require('./routes/blogs')
const dietRoutes = require('./routes/diet')
const adminRoutes = require('./routes/admin')
const userRoutes = require('./routes/user') // ✅ NEW
const paymentRoutes = require('./routes/payment');
app.use('/api/payment', paymentRoutes);



// Use Routes
app.use('/api', authRoutes)
app.use('/api', contactRoutes)
app.use('/api/blogs', blogRoutes)
app.use('/api/diet', dietRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api', userRoutes) // ✅ NEW

// Test Route
app.get('/', (req, res) => {
  res.send('Welcome to the Gym Backend API 💪')
})

// Start Server
const PORT = process.env.PORT || 5000
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
)

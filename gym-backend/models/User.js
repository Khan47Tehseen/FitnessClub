const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  feeAmount: {
  type: Number,
  default: 0,
},

  gymTime: {
    type: String,
    default: 'Not Set',
  },
  requestedTime: {
    type: String,
    default: '',
  },
  messageFromAdmin: {
    type: String,
    default: 'No message yet.',
  },
  dietPlan: {
  type: String,
  default: '',
},

  photo: {
    type: String, // base64 or image URL
    default: '',
  },
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)

// chat-server.js
const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  }
});

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Error:', err));

// Schema
const messageSchema = new mongoose.Schema({
  sender: String,
  text: String,
  createdAt: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', messageSchema);

// Socket events
io.on('connection', (socket) => {
  console.log('📡 New user connected');

  // Send all previous messages
  Message.find().sort({ createdAt: 1 }).then((messages) => {
    socket.emit('chatHistory', messages);
  });

  // Handle message sending
  socket.on('sendMessage', async (msg) => {
    const message = new Message(msg);
    await message.save(); // 🧠 persist
    io.emit('receiveMessage', message); // send to all
  });

  socket.on('disconnect', () => {
    console.log('❌ User disconnected');
  });
});

// Run server
const PORT = 5001;
server.listen(PORT, () => {
  console.log(`🚀 Chat Server running at http://localhost:${PORT}`);
});

const express = require('express');
const Razorpay = require('razorpay');
const router = express.Router();
const User = require('../models/User'); // Make sure path is correct

// Ensure env variables are set
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_SECRET) {
  throw new Error("❌ Razorpay keys not defined in .env");
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// Create Razorpay Order
router.post('/create-order', async (req, res) => {
  const { amount, userId } = req.body;

  if (!amount || !userId) {
    return res.status(400).json({ success: false, message: "Amount and userId are required" });
  }

  try {
    const options = {
      amount: parseInt(amount * 100), // INR to paise
      currency: "INR",
      receipt: `rcpt_${Date.now()}`, // always under 40 characters

    };

    const order = await razorpay.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("❌ Razorpay create order error:", error);
    res.status(500).json({ success: false, message: "Failed to create Razorpay order", error: error.message });
  }
});

// Confirm Payment (update user's paid fees)
router.post('/confirm', async (req, res) => {
  const { userId, amount } = req.body;

  if (!userId || !amount) {
    return res.status(400).json({ message: "userId and amount are required" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const updatedFee = Math.max(0, user.feeAmount - amount); // no negative fee

    await User.findByIdAndUpdate(userId, { feeAmount: updatedFee });

    res.json({ message: "✅ Payment successful. Fee updated!" });
  } catch (err) {
    console.error("❌ Payment confirm error:", err);
    res.status(500).json({ message: "❌ Payment confirm failed", error: err.message });
  }
});

module.exports = router;

import express from "express";
import mongoose from "mongoose";
import Message from "../models/Message.js";
import { sendNotificationEmail } from "../utils/sendEmail.js";

const router = express.Router();

// POST /api/contact
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // save message to database
    const savedMessage = await Message.create({ name, email, message });
    console.log("✅ Message saved to DB:", savedMessage._id);

    // 📧 send email notification
    await sendNotificationEmail(name, email, message);

    res.json({ success: true });
  } catch (err) {
    console.error("Contact error:", err);
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
});

export default router;

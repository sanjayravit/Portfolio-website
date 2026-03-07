import express from "express";
import Message from "../models/Message.js";
import { sendNotificationEmail } from "../utils/sendEmail.js";

const router = express.Router();

// POST /api/contact
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required."
      });
    }

    const savedMessage = await Message.create({ name, email, message });

    console.log("✅ Message saved:", savedMessage._id);

    await sendNotificationEmail(name, email, message);

    res.json({ success: true });

  } catch (err) {
    console.error("Contact error:", err);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

export default router;
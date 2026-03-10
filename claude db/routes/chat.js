import express from "express";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Initialize the Gemini client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

router.post("/", async (req, res) => {
    try {
        console.log("-> Processing chat request");
        const { message, history } = req.body;
        console.log("-> Request message:", message);

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        // Convert frontend history to Gemini format (optional, but good for context)
        // Note: This is a basic implementation. For full history you'd use the chat session.
        const systemInstruction = `You are a helpful and polite AI assistant for Sanjay Ravi's portfolio website. 
Sanjay is a skilled developer focusing on frontend (React, GSAP), backend, and UI/UX design.
Keep your answers concise and relevant to his skills and services. If you don't know something, just say you don't know.
If they ask for contact info, tell them they can use the contact form or email sanjayravit7@gmail.com.
If they ask for his GitHub or LinkedIn, point them to the links in the contact section.`;

        const prompt = `${systemInstruction}\n\nUser: ${message}`;

        // Call the Gemini API
        console.log("-> Calling Gemini API...");
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
        });
        console.log("-> Gemini API response received:", response.text ? "Yes" : "No");

        res.json({ reply: response.text });
    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ error: "Failed to process chat message", details: error.message || error.toString() });
    }
});

export default router;

import { Resend } from 'resend';

// Initialize Resend with the API key from environment variables
// Instantiate dynamically to prevent crash if key is missing
let resend;

export const sendNotificationEmail = async (name, email, message) => {
  // Skip email if credentials not set
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not configured. Skipping email notification.");
    return;
  }

  try {
    if (!resend) {
      resend = new Resend(process.env.RESEND_API_KEY);
    }
    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>', // Resend testing email wrapper
      to: process.env.ADMIN_EMAIL, // Your receiving email address
      subject: `📩 New Portfolio Website Message from ${name}`,
      html: `
        <h2>New Contact Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `
    });

    if (data.error) {
      console.error("❌ Resend email error:", data.error);
    } else {
      console.log("✅ Email sent successfully via Resend:", data.data.id);
    }
  } catch (err) {
    console.error("❌ Email send catch error:", err.message);
  }
};
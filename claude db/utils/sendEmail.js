import nodemailer from "nodemailer";

let transporter = null;

const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: "74.125.136.108", // Force Google SMTP IPv4 Address
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  }
  return transporter;
};

export const sendNotificationEmail = async (name, email, message) => {
  // Skip email if credentials not set
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn("Email service not configured. Skipping email notification.");
    return;
  }

  try {
    const transporter = getTransporter();
    const result = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: "📩 New Website Message",

      html: `
        <h2>New Contact Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `
    });
    console.log("✅ Email sent successfully:", result.messageId);
  } catch (err) {
    console.error("❌ Email send error:", err.message);
    // Don't fail the request if email fails
  }

};  
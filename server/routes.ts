import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "465"),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, mobile, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ error: "Name, email, and message are required" });
      }

      const mailOptions = {
        from: process.env.SMTP_USER,
        to: "hello@siobhansluxe.co.uk",
        subject: `New Enquiry from ${name} - Siobhans Luxe Website`,
        text: `
New enquiry received from the website:

Name: ${name}
Email: ${email}
Mobile: ${mobile || "Not provided"}

Message:
${message}
        `,
        html: `
<h2>New Enquiry from Siobhans Luxe Website</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Mobile:</strong> ${mobile || "Not provided"}</p>
<h3>Message:</h3>
<p>${message.replace(/\n/g, "<br>")}</p>
        `,
      };

      await transporter.sendMail(mailOptions);
      
      res.json({ success: true, message: "Email sent successfully" });
    } catch (error) {
      console.error("Email send error:", error);
      res.status(500).json({ error: "Failed to send email. Please try again." });
    }
  });

  return httpServer;
}

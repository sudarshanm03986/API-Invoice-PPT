
import nodemailer from 'nodemailer';
import Logger from '../../config/logger';
import 'dotenv/config';

// Create a transporter using your email service credentials
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Gmail SMTP server
  port: 465,              // SSL port
  secure: true,           // Use SSL
  auth: {
    user: process.env.EMAIL,   // Your email address
    pass: process.env.KEY,     // Your app-specific password
  },
});

const send = async (to: string, subject: string, htmlContent: string): Promise<void> => {
  try {
    Logger.http("Model started, sending from: " + process.env.EMAIL);

    const info = await transporter.sendMail({
      from: process.env.INVOICE_EMAIL,  // Alias email
      to,                               // Recipient's email
      subject,                          // Email subject
      html: htmlContent,                // HTML content
    });

    Logger.http("Email sent successfully");
    Logger.info(info); // Log the result from sending the email
  } catch (error: any) {
    Logger.http("Error sending email");
    Logger.error(error.message);  // Log the error
    throw new Error(`Error: ${error.message}`);  // Throw error for further handling
  }
};

export { send };

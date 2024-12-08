import mongoose from "mongoose";
import nodemailer from "nodemailer";

import { setInterval } from "timers";
import { Message } from "twilio/lib/twiml/MessagingResponse";
import twilio from "twilio";
import { DWLR } from "../model/dwlr";
import Authority from "../model/Authority";
import dotenv from "dotenv";
dotenv.config();
// Setup nodemailer for sending emails
const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, 
  },
});

// Setup Twilio client for sending SMS
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Function to send email notifications
async function sendEmailNotification(emails: string[], subject: string, text: string) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: emails.join(", "),
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email notifications sent successfully.");
  } catch (error) {
    console.error("Error sending email notifications:", error);
  }
}

// Function to send SMS notifications
async function sendSMSNotification(phoneNumbers: string[], message: string) {
  for (const phoneNumber of phoneNumbers) {
    try {
      await twilioClient.messages.create({
        body: message,
        from: process.env.TWILIO_NUMBER, // Replace with your Twilio number
        to: phoneNumber,
      });
      console.log(`SMS notification sent to ${phoneNumber}`);
    } catch (error) {
      console.error("Error sending SMS notification:", error);
    }
  }
}

// Function to check DWLR status and send notifications
async function checkAndNotify() {
  try {
    // Fetch DWLRs with low battery or anomaly status
    const faultyDWLRs = await DWLR.find({ 
      $or: [
        { lowBattery: true },
        { anomalyDwlr: true }
      ] 
    });

    if (faultyDWLRs.length > 0) {
      console.log("Faulty DWLRs found:", faultyDWLRs);

      // Fetch all authorities
      const authorities = await Authority.find();
      const emails = authorities.map(a => a.email);
      const phoneNumbers = authorities.map(a => a.phone);

      // Construct notification messages
      const subject = "DWLR Notification: Fault Detected";
      const text = `The following DWLRs have an issue:\n${faultyDWLRs.map(d => `ID: ${d.id}, Location: (${d.latitude}, ${d.longitude})`).join("\n")}`;

      // Send notifications
      if (emails.length > 0) {
        await sendEmailNotification(emails, subject, text);
      }

      if (phoneNumbers.length > 0) {
        await sendSMSNotification(phoneNumbers, text);
      }
    } else {
      console.log("No faulty DWLRs found.");
    }
  } catch (error) {
    console.error("Error while checking DWLR status:", error);
  }
}

// Schedule the check every 5 minutes
setInterval(checkAndNotify, 5 * 60 * 1000);


export default checkAndNotify;

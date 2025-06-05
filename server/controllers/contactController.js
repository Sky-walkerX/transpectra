const nodemailer = require('nodemailer');
const { msgFunction } = require('../utils/msgFunction'); // Assuming you have this utility
require('dotenv').config(); // Ensure dotenv is configured

exports.submitContactForm = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Basic validation
        if (!name || !email || !message) {
            return res.status(400).json(
                msgFunction(false, "All fields (Name, Email, Message) are required.")
            );
        }

        // Create a Nodemailer transporter (reusing your existing setup or a new one)
        // It's best to use environment variables for user and pass here.
        const transporter = nodemailer.createTransport({
            service: "gmail", // Or your preferred email service
            auth: {
                user: process.env.EMAIL_USER, // Your sender email from .env
                pass: process.env.EMAIL_APP_PASSWORD, // Your app password from .env (make sure to set this up)
            },
        });

        // 1. Send Auto-Reply to the User
        const userMailOptions = {
            from: process.env.EMAIL_USER,
            to: email, // The user's email from the form
            subject: 'Thank You for Your Message - Transpectra',
            html: `
                <p>Dear ${name},</p>
                <p>Thank you for reaching out to us! We have received your message and will get back to you as soon as possible.</p>
                <p>Here's a copy of your message:</p>
                <p><strong>Message:</strong> ${message}</p>
                <p>In the meantime, feel free to visit our website or social media channels.</p>
                <p>Best regards,</p>
                <p>Transpectra</p>
                <p>(${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })})</p>
            `,
        };

        await transporter.sendMail(userMailOptions);
        console.log(`Auto-reply sent to: ${email}`);

        // 2. Send Message to the Owner/Admin
        const ownerMailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.OWNER_EMAIL, // Your specific owner email from .env
            subject: `New Contact Form Submission from ${name}`,
            html: `
                <p>You have received a new message from your website's contact form:</p>
                <ul>
                    <li><strong>Name:</strong> ${name}</li>
                    <li><strong>Email:</strong> ${email}</li>
                    <li><strong>Message:</strong> ${message}</li>
                </ul>
                <p>Date/Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
            `,
        };

        await transporter.sendMail(ownerMailOptions);
        console.log(`Message sent to owner (${process.env.OWNER_EMAIL}) from: ${email}`);

        return res.status(200).json(
            msgFunction(true, "Your message has been sent successfully!")
        );

    } catch (error) {
        console.error("Error submitting contact form:", error);
        return res.status(500).json(
            msgFunction(false, "Failed to send message. Please try again later.")
        );
    }
};
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

let transporter = null;

export const initEmailTransporter = () => {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (host && user && pass) {
    transporter = nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user,
        pass,
      },
    });
    console.log('✅ [Email Service] SMTP transporter configured.');
  } else {
    console.log('ℹ️ [Email Service] SMTP is not fully configured. Contact form enquiries will be recorded to DB and logged to console.');
  }
};

export const sendContactNotification = async (enquiry) => {
  const recipient = process.env.CONTACT_RECIPIENT_EMAIL || 'abdurrahman94700@gmail.com';
  const fromEmail = process.env.FROM_EMAIL || 'no-reply@abdurrahmankhan.com';

  if (!transporter) {
    return {
      success: false,
      status: 'not_configured',
      message: 'SMTP credentials not configured. Enquiry saved in database.'
    };
  }

  const mailOptions = {
    from: `"Portfolio Contact Form" <${fromEmail}>`,
    to: recipient,
    replyTo: enquiry.email,
    subject: `New Portfolio Enquiry: ${enquiry.name} (${enquiry.projectType})`,
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #080808; color: #F5F5F5; padding: 24px; border-radius: 8px;">
        <h2 style="color: #FF5B1B; border-bottom: 2px solid #303030; padding-bottom: 8px;">New Client Enquiry Received</h2>
        <p><strong>Name:</strong> ${enquiry.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${enquiry.email}" style="color: #FF5B1B;">${enquiry.email}</a></p>
        <p><strong>Project Type:</strong> ${enquiry.projectType}</p>
        <p><strong>Budget:</strong> ${enquiry.budget}</p>
        <div style="background-color: #171717; padding: 16px; border: 1px solid #303030; border-radius: 6px; margin-top: 16px;">
          <p style="margin-top: 0; font-weight: bold; color: #FF763D;">Message:</p>
          <p style="white-space: pre-wrap; margin-bottom: 0;">${enquiry.message}</p>
        </div>
        <p style="color: #888; font-size: 12px; margin-top: 24px;">Sent from Abdur Rahman Khan Portfolio Web System.</p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return { success: true, status: 'sent', messageId: info.messageId };
  } catch (error) {
    console.error('❌ [Email Service] Delivery failed:', error.message);
    return { success: false, status: 'failed', error: error.message };
  }
};


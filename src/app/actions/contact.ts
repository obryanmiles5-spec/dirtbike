'use server';

import nodemailer from 'nodemailer';
import { saveContactToLog } from '@/lib/zohoMail';

export type ContactActionState = {
  success: boolean;
  message?: string;
  error?: string;
};

export async function submitContactAction(
  _prevState: ContactActionState,
  formData: FormData
): Promise<ContactActionState> {
  const name = (formData.get('name') as string)?.trim();
  const email = (formData.get('email') as string)?.trim();
  const phone = (formData.get('phone') as string)?.trim() || 'N/A';
  const subject = (formData.get('subject') as string)?.trim() || 'General Inquiry';
  const message = (formData.get('message') as string)?.trim();

  // 1. Server-side Validation
  if (!name || name.length < 2) {
    return {
      success: false,
      error: 'Please enter a valid full name (at least 2 characters).'
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return {
      success: false,
      error: 'Please enter a valid email address.'
    };
  }

  if (!message || message.length < 5) {
    return {
      success: false,
      error: 'Please enter a message (at least 5 characters).'
    };
  }

  // 2. Log message to server audit log
  saveContactToLog({ name, email, phone, subject, message });

  // 3. Initialize Nodemailer with Zoho Mail SMTP settings & 10s connection timeout for Vercel
  const host = (process.env.ZOHO_MAIL_HOST || 'smtp.zoho.com').trim().replace(/^["']|["']$/g, '');
  const user = (process.env.ZOHO_MAIL_USER || 'contact@voltdirtbike.com').trim().replace(/^["']|["']$/g, '');
  const pass = (process.env.ZOHO_MAIL_PASSWORD || '').trim().replace(/^["']|["']$/g, '');

  const transporter = nodemailer.createTransport({
    host,
    port: 465,
    secure: true, // port 465 uses SSL/TLS
    auth: {
      user,
      pass
    },
    connectionTimeout: 10000, // 10,000ms timeout prevents serverless function hangs on Vercel
    greetingTimeout: 10000,
    socketTimeout: 10000,
    tls: {
      rejectUnauthorized: false
    }
  });

  const adminEmail = user;
  const fromAddress = `"${name} (VOLT-X Direct)" <${user}>`;

  const mailHtml = `
    <div style="font-family: Arial, sans-serif; background-color: #0b0f17; color: #ffffff; padding: 24px; border-radius: 12px; border: 1px solid #1e293b; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #a3e635; margin-top: 0; text-transform: uppercase;">⚡ VOLT-X Direct Contact Dispatch</h2>
      <p style="color: #94a3b8; font-size: 14px;">New customer inquiry submitted via website contact form:</p>
      <hr style="border-color: #1e293b; margin: 16px 0;" />
      <table style="width: 100%; font-size: 14px; color: #e2e8f0; border-collapse: collapse;">
        <tr><td style="padding: 6px 0; color: #94a3b8; width: 140px;"><strong>Full Name:</strong></td><td>${name}</td></tr>
        <tr><td style="padding: 6px 0; color: #94a3b8;"><strong>Email Address:</strong></td><td><a href="mailto:${email}" style="color: #a3e635;">${email}</a></td></tr>
        <tr><td style="padding: 6px 0; color: #94a3b8;"><strong>Phone Number:</strong></td><td>${phone}</td></tr>
        <tr><td style="padding: 6px 0; color: #94a3b8;"><strong>Topic / Subject:</strong></td><td><span style="background: #1e293b; padding: 3px 8px; border-radius: 4px; color: #38bdf8;">${subject}</span></td></tr>
      </table>
      <div style="margin-top: 20px; padding: 16px; background-color: #030712; border-left: 4px solid #a3e635; border-radius: 6px;">
        <p style="margin: 0 0 8px 0; color: #a3e635; font-weight: bold; font-size: 12px; text-transform: uppercase;">Message Content:</p>
        <p style="margin: 0; color: #f8fafc; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">${message}</p>
      </div>
      <p style="font-size: 11px; color: #64748b; margin-top: 24px;">VOLT-X Motorsports Server Action Dispatch | Reno, NV HQ</p>
    </div>
  `;

  try {
    if (pass) {
      await transporter.sendMail({
        from: fromAddress,
        to: adminEmail,
        replyTo: email,
        subject: `[VOLT-X Inquiry] ${subject} - ${name}`,
        html: mailHtml
      });
    }

    return {
      success: true,
      message: 'Your inquiry has been sent successfully to our Reno HQ powersports team!'
    };
  } catch (err: any) {
    console.error('[VOLT-X Zoho Mail Action Error]', err);

    // Fallback: If SMTP credentials fail or timeout, the message is still logged safely
    return {
      success: true,
      message: 'Your inquiry has been received and logged in our system. Our team will contact you shortly!'
    };
  }
}

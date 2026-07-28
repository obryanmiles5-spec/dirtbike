'use server';

import { sendMailDirect, saveContactToLog, getSenderAddress } from '@/lib/zohoMail';

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
  const phone = (formData.get('phone') as string)?.trim();
  const subject = (formData.get('subject') as string)?.trim();
  const message = (formData.get('message') as string)?.trim();

  if (!name || !email || !message) {
    return {
      success: false,
      error: 'Please fill in all required fields (Name, Email, and Message).'
    };
  }

  // 1. Always save contact inquiry to server log so data is never lost
  saveContactToLog({ name, email, phone, subject, message });

  const adminEmail = getSenderAddress();

  // 2. Dispatch Admin Notification Email
  const adminMailHtml = `
    <div style="font-family: Arial, sans-serif; background-color: #0b0f17; color: #ffffff; padding: 24px; border-radius: 12px; border: 1px solid #1e293b;">
      <h2 style="color: #a3e635; margin-top: 0; text-transform: uppercase;">⚡ VOLT-X Direct Contact Dispatch</h2>
      <p style="color: #94a3b8; font-size: 14px;">New inquiry submitted via website contact form:</p>
      <hr style="border-color: #1e293b; margin: 16px 0;" />
      <table style="width: 100%; font-size: 14px; color: #e2e8f0; border-collapse: collapse;">
        <tr><td style="padding: 6px 0; color: #94a3b8; width: 140px;"><strong>Sender Name:</strong></td><td>${name}</td></tr>
        <tr><td style="padding: 6px 0; color: #94a3b8;"><strong>Email Address:</strong></td><td><a href="mailto:${email}" style="color: #a3e635;">${email}</a></td></tr>
        <tr><td style="padding: 6px 0; color: #94a3b8;"><strong>Phone Number:</strong></td><td>${phone || 'N/A'}</td></tr>
        <tr><td style="padding: 6px 0; color: #94a3b8;"><strong>Subject / Topic:</strong></td><td><span style="background: #1e293b; padding: 3px 8px; border-radius: 4px; color: #38bdf8;">${subject || 'Inquiry'}</span></td></tr>
      </table>
      <div style="margin-top: 20px; padding: 16px; background-color: #030712; border-left: 4px solid #a3e635; border-radius: 6px;">
        <p style="margin: 0 0 8px 0; color: #a3e635; font-weight: bold; font-size: 12px; text-transform: uppercase;">Message Content:</p>
        <p style="margin: 0; color: #f8fafc; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">${message}</p>
      </div>
      <p style="font-size: 11px; color: #64748b; margin-top: 24px;">VOLT-X Motorsports Server Action Dispatch | Reno, NV HQ</p>
    </div>
  `;

  const adminResult = await sendMailDirect({
    to: adminEmail,
    subject: `[VOLT-X Website Dispatch] ${subject || 'General Inquiry'} - ${name}`,
    html: adminMailHtml,
    fromName: 'VOLT-X Contact Form',
    replyTo: email
  });

  // 3. Dispatch Customer Auto-Responder Email
  const userMailHtml = `
    <div style="font-family: Arial, sans-serif; background-color: #090d16; color: #ffffff; padding: 28px; border-radius: 12px; border: 2px solid #a3e635;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #ffffff; font-size: 28px; font-weight: 900; letter-spacing: 2px; margin: 0;">VOLT<span style="color: #a3e635;">X</span> MOTORSPORTS</h1>
        <p style="color: #38bdf8; font-size: 12px; letter-spacing: 4px; margin-top: 4px; font-weight: bold;">RENO FACTORY DIRECT DISPATCH</p>
      </div>
      
      <p style="font-size: 16px; color: #e2e8f0;">Hello <strong>${name}</strong>,</p>
      <p style="font-size: 14px; color: #94a3b8; line-height: 1.6;">
        Thank you for contacting VOLT-X Motorsports. Your inquiry regarding <strong>"${subject || 'Electric Off-Road Bikes'}"</strong> has been received by our Reno HQ powersports technical team.
      </p>

      <div style="background-color: #111827; padding: 16px; border-radius: 8px; border: 1px solid #1f2937; margin: 20px 0;">
        <p style="margin: 0; color: #a3e635; font-size: 13px; font-weight: bold;">⏱ EXPECTED RESPONSE TIME:</p>
        <p style="margin: 4px 0 0 0; color: #cbd5e1; font-size: 13px;">Within 2 business hours (Mon - Sat: 9:00 AM - 6:00 PM PST)</p>
      </div>

      <p style="font-size: 13px; color: #94a3b8;">Need immediate phone support or technical assistance? Call our factory hotline at <strong>505-652-1743</strong> or email <strong>${adminEmail}</strong>.</p>
      
      <hr style="border-color: #1e293b; margin: 24px 0;" />
      <p style="font-size: 11px; color: #64748b; text-align: center;">VOLT-X Motorsports | 1040 Electric Ridge Blvd, Reno, NV 89502</p>
    </div>
  `;

  sendMailDirect({
    to: email,
    subject: `[Dispatched] We received your VOLT-X inquiry: ${subject || 'Support Request'}`,
    html: userMailHtml,
    fromName: 'VOLT-X Motorsports Direct'
  }).catch((err) => {
    console.warn('Auto responder email notice:', err);
  });

  if (adminResult.success) {
    return {
      success: true,
      message: 'Your inquiry has been successfully dispatched to our Reno HQ team!'
    };
  } else {
    // If SMTP authentication failed, return success since message was saved to server log, with a friendly note
    return {
      success: true,
      message: 'Your inquiry has been received and saved to our Reno HQ system! Our team will respond shortly.'
    };
  }
}

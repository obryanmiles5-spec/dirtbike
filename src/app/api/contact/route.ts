import { NextResponse } from 'next/server';
import { sendMailDirect, getSenderAddress } from '@/lib/zohoMail';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    const senderEmail = getSenderAddress();

    // 1. Email notification to VOLT-X Headquarters
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; background-color: #0b0f17; color: #ffffff; padding: 24px; border-radius: 12px; border: 1px solid #1e293b;">
        <h2 style="color: #a3e635; margin-top: 0; text-transform: uppercase;">⚡ VOLT-X Direct Dispatch Received</h2>
        <p style="color: #94a3b8; font-size: 14px;">New inquiry submitted via website contact form:</p>
        <hr style="border-color: #1e293b; margin: 16px 0;" />
        <table style="width: 100%; font-size: 14px; color: #e2e8f0; border-collapse: collapse;">
          <tr><td style="padding: 6px 0; color: #94a3b8; width: 140px;"><strong>Sender Name:</strong></td><td>${name || 'N/A'}</td></tr>
          <tr><td style="padding: 6px 0; color: #94a3b8;"><strong>Email Address:</strong></td><td><a href="mailto:${email}" style="color: #a3e635;">${email}</a></td></tr>
          <tr><td style="padding: 6px 0; color: #94a3b8;"><strong>Phone Number:</strong></td><td>${phone || 'N/A'}</td></tr>
          <tr><td style="padding: 6px 0; color: #94a3b8;"><strong>Subject / Topic:</strong></td><td><span style="background: #1e293b; padding: 3px 8px; border-radius: 4px; color: #38bdf8;">${subject || 'Inquiry'}</span></td></tr>
        </table>
        <div style="margin-top: 20px; padding: 16px; background-color: #030712; border-left: 4px solid #a3e635; border-radius: 6px;">
          <p style="margin: 0 0 8px 0; color: #a3e635; font-weight: bold; font-size: 12px; text-transform: uppercase;">Message Content:</p>
          <p style="margin: 0; color: #f8fafc; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">${message || 'No message text provided.'}</p>
        </div>
        <p style="font-size: 11px; color: #64748b; margin-top: 24px;">VOLT-X Motorsports Automated Dispatch System | Reno, NV HQ</p>
      </div>
    `;

    await sendMailDirect({
      to: senderEmail,
      subject: `[VOLT-X Dispatch Inquiry] ${subject || 'General Inquiry'} - ${name}`,
      html: adminEmailHtml,
      fromName: 'VOLT-X Motorsports Web',
      replyTo: email
    });

    // 2. Auto-responder to customer if email is provided
    let userDispatchResult: any = null;
    if (email && email.includes('@')) {
      const userEmailHtml = `
        <div style="font-family: Arial, sans-serif; background-color: #090d16; color: #ffffff; padding: 28px; border-radius: 12px; border: 2px solid #a3e635;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #ffffff; font-size: 28px; font-weight: 900; letter-spacing: 2px; margin: 0;">VOLT<span style="color: #a3e635;">X</span> MOTORSPORTS</h1>
            <p style="color: #38bdf8; font-size: 12px; letter-spacing: 4px; margin-top: 4px; font-weight: bold;">RENO FACTORY DIRECT DISPATCH</p>
          </div>
          
          <p style="font-size: 16px; color: #e2e8f0;">Hello <strong>${name || 'Rider'}</strong>,</p>
          <p style="font-size: 14px; color: #94a3b8; line-height: 1.6;">
            Thank you for contacting VOLT-X Motorsports. Your inquiry regarding <strong>"${subject || 'Electric Off-Road Bikes'}"</strong> has been queued for our Reno HQ powersports tech team.
          </p>

          <div style="background-color: #111827; padding: 16px; border-radius: 8px; border: 1px solid #1f2937; margin: 20px 0;">
            <p style="margin: 0; color: #a3e635; font-size: 13px; font-weight: bold;">⏱ EXPECTED RESPONSE TIME:</p>
            <p style="margin: 4px 0 0 0; color: #cbd5e1; font-size: 13px;">Within 2 business hours (Mon - Sat: 9:00 AM - 6:00 PM PST)</p>
          </div>

          <p style="font-size: 13px; color: #94a3b8;">Need immediate phone support or technical assistance? Call our factory hotline at <strong>505-652-1743</strong> or email <strong>contact@voltdirtbike.com</strong>.</p>
          
          <hr style="border-color: #1e293b; margin: 24px 0;" />
          <p style="font-size: 11px; color: #64748b; text-align: center;">VOLT-X Motorsports | 1040 Electric Ridge Blvd, Reno, NV 89502</p>
        </div>
      `;

      userDispatchResult = await sendMailDirect({
        to: email,
        subject: `[Dispatched] We received your VOLT-X inquiry: ${subject || 'Support Request'}`,
        html: userEmailHtml,
        fromName: 'VOLT-X Direct'
      });
    }

    return NextResponse.json({
      success: true,
      userDispatchResult,
      message: 'Contact inquiry recorded and confirmation email dispatched via Zoho Mail.',
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('[VOLT-X Contact API Error]', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to send contact message' },
      { status: 500 }
    );
  }
}



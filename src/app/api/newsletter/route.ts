import { NextResponse } from 'next/server';
import { sendMailDirect, getSenderAddress } from '@/lib/zohoMail';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const senderEmail = getSenderAddress();

    // 1. Send Welcome Email to Subscriber
    const userEmailHtml = `
      <div style="font-family: Arial, sans-serif; background-color: #080c14; color: #ffffff; padding: 28px; border-radius: 12px; border: 2px solid #a3e635;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #ffffff; font-size: 28px; font-weight: 900; letter-spacing: 2px; margin: 0;">VOLT<span style="color: #a3e635;">X</span> MOTORSPORTS</h1>
          <p style="color: #38bdf8; font-size: 11px; letter-spacing: 4px; margin-top: 4px; font-weight: bold;">VIP CLUB &amp; EARLY ACCESS</p>
        </div>

        <p style="font-size: 15px; color: #e2e8f0;">You're officially locked in!</p>
        <p style="font-size: 13px; color: #94a3b8; line-height: 1.6;">
          Your email (<strong style="color: #a3e635;">${email}</strong>) is now registered on the VOLT-X VIP list. You will receive priority notifications for:
        </p>

        <ul style="color: #cbd5e1; font-size: 13px; line-height: 1.8;">
          <li>⚡ Limited-run 80V &amp; 96V Custom Off-Road Dirt Bike drops</li>
          <li>🏆 Exclusive promo codes &amp; free freight shipping vouchers</li>
          <li>🛠 High-output battery upgrade guides &amp; controller tuning tutorials</li>
        </ul>

        <div style="background-color: #0f172a; padding: 14px; border-radius: 8px; border: 1px solid #1e293b; margin-top: 20px; text-align: center;">
          <span style="color: #a3e635; font-size: 12px; font-weight: bold;">VIP WELCOME PROMO CODE:</span>
          <span style="background: #a3e635; color: #090d16; font-weight: 900; padding: 4px 10px; border-radius: 4px; font-family: monospace; font-size: 14px; margin-left: 8px;">VOLTX50</span>
          <p style="color: #94a3b8; font-size: 11px; margin: 6px 0 0 0;">Use at checkout for $50 OFF any electric dirt bike or e-bike order.</p>
        </div>

        <hr style="border-color: #1e293b; margin: 24px 0;" />
        <p style="font-size: 11px; color: #64748b; text-align: center;">VOLT-X Motorsports | 1040 Electric Ridge Blvd, Reno, NV 89502</p>
      </div>
    `;

    const dispatchResult = await sendMailDirect({
      to: email,
      subject: `⚡ Welcome to VOLT-X VIP Off-Road Drop Alerts`,
      html: userEmailHtml,
      fromName: 'VOLT-X Off-Road Alerts'
    });

    // 2. Send Alert to HQ Admin
    if (senderEmail) {
      const adminEmailHtml = `
        <div style="font-family: Arial, sans-serif; background-color: #0b0f17; color: #ffffff; padding: 20px; border-radius: 8px;">
          <h3 style="color: #a3e635; margin-top: 0;">New Newsletter Subscriber</h3>
          <p style="color: #cbd5e1;">A new user subscribed to VIP alerts: <strong>${email}</strong></p>
        </div>
      `;

      try {
        await sendMailDirect({
          to: senderEmail,
          subject: `[Subscriber Alert] New VIP Off-Road Alert Signup: ${email}`,
          html: adminEmailHtml,
          fromName: 'VOLT-X Newsletter'
        });
      } catch (err) {
        console.warn('Admin newsletter alert error:', err);
      }
    }

    return NextResponse.json({
      success: true,
      dispatchResult,
      message: 'Subscribed and confirmation email dispatched via Zoho Mail.',
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('[VOLT-X Newsletter Error]', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to process subscription' },
      { status: 500 }
    );
  }
}



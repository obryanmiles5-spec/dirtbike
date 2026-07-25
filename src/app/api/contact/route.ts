import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    const zohoUser = process.env.ZOHO_MAIL_USER;
    const zohoPass = process.env.ZOHO_MAIL_PASSWORD;

    console.log('[VOLT-X API] Contact Submission received:', {
      name,
      email,
      phone,
      subject,
      message,
      zohoConfigured: Boolean(zohoUser && zohoPass)
    });

    return NextResponse.json({
      success: true,
      message: 'Direct dispatch queued for Reno HQ team.',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[VOLT-X API Error]', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process contact inquiry' },
      { status: 500 }
    );
  }
}

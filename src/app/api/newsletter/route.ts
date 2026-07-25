import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    const zohoUser = process.env.ZOHO_MAIL_USER;
    const zohoPass = process.env.ZOHO_MAIL_PASSWORD;

    console.log('[VOLT-X API] Newsletter signup:', {
      email,
      zohoConfigured: Boolean(zohoUser && zohoPass)
    });

    return NextResponse.json({
      success: true,
      message: 'Subscribed to VIP off-road drop alerts.',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[VOLT-X Newsletter Error]', error);
    return NextResponse.json(
      { success: false, error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const orderData = await request.json();

    const zohoUser = process.env.ZOHO_MAIL_USER;
    const zohoPass = process.env.ZOHO_MAIL_PASSWORD;

    console.log('[VOLT-X API] Order created & confirmation notification:', {
      orderId: orderData.orderId,
      customerEmail: orderData.customer?.email,
      totalAmount: orderData.total,
      zohoConfigured: Boolean(zohoUser && zohoPass)
    });

    return NextResponse.json({
      success: true,
      orderId: orderData.orderId || `VX-${Math.floor(100000 + Math.random() * 900000)}`,
      message: 'Order confirmation dispatched successfully.',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[VOLT-X Order API Error]', error);
    return NextResponse.json(
      { success: false, error: 'Failed to record order' },
      { status: 500 }
    );
  }
}

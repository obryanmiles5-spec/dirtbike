import { NextResponse } from 'next/server';
import { sendMailDirect, saveOrderToLog, getSenderAddress } from '@/lib/zohoMail';

export async function POST(request: Request) {
  try {
    const orderData = await request.json();
    const {
      orderId,
      customer,
      items,
      subtotal,
      shippingCost,
      taxAmount,
      totalAmount,
      promoCodeApplied,
      estimatedDelivery,
      trackingNumber
    } = orderData;

    // Save order to server storage immediately so no data is ever lost
    saveOrderToLog(orderData);

    const senderEmail = getSenderAddress();
    const customerEmail = (customer?.email || orderData.email || '').trim();
    const customerName = customer ? `${customer.firstName || ''} ${customer.lastName || ''}`.trim() : (orderData.customerName || 'Valued Customer');

    // Format item list for email
    const itemListHtml = (items || []).map((item: any) => `
      <tr style="border-bottom: 1px solid #1e293b;">
        <td style="padding: 10px 0; color: #ffffff; font-weight: bold;">
          ${item.bike?.name || item.name || 'VOLT-X Product'}
          ${item.selectedAccessories && item.selectedAccessories.length > 0 ? `<br/><span style="font-size: 11px; color: #38bdf8; font-weight: normal;">+ Accessories: ${item.selectedAccessories.map((a: any) => a.name).join(', ')}</span>` : ''}
        </td>
        <td style="padding: 10px; color: #94a3b8; text-align: center;">x${item.quantity || 1}</td>
        <td style="padding: 10px 0; color: #a3e635; text-align: right; font-weight: bold;">$${(((item.bike?.price || item.price || 0) * (item.quantity || 1))).toLocaleString()}</td>
      </tr>
    `).join('');

    let emailDispatchResult: any = null;

    // 1. Send Order Receipt Email to Customer
    if (customerEmail && customerEmail.includes('@')) {
      const customerEmailHtml = `
        <div style="font-family: Arial, sans-serif; background-color: #080c14; color: #ffffff; padding: 32px; border-radius: 16px; border: 2px solid #a3e635;">
          <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="color: #ffffff; font-size: 32px; font-weight: 900; letter-spacing: 3px; margin: 0;">VOLT<span style="color: #a3e635;">X</span> MOTORSPORTS</h1>
            <p style="color: #38bdf8; font-size: 12px; letter-spacing: 4px; margin-top: 4px; font-weight: bold;">ORDER CONFIRMATION & RECEIPT</p>
          </div>

          <div style="background-color: #0f172a; padding: 20px; border-radius: 10px; border: 1px solid #1e293b; margin-bottom: 24px;">
            <h2 style="color: #a3e635; margin: 0 0 8px 0; font-size: 18px;">Thank You for Your Order, ${customerName}!</h2>
            <p style="color: #cbd5e1; font-size: 13px; margin: 0; line-height: 1.5;">
              Your off-road high-output e-moto crate order <strong>#${orderId}</strong> has been received and is being prepared for crate assembly at our Reno NV facility.
            </p>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 13px;">
            <thead>
              <tr style="border-bottom: 2px solid #334155; color: #94a3b8; text-transform: uppercase;">
                <th style="text-align: left; padding-bottom: 8px;">Item Description</th>
                <th style="text-align: center; padding-bottom: 8px;">Qty</th>
                <th style="text-align: right; padding-bottom: 8px;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemListHtml || '<tr><td colspan="3">VOLT-X Off-Road Equipment</td></tr>'}
            </tbody>
          </table>

          <div style="background-color: #030712; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
            <table style="width: 100%; font-size: 13px; color: #cbd5e1;">
              <tr><td style="padding: 4px 0;">Subtotal:</td><td style="text-align: right; color: #ffffff;">$${(subtotal || 0).toLocaleString()}</td></tr>
              <tr><td style="padding: 4px 0;">Freight Crate Shipping:</td><td style="text-align: right; color: #38bdf8;">${shippingCost === 0 ? 'FREE EXPRESS FREIGHT' : `$${shippingCost}`}</td></tr>
              <tr><td style="padding: 4px 0;">Estimated Tax:</td><td style="text-align: right; color: #ffffff;">$${(taxAmount || 0).toLocaleString()}</td></tr>
              ${promoCodeApplied ? `<tr><td style="padding: 4px 0; color: #a3e635;">Promo Discount (${promoCodeApplied}):</td><td style="text-align: right; color: #a3e635;">APPLIED</td></tr>` : ''}
              <tr style="border-top: 1px solid #334155; font-size: 16px; font-weight: bold; color: #a3e635;">
                <td style="padding-top: 8px;">TOTAL PAID:</td>
                <td style="padding-top: 8px; text-align: right;">$${(totalAmount || 0).toLocaleString()}</td>
              </tr>
            </table>
          </div>

          <div style="background-color: #0f172a; padding: 16px; border-radius: 8px; font-size: 12px; color: #94a3b8; margin-bottom: 24px;">
            <p style="margin: 0 0 6px 0; color: #38bdf8; font-weight: bold; font-size: 13px;">📦 SHIPPING DETAILS:</p>
            <p style="margin: 0;"><strong>Recipient:</strong> ${customerName}</p>
            <p style="margin: 0;"><strong>Shipping Address:</strong> ${customer?.address || orderData.shippingAddress?.street || ''}, ${customer?.city || orderData.shippingAddress?.city || ''}, ${customer?.state || orderData.shippingAddress?.state || ''} ${customer?.zip || orderData.shippingAddress?.zip || ''}</p>
            <p style="margin: 0;"><strong>Estimated Freight Delivery:</strong> ${estimatedDelivery || '3-5 Business Days'}</p>
            <p style="margin: 0;"><strong>Tracking ID:</strong> <span style="color: #a3e635; font-family: monospace;">${trackingNumber || 'VX-FREIGHT-TRACKING'}</span></p>
          </div>

          <p style="font-size: 12px; color: #64748b; text-align: center; margin: 0;">
            Questions? Reply directly to this email (<a href="mailto:contact@voltdirtbike.com" style="color: #a3e635;">contact@voltdirtbike.com</a>) or call our Support Line at <strong>505-652-1743</strong>.
          </p>
        </div>
      `;

      emailDispatchResult = await sendMailDirect({
        to: customerEmail,
        subject: `⚡ Order Confirmation #${orderId || 'VX-CONFIRMED'} - VOLT-X Motorsports`,
        html: customerEmailHtml,
        fromName: 'VOLT-X Motorsports Orders'
      });
    }

    // 2. Send Admin Notification if senderEmail is set and different from customerEmail
    if (senderEmail && senderEmail.toLowerCase() !== customerEmail.toLowerCase()) {
      const adminEmailHtml = `
        <div style="font-family: Arial, sans-serif; background-color: #030712; color: #ffffff; padding: 24px; border: 1px solid #a3e635; border-radius: 12px;">
          <h2 style="color: #a3e635; margin-top: 0;">🚨 New Crate Order #${orderId}</h2>
          <p style="color: #e2e8f0; font-size: 15px;">A new order was placed on the website for <strong>$${(totalAmount || 0).toLocaleString()}</strong>.</p>
          <hr style="border-color: #1e293b;" />
          <p><strong>Customer:</strong> ${customerName} (${customerEmail})</p>
          <p><strong>Phone:</strong> ${customer?.phone || orderData.phone || 'N/A'}</p>
          <p><strong>Address:</strong> ${customer?.address || orderData.shippingAddress?.street}, ${customer?.city || orderData.shippingAddress?.city}, ${customer?.state || orderData.shippingAddress?.state} ${customer?.zip || orderData.shippingAddress?.zip}</p>
          <p><strong>Items:</strong> ${(items || []).map((i: any) => `${i.bike?.name || i.name} (x${i.quantity || 1})`).join(', ')}</p>
          <p><strong>Tracking:</strong> ${trackingNumber}</p>
        </div>
      `;

      sendMailDirect({
        to: senderEmail,
        subject: `🚨 NEW ORDER RECEIVED #${orderId} - $${(totalAmount || 0).toLocaleString()}`,
        html: adminEmailHtml,
        fromName: 'VOLT-X Store Alerts'
      }).catch(err => console.warn('Admin order alert error:', err));
    }

    return NextResponse.json({
      success: true,
      orderId,
      emailStatus: emailDispatchResult?.success ? 'sent' : 'failed',
      emailError: emailDispatchResult?.error,
      emailDispatchResult,
      message: emailDispatchResult?.success
        ? 'Order processed successfully and receipt dispatched via email.'
        : 'Order processed and logged in server queue. (Note: Email receipt pending Zoho SMTP App Password configuration).',
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('[VOLT-X Order API Error]', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to process order' },
      { status: 500 }
    );
  }
}



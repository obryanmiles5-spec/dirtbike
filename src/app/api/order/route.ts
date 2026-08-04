import { NextResponse } from 'next/server';
import { sendMailDirect, saveOrderToLog, getSenderAddress } from '@/lib/zohoMail';

export async function POST(request: Request) {
  try {
    const orderData = await request.json();
    const {
      orderId,
      customerName,
      email,
      phone,
      company,
      orderNotes,
      shipToDifferentAddress,
      billingAddress,
      shippingAddress,
      customer,
      deliveryMethod,
      deliveryMethodTitle,
      paymentMethod,
      paymentMethodTitle,
      items,
      subtotal,
      shippingCost,
      taxAmount,
      discountAmount,
      totalAmount,
      promoCodeApplied,
      orderDate,
      estimatedDelivery,
      trackingNumber
    } = orderData;

    // Save full order object to server storage immediately so no data is ever lost
    saveOrderToLog(orderData);

    const senderEmail = getSenderAddress();

    // Determine normalized billing details
    const finalFirstName = billingAddress?.firstName || customer?.firstName || (customerName ? customerName.split(' ')[0] : 'Valued');
    const finalLastName = billingAddress?.lastName || customer?.lastName || (customerName ? customerName.split(' ').slice(1).join(' ') : 'Customer');
    const finalFullName = `${finalFirstName} ${finalLastName}`.trim();
    const finalEmail = (billingAddress?.email || customer?.email || email || '').trim();
    const finalPhone = billingAddress?.phone || customer?.phone || phone || 'N/A';
    const finalCompany = billingAddress?.company || company || customer?.company || '';
    
    // Billing street
    const bStreet1 = billingAddress?.street || customer?.address || shippingAddress?.street || '';
    const bStreet2 = billingAddress?.street2 || customer?.address2 || shippingAddress?.street2 || '';
    const bCity = billingAddress?.city || customer?.city || shippingAddress?.city || '';
    const bState = billingAddress?.state || customer?.state || shippingAddress?.state || '';
    const bZip = billingAddress?.zip || customer?.zip || shippingAddress?.zip || '';
    const bCountry = billingAddress?.country || customer?.country || shippingAddress?.country || 'United States';
    const formattedBillingAddress = `${bStreet1}${bStreet2 ? `, ${bStreet2}` : ''}, ${bCity}, ${bState} ${bZip}, ${bCountry}`;

    // Shipping street
    const sFirstName = shippingAddress?.firstName || finalFirstName;
    const sLastName = shippingAddress?.lastName || finalLastName;
    const sFullName = `${sFirstName} ${sLastName}`.trim();
    const sCompany = shippingAddress?.company || finalCompany;
    const sStreet1 = shippingAddress?.street || bStreet1;
    const sStreet2 = shippingAddress?.street2 || bStreet2;
    const sCity = shippingAddress?.city || bCity;
    const sState = shippingAddress?.state || bState;
    const sZip = shippingAddress?.zip || bZip;
    const sCountry = shippingAddress?.country || bCountry;
    const formattedShippingAddress = `${sStreet1}${sStreet2 ? `, ${sStreet2}` : ''}, ${sCity}, ${sState} ${sZip}, ${sCountry}`;

    const displayPaymentTitle = paymentMethodTitle || (
      paymentMethod === 'credit_card' ? 'Credit Card (Fincra Encrypted Gateway)' :
      paymentMethod === 'apple_pay' ? 'Apple Pay' :
      paymentMethod === 'bank_transfer' ? 'Direct Bank Wire / ACH Transfer' :
      paymentMethod === 'bitcoin' ? 'Bitcoin (BTC) Crypto' :
      paymentMethod === 'cashapp' ? 'Cash App ($Cashtag)' :
      paymentMethod === 'chime' ? 'Chime Pay Friends' :
      paymentMethod === 'zelle' ? 'Zelle Instant Transfer' : 'Direct Payment'
    );

    const displayDeliveryTitle = deliveryMethodTitle || (
      deliveryMethod === 'freight_crate' ? '50-State Insured Crate Freight' : 'Certified Dealer Prep (Reno, NV)'
    );

    // Format item list for email tables
    const itemListHtml = (items || []).map((item: any) => {
      const pName = item.bike?.name || item.name || 'VOLT-X Electric Moto';
      const qty = item.quantity || 1;
      const unitPrice = item.bike?.price || item.price || 0;
      const totalItemPrice = unitPrice * qty;
      const accessories = item.selectedAccessories && item.selectedAccessories.length > 0
        ? `<br/><span style="font-size: 11px; color: #38bdf8; font-weight: normal;">+ Accessories: ${item.selectedAccessories.map((a: any) => a.name).join(', ')}</span>`
        : '';
      const customColor = item.customColor ? `<br/><span style="font-size: 11px; color: #a3e635;">Color Accent: ${item.customColor}</span>` : '';

      return `
        <tr style="border-bottom: 1px solid #1e293b;">
          <td style="padding: 12px 0; color: #ffffff; font-weight: bold;">
            ${pName}
            ${accessories}
            ${customColor}
          </td>
          <td style="padding: 12px; color: #94a3b8; text-align: center; font-family: monospace;">x${qty}</td>
          <td style="padding: 12px 0; color: #a3e635; text-align: right; font-weight: bold; font-family: monospace;">$${totalItemPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
        </tr>
      `;
    }).join('');

    let emailDispatchResult: any = null;

    // 1. Send Order Receipt Email to Customer
    if (finalEmail && finalEmail.includes('@')) {
      const customerEmailHtml = `
        <div style="font-family: Arial, sans-serif; background-color: #080c14; color: #ffffff; padding: 32px; border-radius: 16px; border: 2px solid #a3e635;">
          <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="color: #ffffff; font-size: 32px; font-weight: 900; letter-spacing: 3px; margin: 0;">VOLT<span style="color: #a3e635;">X</span> MOTORSPORTS</h1>
            <p style="color: #38bdf8; font-size: 12px; letter-spacing: 4px; margin-top: 4px; font-weight: bold;">OFFICIAL WOOCOMMERCE ORDER RECEIPT</p>
          </div>

          <div style="background-color: #0f172a; padding: 20px; border-radius: 10px; border: 1px solid #1e293b; margin-bottom: 24px;">
            <h2 style="color: #a3e635; margin: 0 0 8px 0; font-size: 18px;">Thank You for Your Order, ${finalFullName}!</h2>
            <p style="color: #cbd5e1; font-size: 13px; margin: 0; line-height: 1.5;">
              Your order <strong>#${orderId}</strong> has been logged into our factory system. Your electric machine is being prepped for crate shipment at our Reno, NV facility.
            </p>
          </div>

          <!-- Order Overview Metadata Box -->
          <div style="background-color: #030712; padding: 16px; border-radius: 8px; border: 1px solid #1e293b; margin-bottom: 24px; font-size: 12px; color: #cbd5e1;">
            <table style="width: 100%;">
              <tr>
                <td><strong>Order Number:</strong> <span style="color: #a3e635; font-weight: bold; font-family: monospace;">#${orderId}</span></td>
                <td style="text-align: right;"><strong>Date:</strong> ${orderDate || new Date().toLocaleDateString('en-US')}</td>
              </tr>
              <tr>
                <td style="padding-top: 6px;"><strong>Payment Method:</strong> <span style="color: #38bdf8; font-weight: bold;">${displayPaymentTitle}</span></td>
                <td style="padding-top: 6px; text-align: right;"><strong>Shipping Method:</strong> ${displayDeliveryTitle}</td>
              </tr>
            </table>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 13px;">
            <thead>
              <tr style="border-bottom: 2px solid #334155; color: #94a3b8; text-transform: uppercase; font-size: 11px;">
                <th style="text-align: left; padding-bottom: 8px;">Product</th>
                <th style="text-align: center; padding-bottom: 8px;">Qty</th>
                <th style="text-align: right; padding-bottom: 8px;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemListHtml || '<tr><td colspan="3">VOLT-X Off-Road Equipment</td></tr>'}
            </tbody>
          </table>

          <div style="background-color: #030712; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
            <table style="width: 100%; font-size: 13px; color: #cbd5e1;">
              <tr><td style="padding: 4px 0;">Subtotal:</td><td style="text-align: right; color: #ffffff; font-family: monospace;">$${(subtotal || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td></tr>
              <tr><td style="padding: 4px 0;">Freight Crate Shipping:</td><td style="text-align: right; color: #38bdf8; font-family: monospace;">${shippingCost === 0 ? 'FREE EXPRESS FREIGHT' : `$${shippingCost.toFixed(2)}`}</td></tr>
              <tr><td style="padding: 4px 0;">Sales Tax (7%):</td><td style="text-align: right; color: #ffffff; font-family: monospace;">$${(taxAmount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td></tr>
              ${promoCodeApplied ? `<tr><td style="padding: 4px 0; color: #a3e635;">Promo Discount (${promoCodeApplied}):</td><td style="text-align: right; color: #a3e635; font-family: monospace;">-$${(discountAmount || 0).toFixed(2)}</td></tr>` : ''}
              <tr style="border-top: 1px solid #334155; font-size: 16px; font-weight: bold; color: #a3e635;">
                <td style="padding-top: 8px;">TOTAL DUE:</td>
                <td style="padding-top: 8px; text-align: right; font-family: monospace;">$${(totalAmount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
              </tr>
            </table>
          </div>

          <!-- Billing & Shipping Details Grid -->
          <div style="display: table; width: 100%; margin-bottom: 24px;">
            <div style="display: table-cell; width: 50%; padding-right: 10px; vertical-align: top;">
              <div style="background-color: #0f172a; padding: 16px; border-radius: 8px; font-size: 12px; color: #94a3b8;">
                <p style="margin: 0 0 6px 0; color: #a3e635; font-weight: bold; font-size: 13px; text-transform: uppercase;">💳 BILLING ADDRESS:</p>
                <p style="margin: 0; color: #ffffff; font-weight: bold;">${finalFullName}</p>
                ${finalCompany ? `<p style="margin: 0; color: #cbd5e1;">${finalCompany}</p>` : ''}
                <p style="margin: 0;">${formattedBillingAddress}</p>
                <p style="margin: 4px 0 0 0;"><strong>Phone:</strong> ${finalPhone}</p>
                <p style="margin: 0;"><strong>Email:</strong> ${finalEmail}</p>
              </div>
            </div>
            <div style="display: table-cell; width: 50%; padding-left: 10px; vertical-align: top;">
              <div style="background-color: #0f172a; padding: 16px; border-radius: 8px; font-size: 12px; color: #94a3b8;">
                <p style="margin: 0 0 6px 0; color: #38bdf8; font-weight: bold; font-size: 13px; text-transform: uppercase;">📦 SHIPPING ADDRESS:</p>
                <p style="margin: 0; color: #ffffff; font-weight: bold;">${sFullName}</p>
                ${sCompany ? `<p style="margin: 0; color: #cbd5e1;">${sCompany}</p>` : ''}
                <p style="margin: 0;">${formattedShippingAddress}</p>
                <p style="margin: 4px 0 0 0;"><strong>Estimated Delivery:</strong> ${estimatedDelivery || '3-5 Business Days'}</p>
                <p style="margin: 0;"><strong>Freight Tracking ID:</strong> <span style="color: #a3e635; font-family: monospace;">${trackingNumber || 'VX-FREIGHT-PENDING'}</span></p>
              </div>
            </div>
          </div>

          ${orderNotes ? `
            <div style="background-color: #0f172a; padding: 16px; border-radius: 8px; font-size: 12px; color: #cbd5e1; margin-bottom: 24px; border-left: 4px solid #a3e635;">
              <p style="margin: 0 0 4px 0; color: #a3e635; font-weight: bold; font-size: 13px;">📝 ORDER NOTES / SPECIAL INSTRUCTIONS:</p>
              <p style="margin: 0; italic; font-size: 12px;">"${orderNotes}"</p>
            </div>
          ` : ''}

          <p style="font-size: 12px; color: #64748b; text-align: center; margin: 0;">
            Questions? Reply directly to this email (<a href="mailto:contact@voltdirtbike.com" style="color: #a3e635;">contact@voltdirtbike.com</a>) or call our Support Line at <strong>505-652-1743</strong>.
          </p>
        </div>
      `;

      emailDispatchResult = await sendMailDirect({
        to: finalEmail,
        subject: `⚡ Order Confirmation #${orderId || 'VX-CONFIRMED'} - VOLT-X Motorsports`,
        html: customerEmailHtml,
        fromName: 'VOLT-X Motorsports Orders'
      });
    }

    // 2. Send Admin Notification Email
    if (senderEmail) {
      const adminEmailHtml = `
        <div style="font-family: Arial, sans-serif; background-color: #030712; color: #ffffff; padding: 24px; border: 2px solid #a3e635; border-radius: 12px;">
          <h2 style="color: #a3e635; margin-top: 0; text-transform: uppercase;">🚨 NEW WOOCOMMERCE ORDER RECEIVED #${orderId}</h2>
          <p style="color: #e2e8f0; font-size: 16px;">
            A new complete order was placed on VOLT-X for <strong style="color: #a3e635;">$${(totalAmount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong>.
          </p>

          <table style="width: 100%; border-collapse: collapse; background-color: #0f172a; border-radius: 8px; font-size: 13px; color: #cbd5e1; margin-bottom: 16px;">
            <tr style="border-bottom: 1px solid #1e293b;">
              <td style="padding: 10px; font-weight: bold; color: #a3e635; width: 35%;">Order ID:</td>
              <td style="padding: 10px; font-family: monospace; font-weight: bold; color: #ffffff;">#${orderId}</td>
            </tr>
            <tr style="border-bottom: 1px solid #1e293b;">
              <td style="padding: 10px; font-weight: bold; color: #a3e635;">Payment Method Chosen:</td>
              <td style="padding: 10px; color: #38bdf8; font-weight: bold;">${displayPaymentTitle} (${paymentMethod})</td>
            </tr>
            <tr style="border-bottom: 1px solid #1e293b;">
              <td style="padding: 10px; font-weight: bold; color: #a3e635;">Delivery Method:</td>
              <td style="padding: 10px; color: #ffffff;">${displayDeliveryTitle}</td>
            </tr>
            <tr style="border-bottom: 1px solid #1e293b;">
              <td style="padding: 10px; font-weight: bold; color: #a3e635;">Customer Name:</td>
              <td style="padding: 10px; color: #ffffff; font-weight: bold;">${finalFullName} ${finalCompany ? `(${finalCompany})` : ''}</td>
            </tr>
            <tr style="border-bottom: 1px solid #1e293b;">
              <td style="padding: 10px; font-weight: bold; color: #a3e635;">Email & Phone:</td>
              <td style="padding: 10px; color: #ffffff;"><a href="mailto:${finalEmail}" style="color: #a3e635;">${finalEmail}</a> | <a href="tel:${finalPhone}" style="color: #38bdf8;">${finalPhone}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #1e293b;">
              <td style="padding: 10px; font-weight: bold; color: #a3e635;">Billing Address:</td>
              <td style="padding: 10px; color: #ffffff;">${formattedBillingAddress}</td>
            </tr>
            <tr style="border-bottom: 1px solid #1e293b;">
              <td style="padding: 10px; font-weight: bold; color: #a3e635;">Shipping Address:</td>
              <td style="padding: 10px; color: #ffffff;">${formattedShippingAddress}</td>
            </tr>
            ${orderNotes ? `
              <tr style="border-bottom: 1px solid #1e293b;">
                <td style="padding: 10px; font-weight: bold; color: #a3e635;">Order Notes:</td>
                <td style="padding: 10px; color: #facc15; font-style: italic;">"${orderNotes}"</td>
              </tr>
            ` : ''}
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #a3e635;">Tracking Number:</td>
              <td style="padding: 10px; font-family: monospace; color: #a3e635;">${trackingNumber}</td>
            </tr>
          </table>

          <h3 style="color: #ffffff; font-size: 14px; margin-bottom: 8px;">ORDER ITEMS SUMMARY:</h3>
          <ul style="color: #cbd5e1; font-size: 13px; line-height: 1.6; padding-left: 20px;">
            ${(items || []).map((i: any) => `
              <li>
                <strong style="color: #ffffff;">${i.bike?.name || i.name}</strong> (Qty: ${i.quantity || 1}) - $${(((i.bike?.price || i.price || 0) * (i.quantity || 1))).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                ${i.selectedAccessories && i.selectedAccessories.length > 0 ? `<br/><span style="font-size: 11px; color: #38bdf8;">+ Accessories: ${i.selectedAccessories.map((a: any) => a.name).join(', ')}</span>` : ''}
              </li>
            `).join('')}
          </ul>
        </div>
      `;

      try {
        await sendMailDirect({
          to: senderEmail,
          subject: `🚨 NEW ORDER RECEIVED #${orderId} - $${(totalAmount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })} (${paymentMethod.toUpperCase()})`,
          html: adminEmailHtml,
          fromName: 'VOLT-X Store Alerts'
        });
      } catch (err) {
        console.warn('Admin order alert error:', err);
      }
    }

    return NextResponse.json({
      success: true,
      orderId,
      emailStatus: emailDispatchResult?.success ? 'sent' : 'failed',
      emailError: emailDispatchResult?.error,
      emailDispatchResult,
      message: emailDispatchResult?.success
        ? 'Order processed successfully and receipt dispatched via email.'
        : 'Order processed and logged in server queue. (Note: Email receipt pending Zoho SMTP configuration).',
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




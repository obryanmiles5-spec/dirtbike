import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

export function getSenderAddress(): string {
  let user = process.env.ZOHO_MAIL_USER || 'contact@voltdirtbike.com';
  user = user.trim().replace(/^["']|["']$/g, '').replace('@www.', '@');
  return user;
}

export function getZohoTransporter() {
  const rawHost = process.env.ZOHO_MAIL_HOST || 'smtp.zoho.com';
  const host = rawHost.trim().replace(/^["']|["']$/g, '');
  
  const rawPort = process.env.ZOHO_MAIL_PORT || '465';
  const port = Number(rawPort.toString().trim().replace(/^["']|["']$/g, '')) || 465;

  const user = getSenderAddress();
  
  const rawPass = process.env.ZOHO_MAIL_PASSWORD || 'IvyIris@love';
  const pass = rawPass.trim().replace(/^["']|["']$/g, '');

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 8000,
    tls: {
      rejectUnauthorized: false
    }
  });
}

const LOG_DIR = '/tmp';

export function saveOrderToLog(orderData: any) {
  try {
    const filePath = path.join(LOG_DIR, 'volt_orders_log.json');
    let existing: any[] = [];
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      existing = JSON.parse(content || '[]');
    }
    existing.unshift({
      ...orderData,
      loggedAt: new Date().toISOString()
    });
    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), 'utf-8');
  } catch (err) {
    console.warn('[VOLT-X Order Logger Warning]', err);
  }
}

export function saveContactToLog(contactData: any) {
  try {
    const filePath = path.join(LOG_DIR, 'volt_contacts_log.json');
    let existing: any[] = [];
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      existing = JSON.parse(content || '[]');
    }
    existing.unshift({
      ...contactData,
      loggedAt: new Date().toISOString()
    });
    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), 'utf-8');
  } catch (err) {
    console.warn('[VOLT-X Contact Logger Warning]', err);
  }
}

export async function sendMailDirect(options: {
  to: string;
  subject: string;
  html: string;
  fromName?: string;
  replyTo?: string;
}) {
  const senderEmail = getSenderAddress();
  const fromName = options.fromName || 'VOLT-X Motorsports';
  const fullFrom = `"${fromName}" <${senderEmail}>`;

  const pass = process.env.ZOHO_MAIL_PASSWORD;
  if (!pass) {
    console.warn('[VOLT-X Zoho SMTP Notice] ZOHO_MAIL_PASSWORD environment variable is not configured.');
  }

  try {
    const transporter = getZohoTransporter();
    const info = await transporter.sendMail({
      from: fullFrom,
      to: options.to,
      replyTo: options.replyTo,
      subject: options.subject,
      html: options.html
    });
    console.log('[VOLT-X Email Dispatched via Zoho SMTP]', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    const errMsg = error?.message || 'SMTP dispatch failed';
    const isAuthError = errMsg.includes('535') || errMsg.includes('Authentication Failed') || error?.responseCode === 535;

    console.error('[VOLT-X Zoho SMTP Dispatch Failure]', {
      recipient: options.to,
      subject: options.subject,
      error: errMsg,
      isAuthError,
      hint: isAuthError
        ? 'Zoho Mail returned 535 Authentication Failed. To resolve: 1) Verify ZOHO_MAIL_USER in Vercel/env settings. 2) If 2FA is enabled on Zoho Mail, generate an Application-Specific Password under Zoho Account Security and set ZOHO_MAIL_PASSWORD.'
        : 'Verify network connectivity to smtp.zoho.com:465.'
    });

    return {
      success: false,
      error: isAuthError
        ? 'Zoho Mail SMTP Authentication Failed (535). Please verify ZOHO_MAIL_USER and ZOHO_MAIL_PASSWORD (or Zoho App Password).'
        : errMsg,
      isAuthError
    };
  }
}

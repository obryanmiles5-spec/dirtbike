import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

export function getSenderAddress(): string {
  let user = process.env.ZOHO_MAIL_USER || 'contact@voltdirtbike.com';
  user = user.replace('@www.', '@');
  return user;
}

export function getZohoTransporter() {
  const host = process.env.ZOHO_MAIL_HOST || 'smtp.zoho.com';
  const port = Number(process.env.ZOHO_MAIL_PORT) || 465;
  const user = getSenderAddress();
  const pass = process.env.ZOHO_MAIL_PASSWORD || 'IvyIris@love';

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
}

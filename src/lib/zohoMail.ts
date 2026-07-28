import nodemailer from 'nodemailer';

export function getZohoTransporter() {
  const host = process.env.ZOHO_MAIL_HOST || 'smtp.zoho.com';
  const port = Number(process.env.ZOHO_MAIL_PORT) || 465;
  const user = process.env.ZOHO_MAIL_USER || 'contact@voltdirtbike.com';
  const pass = process.env.ZOHO_MAIL_PASSWORD || 'IvyIris@love';

  if (!user || !pass) {
    throw new Error('Zoho Mail credentials (ZOHO_MAIL_USER, ZOHO_MAIL_PASSWORD) are not configured.');
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for port 465
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: false
    }
  });
}

export function getSenderAddress() {
  return process.env.ZOHO_MAIL_USER || 'contact@voltdirtbike.com';
}

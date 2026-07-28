import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const ordersPath = path.join('/tmp', 'volt_orders_log.json');
    const contactsPath = path.join('/tmp', 'volt_contacts_log.json');

    let orders = [];
    let contacts = [];

    if (fs.existsSync(ordersPath)) {
      orders = JSON.parse(fs.readFileSync(ordersPath, 'utf-8') || '[]');
    }

    if (fs.existsSync(contactsPath)) {
      contacts = JSON.parse(fs.readFileSync(contactsPath, 'utf-8') || '[]');
    }

    return NextResponse.json({
      success: true,
      orderCount: orders.length,
      contactCount: contacts.length,
      orders,
      contacts,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error?.message || 'Failed to read logs'
    }, { status: 500 });
  }
}

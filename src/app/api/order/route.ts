import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  console.log('API: Yangi buyurtma keldi...');
  try {
    const body = await req.json();
    console.log('API body:', body);

    const { customer_name, customer_phone, customer_address, items, total_amount, message } = body;

    // 1. Save to Supabase
    const { data: order, error: dbError } = await supabase
      .from('orders')
      .insert([{
        customer_name,
        customer_phone,
        customer_address,
        items,
        total_amount,
        status: 'pending'
      }])
      .select()
      .single();

    if (dbError) {
      console.error('DATABASE ERROR:', dbError);
      return NextResponse.json({ success: false, error: 'Bazada xato: ' + dbError.message }, { status: 500 });
    }

    console.log('Order saved to DB ✅:', order.id);

    // 2. Send to Telegram
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.warn('Telegram token yoki chat id topilmadi ⚠️');
    } else {
      const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
      const response = await fetch(telegramUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown',
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error('TELEGRAM API ERROR:', text);
      } else {
        console.log('Message sent to Telegram ✅');
      }
    }

    return NextResponse.json({ success: true, orderId: order.id });
  } catch (error: any) {
    console.error('SERVER FATAL ERROR:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error: ' + error.message }, { status: 500 });
  }
}

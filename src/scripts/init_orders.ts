import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createOrdersTable() {
  console.log('Creating "orders" table...');

  const { error } = await supabase.rpc('create_orders_table_if_not_exists', {
    sql: `
      CREATE TABLE IF NOT EXISTS orders (
        id BIGSERIAL PRIMARY KEY,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        customer_name TEXT NOT NULL,
        customer_phone TEXT NOT NULL,
        customer_address TEXT NOT NULL,
        items JSONB NOT NULL,
        total_amount NUMERIC NOT NULL,
        status TEXT DEFAULT 'pending'
      );
    `
  });

  // Agar RPC ishlamasa (bu xavfsizlik uchun yopiq bo'lishi mumkin), to'g'ridan-to'g'ri so'rov yuboramiz
  // Aslida RPC ni oldindan yaratish kerak, shuning uchun biz shunchaki jadvalni kiritamiz
  const { error: error2 } = await supabase.from('orders').select('id').limit(1);
  
  if (error2 && error2.code === 'PGRST116' || error2?.message?.includes('relation "orders" does not exist')) {
     console.log('Jadval mavjud emas. Uni Supabase SQL Editor orqali yarating:\n\n' + 
     'CREATE TABLE orders (\n' +
     '  id BIGSERIAL PRIMARY KEY,\n' +
     '  created_at TIMESTAMPTZ DEFAULT NOW(),\n' +
     '  customer_name TEXT NOT NULL,\n' +
     '  customer_phone TEXT NOT NULL,\n' +
     '  customer_address TEXT NOT NULL,\n' +
     '  items JSONB NOT NULL,\n' +
     '  total_amount NUMERIC NOT NULL,\n' +
     '  status TEXT DEFAULT \'pending\'\n' +
     ');');
  } else {
     console.log('Orders jadvali tayyor! ✅');
  }
}

createOrdersTable();

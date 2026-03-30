const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

// Env yuklash
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkOrders() {
  console.log('--- SUPABASE BUYURTMA TEKSHIRUVI ---');
  
  // 1. Jami buyurtmalarni o'qiymiz
  const { data: orders, count, error } = await supabase
    .from('orders')
    .select('id, customer_name, created_at', { count: 'exact' });

  if (error) {
    console.error('XATOLIK:', error.message);
    return;
  }

  console.log(`Bazada jami buyurtmalar soni: ${count}`);
  
  if (orders && orders.length > 0) {
    console.log('So\'nggi 3 ta buyurtma:');
    orders.slice(-3).forEach((o, i) => {
      console.log(`${i+1}. Ism: ${o.customer_name} | Vaqt: ${o.created_at}`);
    });
  } else {
    console.log('Bazada hozircha buyurtmalar TOPILMADI! ⚠️');
    console.log('Ehtimol, saqlash (insert) qismida xato bormi?');
  }

  // 2. RLS ni tekshiramiz
  console.log('\n--- RLS POLICIES TEKSHIRUVI ---');
  console.log('Iltimos, Supabase panelda SQL Editor\'ga ushbu buyruqni bering, agar grafik hamon bo\'sh bo\'lsa:');
  console.log('ALTER TABLE orders ENABLE ROW LEVEL SECURITY;');
  console.log('CREATE POLICY "Allow all" ON orders FOR ALL USING (true);');
}

checkOrders();

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const [
      { count: prodCount },
      { count: catCount },
      { count: testCount },
      { count: faqCount },
      { data: orders, count: orderCount }
    ] = await Promise.all([
      supabase.from('products').select('*', { count: 'exact', head: true }),
      supabase.from('categories').select('*', { count: 'exact', head: true }),
      supabase.from('testimonials').select('*', { count: 'exact', head: true }),
      supabase.from('faq').select('*', { count: 'exact', head: true }),
      supabase.from('orders').select('created_at', { count: 'exact' }).order('created_at', { ascending: false }),
    ]);

    // Calculate activity
    const days = ['Yak', 'Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sha'];
    const last7Days = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dayLabel = days[d.getDay()];
      
      const count = orders?.filter(o => {
        const d1 = new Date(o.created_at).toLocaleDateString('en-CA'); // YYYY-MM-DD
        const d2 = d.toLocaleDateString('en-CA'); // YYYY-MM-DD
        return d1 === d2;
      }).length || 0;
      
      return { label: dayLabel, count };
    }).reverse();

    return NextResponse.json({
      success: true,
      stats: {
        products: prodCount || 0,
        categories: catCount || 0,
        testimonials: testCount || 0,
        faq: faqCount || 0,
        orders: orderCount || 0
      },
      activityData: last7Days
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

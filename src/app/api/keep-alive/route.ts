import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    // 1. Bazaga kichik so'rov yuboramiz (faqat bitta qatorni o'qish)
    const { data, error } = await supabase
      .from('site_content')
      .select('key')
      .limit(1);

    if (error) {
       console.error("Supabase Keep-Alive Error:", error);
       return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Supabase successfully pinged! No hibernation.", 
      timestamp: new Date().toISOString() 
    });
    
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

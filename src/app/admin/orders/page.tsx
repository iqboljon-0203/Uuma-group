"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  ShoppingCart, 
  User, 
  Phone, 
  MapPin, 
  Calendar, 
  Package, 
  CheckCircle,
  Clock,
  ExternalLink,
  ChevronRight,
  Search
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatPrice } from "@/data/products";

interface Order {
  id: number;
  created_at: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  items: any[];
  total_amount: number;
  status: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setOrders(data || []);
    setLoading(false);
  };

  const updateStatus = async (id: number, status: string) => {
    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", id);
    
    if (!error) {
       setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
       if (selectedOrder?.id === id) setSelectedOrder({ ...selectedOrder, status });
    }
  };

  const filteredOrders = orders.filter(o => 
    o.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.customer_phone.includes(searchTerm)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'cancelled': return 'bg-rose-50 text-rose-600 border-rose-100';
      default: return 'bg-amber-50 text-amber-600 border-amber-100';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight italic">
            BUYURTMALAR
          </h1>
          <p className="text-gray-500 font-medium">Sotuvlar va mijozlar buyurtmalarini boshqarish</p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Mijoz ismi yoki telefoni..." 
            className="pl-12 pr-6 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm focus:border-burgundy outline-none transition-all w-full md:w-80 font-medium text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Orders Table */}
        <div className="xl:col-span-2 space-y-4">
          {loading ? (
             <div className="h-64 bg-white rounded-[32px] border border-gray-100 animate-pulse flex items-center justify-center text-gray-400 font-bold italic">
               Yuklanmoqda...
             </div>
          ) : filteredOrders.length === 0 ? (
             <div className="h-64 bg-white rounded-[32px] border border-gray-100 flex flex-col items-center justify-center text-gray-400 gap-4">
               <ShoppingCart size={48} strokeWidth={1} />
               <p className="font-bold italic">Hozircha buyurtmalar yo'q</p>
             </div>
          ) : (
             <div className="space-y-4">
               {filteredOrders.map((order) => (
                 <motion.div
                   key={order.id}
                   layout
                   onClick={() => setSelectedOrder(order)}
                   className={`bg-white p-6 rounded-[32px] border transition-all cursor-pointer group shadow-sm hover:shadow-xl hover:shadow-gray-200/50 ${
                     selectedOrder?.id === order.id ? 'border-burgundy' : 'border-gray-100'
                   }`}
                 >
                   <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-burgundy/5 group-hover:text-burgundy transition-colors">
                          <User size={20} />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 tracking-tight">{order.customer_name}</h3>
                          <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                            <Clock size={12} />
                            {new Date(order.created_at).toLocaleString('uz-UZ')}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(order.status)}`}>
                          {order.status === 'pending' ? 'Kutilmoqda' : order.status === 'completed' ? 'Yetkazildi' : 'Bekor qilindi'}
                        </div>
                        <div className="text-lg font-black text-gray-900 italic">
                          {formatPrice(order.total_amount, 'so\'m')}
                        </div>
                        <ChevronRight className={`text-gray-300 transition-transform ${selectedOrder?.id === order.id ? 'rotate-90 text-burgundy' : ''}`} size={20} />
                      </div>
                   </div>
                 </motion.div>
               ))}
             </div>
          )}
        </div>

        {/* Order Details Sidebar */}
        <div className="xl:col-span-1">
          <AnimatePresence mode="wait">
            {selectedOrder ? (
              <motion.div
                key={selectedOrder.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-[40px] border border-gray-100 p-8 shadow-2xl shadow-gray-200/50 sticky top-24"
              >
                <div className="flex items-center justify-between mb-8">
                   <h2 className="text-xl font-black text-gray-900 tracking-tight italic">Tafsilotlar</h2>
                   <div className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(selectedOrder.status)}`}>
                      #{selectedOrder.id}
                   </div>
                </div>

                <div className="space-y-6 mb-8">
                   <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl">
                     <Phone className="text-burgundy mt-1" size={18} />
                     <div>
                       <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Telefon</span>
                       <a href={`tel:${selectedOrder.customer_phone}`} className="font-bold text-gray-900 hover:text-burgundy transition-colors">
                         {selectedOrder.customer_phone}
                       </a>
                     </div>
                   </div>

                   <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl">
                     <MapPin className="text-burgundy mt-1" size={18} />
                     <div>
                       <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Manzil</span>
                       <p className="font-bold text-gray-900 leading-snug">{selectedOrder.customer_address}</p>
                     </div>
                   </div>
                </div>

                {/* Items */}
                <div className="mb-8">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-4">Mahsulotlar</span>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between gap-4 p-3 border border-gray-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-burgundy/5 text-burgundy rounded-lg flex items-center justify-center font-black text-xs">
                            {item.qty}
                          </div>
                          <span className="text-sm font-bold text-gray-800">{item.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-8 p-4 bg-burgundy text-white rounded-2xl shadow-lg shadow-burgundy/20 italic">
                   <span className="font-bold uppercase tracking-widest text-[10px]">Jami:</span>
                   <span className="text-2xl font-black">{formatPrice(selectedOrder.total_amount, 'so\'m')}</span>
                </div>

                {/* Status Actions */}
                <div className="grid grid-cols-2 gap-3">
                   <button 
                     onClick={() => updateStatus(selectedOrder.id, 'completed')}
                     disabled={selectedOrder.status === 'completed'}
                     className="flex items-center justify-center gap-2 py-4 rounded-xl bg-emerald-500 text-white font-bold text-xs hover:bg-emerald-600 transition-all disabled:opacity-30"
                   >
                     <CheckCircle size={16} />
                     YAKUNLASH
                   </button>
                   <button 
                     onClick={() => updateStatus(selectedOrder.id, 'cancelled')}
                     disabled={selectedOrder.status === 'cancelled'}
                     className="flex items-center justify-center gap-2 py-4 rounded-xl bg-gray-100 text-gray-500 font-bold text-xs hover:bg-rose-50 hover:text-rose-500 transition-all disabled:opacity-30"
                   >
                     <LogOut className="rotate-180" size={16} />
                     BEKOR QILISH
                   </button>
                </div>
              </motion.div>
            ) : (
              <div className="h-full border-2 border-dashed border-gray-100 rounded-[40px] flex flex-col items-center justify-center p-12 text-center text-gray-300">
                <ExternalLink size={48} strokeWidth={1} className="mb-4" />
                <p className="font-bold italic">Tafsilotlarni ko'rish uchun buyurtmani tanlang</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

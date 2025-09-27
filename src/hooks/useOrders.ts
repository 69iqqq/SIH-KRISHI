import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

export type Order = Tables<'marketplace_orders'>;
export type OrderItem = Tables<'marketplace_order_items'>;

export async function purchaseCart(items: { listing_id: string; quantity: number }[], currency = 'INR') {
  // Calls secure function to create an order, add items, and update stock.
  const { data, error } = await supabase.rpc('purchase_listings', { p_items: items, p_currency: currency });
  if (error) throw error;
  return data as string; // returns order id
}

export async function getMyOrders() {
  const { data, error } = await supabase.from('marketplace_orders').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data as Order[];
}

export async function getOrderItems(orderId: string) {
  const { data, error } = await supabase.from('marketplace_order_items').select('*').eq('order_id', orderId);
  if (error) throw error;
  return data as OrderItem[];
}

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

type ProductReview = Tables<'product_reviews'>;
type ListingReview = Tables<'marketplace_reviews'>;

export type RatingSummary = { avg: number; count: number };

export function useProductRatings(productIds: number[]) {
  const [map, setMap] = useState<Record<number, RatingSummary>>({});
  const ids = useMemo(() => Array.from(new Set(productIds)).filter((x) => Number.isFinite(x)), [productIds]);

  useEffect(() => {
    if (!ids.length) return;
    let cancelled = false;
    const load = async () => {
      const { data, error } = await supabase
        .from('product_reviews')
        .select('product_id, rating')
        .in('product_id', ids as number[]);
      if (error) return; // silently ignore for UI
      const groups = new Map<number, { sum: number; count: number }>();
      (data as Pick<ProductReview, 'product_id' | 'rating'>[]).forEach((r) => {
        const g = groups.get(r.product_id) || { sum: 0, count: 0 };
        g.sum += r.rating || 0; g.count += 1; groups.set(r.product_id, g);
      });
      const m: Record<number, RatingSummary> = {};
      groups.forEach((g, pid) => { m[pid] = { avg: g.sum / g.count, count: g.count }; });
      if (!cancelled) setMap(m);
    };
    load();
    const ch = supabase
      .channel('product_reviews_aggregate')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'product_reviews' }, load)
      .subscribe();
    return () => { cancelled = true; supabase.removeChannel(ch); };
  }, [ids.join('|')]);

  return { ratings: map };
}

export function useListingRatings(listingIds: string[]) {
  const [map, setMap] = useState<Record<string, RatingSummary>>({});
  const ids = useMemo(() => Array.from(new Set(listingIds)).filter(Boolean), [listingIds]);

  useEffect(() => {
    if (!ids.length) return;
    let cancelled = false;
    const load = async () => {
      const { data, error } = await supabase
        .from('marketplace_reviews')
        .select('listing_id, rating')
        .in('listing_id', ids as string[]);
      if (error) return;
      const groups = new Map<string, { sum: number; count: number }>();
      (data as Pick<ListingReview, 'listing_id' | 'rating'>[]).forEach((r) => {
        const g = groups.get(r.listing_id) || { sum: 0, count: 0 };
        g.sum += r.rating || 0; g.count += 1; groups.set(r.listing_id, g);
      });
      const m: Record<string, RatingSummary> = {};
      groups.forEach((g, lid) => { m[lid] = { avg: g.sum / g.count, count: g.count }; });
      if (!cancelled) setMap(m);
    };
    load();
    const ch = supabase
      .channel('marketplace_reviews_aggregate')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'marketplace_reviews' }, load)
      .subscribe();
    return () => { cancelled = true; supabase.removeChannel(ch); };
  }, [ids.join('|')]);

  return { ratings: map };
}

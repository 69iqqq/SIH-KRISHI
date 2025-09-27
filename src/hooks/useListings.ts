import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

export type Listing = Tables<'marketplace_listings'>;
export type ListingInsert = TablesInsert<'marketplace_listings'>;
export type ListingUpdate = TablesUpdate<'marketplace_listings'>;
export type Review = Tables<'marketplace_reviews'>;
export type ReviewInsert = TablesInsert<'marketplace_reviews'>;

export function useListings() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const { data, error } = await supabase
        .from('marketplace_listings')
        .select('*')
        .order('created_at', { ascending: false });
      if (!cancelled) {
        if (error) setError(error.message);
        else setListings(data ?? []);
        setLoading(false);
      }
    }
    load();
    const channel = supabase.channel('marketplace_listings_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'marketplace_listings' }, () => {
        load();
      })
      .subscribe();
    return () => { cancelled = true; supabase.removeChannel(channel); };
  }, []);

  async function addListing(payload: ListingInsert) {
    const { data, error } = await supabase.from('marketplace_listings').insert(payload).select('*').single();
    if (error) throw error; return data;
  }
  async function updateListing(id: string, patch: ListingUpdate) {
    const { data, error } = await supabase.from('marketplace_listings').update(patch).eq('id', id).select('*').single();
    if (error) throw error; return data;
  }
  async function deleteListing(id: string) {
    const { error } = await supabase.from('marketplace_listings').delete().eq('id', id);
    if (error) throw error;
  }

  return { listings, loading, error, addListing, updateListing, deleteListing };
}

export function useReviews(listingId: string | null) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!listingId) return;
    let cancelled = false;
    async function load() {
      setLoading(true);
      const { data } = await supabase
        .from('marketplace_reviews')
        .select('*')
        .eq('listing_id', listingId)
        .order('created_at', { ascending: false });
      if (!cancelled) { setReviews(data ?? []); setLoading(false); }
    }
    load();
    const channel = supabase.channel(`marketplace_reviews_${listingId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'marketplace_reviews', filter: `listing_id=eq.${listingId}` }, () => load())
      .subscribe();
    return () => { cancelled = true; supabase.removeChannel(channel); };
  }, [listingId]);

  async function addReview(payload: ReviewInsert) {
    const { error } = await supabase.from('marketplace_reviews').insert(payload);
    if (error) throw error;
  }

  return { reviews, loading, addReview };
}

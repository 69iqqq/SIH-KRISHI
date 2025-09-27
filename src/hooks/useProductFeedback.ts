import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables, TablesInsert } from '@/integrations/supabase/types';

export type ProductReview = Tables<'product_reviews'>;
export type ProductReviewInsert = TablesInsert<'product_reviews'>;
export type ProductComment = Tables<'product_comments'>;
export type ProductCommentInsert = TablesInsert<'product_comments'>;

export function useProductReviews(productId: number | null) {
  type UIReview = ProductReview & { display_name?: string | null };
  const [reviews, setReviews] = useState<UIReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('product_reviews')
        .select('*')
        .eq('product_id', productId)
        .order('created_at', { ascending: false });
      let items: UIReview[] = (data ?? []) as UIReview[];
      if (items.length) {
        const userIds = Array.from(new Set(items.map((r) => r.reviewer_user_id)));
        const { data: profiles } = await supabase
          .from('profiles')
          .select('user_id, display_name')
          .in('user_id', userIds);
        const nameMap = new Map<string, string | null>();
        (profiles ?? []).forEach((p: any) => nameMap.set(p.user_id, p.display_name ?? null));
        items = items.map((r) => ({ ...r, display_name: nameMap.get(r.reviewer_user_id) }));
      }
      if (!cancelled) { setReviews(items); setLoading(false); }
    };
    load();
    const ch = supabase.channel(`product_reviews_${productId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'product_reviews', filter: `product_id=eq.${productId}` }, load)
      .subscribe();
    return () => { cancelled = true; supabase.removeChannel(ch); };
  }, [productId]);

  async function addReview(payload: ProductReviewInsert) {
    // Insert and optimistically update the local list so the user sees it immediately
    const { data, error } = await supabase
      .from('product_reviews')
      .insert(payload)
      .select()
      .single();
    if (error) throw error;
    if (data) {
      // try to fetch display name for the reviewer
      let displayName: string | null | undefined = undefined;
      const { data: profile } = await supabase
        .from('profiles')
        .select('display_name, user_id')
        .eq('user_id', data.reviewer_user_id)
        .maybeSingle();
      displayName = profile?.display_name ?? undefined;
      setReviews((prev) => [{ ...(data as ProductReview), display_name: displayName }, ...prev]);
    }
  }

  return { reviews, loading, addReview };
}

export function useProductComments(productId: number | null) {
  const [comments, setComments] = useState<ProductComment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      const { data } = await supabase.from('product_comments').select('*').eq('product_id', productId).order('created_at', { ascending: false });
      if (!cancelled) { setComments(data ?? []); setLoading(false); }
    };
    load();
    const ch = supabase.channel(`product_comments_${productId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'product_comments', filter: `product_id=eq.${productId}` }, load)
      .subscribe();
    return () => { cancelled = true; supabase.removeChannel(ch); };
  }, [productId]);

  async function addComment(payload: ProductCommentInsert) {
    const { error } = await supabase.from('product_comments').insert(payload);
    if (error) throw error;
  }

  return { comments, loading, addComment };
}

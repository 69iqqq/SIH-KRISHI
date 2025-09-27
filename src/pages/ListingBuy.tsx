import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, ShoppingCart, Phone, ArrowLeft, CreditCard } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { useReviews } from '@/hooks/useListings';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';

export default function ListingBuy() {
  const params = useParams();
  const id = String(params.id);
  const { language } = useLanguage();
  const { addItem } = useCart();
  const { user } = useAuth();
  const nav = useNavigate();
  const t = (en: string, ml: string) => (language === 'en' ? en : ml);

  const [listing, setListing] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const { reviews, addReview } = useReviews(id);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [myRating, setMyRating] = useState(5);
  const [myComment, setMyComment] = useState('');

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const { data } = await supabase.from('marketplace_listings').select('*').eq('id', id).single();
      if (!cancelled) { setListing(data); setLoading(false); }
    }
    load();
    // Load comments
    const loadComments = async () => {
      const { data } = await supabase.from('marketplace_comments').select('*').eq('listing_id', id).order('created_at', { ascending: false });
      setComments(data ?? []);
    };
    loadComments();
    const ch = supabase.channel(`marketplace_comments_${id}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'marketplace_comments', filter: `listing_id=eq.${id}` }, loadComments)
      .subscribe();
    return () => { cancelled = true; };
  }, [id]);

  if (loading) return <div className="container mx-auto px-4 py-16 text-center">{t('Loading...', 'ലോഡിംഗ്...')}</div>;
  if (!listing) return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold mb-2">{t('Listing not found', 'ലിസ്റ്റിംഗ് കണ്ടെത്തിയില്ല')}</h1>
      <Button asChild variant="outline">
        <Link to="/marketplace">{t('Back to Marketplace', 'മാർക്കറ്റിലേക്ക് തിരികെ')}</Link>
      </Button>
    </div>
  );

  const buyNow = () => {
    addItem({ id: listing.id, name: listing.title, price: Number(listing.price), unit: listing.unit || undefined }, 1);
    nav('/cart');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-4 flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link to="/marketplace"><ArrowLeft className="h-4 w-4 mr-1" />{t('Back', 'തിരികെ')}</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2">
            <div className="aspect-video bg-muted rounded-xl flex items-center justify-center">
              <ShoppingCart className="h-16 w-16 text-muted-foreground" />
            </div>
            <div className="mt-3">
              <Badge className={'bg-green-600'}>
                {listing.category}
              </Badge>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <div>
              <h1 className="text-3xl font-bold">{listing.title}</h1>
              <div className="flex items-center gap-3 text-muted-foreground mt-1">
                <div className="flex items-center gap-1"><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />{reviews.length > 0 ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : '5.0'}</div>
                <div className="text-xs">{t('In stock', 'സ്റ്റോക്കിൽ')}</div>
              </div>
            </div>

            <div>
              <div className="text-3xl font-bold text-primary">₹{Number(listing.price).toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">{t(`per ${listing.unit || 'piece'}`, `${listing.unit || 'യൂണിറ്റ്'} ന്`)}</div>
            </div>

            <div className="text-sm text-muted-foreground">
              <div>{t('Seller', 'വിൽപ്പനക്കാരൻ')}: {t('Community Seller', 'കമ്മ്യൂണിറ്റി സെല്ലർ')}</div>
              <div className="flex items-center gap-1"><MapPin className="h-4 w-4" />{t('Kerala', 'കേരളം')}</div>
              <div>{t('Available', 'ലഭ്യം')}: {listing.quantity ?? 1}</div>
            </div>

            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>{t('Description', 'വിവരണം')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{listing.description || t('No description provided.', 'വിവരണം നൽകിയിട്ടില്ല.')}</p>
              </CardContent>
            </Card>

            <div className="flex gap-2">
              <Button onClick={() => addItem({ id: listing.id, name: listing.title, price: Number(listing.price), unit: listing.unit || undefined }, 1)}>
                <ShoppingCart className="h-4 w-4 mr-2" />
                {t('Add to Cart', 'കാർട്ടിലേക്ക് ചേർക്കുക')}
              </Button>
              <Button variant="outline" onClick={buyNow}>
                <CreditCard className="h-4 w-4 mr-2" />
                {t('Buy Now', 'ഇപ്പോൾ വാങ്ങുക')}
              </Button>
              <Button variant="outline">
                <Phone className="h-4 w-4 mr-2" />{t('Contact Seller', 'വിൽപ്പനക്കാരനെ ബന്ധപ്പെടുക')}
              </Button>
            </div>

            {/* Reviews */}
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>{t('Reviews', 'അവലോകനങ്ങൾ')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {user && (
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <div className="text-sm mb-1">{t('Your rating', 'നിങ്ങളുടെ റേറ്റിംഗ്')}</div>
                      <div className="flex items-center gap-1 mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <button key={i} onClick={() => setMyRating(i+1)}>
                            <Star className={`h-5 w-5 ${i < myRating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} />
                          </button>
                        ))}
                      </div>
                      <Textarea value={myComment} onChange={(e) => setMyComment(e.target.value)} placeholder={t('Share your experience...', 'നിങ്ങളുടെ അനുഭവം പങ്കിടുക...')} />
                    </div>
                    <Button onClick={async () => { if (!user) return; await addReview({ listing_id: id, reviewer_user_id: user.id, rating: myRating, comment: myComment }); setMyComment(''); }}>
                      {t('Submit', 'സമർപ്പിക്കുക')}
                    </Button>
                  </div>
                )}

                {(reviews.length > 0 ? reviews : [
                  { id: 'demo1', listing_id: id, reviewer_user_id: 'u', rating: 5, comment: t('Good quality and timely delivery.', 'നല്ല ഗുണനിലവാരവും സമയബന്ധിതമായ ഡെലിവറിയും.'), created_at: '' }
                ]).map((r: any, idx: number) => (
                  <div key={r.id || idx} className="border-b last:border-none pb-4 last:pb-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium">User</div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < r.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} />
                        ))}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">{r.comment}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Comments */}
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>{t('Comments', 'കമന്റുകൾ')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {user && (
                  <div className="flex items-end gap-2">
                    <Textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder={t('Write a comment...', 'ഒരു കമന്റ് എഴുതുക...')} />
                    <Button onClick={async () => { if (!user || !newComment.trim()) return; await supabase.from('marketplace_comments').insert({ listing_id: id, commenter_user_id: user.id, comment: newComment.trim() }); setNewComment(''); }}> {t('Post', 'പോസ്റ്റ്')}</Button>
                  </div>
                )}
                {(comments.length > 0 ? comments : [{ id: 'c1', comment: t('Looks great!', 'നന്നായിരിക്കുന്നു!'), created_at: '' }]).map((c: any) => (
                  <div key={c.id} className="border-b last:border-none pb-3 last:pb-0">
                    <div className="text-sm text-muted-foreground">{new Date(c.created_at || Date.now()).toLocaleString()}</div>
                    <div className="text-sm">{c.comment}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

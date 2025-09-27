import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, ShoppingCart, Phone, ArrowLeft, CreditCard } from 'lucide-react';
import { getProductById } from '@/lib/products';
import { useLanguage } from '@/hooks/useLanguage';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { useProductReviews } from '@/hooks/useProductFeedback';
// removed comment textarea from review box
import { supabase } from '@/integrations/supabase/client';

export default function Buy() {
  const params = useParams();
  const id = Number(params.id);
  const product = getProductById(id);
  const { language } = useLanguage();
  const { addItem } = useCart();
  const { user } = useAuth();
  const { reviews, addReview } = useProductReviews(Number.isFinite(id) ? id : null);
  const avgRating = reviews.length ? (reviews.reduce((sum: number, r: any) => sum + (r.rating || 0), 0) / reviews.length) : null;

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold mb-2">{language === 'en' ? 'Product not found' : 'ഉൽപ്പന്നം കണ്ടെത്തിയില്ല'}</h1>
        <Button asChild variant="outline">
          <Link to="/marketplace">{language === 'en' ? 'Back to Marketplace' : 'മാർക്കറ്റിലേക്ക് തിരികെ'}</Link>
        </Button>
      </div>
    );
  }

  const t = (en: string, ml: string) => (language === 'en' ? en : ml);
  const buyNow = () => {
    // Simplified: add one item to cart and navigate to cart page
    addItem({ id: product.id, name: product.name, nameML: product.nameML, price: product.price, unit: product.unit, unitML: product.unitML }, 1);
    window.location.href = '/cart';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb / Back */}
        <div className="mb-4 flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link to="/marketplace"><ArrowLeft className="h-4 w-4 mr-1" />{t('Back', 'തിരികെ')}</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Image / Badge */}
          <div className="lg:col-span-2">
            <div className="aspect-video bg-muted rounded-xl flex items-center justify-center">
              <ShoppingCart className="h-16 w-16 text-muted-foreground" />
            </div>
            <div className="mt-3">
              <Badge className={product.inStock ? 'bg-green-500' : 'bg-gray-500'}>
                {language === 'en' ? product.category : product.categoryML}
              </Badge>
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-3 space-y-4">
            <div>
              <h1 className="text-3xl font-bold">
                {language === 'en' ? product.name : product.nameML}
              </h1>
              <div className="flex items-center gap-3 text-muted-foreground mt-1">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  {avgRating !== null ? (
                    <>
                      <span className="font-medium">{avgRating.toFixed(1)}</span>
                      <span className="text-xs">({reviews.length})</span>
                    </>
                  ) : (
                    <span className="text-xs">{t('No ratings yet', 'ഇനിയും റേറ്റിംഗ് ഇല്ല')}</span>
                  )}
                </div>
                <div className="text-xs">{product.inStock ? t('In stock', 'സ്റ്റോക്കിൽ') : t('Out of stock', 'സ്റ്റോക്ക് ഇല്ല')}</div>
              </div>
            </div>

            <div>
              <div className="text-3xl font-bold text-primary">₹{product.price.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">{t(`per ${product.unit}`, `${product.unitML} ന്`)}</div>
            </div>

            <div className="text-sm text-muted-foreground">
              <div>{t('Seller', 'വിൽപ്പനക്കാരൻ')}: {language === 'en' ? product.seller : product.sellerML}</div>
              <div className="flex items-center gap-1"><MapPin className="h-4 w-4" />{language === 'en' ? product.location : product.locationML}</div>
              <div>{t('Available', 'ലഭ്യം')}: {product.quantity}</div>
            </div>

            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>{t('Description', 'വിവരണം')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {language === 'en' ? (product.description || 'No description provided.') : (product.descriptionML || 'വിവരണം നൽകിയിട്ടില്ല.')}
                </p>
              </CardContent>
            </Card>

            <div className="flex gap-2">
              <Button 
                onClick={() => addItem({ id: product.id, name: product.name, nameML: product.nameML, price: product.price, unit: product.unit, unitML: product.unitML }, 1)}
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {product.inStock ? t('Add to Cart', 'കാർട്ടിലേക്ക് ചേർക്കുക') : t('Out of Stock', 'സ്റ്റോക്ക് ഇല്ല')}
              </Button>
              <Button variant="outline" onClick={buyNow} disabled={!product.inStock}>
                <CreditCard className="h-4 w-4 mr-2" />
                {t('Buy Now', 'ഇപ്പോൾ വാങ്ങുക')}
              </Button>
              <Button variant="outline">
                <Phone className="h-4 w-4 mr-2" />{t('Contact Seller', 'വിൽപ്പനക്കാരനെ ബന്ധപ്പെടുക')}
              </Button>
            </div>

            {/* Review + Comment (combined) */}
            <ProductReviewsSection
              t={t}
              canSubmit={!!user}
              currentUserId={user?.id}
              reviews={reviews}
              onSubmit={async (rating, text) => {
                if (!user || !Number.isFinite(id) || !text.trim()) return;
                await addReview({ product_id: id, reviewer_user_id: user.id, rating, comment: text.trim() });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductReviewsSection({ t, canSubmit, currentUserId, reviews, onSubmit }: { t: (en: string, ml: string) => string, canSubmit: boolean, currentUserId?: string, reviews: any[], onSubmit: (rating: number, text: string) => Promise<void> }) {
  const [rating, setRating] = useState(5);
  const [meName, setMeName] = useState<string | null>(null);

  // Fetch current user's display name to show near the input
  useEffect(() => {
    let ignore = false;
    const load = async () => {
      if (!currentUserId) { setMeName(null); return; }
      const { data } = await supabase
        .from('profiles')
        .select('display_name, user_id')
        .eq('user_id', currentUserId)
        .maybeSingle();
      if (!ignore) setMeName(data?.display_name ?? null);
    };
    load();
    return () => { ignore = true; };
  }, [currentUserId]);

  return (
    <Card className="rounded-2xl">
      <CardHeader>
  <CardTitle>{t('Rate this product', 'ഈ ഉൽപ്പന്നത്തെ റേറ്റ് ചെയ്യൂ')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {canSubmit && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">{t('Rate your experience', 'നിങ്ങളുടെ അനുഭവം റേറ്റ് ചെയ്യൂ')}</div>
              <div className="text-xs text-muted-foreground">{t('Reviewing as', 'അവലോകനം നൽകുന്നത്')}: <span className="font-medium">{meName || t('Your account', 'നിങ്ങളുടെ അക്കൗണ്ട്')}</span></div>
            </div>
            <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <button key={i} onClick={() => setRating(i+1)}>
                    <Star className={`h-5 w-5 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} />
                  </button>
                ))}
              </div>
            <div className="flex justify-end">
              <Button
                onClick={async () => {
                  await onSubmit(rating, '');
                }}
              >
                {t('Submit rating', 'റേറ്റിംഗ് സമർപ്പിക്കുക')}
              </Button>
            </div>
          </div>
        )}

        {(reviews.length > 0 ? reviews : [
          { id: 'demo', rating: 5, comment: t('Good quality and timely delivery.', 'നല്ല ഗുണനിലവാരവും സമയബന്ധിതമായ ഡെലിവറിയും.') }
        ]).map((r: any, idx: number) => (
          <div key={r.id || idx} className="border-b last:border-none pb-4 last:pb-0">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className="font-medium">{r.display_name || 'User'}</div>
                <span className="text-xs text-muted-foreground">{r.created_at ? new Date(r.created_at).toLocaleString() : ''}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < (r.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} />
                ))}
              </div>
            </div>
            {r.comment ? (
              <div className="text-sm text-muted-foreground">{r.comment}</div>
            ) : null}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}


import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';
import { useCart } from '@/hooks/useCart';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { purchaseCart } from '@/hooks/useOrders';

export default function Cart() {
  const { language } = useLanguage();
  const { items, total, count, updateQuantity, removeItem, clear } = useCart();

  const t = (en: string, ml: string) => (language === 'en' ? en : ml);
  const listingItems = items.filter((it) => typeof it.id === 'string');
  const canCheckout = listingItems.length > 0;

  const onCheckout = async () => {
    if (!canCheckout) return;
    try {
      const payload = listingItems.map((it) => ({ listing_id: String(it.id), quantity: it.quantity }));
      await purchaseCart(payload);
      // Remove only listing items from cart
      for (const it of listingItems) removeItem(it.id);
      // Optionally: navigate to orders page in future
      // For now, basic feedback
      alert(t('Purchase completed!', 'വാങ്ങൽ പൂർത്തിയായി!'));
    } catch (e) {
      console.error(e);
      alert(t('Purchase failed. Please try again.', 'വാങ്ങൽ പരാജയപ്പെട്ടു. ദയവായി വീണ്ടും ശ്രമിക്കുക.'));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <ShoppingCart className="h-6 w-6" />
          <h1 className="text-3xl font-bold">{t('Your Cart', 'നിങ്ങളുടെ കാർട്ട്')}</h1>
        </div>

        {items.length === 0 ? (
          <Card className="rounded-2xl">
            <CardContent className="py-10 text-center">
              <div className="text-muted-foreground mb-2">{t('Your cart is empty.', 'നിങ്ങളുടെ കാർട്ട് കാലിയാണ്.')}</div>
              <div className="text-sm text-muted-foreground">{t('Go to Marketplace to add items.', 'ഇനങ്ങൾ ചേർക്കാൻ മാർക്കറ്റ്‌പ്ലേസിലേക്ക് പോകുക.')}</div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="rounded-2xl">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="font-semibold">{language === 'en' ? item.name : (item.nameML || item.name)}</div>
                        <div className="text-sm text-muted-foreground">₹{item.price.toLocaleString()} {item.unit ? t(`per ${item.unit}`, `${item.unitML || ''} ന്`) : ''}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          <Minus className="h-4 w-4" />
                        </Button>
                        <div className="w-10 text-center font-medium">{item.quantity}</div>
                        <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div>
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle>{t('Summary', 'സംഗ്രഹം')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">{t('Items', 'ഇനങ്ങൾ')}</span>
                    <span>{count}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">{t('Total', 'മൊത്തം')}</span>
                    <span className="text-lg font-semibold">₹{total.toLocaleString()}</span>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" className="flex-1" onClick={clear}>{t('Clear', 'ക്ലിയർ')}</Button>
                    <Button className="flex-1" disabled={!canCheckout} onClick={onCheckout}>{t('Checkout', 'ചെക്കൗട്ട്')}</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

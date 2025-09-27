import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { useListings, ListingInsert } from '@/hooks/useListings';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Trash2, Plus, Edit2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export default function Sell() {
  const { user } = useAuth();
  const { language } = useLanguage();
  const { listings, addListing, deleteListing } = useListings();
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<{title: string; description: string; category: 'Crops'|'Plants'|'Foods'|'Other'; custom_category?: string; expiry_date?: string; freshness?: string; image_url?: string; price: string; unit?: string; quantity?: string; cost_price?: string}>({
    title: '', description: '', category: 'Crops', price: '', quantity: '1', unit: 'piece'
  });
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Resize image in browser before upload to save bandwidth and storage
  async function resizeImage(file: File, maxW = 1280, maxH = 1280, quality = 0.8): Promise<Blob> {
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const i = new Image();
      i.onload = () => resolve(i);
      i.onerror = reject;
      i.src = dataUrl;
    });
    let { width, height } = img;
    const scale = Math.min(maxW / width, maxH / height, 1);
    width = Math.round(width * scale);
    height = Math.round(height * scale);
    const canvas = document.createElement('canvas');
    canvas.width = width; canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return file;
    ctx.drawImage(img, 0, 0, width, height);
    const blob: Blob = await new Promise((resolve) => canvas.toBlob((b) => resolve(b as Blob), 'image/jpeg', quality));
    return blob;
  }

  const t = (en: string, ml: string) => language === 'en' ? en : ml;

  async function onCreate() {
    if (!user) return;
    setCreating(true);
    try {
      const categoryValue = (form.category === 'Other' && form.custom_category?.trim()) ? (form.custom_category!.trim() as any) : form.category;
      const payload: ListingInsert = {
        user_id: user.id,
        title: form.title,
        description: form.description || null,
        category: categoryValue as any,
        expiry_date: form.expiry_date || null,
        freshness: form.freshness || null,
        image_url: form.image_url || null,
        price: Number(form.price),
        unit: form.unit || 'piece',
        quantity: form.quantity ? Number(form.quantity) : 1,
      };
      const inserted = await addListing(payload);
      if (form.cost_price) {
        await supabase.from('marketplace_listing_costs').insert({ listing_id: inserted.id, user_id: user.id, cost_price: Number(form.cost_price) });
      }
  setForm({ title: '', description: '', category: 'Crops', price: '', quantity: '1', unit: 'piece' });
    } finally {
      setCreating(false);
    }
  }

  const myListings = user ? listings.filter(l => l.user_id === user.id) : [];
  const [costs, setCosts] = useState<Record<string, number>>({});

  // Load private cost prices for my listings
  React.useEffect(() => {
    (async () => {
      if (!user || myListings.length === 0) return;
      const { data } = await supabase
        .from('marketplace_listing_costs')
        .select('listing_id, cost_price')
        .in('listing_id', myListings.map(l => l.id));
      const map: Record<string, number> = {};
      (data || []).forEach((row: any) => { map[row.listing_id] = Number(row.cost_price); });
      setCosts(map);
    })();
  }, [user, myListings.length]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{t('Marketplace - Sell', 'മാർക്കറ്റ്‌പ്ലേസ് - വിൽക്കുക')}</h1>
        {!user && (
          <Card className="mb-6">
            <CardContent className="py-6 text-muted-foreground">{t('Please sign in to create and manage your listings.', 'നിങ്ങളുടെ ലിസ്റ്റിംഗുകൾ സൃഷ്ടിക്കാനും നിയന്ത്രിക്കാനും ദയവായി സൈൻ ഇൻ ചെയ്യുക.')}</CardContent>
          </Card>
        )}
        <Tabs defaultValue="my" className="w-full">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="my">{t('My Listings', 'എന്റെ ലിസ്റ്റിംഗുകൾ')}</TabsTrigger>
            <TabsTrigger value="add">{t('Add Listing', 'ലിസ്റ്റിംഗ് ചേർക്കുക')}</TabsTrigger>
          </TabsList>

          <TabsContent value="my" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myListings.map((l) => (
                <Card key={l.id}>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>{l.title}</span>
                      <span className="text-primary font-semibold">₹{Number(l.price).toLocaleString()}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-sm text-muted-foreground">{l.category}</div>
                    <div className="text-sm">{l.description}</div>
                    <div className="text-xs text-muted-foreground">{t('Qty', 'അളവ്')}: {l.quantity ?? 1} {l.unit ?? 'piece'}</div>
                    <div className="text-xs">
                      <span className="text-muted-foreground">{t('Profit', 'ലാഭം')}:</span>{' '}
                      {(() => {
                        const cost = costs[l.id] ?? null;
                        if (cost == null) return <span className="italic text-muted-foreground">{t('Add cost price to see profit', 'ലാഭം കാണാൻ ചെലവു വില ചേർക്കുക')}</span>;
                        const sold = Number(l.sold_quantity || 0);
                        const profit = (Number(l.price) - cost) * sold;
                        return <span className="font-medium">₹{profit.toLocaleString()}</span>;
                      })()}
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" disabled><Edit2 className="h-4 w-4" /></Button>
                      <Button variant="destructive" size="icon" onClick={() => deleteListing(l.id)}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {myListings.length === 0 && (
                <Card className="md:col-span-2">
                  <CardContent className="py-10 text-center text-muted-foreground">{t('No listings yet. Add your first item for sale.', 'ഇനിയും ഒരു ലിസ്റ്റിംഗും ഇല്ല. നിങ്ങളുടെ ആദ്യ വിൽപ്പന ഇനം ചേർക്കുക.')}</CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="add" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('Add Item for Sale', 'വിൽപ്പനയ്ക്ക് ഇനം ചേർക്കുക')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>{t('Title', 'ശീർഷകം')}</Label>
                  <Input value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))} />
                </div>
                <div>
                  <Label>{t('Category', 'വിഭാഗം')}</Label>
                  <Select value={form.category} onValueChange={(v: any) => setForm(f => ({...f, category: v}))}>
                    <SelectTrigger><SelectValue placeholder={t('Select category', 'വിഭാഗം തിരഞ്ഞെടുക്കുക')} /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Crops">{t('Crops', 'വിളകൾ')}</SelectItem>
                      <SelectItem value="Plants">{t('Plants', 'സസ്യങ്ങൾ')}</SelectItem>
                      <SelectItem value="Foods">{t('Foods', 'ഭക്ഷ്യവസ്തുക്കൾ')}</SelectItem>
                      <SelectItem value="Other">{t('Other', 'മറ്റുള്ളവ')}</SelectItem>
                    </SelectContent>
                  </Select>
                  {form.category === 'Other' && (
                    <div className="mt-2">
                      <Label>{t('Custom Category', 'ഇച്ഛാനുസൃത വിഭാഗം')}</Label>
                      <Input value={form.custom_category || ''} onChange={e => setForm(f => ({...f, custom_category: e.target.value}))} />
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>{t('Sale Price (₹)', 'വിൽപ്പന വില (₹)')}</Label>
                    <Input type="number" value={form.price} onChange={e => setForm(f => ({...f, price: e.target.value}))} />
                  </div>
                  <div>
                    <Label>{t('Cost Price (Hidden)', 'ചെലവു വില (മറച്ചിരിക്കുന്നു)')}</Label>
                    <Input type="number" value={form.cost_price || ''} onChange={e => setForm(f => ({...f, cost_price: e.target.value}))} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>{t('Quantity', 'അളവ്')}</Label>
                    <Input type="number" value={form.quantity} onChange={e => setForm(f => ({...f, quantity: e.target.value}))} />
                  </div>
                  <div>
                    <Label>{t('Unit', 'യൂണിറ്റ്')}</Label>
                    <Input value={form.unit} onChange={e => setForm(f => ({...f, unit: e.target.value}))} />
                  </div>
                  <div>
                    <Label>{t('Freshness', 'പുതുമ')}</Label>
                    <Input value={form.freshness || ''} onChange={e => setForm(f => ({...f, freshness: e.target.value}))} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>{t('Expiry Date', 'കാലാവധി തീരുന്ന തീയതി')}</Label>
                    <Input type="date" value={form.expiry_date || ''} onChange={e => setForm(f => ({...f, expiry_date: e.target.value}))} />
                  </div>
                  <div>
                    <Label>{t('Image', 'ചിത്രം')}</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      disabled={uploading}
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file || !user) return;
                        // optional: basic validation
                        if (!file.type.startsWith('image/')) return;
                        if (previewUrl) { URL.revokeObjectURL(previewUrl); }
                        setPreviewUrl(URL.createObjectURL(file));
                        setUploading(true);
                        try {
                          const resized = await resizeImage(file, 1280, 1280, 0.8);
                          const path = `${user.id}/${Date.now()}.jpg`;
                          const { error } = await supabase.storage.from('listing-images').upload(path, resized, { upsert: false, contentType: 'image/jpeg' as any });
                          if (error) throw error;
                          const { data } = supabase.storage.from('listing-images').getPublicUrl(path);
                          setForm(f => ({...f, image_url: data.publicUrl }));
                        } finally {
                          setUploading(false);
                        }
                      }}
                    />
                    {(previewUrl || form.image_url) && (
                      <div className="mt-2 flex items-center gap-3">
                        <img src={previewUrl || form.image_url!} alt="preview" className="h-20 w-20 rounded object-cover border" />
                        {form.image_url && <div className="text-xs text-muted-foreground">{t('Image uploaded', 'ചിത്രം അപ്‌ലോഡ് ചെയ്തു')}</div>}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <Label>{t('Description', 'വിവരണം')}</Label>
                  <Textarea value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} />
                </div>
                <div className="flex justify-end">
                  <Button disabled={!user || creating || uploading} onClick={onCreate}>
                    <Plus className="h-4 w-4 mr-2" />{t('Add Listing', 'ലിസ്റ്റിംഗ് ചേർക്കുക')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

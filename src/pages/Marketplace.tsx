import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Plus, Search, Filter, Star, MapPin, Phone, ShoppingCart, CreditCard } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/hooks/useLanguage';
import { useCart } from '@/hooks/useCart';
import { Link } from 'react-router-dom';
import { products } from '@/lib/products';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useListings } from '@/hooks/useListings';
import { useProductRatings, useListingRatings } from '@/hooks/useRatings';

// products data moved to shared module

const categories = [
  { name: 'All', nameML: 'എല്ലാം' },
  { name: 'Grains', nameML: 'ധാന്യങ്ങൾ' },
  { name: 'Fruits', nameML: 'പഴങ്ങൾ' },
  { name: 'Vegetables', nameML: 'പച്ചക്കറികൾ' },
  { name: 'Spices', nameML: 'സുഗന്ധവ്യഞ്ജനങ്ങൾ' },
];

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const { language } = useLanguage();
  const { addItem, count } = useCart();
  const { listings } = useListings();

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.nameML.includes(searchTerm);
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Ratings hooks (after filteredProducts and listings are known for this render)
  const { ratings: productRatings } = useProductRatings(filteredProducts.map((p) => p.id));
  const { ratings: listingRatings } = useListingRatings(listings.map((l) => l.id));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {language === 'en' ? 'Marketplace' : 'മാർക്കറ്റ്‌പ്ലേസ്'}
          </h1>
          <p className="text-lg text-muted-foreground">
            {language === 'en'
              ? 'Buy and sell crops directly with fellow farmers across Kerala'
              : 'കേരളത്തിലുടനീളമുള്ള സഹ കർഷകരുമായി നേരിട്ട് വിളകൾ വാങ്ങുകയും വിൽക്കുകയും ചെയ്യുക'}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={language === 'en' ? 'Search products...' : 'ഉത്പാദനങ്ങൾ തിരയുക...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button className="lg:w-auto" asChild>
              <Link to="/sell">
              <Plus className="mr-2 h-4 w-4" />
              {language === 'en' ? 'Sell Your Crop' : 'നിങ്ങളുടെ വിള വിൽക്കുക'}
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/cart">
                <ShoppingBag className="mr-2 h-4 w-4" />
                {language === 'en' ? 'Cart' : 'കാർട്ട്'} ({count})
              </Link>
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {language === 'en' ? 'Categories' : 'വിഭാഗങ്ങൾ'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-smooth ${
                      selectedCategory === category.name
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <div>{language === 'en' ? category.name : category.nameML}</div>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main content column (Community listings + Product grid) */}
          <div className="flex-1">
            {/* Community Listings */}
            {listings.length > 0 && (
              <div className="mb-10">
                <h2 className="text-xl font-semibold mb-3">{language === 'en' ? 'Community Listings' : 'കമ്മ്യൂണിറ്റി ലിസ്റ്റിംഗുകൾ'}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {listings.map((l) => (
                    <Card key={l.id} className="group hover:shadow-soft transition-smooth overflow-hidden">
                      <div className="relative">
                        <div className="h-48 bg-muted flex items-center justify-center">
                          <ShoppingBag className="h-16 w-16 text-muted-foreground" />
                        </div>
                        <Badge className="absolute top-2 left-2 bg-emerald-600">{l.category}</Badge>
                      </div>
                      <CardContent className="p-4">
                        <div className="mb-3">
                          <h3 className="font-semibold text-foreground mb-1">{l.title}</h3>
                        </div>
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <div className="text-2xl font-bold text-primary">₹{Number(l.price).toLocaleString()}</div>
                            <div className="text-sm text-muted-foreground">{language === 'en' ? `per ${l.unit || 'piece'}` : `${l.unit || 'യൂണിറ്റ്'} ന്`}</div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              {listingRatings[l.id]?.avg ? (
                                <>
                                  <span className="font-medium">{listingRatings[l.id].avg.toFixed(1)}</span>
                                  <span className="text-xs">({listingRatings[l.id].count})</span>
                                </>
                              ) : (
                                <span className="text-xs">{language === 'en' ? 'No ratings' : 'റേറ്റിംഗ് ഇല്ല'}</span>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground">{language === 'en' ? `${l.quantity ?? 1} available` : `${l.quantity ?? 1} ലഭ്യം`}</div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button size="icon" onClick={() => addItem({ id: l.id, name: l.title, price: Number(l.price), unit: l.unit || undefined }, 1)}>
                                <ShoppingCart className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{language === 'en' ? 'Add to Cart' : 'കാർട്ടിലേക്ക് ചേർക്കുക'}</p>
                            </TooltipContent>
                          </Tooltip>
                          <Button variant="outline" asChild>
                            <Link to={`/listing/${l.id}`}>
                              <CreditCard className="h-4 w-4 mr-2" />{language === 'en' ? 'Buy Now' : 'ഇപ്പോൾ വാങ്ങുക'}
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-soft transition-smooth overflow-hidden">
                  <div className="relative">
                    <div className="h-48 bg-muted flex items-center justify-center">
                      <ShoppingBag className="h-16 w-16 text-muted-foreground" />
                    </div>
                    
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge variant="destructive" className="text-sm">
                          {language === 'en' ? 'Out of Stock' : 'സ്റ്റോക്ക് ഇല്ല'}
                        </Badge>
                      </div>
                    )}
                    
                    <Badge 
                      className={`absolute top-2 left-2 ${
                        product.inStock ? 'bg-green-500' : 'bg-gray-500'
                      }`}
                    >
                      {language === 'en' ? product.category : product.categoryML}
                    </Badge>
                  </div>

                  <CardContent className="p-4">
                    <div className="mb-3">
                      <h3 className="font-semibold text-foreground mb-1">
                        {language === 'en' ? product.name : product.nameML}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-2xl font-bold text-primary">
                          ₹{product.price.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {language === 'en' ? `per ${product.unit}` : `${product.unitML} ന്`}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          {productRatings[product.id]?.avg ? (
                            <>
                              <span className="font-medium">{productRatings[product.id].avg.toFixed(1)}</span>
                              <span className="text-xs">({productRatings[product.id].count})</span>
                            </>
                          ) : (
                            <span className="text-xs">{language === 'en' ? 'No ratings' : 'റേറ്റിംഗ് ഇല്ല'}</span>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {language === 'en' ? `${product.quantity} available` : `${product.quantity} ലഭ്യം`}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <MapPin className="h-4 w-4" />
                      <span>{language === 'en' ? product.location : product.locationML}</span>
                    </div>

                    <div className="text-sm text-muted-foreground mb-4">
                      <div>{language === 'en' ? `Seller: ${product.seller}` : `വിൽപ്പനക്കാരൻ: ${product.sellerML}`}</div>
                    </div>

                    <div className="flex gap-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            size="icon"
                            disabled={!product.inStock}
                            aria-label={product.inStock ? (language === 'en' ? 'Add to Cart' : 'കാർട്ടിലേക്ക് ചേർക്കുക') : (language === 'en' ? 'Out of Stock' : 'സ്റ്റോക്ക് ഇല്ല')}
                            onClick={() => {
                              if (!product.inStock) return;
                              addItem({
                                id: product.id,
                                name: product.name,
                                nameML: product.nameML,
                                price: product.price,
                                unit: product.unit,
                                unitML: product.unitML,
                              }, 1);
                            }}
                          >
                            <ShoppingCart className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{product.inStock ? (language === 'en' ? 'Add to Cart' : 'കാർട്ടിലേക്ക് ചേർക്കുക') : (language === 'en' ? 'Out of Stock' : 'സ്റ്റോക്ക് ഇല്ല')}</p>
                        </TooltipContent>
                      </Tooltip>
                      {/* Buy Now navigates to the detailed Buy page */}
                      <Button variant="outline" asChild>
                        <Link to={`/buy/${product.id}`}>
                          <CreditCard className="h-4 w-4 mr-2" />
                          {language === 'en' ? 'Buy Now' : 'ഇപ്പോൾ വാങ്ങുക'}
                        </Link>
                      </Button>
                      <Button variant="outline" size="icon">
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {language === 'en' ? 'No products found' : 'ഒരു ഉത്പാദനങ്ങളും കണ്ടെത്തിയില്ല'}
                </h3>
                <Button variant="outline">
                  {language === 'en' ? 'Clear Filters' : 'ഫിൽട്ടറുകൾ മായ്ക്കുക'}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
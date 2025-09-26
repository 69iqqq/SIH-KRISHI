import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Plus, Search, Filter, Star, MapPin, Phone } from 'lucide-react';
import { Input } from '@/components/ui/input';

const mockProducts = [
  {
    id: 1,
    name: 'Organic Basmati Rice',
    nameML: 'ഓർഗാനിക് ബാസ്മതി അരി',
    seller: 'Raj Kumar',
    sellerML: 'രാജ് കുമാർ',
    location: 'Palakkad',
    locationML: 'പാലക്കാട്',
    price: 2800,
    unit: 'quintal',
    unitML: 'ക്വിന്റൽ',
    rating: 4.8,
    image: '/api/placeholder/300/200',
    category: 'Grains',
    categoryML: 'ധാന്യങ്ങൾ',
    inStock: true,
    quantity: 50
  },
  {
    id: 2,
    name: 'Fresh Coconuts',
    nameML: 'പുതിയ തെങ്ങ്',
    seller: 'Priya Nair',
    sellerML: 'പ്രിയ നായർ',
    location: 'Kochi',
    locationML: 'കൊച്ചി',
    price: 18,
    unit: 'piece',
    unitML: 'എണ്ണം',
    rating: 4.9,
    image: '/api/placeholder/300/200',
    category: 'Fruits',
    categoryML: 'പഴങ്ങൾ',
    inStock: true,
    quantity: 200
  },
  {
    id: 3,
    name: 'Premium Black Pepper',
    nameML: 'പ്രീമിയം കുരുമുളക്',
    seller: 'Thomas Joseph',
    sellerML: 'തോമസ് ജോസഫ്',
    location: 'Wayanad',
    locationML: 'വയനാട്',
    price: 48000,
    unit: 'quintal',
    unitML: 'ക്വിന്റൽ',
    rating: 4.7,
    image: '/api/placeholder/300/200',
    category: 'Spices',
    categoryML: 'സുഗന്ധവ്യഞ്ജനങ്ങൾ',
    inStock: false,
    quantity: 0
  },
  {
    id: 4,
    name: 'Green Cardamom',
    nameML: 'പച്ച ഏലം',
    seller: 'Mini Sebastian',
    sellerML: 'മിനി സെബാസ്റ്റ്യൻ',
    location: 'Idukki',
    locationML: 'ഇടുക്കി',
    price: 125000,
    unit: 'quintal',
    unitML: 'ക്വിന്റൽ',
    rating: 4.9,
    image: '/api/placeholder/300/200',
    category: 'Spices',
    categoryML: 'സുഗന്ധവ്യഞ്ജനങ്ങൾ',
    inStock: true,
    quantity: 10
  }
];

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

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.nameML.includes(searchTerm);
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Marketplace
          </h1>
          <p className="text-xl text-muted-foreground malayalam mb-4">
            മാർക്കറ്റ്‌പ്ലേസ്
          </p>
          <p className="text-lg text-muted-foreground">
            Buy and sell crops directly with fellow farmers across Kerala
          </p>
          <p className="text-muted-foreground malayalam">
            കേരളത്തിലുടനീളമുള്ള സഹ കർഷകരുമായി നേരിട്ട് വിളകൾ വാങ്ങുകയും വിൽക്കുകയും ചെയ്യുക
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products... / ഉത്പാദനങ്ങൾ തിരയുക..."
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
          
          <Button className="lg:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Sell Your Crop / നിങ്ങളുടെ വിള വിൽക്കുക
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Categories / വിഭാഗങ്ങൾ
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
                    <div>{category.name}</div>
                    <div className="text-sm malayalam opacity-75">{category.nameML}</div>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
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
                          Out of Stock / സ്റ്റോക്ക് ഇല്ല
                        </Badge>
                      </div>
                    )}
                    
                    <Badge 
                      className={`absolute top-2 left-2 ${
                        product.inStock ? 'bg-green-500' : 'bg-gray-500'
                      }`}
                    >
                      {product.category} / {product.categoryML}
                    </Badge>
                  </div>

                  <CardContent className="p-4">
                    <div className="mb-3">
                      <h3 className="font-semibold text-foreground mb-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground malayalam">
                        {product.nameML}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-2xl font-bold text-primary">
                          ₹{product.price.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          per {product.unit} / {product.unitML}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          {product.rating}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {product.quantity} available
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <MapPin className="h-4 w-4" />
                      <span>{product.location} / {product.locationML}</span>
                    </div>

                    <div className="text-sm text-muted-foreground mb-4">
                      <div>Seller: {product.seller}</div>
                      <div className="malayalam">വിൽപ്പനക്കാരൻ: {product.sellerML}</div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        className="flex-1" 
                        disabled={!product.inStock}
                      >
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        {product.inStock ? 'Buy Now / ഇപ്പോൾ വാങ്ങുക' : 'Out of Stock'}
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
                  No products found
                </h3>
                <p className="text-muted-foreground malayalam mb-4">
                  ഒരു ഉത്പാദനങ്ങളും കണ്ടെത്തിയില്ല
                </p>
                <Button variant="outline">
                  Clear Filters / ഫിൽട്ടറുകൾ മായ്ക്കുക
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
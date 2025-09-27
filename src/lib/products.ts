export type Product = {
  id: number;
  name: string;
  nameML: string;
  seller: string;
  sellerML: string;
  location: string;
  locationML: string;
  price: number;
  unit: string;
  unitML: string;
  rating: number;
  image: string;
  category: string;
  categoryML: string;
  inStock: boolean;
  quantity: number;
  description?: string;
  descriptionML?: string;
};

export const products: Product[] = [
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
    quantity: 50,
    description: 'High-quality organic basmati rice grown without chemical fertilizers. Ideal for daily cooking and festive dishes.',
    descriptionML: 'രാസവളങ്ങൾ ഇല്ലാതെ കൃഷി ചെയ്ത ഉയർന്ന നിലവാരമുള്ള ഓർഗാനിക് ബാസ്മതി അരി. ദിവസേന പാചകത്തിനും ഉത്സവ വിഭവങ്ങൾക്കും അനുയോജ്യം.'
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
    quantity: 200,
    description: 'Hand-picked fresh coconuts with good water and firm kernel. Perfect for cooking and temple offerings.',
    descriptionML: 'കൈകൊണ്ട് തിരഞ്ഞെടുത്ത നല്ല വെള്ളവും കട്ടിയുള്ള കരളും ഉള്ള പഴുത്ത തേങ്ങ. പാചകത്തിനും ക്ഷേത്ര വാഴപ്പിറപ്പിനും അനുയോജ്യം.'
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
    quantity: 0,
    description: 'Aromatic premium-grade black pepper from the hills of Wayanad. Sun-dried for flavor retention.',
    descriptionML: 'വയനാട് മലഞ്ചെരിവുകളിൽ നിന്നുള്ള സുഗന്ധമുള്ള പ്രീമിയം കുരുമുളക്. രുചി നിലനിർത്താൻ സൂര്യത്തിൽ ഉണക്കിയത്.'
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
    quantity: 10,
    description: 'Fresh green cardamom pods with strong aroma and flavor. Sourced from Idukki farms.',
    descriptionML: 'ദൃഢമായ സുഗന്ധവും രുചിയും ഉള്ള പച്ച ഏലക്കാ. ഇടുക്കിയിലെ ഫാമുകളിൽ നിന്ന് ലഭിച്ചത്.'
  }
];

export const getProductById = (id: number) => products.find((p) => p.id === id);

import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  MessageCircle, 
  Camera, 
  CloudSun, 
  ShoppingBag, 
  FileText,
  ArrowRight,
  Users,
  TrendingUp,
  Shield,
  User
} from 'lucide-react';
import heroImage from '@/assets/hero-farming.jpg';

const features = [
  {
    name: 'AI Chat Assistant',
    nameML: 'AI ചാറ്റ് സഹായി',
    description: 'Get farming advice in Malayalam using AI technology',
    descriptionML: 'AI സാങ്കേതികവിദ്യ ഉപയോഗിച്ച് മലയാളത്തിൽ കൃഷി ഉപദേശം നേടുക',
    href: '/chat',
    icon: MessageCircle,
    color: 'text-primary'
  },
  {
    name: 'Crop Health Analysis',
    nameML: 'വിള ആരോഗ്യ വിശകലനം',
    description: 'Upload crop photos to detect diseases and get remedies',
    descriptionML: 'രോഗങ്ങൾ കണ്ടെത്താനും പ്രതിവിധികൾ നേടാനും വിള ഫോട്ടോകൾ അപ്‌ലോഡ് ചെയ്യുക',
    href: '/crop-health',
    icon: Camera,
    color: 'text-crop'
  },
  {
    name: 'Weather & Market Prices',
    nameML: 'കാലാവസ്ഥയും മാർക്കറ്റ് വിലയും',
    description: 'Live weather updates and daily mandi prices',
    descriptionML: 'തത്സമയ കാലാവസ്ഥാ അപ്‌ഡേറ്റുകളും ദൈനംദിന മണ്ഡി വിലകളും',
    href: '/weather-market',
    icon: CloudSun,
    color: 'text-accent'
  },
  {
    name: 'Marketplace',
    nameML: 'മാർക്കറ്റ്‌പ്ലേസ്',
    description: 'Buy and sell crops directly with other farmers',
    descriptionML: 'മറ്റ് കർഷകരുമായി നേരിട്ട് വിളകൾ വാങ്ങുകയും വിൽക്കുകയും ചെയ്യുക',
    href: '/marketplace',
    icon: ShoppingBag,
    color: 'text-earth'
  },
  {
    name: 'Government Schemes',
    nameML: 'സർക്കാർ പദ്ധതികൾ',
    description: 'Latest farming subsidies and government schemes',
    descriptionML: 'ഏറ്റവും പുതിയ കൃഷി സബ്‌സിഡികളും സർക്കാർ പദ്ധതികളും',
    href: '/schemes',
    icon: FileText,
    color: 'text-harvest'
  }
];

const stats = [
  { name: 'Active Farmers', nameML: 'സജീവ കർഷകർ', value: '10,000+', icon: Users },
  { name: 'Crop Analysis Done', nameML: 'വിള വിശകലനം പൂർത്തിയായി', value: '50,000+', icon: Camera },
  { name: 'Success Rate', nameML: 'വിജയ നിരക്ക്', value: '95%', icon: TrendingUp },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-24 sm:py-32">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
              Krishi Mitra
              <span className="block text-2xl sm:text-4xl text-accent font-medium malayalam mt-2">
                കൃഷി മിത്രം
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-white/90 mb-4">
              AI-powered farming assistant for Malayalam farmers
            </p>
            <p className="text-lg text-white/80 malayalam mb-8">
              മലയാളി കർഷകർക്കായി AI ശക്തിയുള്ള കൃഷി സഹായി
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6" asChild>
                <Link to="/chat">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Start AI Chat / AI ചാറ്റ് ആരംഭിക്കുക
                </Link>
              </Button>
              
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 border-white/20 text-white hover:bg-white/20" asChild>
                <Link to="/auth">
                  <User className="mr-2 h-5 w-5" />
                  Sign In / സൈൻ ഇൻ
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Our Features
            </h2>
            <p className="text-xl text-muted-foreground malayalam">
              ഞങ്ങളുടെ സവിശേഷതകൾ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.name} className="group hover:shadow-soft transition-smooth cursor-pointer">
                  <CardContent className="p-6">
                    <Link to={feature.href} className="block">
                      <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg bg-muted mb-4 group-hover:scale-110 transition-smooth`}>
                        <Icon className={`h-6 w-6 ${feature.color}`} />
                      </div>
                      
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {feature.name}
                      </h3>
                      <p className="text-sm text-muted-foreground malayalam mb-3">
                        {feature.nameML}
                      </p>
                      
                      <p className="text-muted-foreground mb-2">
                        {feature.description}
                      </p>
                      <p className="text-sm text-muted-foreground malayalam">
                        {feature.descriptionML}
                      </p>
                      
                      <div className="flex items-center mt-4 text-primary group-hover:translate-x-2 transition-smooth">
                        <span className="text-sm font-medium">Learn more</span>
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.name} className="text-center">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full gradient-hero mb-4">
                    <Icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground">
                    {stat.name}
                  </div>
                  <div className="text-sm text-muted-foreground malayalam">
                    {stat.nameML}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
            Ready to transform your farming?
          </h2>
          <p className="text-xl text-primary-foreground/90 malayalam mb-8">
            നിങ്ങളുടെ കൃഷി മാറ്റാൻ തയ്യാറാണോ?
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
              <Link to="/chat">
                Get Started / ആരംഭിക്കുക
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
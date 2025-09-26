import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { 
  Home, 
  MessageCircle, 
  Camera, 
  CloudSun, 
  ShoppingBag, 
  FileText, 
  Info, 
  Phone,
  Menu,
  X,
  LogOut,
  User
} from 'lucide-react';

const navigation = [
  { name: 'Home', nameML: 'ഹോം', href: '/', icon: Home, public: true },
  { name: 'AI Chat', nameML: 'AI ചാറ്റ്', href: '/chat', icon: MessageCircle, public: false },
  { name: 'Crop Health', nameML: 'വിള ആരോഗ്യം', href: '/crop-health', icon: Camera, public: true },
  { name: 'Weather & Prices', nameML: 'കാലാവസ്ഥയും വിലയും', href: '/weather-market', icon: CloudSun, public: true },
  { name: 'Marketplace', nameML: 'മാർക്കറ്റ്', href: '/marketplace', icon: ShoppingBag, public: true },
  { name: 'Govt Schemes', nameML: 'സർക്കാർ പദ്ധതികൾ', href: '/schemes', icon: FileText, public: true },
  { name: 'About', nameML: 'കുറിച്ച്', href: '/about', icon: Info, public: true },
  { name: 'Contact', nameML: 'ബന്ധപ്പെടുക', href: '/contact', icon: Phone, public: true },
];

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, signOut, loading } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const filteredNavigation = navigation.filter(item => 
    item.public || (item.href === '/chat' && isAuthenticated)
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-hero">
                <span className="text-lg font-bold text-primary-foreground">कृ</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground">Krishi Mitra</span>
                <span className="text-xs text-muted-foreground malayalam">കൃഷി മിത്രം</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {filteredNavigation.map((item) => {
                const Icon = item.icon;
                const isActive = isActivePath(item.href);
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex flex-col items-center px-3 py-2 rounded-lg text-sm font-medium transition-smooth hover:bg-muted",
                      isActive 
                        ? "bg-primary text-primary-foreground" 
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5 mb-1" />
                    <span className="hidden xl:block">{item.name}</span>
                    <span className="xl:hidden malayalam text-xs">{item.nameML}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              
              {/* Authentication Button */}
              {loading ? (
                <Button size="sm" disabled className="hidden sm:flex">
                  Loading...
                </Button>
              ) : !isAuthenticated ? (
                <Button size="sm" className="hidden sm:flex" asChild>
                  <Link to="/auth">Login / സൈൻ ഇൻ</Link>
                </Button>
              ) : (
                <div className="hidden sm:flex items-center space-x-2">
                  <div className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-muted">
                    <User className="h-4 w-4" />
                    <span className="text-sm text-muted-foreground">Welcome</span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              )}

              {/* Mobile menu button */}
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t">
              <div className="grid grid-cols-2 gap-2">
                {filteredNavigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = isActivePath(item.href);
                  
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-smooth",
                        isActive 
                          ? "bg-primary text-primary-foreground" 
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <div className="flex flex-col">
                        <span>{item.name}</span>
                        <span className="malayalam text-xs opacity-75">{item.nameML}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
              
              {/* Mobile auth buttons */}
              <div className="mt-4 pt-4 border-t">
                {loading ? (
                  <Button disabled className="w-full">
                    Loading...
                  </Button>
                ) : !isAuthenticated ? (
                  <Button className="w-full" asChild>
                    <Link to="/auth">Login / സൈൻ ഇൻ</Link>
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center justify-center space-x-2 px-3 py-2 rounded-lg bg-muted">
                      <User className="h-4 w-4" />
                      <span className="text-sm text-muted-foreground">Welcome / സ്വാഗതം</span>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={handleSignOut}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out / സൈൻ ഔട്ട്
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-sm text-muted-foreground">
                © 2024 Krishi Mitra. Empowering farmers with AI.
              </p>
              <p className="text-xs text-muted-foreground malayalam mt-1">
                കൃഷി മിത്രം - കൃഷിക്കാരുടെ AI സഹായി
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                About / കുറിച്ച്
              </Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                Contact / ബന്ധപ്പെടുക
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
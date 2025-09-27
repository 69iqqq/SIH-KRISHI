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
import { useLanguage } from "@/hooks/useLanguage";
import { Languages } from "lucide-react";

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
  const { isAuthenticated, signOut, loading, user } = useAuth();
  const { language, toggleLanguage } = useLanguage();
  const isCropHealthPage = location.pathname.startsWith('/crop-health');
  const isChatPage = location.pathname.startsWith('/chat');

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
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-hero">
                <span className="text-lg font-bold text-primary-foreground">कृ</span>
              </div>
              {language === 'en' ? (
                <span className="text-lg font-bold text-foreground">Krishi Mitra</span>
              ) : (
                <span className="text-lg font-bold text-foreground malayalam">കൃഷി മിത്രം</span>
              )}
            </Link>

            {/* Desktop Navigation - farmer-friendly: wraps, no scroll, small icons, underline active */}
            <nav className="hidden lg:flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              {filteredNavigation.map((item) => {
                const Icon = item.icon;
                const isActive = isActivePath(item.href);
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "group relative inline-flex flex-col items-center px-2 py-1 text-sm font-medium text-muted-foreground transition-colors",
                      isActive ? "text-foreground" : "hover:text-foreground"
                    )}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <Icon className="h-4 w-4 opacity-80" />
                      {language === 'en' ? (
                        <span className="text-sm whitespace-nowrap" title={item.name}>{item.name}</span>
                      ) : (
                        <span className="text-sm whitespace-nowrap malayalam" title={item.nameML}>{item.nameML}</span>
                      )}
                    </span>
                    {/* Apple-like underline indicator */}
                    <span
                      className={cn(
                        "mt-1 h-0.5 w-6 rounded-full bg-foreground transition-all",
                        isActive ? "opacity-100" : "opacity-0 group-hover:opacity-80"
                      )}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button variant="ghost" size="icon" onClick={toggleLanguage} className="rounded-full">
                <Languages className="h-5 w-5" />
              </Button>
              
              {/* Authentication Button */}
              {loading ? (
                <Button size="sm" disabled className="hidden sm:flex">
                  Loading...
                </Button>
              ) : !isAuthenticated ? (
                <Button size="sm" className="hidden sm:flex" asChild>
                  <Link to="/auth">{language === 'en' ? 'Login' : 'സൈൻ ഇൻ'}</Link>
                </Button>
              ) : (
                <div className="hidden sm:flex items-center space-x-2">
                  <div className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-muted max-w-[200px]">
                    <User className="h-4 w-4" />
                    <span className="text-sm text-muted-foreground truncate" title={
                      (user?.user_metadata?.display_name || user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email) ?? undefined
                    }>
                      {(user?.user_metadata?.display_name || user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split('@')[0] || 'User')}
                    </span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {language === 'en' ? 'Sign Out' : 'സൈൻ ഔട്ട്'}
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
                      {language === 'en' ? (
                        <span>{item.name}</span>
                      ) : (
                        <span className="malayalam">{item.nameML}</span>
                      )}
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
                    <Link to="/auth">{language === 'en' ? 'Login' : 'സൈൻ ഇൻ'}</Link>
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center justify-center space-x-2 px-3 py-2 rounded-lg bg-muted">
                      <User className="h-4 w-4" />
                      <span className="text-sm text-muted-foreground truncate max-w-[180px]" title={
                        (user?.user_metadata?.display_name || user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email) ?? undefined
                      }>
                        {(user?.user_metadata?.display_name || user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split('@')[0] || 'User')}
                      </span>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={handleSignOut}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      {language === 'en' ? 'Sign Out' : 'സൈൻ ഔട്ട്'}
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

      {/* Footer removed per request */}
    </div>
  );
}
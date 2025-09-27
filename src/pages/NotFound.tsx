import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home as HomeIcon, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const NotFound = () => {
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <div className="text-8xl font-bold text-primary mb-4">404</div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {language === 'en' ? 'Page Not Found' : 'പേജ് കണ്ടെത്തിയില്ല'}
          </h1>
        </div>
        
        <p className="text-lg text-muted-foreground mb-8">
          {language === 'en' ? "The page you're looking for doesn't exist or has been moved." : 'നിങ്ങൾ തിരയുന്ന പേജ് നിലവിലില്ല അല്ലെങ്കിൽ നീക്കപ്പെട്ടിരിക്കുന്നു.'}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <a href="/">
              <HomeIcon className="mr-2 h-4 w-4" />
              {language === 'en' ? 'Go Home' : 'ഹോമിലേക്ക് പോകുക'}
            </a>
          </Button>
          
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {language === 'en' ? 'Go Back' : 'തിരികെ പോകുക'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Auth from "./pages/Auth";
import CropHealth from "./pages/CropHealth";
import WeatherMarket from "./pages/WeatherMarket";
import Marketplace from "./pages/Marketplace";
import Cart from "./pages/Cart";
import Schemes from "./pages/Schemes";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { LanguageProvider } from "@/hooks/useLanguage";
import Buy from "./pages/Buy";
import Sell from "./pages/Sell";
import ListingBuy from "./pages/ListingBuy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <LanguageProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/crop-health" element={<CropHealth />} />
              <Route path="/weather-market" element={<WeatherMarket />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/sell" element={<Sell />} />
              <Route path="/buy/:id" element={<Buy />} />
              <Route path="/listing/:id" element={<ListingBuy />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/schemes" element={<Schemes />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

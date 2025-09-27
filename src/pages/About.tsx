import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Target, Heart, MessageCircle, Camera, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';

const team = [
  {
    name: 'Arjun Krishnan',
    nameML: 'അർജുൻ കൃഷ്ണൻ',
    role: 'Lead Developer',
    roleML: 'ലീഡ് ഡെവലപ്പർ',
    description: 'Full-stack developer with expertise in AI and farming technology'
  },
  {
    name: 'Priya Nair',
    nameML: 'പ്രിയ നായർ',
    role: 'Agricultural Expert',
    roleML: 'കൃഷി വിദഗ്ധ',
    description: 'Agriculture scientist with 10+ years experience in Kerala farming'
  },
  {
    name: 'Ravi Kumar',
    nameML: 'രവി കുമാർ',
    role: 'AI Specialist',
    roleML: 'AI സ്പെഷ്യലിസ്റ്റ്',
    description: 'Machine learning engineer specializing in computer vision for agriculture'
  }
];

const features = [
  {
    icon: MessageCircle,
    title: 'AI Chat Assistant',
    titleML: 'AI ചാറ്റ് സഹായി',
    description: 'Get farming advice in Malayalam using advanced AI technology'
  },
  {
    icon: Camera,
    title: 'Crop Health Analysis',
    titleML: 'വിള ആരോഗ്യ വിശകലനം',
    description: 'Detect diseases and pests using image recognition technology'
  },
  {
    icon: TrendingUp,
    title: 'Market Intelligence',
    titleML: 'മാർക്കറ്റ് ഇന്റലിജൻസ്',
    description: 'Real-time weather data and market price information'
  }
];

export default function About() {
  const { language } = useLanguage();
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 sm:py-24 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary-foreground mb-6">
            {language === 'en' ? 'About Krishi Mitra' : 'കൃഷി മിത്രത്തെ കുറിച്ച്'}
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
            {language === 'en'
              ? "Empowering Kerala's farmers with AI-powered technology, bringing traditional wisdom together with modern innovation."
              : 'AI ശക്തിയുള്ള സാങ്കേതികവിദ്യ ഉപയോഗിച്ച് കേരളത്തിലെ കർഷകരെ ശാക്തീകരിക്കുന്നു, പരമ്പരാഗത ജ്ഞാനത്തെ ആധുനിക നൂതനത്വവുമായി കൂട്ടിയോജിപ്പിക്കുന്നു.'}
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="p-8">
              <div className="text-center">
                <Target className="h-16 w-16 text-primary mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-foreground mb-4">{language === 'en' ? 'Our Mission' : 'ഞങ്ങളുടെ ലക്ഷ്യം'}</h2>
                <p className="text-muted-foreground mb-4">
                  {language === 'en'
                    ? 'To democratize access to agricultural knowledge and technology for farmers across Kerala, making farming more productive, sustainable, and profitable through AI-powered solutions.'
                    : 'കേരളത്തിലുടനീളമുള്ള കർഷകർക്ക് കൃഷി അറിവും സാങ്കേതികവിദ്യയും ലഭ്യമാക്കുക, AI ശക്തിയുള്ള പരിഹാരങ്ങളിലൂടെ കൃഷി കൂടുതൽ ഉത്പാദനക്ഷമവും സുസ്ഥിരവും ലാഭകരവുമാക്കുക.'}
                </p>
              </div>
            </Card>

            <Card className="p-8">
              <div className="text-center">
                <Heart className="h-16 w-16 text-accent mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-foreground mb-4">{language === 'en' ? 'Our Vision' : 'ഞങ്ങളുടെ ദർശനം'}</h2>
                <p className="text-muted-foreground mb-4">
                  {language === 'en'
                    ? 'To become the most trusted digital companion for farmers in Kerala, preserving traditional farming wisdom while embracing cutting-edge technology for sustainable agriculture.'
                    : 'കേരളത്തിലെ കർഷകരുടെ ഏറ്റവും വിശ്വസ്ത ഡിജിറ്റൽ സഹയാത്രികനാകുക, പരമ്പരാഗത കൃഷി ജ്ഞാനം സംരക്ഷിക്കുകയും സുസ്ഥിര കൃഷിക്ക് അത്യാധുനിക സാങ്കേതികവിദ്യ സ്വീകരിക്കുകയും ചെയ്യുക.'}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">{language === 'en' ? 'What We Offer' : 'ഞങ്ങൾ എന്താണ് വാഗ്ദാനം ചെയ്യുന്നത്'}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center p-6 hover:shadow-soft transition-smooth">
                  <CardContent className="pt-6">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full gradient-hero mb-6">
                      <Icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {language === 'en' ? feature.title : feature.titleML}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">{language === 'en' ? 'Our Team' : 'ഞങ്ങളുടെ ടീം'}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {language === 'en' ? 'A passionate team of developers, agricultural experts, and AI specialists working together to revolutionize farming in Kerala.' : 'കേരളത്തിലെ കൃഷിയിൽ വിപ്ലവം സൃഷ്ടിക്കാൻ ഒരുമിച്ച് പ്രവർത്തിക്കുന്ന ഡെവലപ്പർമാരും കൃഷി വിദഗ്ധരും AI സ്പെഷ്യലിസ്റ്റുമാരും അടങ്ങിയ ഒരു ആത്മാർത്ഥ ടീം.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-soft transition-smooth">
                <CardContent className="pt-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary-light rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-12 w-12 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">
                    {language === 'en' ? member.name : member.nameML}
                  </h3>
                  <div className="text-primary font-medium mb-3">
                    {language === 'en' ? member.role : member.roleML}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-muted-foreground">Farmers Helped</div>
              <div className="text-sm text-muted-foreground malayalam">സഹായിച്ച കർഷകർ</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50,000+</div>
              <div className="text-muted-foreground">Crop Analysis</div>
              <div className="text-sm text-muted-foreground malayalam">വിള വിശകലനം</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">95%</div>
              <div className="text-muted-foreground">Accuracy Rate</div>
              <div className="text-sm text-muted-foreground malayalam">കൃത്യത നിരക്ക്</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">AI Support</div>
              <div className="text-sm text-muted-foreground malayalam">AI പിന്തുണ</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            {language === 'en' ? 'Ready to Transform Your Farming?' : 'നിങ്ങളുടെ കൃഷി മാറ്റാൻ തയ്യാറാണോ?'}
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/chat">
                {language === 'en' ? 'Start Using Krishi Mitra' : 'കൃഷി മിത്രം ഉപയോഗിക്കാൻ ആരംഭിക്കുക'}
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">
                {language === 'en' ? 'Contact Us' : 'ഞങ്ങളെ ബന്ധപ്പെടുക'}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Target, Heart, MessageCircle, Camera, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 sm:py-24 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary-foreground mb-6">
            About Krishi Mitra
          </h1>
          <p className="text-2xl text-primary-foreground/90 malayalam mb-8">
            കൃഷി മിത്രത്തെ കുറിച്ച്
          </p>
          <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
            Empowering Kerala's farmers with AI-powered technology, bringing traditional wisdom together with modern innovation.
          </p>
          <p className="text-lg text-primary-foreground/80 malayalam max-w-3xl mx-auto mt-4">
            AI ശക്തിയുള്ള സാങ്കേതികവിദ്യ ഉപയോഗിച്ച് കേരളത്തിലെ കർഷകരെ ശാക്തീകരിക്കുന്നു, പരമ്പരാഗത ജ്ഞാനത്തെ ആധുനിക നൂതനത്വവുമായി കൂട്ടിയോജിപ്പിക്കുന്നു.
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
                <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
                <p className="text-lg text-muted-foreground malayalam mb-4">ഞങ്ങളുടെ ലക്ഷ്യം</p>
                <p className="text-muted-foreground mb-4">
                  To democratize access to agricultural knowledge and technology for farmers across Kerala, 
                  making farming more productive, sustainable, and profitable through AI-powered solutions.
                </p>
                <p className="text-sm text-muted-foreground malayalam">
                  കേരളത്തിലുടനീളമുള്ള കർഷകർക്ക് കൃഷി അറിവും സാങ്കേതികവിദ്യയും ലഭ്യമാക്കുക, 
                  AI ശക്തിയുള്ള പരിഹാരങ്ങളിലൂടെ കൃഷി കൂടുതൽ ഉത്പാദനക്ഷമവും സുസ്ഥിരവും ലാഭകരവുമാക്കുക.
                </p>
              </div>
            </Card>

            <Card className="p-8">
              <div className="text-center">
                <Heart className="h-16 w-16 text-accent mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-foreground mb-4">Our Vision</h2>
                <p className="text-lg text-muted-foreground malayalam mb-4">ഞങ്ങളുടെ ദർശനം</p>
                <p className="text-muted-foreground mb-4">
                  To become the most trusted digital companion for farmers in Kerala, preserving traditional 
                  farming wisdom while embracing cutting-edge technology for sustainable agriculture.
                </p>
                <p className="text-sm text-muted-foreground malayalam">
                  കേരളത്തിലെ കർഷകരുടെ ഏറ്റവും വിശ്വസ്ത ഡിജിറ്റൽ സഹയാത്രികനാകുക, 
                  പരമ്പരാഗത കൃഷി ജ്ഞാനം സംരക്ഷിക്കുകയും സുസ്ഥിര കൃഷിക്ക് അത്യാധുനിക സാങ്കേതികവിദ്യ സ്വീകരിക്കുകയും ചെയ്യുക.
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
            <h2 className="text-3xl font-bold text-foreground mb-4">What We Offer</h2>
            <p className="text-xl text-muted-foreground malayalam">ഞങ്ങൾ എന്താണ് വാഗ്ദാനം ചെയ്യുന്നത്</p>
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
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground malayalam mb-3">
                      {feature.titleML}
                    </p>
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
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Team</h2>
            <p className="text-xl text-muted-foreground malayalam mb-4">ഞങ്ങളുടെ ടീം</p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A passionate team of developers, agricultural experts, and AI specialists working together 
              to revolutionize farming in Kerala.
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
                    {member.name}
                  </h3>
                  <p className="text-sm text-muted-foreground malayalam mb-2">
                    {member.nameML}
                  </p>
                  <div className="text-primary font-medium mb-1">
                    {member.role}
                  </div>
                  <div className="text-sm text-muted-foreground malayalam mb-3">
                    {member.roleML}
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
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-xl text-muted-foreground malayalam mb-8">
            നിങ്ങളുടെ കൃഷി മാറ്റാൻ തയ്യാറാണോ?
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/chat">
                Start Using Krishi Mitra / കൃഷി മിത്രം ഉപയോഗിക്കാൻ ആരംഭിക്കുക
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">
                Contact Us / ഞങ്ങളെ ബന്ധപ്പെടുക
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
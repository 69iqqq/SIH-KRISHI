import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  MessageCircle,
  HelpCircle,
  Users
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email Support',
    titleML: 'ഇമെയിൽ സപ്പോർട്ട്',
    value: 'support@krishimitra.com',
    description: 'Get help via email within 24 hours'
  },
  {
    icon: Phone,
    title: 'Phone Support',
    titleML: 'ഫോൺ സപ്പോർട്ട്',
    value: '+91 9876543210',
    description: 'Call us for immediate assistance'
  },
  {
    icon: MapPin,
    title: 'Office Address',
    titleML: 'ഓഫീസ് വിലാസം',
    value: 'Thiruvananthapuram, Kerala',
    description: 'Visit our office during business hours'
  },
  {
    icon: Clock,
    title: 'Business Hours',
    titleML: 'ബിസിനസ്സ് സമയം',
    value: '9 AM - 6 PM',
    description: 'Monday to Saturday'
  }
];

const faqItems = [
  {
    question: 'How accurate is the crop disease detection?',
    questionML: 'വിള രോഗ കണ്ടെത്തൽ എത്രമാത്രം കൃത്യമാണ്?',
    answer: 'Our AI model has 95% accuracy in detecting common crop diseases in Kerala.'
  },
  {
    question: 'Is the AI chat available 24/7?',
    questionML: 'AI ചാറ്റ് 24/7 ലഭ്യമാണോ?',
    answer: 'Yes, our AI assistant is available round the clock to help farmers.'
  },
  {
    question: 'Do I need to pay for using Krishi Mitra?',
    questionML: 'കൃഷി മിത്രം ഉപയോഗിക്കുന്നതിന് പണം നൽകേണ്ടതുണ്ടോ?',
    answer: 'Basic features are free. Premium features require a small subscription.'
  }
];

export default function Contact() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {language === 'en' ? 'Contact Us' : 'ഞങ്ങളെ ബന്ധപ്പെടുക'}
          </h1>
          <p className="text-lg text-muted-foreground">
            {language === 'en' ? "We're here to help! Reach out with your questions, feedback, or support needs." : 'ഞങ്ങൾ സഹായിക്കാൻ ഇവിടെയുണ്ട്! നിങ്ങളുടെ ചോദ്യങ്ങൾ, ഫീഡ്ബാക്ക് അല്ലെങ്കിൽ പിന്തുണ ആവശ്യങ്ങൾക്കായി ബന്ധപ്പെടുക.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5 text-primary" />
                {language === 'en' ? 'Send us a Message' : 'ഞങ്ങൾക്ക് ഒരു സന്ദേശം അയയ്ക്കുക'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">{language === 'en' ? 'Name' : 'പേര്'}</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={language === 'en' ? 'Your name' : 'നിങ്ങളുടെ പേര്'}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">{language === 'en' ? 'Email' : 'ഇമെയിൽ'}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject">{language === 'en' ? 'Subject' : 'വിഷയം'}</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={language === 'en' ? "What's this about?" : 'ഇത് എന്തിനെക്കുറിച്ചാണ്?'}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="message">{language === 'en' ? 'Message' : 'സന്ദേശം'}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={language === 'en' ? 'Tell us how we can help...' : 'എങ്ങനെ സഹായിക്കാനാകുമെന്ന് പറയുക...'}
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  <Send className="mr-2 h-4 w-4" />
                  {language === 'en' ? 'Send Message' : 'സന്ദേശം അയയ്ക്കുക'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information & FAQ */}
          <div className="space-y-8">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  {language === 'en' ? 'Get in Touch' : 'ബന്ധപ്പെടുക'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{language === 'en' ? info.title : info.titleML}</div>
                        <div className="text-primary font-medium mt-1">{info.value}</div>
                        <div className="text-sm text-muted-foreground">{info.description}</div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-accent" />
                  {language === 'en' ? 'Frequently Asked Questions' : 'പതിവുള്ള ചോദ്യങ്ങൾ'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {faqItems.map((item, index) => (
                  <div key={index} className="p-4 bg-muted/30 rounded-lg">
                    <div className="font-medium text-foreground mb-1">
                      {language === 'en' ? item.question : item.questionML}
                    </div>
                    <div className="text-muted-foreground">
                      {item.answer}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Support Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">{language === 'en' ? 'AI Chat Support' : 'AI ചാറ്റ് സപ്പോർട്ട്'}</h3>
              <p className="text-muted-foreground text-sm mb-4">
                {language === 'en' ? 'Get instant help from our AI assistant for farming questions.' : 'കൃഷി ചോദ്യങ്ങൾക്ക് ഞങ്ങളുടെ AI സഹായിയിൽ നിന്ന് ഉടൻ സഹായം നേടുക.'}
              </p>
              <Button variant="outline" size="sm" className="w-full">
                {language === 'en' ? 'Start Chat' : 'ചാറ്റ് ആരംഭിക്കുക'}
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <Users className="h-12 w-12 text-crop mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">{language === 'en' ? 'Community Forum' : 'കമ്മ്യൂണിറ്റി ഫോറം'}</h3>
              <p className="text-muted-foreground text-sm mb-4">
                {language === 'en' ? 'Connect with other farmers and share knowledge.' : 'മറ്റ് കർഷകരുമായി ബന്ധപ്പെടുകയും അറിവ് പങ്കിടുകയും ചെയ്യുക.'}
              </p>
              <Button variant="outline" size="sm" className="w-full">
                {language === 'en' ? 'Join Community' : 'കമ്മ്യൂണിറ്റിയിൽ ചേരുക'}
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <HelpCircle className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">{language === 'en' ? 'Help Center' : 'സഹായ കേന്ദ്രം'}</h3>
              <p className="text-muted-foreground text-sm mb-4">
                {language === 'en' ? 'Browse our comprehensive help documentation.' : 'ഞങ്ങളുടെ സമഗ്രമായ സഹായ ഡോക്യുമെന്റേഷൻ ബ്രൗസ് ചെയ്യുക.'}
              </p>
              <Button variant="outline" size="sm" className="w-full">
                {language === 'en' ? 'Browse Help' : 'സഹായം ബ്രൗസ് ചെയ്യുക'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
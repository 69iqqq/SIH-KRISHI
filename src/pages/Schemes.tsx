import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, ExternalLink, Calendar, IndianRupee, Users, Leaf } from 'lucide-react';

const schemes = [
  {
    id: 1,
    title: 'PM-KISAN Samman Nidhi',
    titleML: 'പിഎം-കിസാൻ സമ്മാൻ നിധി',
    description: 'Income support of ₹6,000 per year to small and marginal farmer families',
    descriptionML: 'ചെറുകിട, നാമമാത്ര കർഷക കുടുംബങ്ങൾക്ക് പ്രതിവർഷം ₹6,000 വരുമാന പിന്തുണ',
    amount: '₹6,000 per year',
    amountML: 'പ്രതിവർഷം ₹6,000',
    eligibility: 'Small and marginal farmers with cultivable land',
    eligibilityML: 'കൃഷിയോഗ്യമായ ഭൂമിയുള്ള ചെറുകിട, നാമമാത്ര കർഷകർ',
    deadline: '31st March 2024',
    deadlineML: '2024 മാർച്ച് 31',
    category: 'Income Support',
    categoryML: 'വരുമാന പിന്തുണ',
    status: 'Active',
    icon: IndianRupee,
    color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
  },
  {
    id: 2,
    title: 'Pradhan Mantri Fasal Bima Yojana',
    titleML: 'പ്രധാനമന്ത്രി ഫസൽ ബീമ യോജന',
    description: 'Crop insurance scheme providing financial support against crop loss',
    descriptionML: 'വിള നഷ്ടത്തിനെതിരെ സാമ്പത്തിക പിന്തുണ നൽകുന്ന വിള ഇൻഷുറൻസ് പദ്ധതി',
    amount: 'Up to ₹2 lakh per farmer',
    amountML: 'ഓരോ കർഷകനും പരമാവധി ₹2 ലക്ഷം',
    eligibility: 'All farmers growing notified crops',
    eligibilityML: 'അറിയിപ്പ് വിളകൾ വളർത്തുന്ന എല്ലാ കർഷകരും',
    deadline: 'Ongoing enrollments',
    deadlineML: 'തുടർച്ചയായ രജിസ്ട്രേഷൻ',
    category: 'Insurance',
    categoryML: 'ഇൻഷുറൻസ്',
    status: 'Active',
    icon: Leaf,
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
  },
  {
    id: 3,
    title: 'Kisan Credit Card (KCC)',
    titleML: 'കിസാൻ ക്രെഡിറ്റ് കാർഡ് (KCC)',
    description: 'Credit facility for farmers to meet crop production and consumption needs',
    descriptionML: 'വിള ഉത്പാദനവും ഉപഭോഗ ആവശ്യങ്ങളും നിറവേറ്റാൻ കർഷകർക്കുള്ള വായ്പാ സൗകര്യം',
    amount: 'Up to ₹3 lakh at 4% interest',
    amountML: '4% പലിശയിൽ പരമാവധി ₹3 ലക്ഷം',
    eligibility: 'All farmers including tenant farmers',
    eligibilityML: 'കുടിയാൻ കർഷകർ ഉൾപ്പെടെ എല്ലാ കർഷകരും',
    deadline: 'No deadline - Apply anytime',
    deadlineML: 'സമയപരിധി ഇല്ല - എപ്പോൾ വേണമെങ്കിലും അപേക്ഷിക്കാം',
    category: 'Credit',
    categoryML: 'വായ്പ',
    status: 'Active',
    icon: FileText,
    color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
  },
  {
    id: 4,
    title: 'National Mission for Sustainable Agriculture',
    titleML: 'സുസ്ഥിര കൃഷിക്കുള്ള ദേശീയ മിഷൻ',
    description: 'Promotes sustainable agriculture practices and climate-resilient farming',
    descriptionML: 'സുസ്ഥിര കൃഷി രീതികളും കാലാവസ്ഥാ പ്രതിരോധ കൃഷിയും പ്രോത്സാഹിപ്പിക്കുന്നു',
    amount: 'Varies by component',
    amountML: 'ഘടകങ്ങൾ അനുസരിച്ച് വ്യത്യാസം',
    eligibility: 'Farmers and farmer groups',
    eligibilityML: 'കർഷകരും കർഷക സംഘങ്ങളും',
    deadline: '30th September 2024',
    deadlineML: '2024 സെപ്റ്റംബർ 30',
    category: 'Sustainability',
    categoryML: 'സുസ്ഥിരത',
    status: 'Active',
    icon: Leaf,
    color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
  }
];

const categories = [
  { name: 'All', nameML: 'എല്ലാം' },
  { name: 'Income Support', nameML: 'വരുമാന പിന്തുണ' },
  { name: 'Insurance', nameML: 'ഇൻഷുറൻസ്' },
  { name: 'Credit', nameML: 'വായ്പ' },
  { name: 'Sustainability', nameML: 'സുസ്ഥിരത' },
];

export default function Schemes() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Government Schemes
          </h1>
          <p className="text-xl text-muted-foreground malayalam mb-4">
            സർക്കാർ പദ്ധതികൾ
          </p>
          <p className="text-lg text-muted-foreground">
            Latest farming subsidies and government schemes for Kerala farmers
          </p>
          <p className="text-muted-foreground malayalam">
            കേരളത്തിലെ കർഷകർക്കായി ഏറ്റവും പുതിയ കൃഷി സബ്‌സിഡികളും സർക്കാർ പദ്ധതികളും
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((category) => (
            <Button
              key={category.name}
              variant="outline"
              size="sm"
              className="flex flex-col h-auto py-2 px-4"
            >
              <span>{category.name}</span>
              <span className="text-xs malayalam opacity-75">{category.nameML}</span>
            </Button>
          ))}
        </div>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {schemes.map((scheme) => {
            const Icon = scheme.icon;
            return (
              <Card key={scheme.id} className="hover:shadow-soft transition-smooth">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`p-2 rounded-lg ${scheme.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">
                          {scheme.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground malayalam mb-3">
                          {scheme.titleML}
                        </p>
                      </div>
                    </div>
                    
                    <Badge 
                      variant="outline" 
                      className={scheme.status === 'Active' ? 'border-green-500 text-green-700' : ''}
                    >
                      {scheme.status}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <p className="text-muted-foreground mb-2">
                      {scheme.description}
                    </p>
                    <p className="text-sm text-muted-foreground malayalam">
                      {scheme.descriptionML}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <IndianRupee className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Amount / തുക</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{scheme.amount}</p>
                      <p className="text-xs text-muted-foreground malayalam">{scheme.amountML}</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-accent" />
                        <span className="text-sm font-medium">Deadline / സമയപരിധി</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{scheme.deadline}</p>
                      <p className="text-xs text-muted-foreground malayalam">{scheme.deadlineML}</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-crop" />
                      <span className="text-sm font-medium">Eligibility / യോഗ്യത</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{scheme.eligibility}</p>
                    <p className="text-xs text-muted-foreground malayalam">{scheme.eligibilityML}</p>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1" size="sm">
                      Apply Now / ഇപ്പോൾ അപേക്ഷിക്കുക
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Details / വിശദാംശങ്ങൾ
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Information Section */}
        <Card className="mt-8 bg-primary/5">
          <CardContent className="p-6">
            <div className="text-center">
              <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Need Help with Applications?
              </h3>
              <p className="text-lg text-muted-foreground malayalam mb-4">
                അപേക്ഷകളിൽ സഹായം വേണോ?
              </p>
              <p className="text-muted-foreground mb-6">
                Our AI assistant can help you understand scheme eligibility and application processes in Malayalam.
              </p>
              <p className="text-sm text-muted-foreground malayalam mb-6">
                ഞങ്ങളുടെ AI സഹായി നിങ്ങളെ മലയാളത്തിൽ പദ്ധതി യോഗ്യതയും അപേക്ഷാ പ്രക്രിയകളും മനസ്സിലാക്കാൻ സഹായിക്കും.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg">
                  Chat with AI Assistant / AI സഹായിയുമായി സംസാരിക്കുക
                </Button>
                <Button variant="outline" size="lg">
                  Contact Support / പിന്തുണയുമായി ബന്ധപ്പെടുക
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
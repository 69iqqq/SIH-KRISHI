"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  ExternalLink,
  Calendar,
  IndianRupee,
  Users,
  Leaf,
  SlidersHorizontal,
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const schemes = [
  {
    id: 1,
    title: "PM-KISAN Samman Nidhi",
    titleML: "പിഎം-കിസാൻ സമ്മാൻ നിധി",
    description:
      "Income support of ₹6,000 per year to small and marginal farmer families",
    descriptionML:
      "ചെറുകിട, നാമമാത്ര കർഷക കുടുംബങ്ങൾക്ക് പ്രതിവർഷം ₹6,000 വരുമാന പിന്തുണ",
    amount: "₹6,000 per year",
    amountML: "പ്രതിവർഷം ₹6,000",
    eligibility: "Small and marginal farmers with cultivable land",
    eligibilityML: "കൃഷിയോഗ്യമായ ഭൂമിയുള്ള ചെറുകിട, നാമമാത്ര കർഷകർ",
    deadline: "31st March 2024",
    deadlineML: "2024 മാർച്ച് 31",
    category: "Income Support",
    categoryML: "വരുമാന പിന്തുണ",
    status: "Active",
    icon: IndianRupee,
    color:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  },
  {
    id: 2,
    title: "Pradhan Mantri Fasal Bima Yojana",
    titleML: "പ്രധാനമന്ത്രി ഫസൽ ബീമ യോജന",
    description:
      "Crop insurance scheme providing financial support against crop loss",
    descriptionML:
      "വിള നഷ്ടത്തിനെതിരെ സാമ്പത്തിക പിന്തുണ നൽകുന്ന വിള ഇൻഷുറൻസ് പദ്ധതി",
    amount: "Up to ₹2 lakh per farmer",
    amountML: "ഓരോ കർഷകനും പരമാവധി ₹2 ലക്ഷം",
    eligibility: "All farmers growing notified crops",
    eligibilityML: "അറിയിപ്പ് വിളകൾ വളർത്തുന്ന എല്ലാ കർഷകരും",
    deadline: "Ongoing enrollments",
    deadlineML: "തുടർച്ചയായ രജിസ്ട്രേഷൻ",
    category: "Insurance",
    categoryML: "ഇൻഷുറൻസ്",
    status: "Active",
    icon: Leaf,
    color:
      "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  },
  {
    id: 3,
    title: "Kisan Credit Card (KCC)",
    titleML: "കിസാൻ ക്രെഡിറ്റ് കാർഡ് (KCC)",
    description:
      "Credit facility for farmers to meet crop production and consumption needs",
    descriptionML:
      "വിള ഉത്പാദനവും ഉപഭോഗ ആവശ്യങ്ങളും നിറവേറ്റാൻ കർഷകർക്കുള്ള വായ്പാ സൗകര്യം",
    amount: "Up to ₹3 lakh at 4% interest",
    amountML: "4% പലിശയിൽ പരമാവധി ₹3 ലക്ഷം",
    eligibility: "All farmers including tenant farmers",
    eligibilityML: "കുടിയാൻ കർഷകർ ഉൾപ്പെടെ എല്ലാ കർഷകരും",
    deadline: "No deadline - Apply anytime",
    deadlineML: "സമയപരിധി ഇല്ല - എപ്പോൾ വേണമെങ്കിലും അപേക്ഷിക്കാം",
    category: "Credit",
    categoryML: "വായ്പ",
    status: "Active",
    icon: FileText,
    color:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  },
  {
    id: 4,
    title: "National Mission for Sustainable Agriculture",
    titleML: "സുസ്ഥിര കൃഷിക്കുള്ള ദേശീയ മിഷൻ",
    description:
      "Promotes sustainable agriculture practices and climate-resilient farming",
    descriptionML:
      "സുസ്ഥിര കൃഷി രീതികളും കാലാവസ്ഥാ പ്രതിരോധ കൃഷിയും പ്രോത്സാഹിപ്പിക്കുന്നു",
    amount: "Varies by component",
    amountML: "ഘടകങ്ങൾ അനുസരിച്ച് വ്യത്യാസം",
    eligibility: "Farmers and farmer groups",
    eligibilityML: "കർഷകരും കർഷക സംഘങ്ങളും",
    deadline: "30th September 2024",
    deadlineML: "2024 സെപ്റ്റംബർ 30",
    category: "Sustainability",
    categoryML: "സുസ്ഥിരത",
    status: "Active",
    icon: Leaf,
    color:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  },
];

const categories = [
  { name: "All", nameML: "എല്ലാം" },
  { name: "Income Support", nameML: "വരുമാന പിന്തുണ" },
  { name: "Insurance", nameML: "ഇൻഷുറൻസ്" },
  { name: "Credit", nameML: "വായ്പ" },
  { name: "Sustainability", nameML: "സുസ്ഥിരത" },
];

export default function Schemes() {
  const [filters, setFilters] = useState<any>({});
  const [showFiltered, setShowFiltered] = useState(false);
  const { language } = useLanguage();

  const handleFilter = (e: any) => {
    e.preventDefault();
    setShowFiltered(true);
  };

  const filteredSchemes = schemes.filter((s) => {
    if (filters.state && !s.title.toLowerCase().includes(filters.state.toLowerCase()))
      return false;
    if (filters.caste && !s.description.toLowerCase().includes(filters.caste.toLowerCase()))
      return false;
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {language === 'en' ? 'Government Schemes' : 'സർക്കാർ പദ്ധതികൾ'}
          </h1>
          <p className="text-lg text-muted-foreground">
            {language === 'en' ? 'Latest farming subsidies and government schemes for Kerala farmers' : 'കേരളത്തിലെ കർഷകർക്കായി ഏറ്റവും പുതിയ കൃഷി സബ്‌സിഡികളും സർക്കാർ പദ്ധതികളും'}
          </p>
        </div>

        {/* Filter + Category */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default" className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                {language === 'en' ? 'Advanced Filter' : 'അഡ്വാൻസ്ഡ് ഫിൽറ്റർ'}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>{language === 'en' ? 'Filter Schemes' : 'പദ്ധതികൾ ഫിൽറ്റർ ചെയ്യുക'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleFilter} className="space-y-4">
                <Input
                  placeholder={language === 'en' ? 'Income (₹)' : 'വരുമാനം (₹)'}
                  onChange={(e) =>
                    setFilters({ ...filters, income: e.target.value })
                  }
                />
                <Input
                  placeholder={language === 'en' ? 'Age' : 'വയസ്'}
                  onChange={(e) =>
                    setFilters({ ...filters, age: e.target.value })
                  }
                />
                <Input
                  placeholder={language === 'en' ? 'Caste' : 'ജാതി'}
                  onChange={(e) =>
                    setFilters({ ...filters, caste: e.target.value })
                  }
                />
                <Input
                  placeholder={language === 'en' ? 'Region' : 'പ്രദേശം'}
                  onChange={(e) =>
                    setFilters({ ...filters, region: e.target.value })
                  }
                />
                <Select
                  onValueChange={(val) => setFilters({ ...filters, state: val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={language === 'en' ? 'Select State' : 'സംസ്ഥാനം തിരഞ്ഞെടുക്കുക'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Kerala">Kerala</SelectItem>
                    <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                    <SelectItem value="Karnataka">Karnataka</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder={language === 'en' ? 'City' : 'നഗരം'}
                  onChange={(e) =>
                    setFilters({ ...filters, city: e.target.value })
                  }
                />
                <Button type="submit" className="w-full">
                  {language === 'en' ? 'Apply Filters' : 'ഫിൽറ്ററുകൾ പ്രയോഗിക്കുക'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          {categories.map((category) => (
            <Button
              key={category.name}
              variant="outline"
              size="sm"
              className="flex flex-col h-auto py-2 px-4"
            >
              <span>{language === 'en' ? category.name : category.nameML}</span>
            </Button>
          ))}
        </div>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {(showFiltered ? filteredSchemes : schemes).map((scheme) => {
            const Icon = scheme.icon;
            return (
              <Card
                key={scheme.id}
                className="hover:shadow-soft transition-smooth"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`p-2 rounded-lg ${scheme.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">
                          {language === 'en' ? scheme.title : scheme.titleML}
                        </CardTitle>
                      </div>
                    </div>

                    <Badge
                      variant="outline"
                      className={
                        scheme.status === "Active"
                          ? "border-green-500 text-green-700"
                          : ""
                      }
                    >
                      {scheme.status}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <p className="text-muted-foreground mb-2">
                      {language === 'en' ? scheme.description : scheme.descriptionML}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <IndianRupee className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">
                          {language === 'en' ? 'Amount' : 'തുക'}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {language === 'en' ? scheme.amount : scheme.amountML}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-accent" />
                        <span className="text-sm font-medium">
                          {language === 'en' ? 'Deadline' : 'സമയംപരിധി'}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {language === 'en' ? scheme.deadline : scheme.deadlineML}
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-crop" />
                      <span className="text-sm font-medium">
                        {language === 'en' ? 'Eligibility' : 'യോഗ്യത'}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {language === 'en' ? scheme.eligibility : scheme.eligibilityML}
                    </p>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1" size="sm">
                      {language === 'en' ? 'Apply Now' : 'ഇപ്പോൾ അപേക്ഷിക്കുക'}
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      {language === 'en' ? 'Details' : 'വിശദാംശങ്ങൾ'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Info Section */}
        <Card className="mt-8 bg-primary/5">
          <CardContent className="p-6">
            <div className="text-center">
              <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {language === 'en' ? "Didn’t find what you need?" : 'താങ്കൾക്ക് വേണ്ടത് കണ്ടെത്താനായില്ലേ?'}
              </h3>
              <p className="text-muted-foreground mb-4">
                {language === 'en' ? 'Try official portals for more schemes:' : 'കൂടുതൽ പദ്ധതികൾക്കായി ഔദ്യോഗിക പോർട്ടലുകൾ ശ്രമിക്കുക:'}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button variant="outline" asChild>
                  <a
                    href="https://pmkisan.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    PM-Kisan
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href="https://www.myscheme.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    MyScheme
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href="https://agricoop.nic.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Agriculture Portal
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

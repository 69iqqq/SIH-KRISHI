import { useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Upload, Image as ImageIcon, AlertCircle, CheckCircle } from "lucide-react";
import { analyzeCropPhoto } from "@/lib/gemiphoto"; // <-- your Gemini helper

export default function CropHealth() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  // Ref for file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle selecting image
  const handleImageSelect = useCallback((file: File) => {
    setSelectedImage(file);
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);
    setAnalysisResult(null);
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) handleImageSelect(file);
  };

  // Analyze image with Gemini
  const analyzeImage = async () => {
    if (!selectedImage) return;
    setIsAnalyzing(true);

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target?.result as string;
        const result = await analyzeCropPhoto({ imageBase64: base64, language: "ml" });

        try {
          setAnalysisResult(JSON.parse(result));
        } catch {
          setAnalysisResult({
            disease: result,
            diseaseML: result,
            confidence: 0,
            severity: "",
            severityML: "",
            treatment: [],
            treatmentML: [],
          });
        }
      };
      reader.readAsDataURL(selectedImage);
    } catch (err) {
      console.error(err);
      alert("Failed to analyze image");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Crop Health Analysis</h1>
          <p className="text-xl text-muted-foreground malayalam mb-4">വള ആരോഗ്യ വിശകലനം</p>
          <p className="text-lg text-muted-foreground">
            Upload a photo of your crop to detect diseases and get treatment recommendations in Malayalam
          </p>
          <p className="text-muted-foreground malayalam">
            രോഗങ്ങൾ കണ്ടെത്താനും മലയാളത്തിൽ ചികിത്സാ ശുപാർശകൾ നേടാനും നിങ്ങളുടെ വിളയുടെ ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യുക
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-primary" />
                Upload Crop Photo
                <span className="text-sm font-normal text-muted-foreground malayalam">
                  / വിള ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യുക
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!imagePreview ? (
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-smooth">
                  <div className="flex flex-col items-center">
                    <ImageIcon className="h-16 w-16 text-muted-foreground mb-4" />
                    <p className="text-lg font-medium text-foreground mb-2">Choose an image to upload</p>
                    <Button
                      size="lg"
                      className="cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="mr-2 h-5 w-5" />
                      Select Image / ചിത്രം തിരഞ്ഞെടുക്കുക
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <img src={imagePreview} alt="Crop preview" className="w-full h-64 object-cover rounded-lg" />
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Change Image / ചിത്രം മാറ്റുക
                    </Button>
                    <Button onClick={analyzeImage} disabled={isAnalyzing} className="flex-1">
                      {isAnalyzing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent mr-2" />
                          Analyzing... / വിശകലനം...
                        </>
                      ) : (
                        <>
                          <Camera className="mr-2 h-4 w-4" />
                          Analyze / വിശകലനം
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Analysis Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-accent" />
                Analysis Results
                <span className="text-sm font-normal text-muted-foreground malayalam">
                  / വിശകലന ഫലങ്ങൾ
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!analysisResult ? (
                <p className="text-center py-12 text-muted-foreground">Upload and analyze an image to see results</p>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-foreground">{analysisResult.disease}</h3>
                      <p className="text-sm text-muted-foreground malayalam">{analysisResult.diseaseML}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{analysisResult.confidence}%</div>
                      <div className="text-xs text-muted-foreground">Confidence / വിശ്വാസ്യത</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className={`inline-flex items-center px-2 py-1 rounded text-sm ${analysisResult.severity === "Moderate"
                        ? "bg-accent/20 text-accent"
                        : "bg-destructive/20 text-destructive"
                        }`}
                    >
                      Severity: {analysisResult.severity} / {analysisResult.severityML}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-3">
                      Treatment Recommendations / ചികിത്സാ ശുപാർശകൾ
                    </h4>
                    <div className="space-y-3">
                      {analysisResult.treatment.map((t: string, i: number) => (
                        <div key={i} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <p className="text-foreground">{t}</p>
                            <p className="text-sm text-muted-foreground malayalam mt-1">
                              {analysisResult.treatmentML[i]}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

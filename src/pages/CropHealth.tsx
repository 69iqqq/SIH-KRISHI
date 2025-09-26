"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Upload, Image as ImageIcon, AlertCircle, CheckCircle, Languages } from "lucide-react";
import { analyzeCropPhoto } from "@/lib/gemiphoto";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function CropHealth() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [language, setLanguage] = useState<"en" | "ml">("en");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle image selection
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
  const analyzeImage = useCallback(async () => {
    if (!selectedImage) return;
    setIsAnalyzing(true);

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target?.result as string;

        const result = await analyzeCropPhoto({ imageBase64: base64, language });

        try {
          const parsed = JSON.parse(result);
          setAnalysisResult(parsed);
        } catch {
          // Wrap raw Markdown only in treatment array
          setAnalysisResult({
            disease: "",
            diseaseML: "",
            severity: "",
            severityML: "",
            treatment: [result],
            treatmentML: [result],
          });
        }

        setIsAnalyzing(false);
      };
      reader.readAsDataURL(selectedImage);
    } catch (err) {
      console.error(err);
      alert("Failed to analyze image");
      setIsAnalyzing(false);
    }
  }, [selectedImage, language]);

  // Auto-analyze whenever a new image is selected
  useEffect(() => {
    if (selectedImage) analyzeImage();
  }, [selectedImage, analyzeImage]);

  const toggleLanguage = () => setLanguage(prev => (prev === "en" ? "ml" : "en"));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Crop Health Analysis</h1>
          <p className="text-xl text-muted-foreground malayalam mb-4">വള ആരോഗ്യ വിശകലനം</p>
          <p className="text-lg text-muted-foreground">
            Upload a photo of your crop to detect diseases and get treatment recommendations
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
                  <img
                    src={imagePreview}
                    alt="Crop preview"
                    className="w-full h-64 object-cover rounded-lg"
                  />
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
              <CardTitle className="flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-accent" />
                  Analysis Results / വിശകലന ഫലങ്ങൾ
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleLanguage}
                  className="flex items-center gap-1"
                >
                  <Languages className="h-4 w-4" />
                  {language === "en" ? "English" : "മലയാളം"}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!analysisResult ? (
                <p className="text-center py-12 text-muted-foreground">
                  Upload and analyze an image to see results
                </p>
              ) : (
                <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
                  {/* Disease Name */}
                  {analysisResult.disease && (
                    <h3 className="font-semibold text-foreground">
                      {language === "en" ? analysisResult.disease : analysisResult.diseaseML}
                    </h3>
                  )}

                  {/* Severity */}
                  {analysisResult.severity && (
                    <div className="flex items-center gap-2 mb-4">
                      <div
                        className={`inline-flex items-center px-2 py-1 rounded text-sm ${analysisResult.severity === "Moderate"
                            ? "bg-accent/20 text-accent"
                            : "bg-destructive/20 text-destructive"
                          }`}
                      >
                        {language === "en"
                          ? `Severity: ${analysisResult.severity}`
                          : `ഗുരുത്വം: ${analysisResult.severityML}`}
                      </div>
                    </div>
                  )}

                  {/* Treatments - Markdown Only */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">
                      Treatment Recommendations / ചികിത്സാ ശുപാർശകൾ
                    </h4>
                    <div className="space-y-3">
                      {(analysisResult.treatment || []).map((t: string, i: number) => (
                        <div key={i} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                          <div className="prose prose-sm max-w-none">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {language === "en" ? t : analysisResult.treatmentML[i]}
                            </ReactMarkdown>
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

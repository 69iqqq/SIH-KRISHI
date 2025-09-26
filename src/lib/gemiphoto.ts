import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!GEMINI_API_KEY) throw new Error("Missing VITE_GEMINI_API_KEY");

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// Optional: dummy check if image is a plant
async function isPlantImage(imageBase64: string): Promise<boolean> {
  return true; // Replace with real detection if needed
}

interface AnalyzeCropOptions {
  prompt?: string;
  language?: "en" | "ml";
  imageBase64?: string;
}

export async function analyzeCropPhoto({
  prompt,
  language = "en",
  imageBase64,
}: AnalyzeCropOptions) {
  if (!prompt && !imageBase64) {
    throw new Error("Prompt or image is required");
  }

  // Check if image is a plant
  if (imageBase64) {
    const plantCheck = await isPlantImage(imageBase64);
    if (!plantCheck) {
      return language === "ml"
        ? "ദയവായി സസ്യത്തിന്റെ ചിത്രം അപ്‌ലോഡ് ചെയ്യുക."
        : "Please upload a plant image only.";
    }
  }

  // Prepare instruction for AI
  const instruction =
    language === "ml"
      ? `You are a crop doctor. Reply only in Malayalam.
- If the image contains a plant, describe the disease and how to cure it.
- Format disease name in **bold**.
- You may provide important steps or chemicals in *italics*.
- Optionally include links to websites for more info as [text](url).
- Do not add anything else.
- If it's not a plant, reply: 'Please upload a plant image only.'
- Respond in Markdown.`
      : `You are a crop doctor.
- If the image contains a plant, describe the disease and how to cure it.
- Format disease name in **bold**.
- You may provide important steps or chemicals in *italics*.
- Optionally include links to websites for more info as [text](url).
- Do not add anything else.
- If it's not a plant, reply: 'Please upload a plant image only.'
- Respond in Markdown.`;

  // Prepare content parts
  const parts: any[] = [{ text: `${instruction}\n\n${prompt || ""}` }];

  if (imageBase64) {
    const mimeMatch = imageBase64.match(/^data:(image\/\w+);base64,/);
    const mimeType = mimeMatch ? mimeMatch[1] : "image/png";

    parts.push({
      inlineData: {
        mimeType,
        data: imageBase64.replace(/^data:image\/\w+;base64,/, ""),
      },
    });
  }

  // Call Gemini
  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
  });

  // Gemini returns response.text() as async function
  const text = await result.response.text();

  return text;
}

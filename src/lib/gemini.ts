import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Missing VITE_GEMINI_API_KEY in .env");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function generateGeminiResponse(prompt: string, opts?: { language?: "en" | "ml" }) {
  try {
    let finalPrompt = prompt;
    if (opts?.language === "ml") {
      finalPrompt = `Reply ONLY in Malayalam. Keep it concise and farmer-friendly.\n\nUser: ${prompt}`;
    } else if (opts?.language === "en") {
      finalPrompt = `Reply ONLY in English. Keep it concise and farmer-friendly.\n\nUser: ${prompt}`;
    }
    const result = await model.generateContent(finalPrompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini API error:", error);
    return "⚠️ Sorry, something went wrong while contacting Gemini API.";
  }
}

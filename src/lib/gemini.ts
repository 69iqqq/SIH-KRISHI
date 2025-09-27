import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Content } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Missing VITE_GEMINI_API_KEY in .env");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export type ChatHistoryItem = {
  role: "user" | "assistant";
  content: string;
};

export async function generateGeminiResponse(
  prompt: string,
  opts?: { language?: "en" | "ml"; history?: ChatHistoryItem[] }
) {
  try {
    // Build language/system instruction once per call
    const instruction =
      opts?.language === "ml"
        ? "You are Krishi Mitra, a helpful agricultural assistant. Reply ONLY in Malayalam. Keep answers concise and farmer-friendly."
        : "You are Krishi Mitra, a helpful agricultural assistant. Reply ONLY in English. Keep answers concise and farmer-friendly.";

    // Map previous messages to Gemini chat contents (assistant -> model)
    const MAX_HISTORY = 12; // keep the last N messages to control context size
    const history = (opts?.history || []).slice(-MAX_HISTORY).map<Content>((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    // Compose final contents: instruction + history + current user prompt
    const contents: Content[] = [
      { role: "user", parts: [{ text: instruction }] },
      ...history,
      { role: "user", parts: [{ text: prompt }] },
    ];

    const result = await model.generateContent({ contents });
    return result.response.text();
  } catch (error) {
    console.error("Gemini API error:", error);
    return "⚠️ Sorry, something went wrong while contacting Gemini API.";
  }
}

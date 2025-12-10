import { GoogleGenAI } from "@google/genai";

export async function POST(request: Request) {
  // 1. Listen to what customer ordered (get the message)
  const body = await request.json();
  const userMessage = body.message;
  
  // 2. Make the pizza (call Gemini)
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: userMessage,
  });
  
  // 3. Give pizza back to customer (return response)
  return Response.json({ reply: response.text });
}
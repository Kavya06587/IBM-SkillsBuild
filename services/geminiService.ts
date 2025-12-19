
import { GoogleGenAI, Type } from "@google/genai";
import { Transaction, AIInsight } from "../types";

export const getFinancialAdvice = async (transactions: Transaction[]): Promise<AIInsight> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `
    Analyze these financial transactions (all amounts are in Indian Rupees - INR) and provide expert financial advice relevant to the Indian context:
    ${JSON.stringify(transactions)}
    
    Return a JSON object with:
    1. A summary of spending habits.
    2. 3 actionable tips to save money (consider Indian savings habits like FDs, RDs, or local cost management).
    3. A financial health score from 0-100.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            tips: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            healthScore: { type: Type.NUMBER }
          },
          required: ["summary", "tips", "healthScore"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("AI Insight Error:", error);
    return {
      summary: "I couldn't analyze your data right now. Keep tracking your expenses in Rupees to see patterns!",
      tips: ["Review your monthly subscriptions", "Try the 50/30/20 rule", "Set a weekly spending limit"],
      healthScore: 50
    };
  }
};

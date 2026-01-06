import { Injectable } from '@angular/core';
import { GoogleGenAI, Type } from '@google/genai';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env['API_KEY'] });
  }

  async analyzePreferences(
    name: string,
    flavors: string[], 
    needs: string[], 
    source: string,
    experience: string,
    packaging: string,
    dosage: string,
    packSize: string,
    openText: string
  ): Promise<string> {
    const model = 'gemini-2.5-flash';
    
    const prompt = `
      You are the Master Alchemist for a luxury wellness brand called "House of Tenjiku". 
      We are launching a new premium collagen shot.
      
      A customer named "${name}" has provided the following preferences:
      - Experience Level: ${experience}
      - Preferred Source: ${source}
      - Preferred Flavors: ${flavors.join(', ')}
      - Wellness Goals: ${needs.join(', ')}
      - Preferred Format: ${packaging}
      - Desired Potency: ${dosage}
      - Supply Frequency: ${packSize}
      - Their specific wish: "${openText}"
      
      Based on this, create a "Signature Blend" concept specifically for ${name}.
      1. Address them by name (e.g., "Greetings, ${name}...") and give this custom blend a mystical, Japanese-inspired name.
      2. Describe the taste profile poetically in 2-3 sentences.
      3. Explain briefly why this blend meets their wellness goals and how the ${packaging} format fits their lifestyle.
      4. Acknowledge their preference for ${source} collagen.
      
      Keep the tone elegant, serene, and premium. Format the output as plain text but use clear separation.
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: model,
        contents: prompt,
      });
      return response.text;
    } catch (error) {
      console.error('Gemini API Error:', error);
      return `Greetings ${name}. Our alchemists are currently meditating and could not generate a custom profile at this moment, but your preferences have been recorded for the House of Tenjiku archives.`;
    }
  }

  async generateBrandIdentity(context: string): Promise<any[]> {
    const model = 'gemini-2.5-flash';
    const prompt = `
      Generate 3 distinct brand identity concepts for "House of Tenjiku", a premium collagen wellness drink brand.
      Context/Vision: ${context || 'Elegant, Japanese-inspired, wellness, sophisticated, serene.'}
      
      For each concept, provide:
      1. A creative concept name.
      2. A description of the aesthetic/vibe.
      3. A text description for a logo.
      4. A color palette consisting of 3-5 hex codes.
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: model,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                conceptName: { type: Type.STRING },
                aesthetic: { type: Type.STRING },
                logoDescription: { type: Type.STRING },
                colors: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                }
              },
              required: ['conceptName', 'aesthetic', 'logoDescription', 'colors']
            }
          }
        }
      });
      
      const text = response.text;
      if (!text) return [];
      return JSON.parse(text);
    } catch (error) {
      console.error('Gemini Brand Gen Error:', error);
      return [];
    }
  }
}
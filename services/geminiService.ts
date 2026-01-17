
import { GoogleGenAI } from "@google/genai";
import { RoomType, StagingStyle } from "../types";
import { STYLING_PROMPTS } from "../constants";

const getAiClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export async function enhancePropertyImage(
  base64Image: string,
  roomType: RoomType,
  style: StagingStyle,
  preserveFurniture: boolean,
  customInstructions?: string
): Promise<string> {
  const ai = getAiClient();
  
  const imageData = base64Image.split(',')[1];
  const mimeType = base64Image.split(';')[0].split(':')[1];

  const styleInstructions = STYLING_PROMPTS[style];
  const preservationInstruction = preserveFurniture 
    ? "Maintain the existing furniture but enhance the lighting, textures, and overall professional quality."
    : "Replace existing furniture with new professional pieces that fit the selected style.";

  const assistantInstructions = customInstructions 
    ? `SPECIFIC REALTOR REQUESTS: ${customInstructions}`
    : "";

  const prompt = `
    TASK: Professional Real Estate Photo Enhancement and Virtual Staging.
    ROOM TYPE: ${roomType}
    SELECTED STYLE: ${style}
    
    STRICT CONSTRAINTS (ARCHITECTURAL PRESERVATION):
    1. DO NOT add, remove, or move walls, windows, doors, or ceilings.
    2. DO NOT change the room's dimensions or structural layout.
    3. KEEP the exact perspective and camera angle.
    4. PRESERVE architectural truth. This is for a legal real estate listing.
    
    ENHANCEMENT INSTRUCTIONS:
    - ${styleInstructions}
    - ${preservationInstruction}
    - ${assistantInstructions}
    - Improve lighting realism (soft natural light from windows).
    - Correct white balance and exposure.
    - Remove clutter and distractions while preserving room scale.
    - Conceal minor imperfections like wall cracks or floor scuffs.
    - Enhance material textures (floors, countertops, etc.).
    
    Produce a high-resolution, photorealistic result that looks like it was shot by a high-end professional real estate photographer.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: imageData,
              mimeType: mimeType,
            },
          },
          { text: prompt },
        ],
      },
    });

    let resultBase64 = '';
    const candidate = response.candidates?.[0];
    if (candidate?.content?.parts) {
      for (const part of candidate.content.parts) {
        if (part.inlineData) {
          resultBase64 = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }
    }

    if (!resultBase64) {
      throw new Error("No image was returned from the API.");
    }

    return resultBase64;
  } catch (error) {
    console.error("Gemini Staging Error:", error);
    throw error;
  }
}

import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({
  apiKey: process.env.ApiKey,
});
export const generateResponse = async (messages) => {
  try {
    const convertedMessages = messages?.map((msg) => {
      return {
        role: msg.role,
        parts: [{ text: msg.content }]
      };
    });

    console.log("Converted Messages:", convertedMessages);

    const response = await genAI.models.generateContent({
      model: "gemini-1.5-flash",
      contents: convertedMessages
    });

    console.log(response.text);
    return response.text;

  } catch (err) {
    console.error("GenAI error:", err);
    return "I'm having trouble thinking right now. Try again later.";
  }
};

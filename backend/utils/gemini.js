import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const geminiProcessor = async (textPrompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro-exp-03-25" });
    const result = await model.generateContent(textPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error in geminiProcessor:', error);
    throw new Error('Gemini processing failed');
  }
};

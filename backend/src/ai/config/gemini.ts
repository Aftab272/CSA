import { GoogleGenerativeAI } from '@google/generative-ai';
import { ENV } from '../../config/env.js';

let aiClient: GoogleGenerativeAI | null = null;

export function getGeminiClient(): GoogleGenerativeAI {
  if (!aiClient) {
    if (!ENV.GEMINI_API_KEY) {
      console.warn('⚠️ GEMINI_API_KEY is not set in environment. Running in mock/fallback mode.');
    }
    aiClient = new GoogleGenerativeAI(ENV.GEMINI_API_KEY || 'MOCK_KEY');
  }
  return aiClient;
}

export const DEFAULT_GEMINI_MODEL = 'gemini-1.5-flash';
export const FALLBACK_GEMINI_MODEL = 'gemini-1.5-pro';

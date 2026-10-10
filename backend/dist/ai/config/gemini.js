import { GoogleGenerativeAI } from '@google/generative-ai';
import { ENV } from '../../config/env.js';
export function getGeminiClient(customKey) {
    const key = customKey || ENV.GEMINI_API_KEY || '';
    return new GoogleGenerativeAI(key || 'MOCK_KEY');
}
export const DEFAULT_GEMINI_MODEL = 'gemini-1.5-flash';
export const FALLBACK_GEMINI_MODEL = 'gemini-1.5-pro';

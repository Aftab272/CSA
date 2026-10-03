import { getGeminiClient, DEFAULT_GEMINI_MODEL, FALLBACK_GEMINI_MODEL } from '../config/gemini.js';
import { BEEMIM_SYSTEM_INSTRUCTION } from '../prompts/systemPrompt.js';
import { buildChatSystemInstruction } from '../prompts/chatPrompt.js';
import { buildImagePrompt } from '../prompts/imagePrompt.js';
import { buildDocumentPrompt } from '../prompts/pdfPrompt.js';
import { buildQuizPrompt } from '../prompts/quizPrompt.js';
import { buildNotesPrompt, buildFlashcardsPrompt } from '../prompts/notesPrompt.js';
import { buildWritingPrompt } from '../prompts/writingPrompt.js';
import { ENV } from '../../config/env.js';
export class GeminiService {
    /**
     * Helper to execute Gemini generation with fallback
     */
    static async executeGeneration(content, options = {}) {
        if (!ENV.GEMINI_API_KEY) {
            return `[Beemim AI Demo Response]: Beemim backend is running! Add your GEMINI_API_KEY to backend/.env to connect to live Google Gemini AI.`;
        }
        const genAI = getGeminiClient();
        const systemInstruction = options.systemInstruction || BEEMIM_SYSTEM_INSTRUCTION;
        try {
            const model = genAI.getGenerativeModel({
                model: DEFAULT_GEMINI_MODEL,
                systemInstruction,
                generationConfig: {
                    temperature: options.temperature ?? 0.7,
                    responseMimeType: options.responseMimeType,
                },
            });
            const result = await model.generateContent(content);
            const response = await result.response;
            return response.text() || '';
        }
        catch (err) {
            console.warn(`Primary model ${DEFAULT_GEMINI_MODEL} failed, attempting fallback to ${FALLBACK_GEMINI_MODEL}:`, err.message);
            try {
                const fallbackModel = genAI.getGenerativeModel({
                    model: FALLBACK_GEMINI_MODEL,
                    systemInstruction,
                    generationConfig: {
                        temperature: options.temperature ?? 0.7,
                        responseMimeType: options.responseMimeType,
                    },
                });
                const fallbackResult = await fallbackModel.generateContent(content);
                const fallbackRes = await fallbackResult.response;
                return fallbackRes.text() || '';
            }
            catch (fallbackErr) {
                throw new Error(`AI generation error: ${fallbackErr.message || err.message}`);
            }
        }
    }
    /**
     * 1. General Beemim Chat
     */
    static async chat(prompt, history = [], customContext) {
        const contents = [];
        // History (format for GoogleGenerativeAI)
        for (const msg of history.slice(-8)) {
            contents.push({
                role: msg.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: msg.content }],
            });
        }
        contents.push({
            role: 'user',
            parts: [{ text: prompt }],
        });
        const systemInstruction = `${BEEMIM_SYSTEM_INSTRUCTION}\n\n${buildChatSystemInstruction(customContext)}`;
        return await this.executeGeneration(contents, {
            systemInstruction,
            temperature: 0.7,
        });
    }
    /**
     * 2. Image Question Analyzer / OCR / Diagrams
     */
    static async analyzeImage(buffer, mimeType, action = 'solve', query) {
        const promptText = buildImagePrompt(action, query);
        const base64Data = buffer.toString('base64');
        const contents = [
            promptText,
            {
                inlineData: {
                    mimeType: mimeType || 'image/jpeg',
                    data: base64Data,
                },
            },
        ];
        return await this.executeGeneration(contents, {
            systemInstruction: BEEMIM_SYSTEM_INSTRUCTION,
            temperature: 0.4,
        });
    }
    /**
     * 3. PDF Document Q&A / Summarizer / Notes
     */
    static async analyzeDocument(documentText, action = 'summarize', query) {
        const promptText = buildDocumentPrompt(documentText, action, query);
        return await this.executeGeneration(promptText, {
            systemInstruction: BEEMIM_SYSTEM_INSTRUCTION,
            temperature: 0.5,
        });
    }
    /**
     * 4. Quiz & MCQ Generator (JSON)
     */
    static async generateQuiz(params) {
        const promptText = buildQuizPrompt(params);
        const rawResponse = await this.executeGeneration(promptText, {
            systemInstruction: 'You are Beemim Quiz Generator. Always output strictly valid JSON.',
            responseMimeType: 'application/json',
            temperature: 0.6,
        });
        try {
            const cleaned = rawResponse.replace(/```json/gi, '').replace(/```/g, '').trim();
            return JSON.parse(cleaned);
        }
        catch {
            return {
                title: `${params.topic} Quiz`,
                topic: params.topic,
                difficulty: params.difficulty || 'intermediate',
                rawText: rawResponse,
            };
        }
    }
    /**
     * 5. Study Notes & Flashcards
     */
    static async generateNotes(topic, level = 'intermediate') {
        const promptText = buildNotesPrompt(topic, level);
        return await this.executeGeneration(promptText, {
            systemInstruction: BEEMIM_SYSTEM_INSTRUCTION,
            temperature: 0.6,
        });
    }
    static async generateFlashcards(topic, count = 6) {
        const promptText = buildFlashcardsPrompt(topic, count);
        const rawResponse = await this.executeGeneration(promptText, {
            systemInstruction: 'Reply strictly in JSON array format.',
            responseMimeType: 'application/json',
            temperature: 0.6,
        });
        try {
            const cleaned = rawResponse.replace(/```json/gi, '').replace(/```/g, '').trim();
            return JSON.parse(cleaned);
        }
        catch {
            return [{ id: 1, front: topic, back: rawResponse }];
        }
    }
    /**
     * 6. AI Writing Assistant
     */
    static async assistWriting(text, action, options) {
        const promptText = buildWritingPrompt(text, action, options);
        return await this.executeGeneration(promptText, {
            systemInstruction: BEEMIM_SYSTEM_INSTRUCTION,
            temperature: 0.7,
        });
    }
}

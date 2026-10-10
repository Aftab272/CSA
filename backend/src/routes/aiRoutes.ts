import { Router, Request, Response, NextFunction } from 'express';
import { GeminiService } from '../ai/services/geminiService.js';
import { ImageGenService } from '../ai/services/imageGenService.js';
import { upload } from '../middleware/upload.js';
import pdfParse from 'pdf-parse';

export const aiRouter = Router();

/**
 * 1. POST /api/ai/chat
 * General AI Assistant chat
 */
aiRouter.post('/chat', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { prompt, history, context, apiKey } = req.body;
    const clientKey = (apiKey || req.headers['x-gemini-key'] || '').toString().trim();

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ success: false, error: 'Prompt is required.' });
    }

    const reply = await GeminiService.chat(prompt, history || [], context, clientKey);
    return res.json({ success: true, response: reply });
  } catch (error) {
    next(error);
  }
});

/**
 * 2. POST /api/ai/vision
 * Image Question Analyzer (works with uploaded image file or base64)
 */
aiRouter.post('/vision', upload.single('image'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { action = 'solve', query } = req.body;

    let buffer: Buffer | null = null;
    let mimeType = 'image/jpeg';

    if (req.file) {
      buffer = req.file.buffer;
      mimeType = req.file.mimetype;
    } else if (req.body.imageBase64) {
      const parts = req.body.imageBase64.split(';base64,');
      if (parts.length === 2) {
        mimeType = parts[0].replace('data:', '');
        buffer = Buffer.from(parts[1], 'base64');
      } else {
        buffer = Buffer.from(req.body.imageBase64, 'base64');
      }
    }

    if (!buffer) {
      return res.status(400).json({
        success: false,
        error: 'Please upload an image file or provide imageBase64 data.',
      });
    }

    const reply = await GeminiService.analyzeImage(buffer, mimeType, action, query);
    return res.json({ success: true, response: reply });
  } catch (error) {
    next(error);
  }
});

/**
 * 3. POST /api/ai/pdf
 * PDF Document Analyzer & Q&A
 */
aiRouter.post('/pdf', upload.single('document'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { action = 'summarize', query, documentText } = req.body;

    let extractedText = documentText || '';

    if (req.file) {
      if (req.file.mimetype === 'application/pdf') {
        const parsed = await pdfParse(req.file.buffer);
        extractedText = parsed.text;
      } else if (req.file.mimetype === 'text/plain') {
        extractedText = req.file.buffer.toString('utf-8');
      }
    }

    if (!extractedText || extractedText.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Could not extract text from document. Please ensure the document is not empty or password protected.',
      });
    }

    const reply = await GeminiService.analyzeDocument(extractedText, action, query);
    return res.json({
      success: true,
      response: reply,
      extractedCharacters: extractedText.length,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * 4. POST /api/ai/quiz
 * Study Tools: Interactive Quiz & MCQ Generator
 */
aiRouter.post('/quiz', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { topic, difficulty, questionCount, questionType } = req.body;

    if (!topic || typeof topic !== 'string') {
      return res.status(400).json({ success: false, error: 'Topic is required to generate quiz.' });
    }

    const quiz = await GeminiService.generateQuiz({
      topic,
      difficulty,
      questionCount: questionCount ? parseInt(questionCount, 10) : 5,
      questionType,
    });

    return res.json({ success: true, quiz });
  } catch (error) {
    next(error);
  }
});

/**
 * 5. POST /api/ai/notes
 * Study Tools: Structured Revision Notes
 */
aiRouter.post('/notes', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { topic, level } = req.body;

    if (!topic) {
      return res.status(400).json({ success: false, error: 'Topic is required.' });
    }

    const notes = await GeminiService.generateNotes(topic, level || 'intermediate');
    return res.json({ success: true, notes });
  } catch (error) {
    next(error);
  }
});

/**
 * 6. POST /api/ai/flashcards
 * Study Tools: Interactive Flashcards
 */
aiRouter.post('/flashcards', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { topic, count } = req.body;

    if (!topic) {
      return res.status(400).json({ success: false, error: 'Topic is required.' });
    }

    const flashcards = await GeminiService.generateFlashcards(topic, count ? parseInt(count, 10) : 6);
    return res.json({ success: true, flashcards });
  } catch (error) {
    next(error);
  }
});

/**
 * 7. POST /api/ai/writing
 * AI Writing Tools: Rewrite, Summarize, Grammar, Email, Outlines
 */
aiRouter.post('/writing', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { text, action = 'rewrite', options } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ success: false, error: 'Text content is required.' });
    }

    const result = await GeminiService.assistWriting(text, action, options);
    return res.json({ success: true, result });
  } catch (error) {
    next(error);
  }
});

/**
 * 8. POST /api/ai/image-gen
 * AI Image Generator: Text prompt to Image preview
 */
aiRouter.post('/image-gen', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { prompt, aspectRatio, style, enhancePrompt } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ success: false, error: 'Prompt is required.' });
    }

    const generated = ImageGenService.generateImageUrl({
      prompt,
      aspectRatio,
      style,
      enhancePrompt,
    });

    return res.json({ success: true, ...generated });
  } catch (error) {
    next(error);
  }
});

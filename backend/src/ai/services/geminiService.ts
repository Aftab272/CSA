import { getGeminiClient, DEFAULT_GEMINI_MODEL, FALLBACK_GEMINI_MODEL } from '../config/gemini.js';
import { BEEMIM_SYSTEM_INSTRUCTION } from '../prompts/systemPrompt.js';
import { buildChatSystemInstruction } from '../prompts/chatPrompt.js';
import { buildImagePrompt, ImageActionType } from '../prompts/imagePrompt.js';
import { buildDocumentPrompt, DocumentActionType } from '../prompts/pdfPrompt.js';
import { buildQuizPrompt, QuizGenerationParams } from '../prompts/quizPrompt.js';
import { buildNotesPrompt, buildFlashcardsPrompt } from '../prompts/notesPrompt.js';
import { buildWritingPrompt, WritingActionType } from '../prompts/writingPrompt.js';
import { ENV } from '../../config/env.js';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export class GeminiService {
  /**
   * Smart conversational knowledge responder when Gemini key is not configured or in transition
   */
  private static generateSmartFallback(prompt: string, notice?: string): string {
    const q = prompt.toLowerCase();

    // 1. Greetings
    if (q.match(/\b(hi|hello|hey|salam|aoa|assalam|kese ho|kaise ho)\b/)) {
      return (
        `**Walaikum Assalam / Hello!** 👋\n\n` +
        `I am **Beemim AI (بیمِم)**, the official intelligent assistant for **Creative Stack Agency**.\n\n` +
        `Here is how I can assist you today:\n` +
        `• 🚀 **Software & Web Development:** Details on our MERN, Next.js, and Full-Stack systems.\n` +
        `• 📱 **Mobile Applications:** Cross-platform Flutter apps.\n` +
        `• 🤖 **Custom AI Systems:** AI Agents, automation, and LLM integrations.\n` +
        `• 🎓 **Etsy & Tech Courses:** 12-Module Etsy Masterclass with scholarships.\n` +
        `• 💼 **Hire & Estimate:** Instant connection with our project leads.\n\n` +
        `What would you like to build or learn today?`
      );
    }

    // 2. Services & Technology
    if (q.match(/\b(service|services|tech|stack|development|website|web|app|mobile|flutter|react|mern|backend)\b/)) {
      return (
        `### 🚀 Creative Stack Agency Services\n\n` +
        `We provide end-to-end modern digital solutions:\n\n` +
        `1. **Full-Stack Web Development:** Next.js, React 19, TypeScript, Node.js, Express, TailwindCSS, Supabase & PostgreSQL.\n` +
        `2. **Mobile App Development:** Production-ready Flutter & Dart cross-platform mobile apps for iOS & Android.\n` +
        `3. **Autonomous AI Agents & SaaS:** Custom LLM workflows, Gemini integrations, automated data scrapers, and chatbots.\n` +
        `4. **Cloud & DevOps:** Docker, AWS, Vercel, Supabase, CI/CD automated deployments.\n` +
        `5. **Bespoke UI/UX & Graphic Design:** High-conversion modern interfaces, brand books, and marketing collateral.\n\n` +
        `Would you like an estimate for your specific project? You can also message our team directly via WhatsApp!`
      );
    }

    // 3. Pricing / Cost / Turnaround
    if (q.match(/\b(price|pricing|cost|rate|rates|budget|charges|how much|turnaround|timeline)\b/)) {
      return (
        `### 💰 Pricing & Delivery Timelines\n\n` +
        `• **Flexible Currency:** We accept both **PKR & USD** with flexible milestone-based contracts.\n` +
        `• **Fast-Track Delivery:** Standard MVP releases are delivered in **2 to 4 weeks**.\n` +
        `• **Enterprise Scalability:** Guaranteed 99.8% uptime, secure code standards, and 100% on-time delivery.\n\n` +
        `💬 *To get a custom quote for your requirements, click the contact options (+) on the bottom right to chat with our leads on WhatsApp or Fiverr!*`
      );
    }

    // 4. Courses & Etsy
    if (q.match(/\b(course|courses|etsy|learn|class|classes|admission|scholarship|student)\b/)) {
      return (
        `### 🎓 Flagship Training: 12-Module Etsy Masterclass\n\n` +
        `Our agency mentors run practical, hands-on digital commerce masterclasses:\n\n` +
        `• **Duration:** 2-Month Intensive Cohort\n` +
        `• **Mode:** 100% Online Interactive Classes\n` +
        `• **Curriculum:** 12 modules covering store creation, digital products, Etsy SEO, mockups, automation tools, and payment gateways.\n` +
        `• **Hands-On:** 10 live practical portfolio projects included.\n` +
        `• 🎁 **Mega Scholarship:** The first 8 enrollees receive **100% Full Free Admission**.\n\n` +
        `Check out the **Courses** section on our website to view full module details and enroll!`
      );
    }

    // 5. Team & Founders
    if (q.match(/\b(team|founder|founders|ceo|leader|sami|aftab|maryam|aqsa|who are you|members)\b/)) {
      return (
        `### 👥 Meet The Core Leadership at CSA\n\n` +
        `• **M. Sami Ullah:** Full Stack Developer · Team Lead & Client Manager\n` +
        `• **Muhammad Aftab Akram:** Founder & MERN Stack Developer · CI/CD & Cloud Integration\n` +
        `• **Maryam Nawaz:** Co-Founder & Full Stack Developer · UI/UX & Operations\n` +
        `• **Eng. Aqsa:** Flutter App & Mobile Solutions Engineer\n\n` +
        `Our team combines years of production experience shipping high-reliability web and mobile applications worldwide!`
      );
    }

    // 6. Contact / Hire
    if (q.match(/\b(contact|hire|talk|call|phone|email|whatsapp|fiverr|reach)\b/)) {
      return (
        `### 📞 How to Reach Creative Stack Agency\n\n` +
        `You can connect with us instantly through multiple channels:\n\n` +
        `• 📱 **WhatsApp (Aftab):** [+92 302 7434569](https://wa.me/923027434569)\n` +
        `• 📱 **WhatsApp (Maryam):** [+92 304 7556084](https://wa.me/923047556084)\n` +
        `• 💼 **Fiverr Profile:** [Creative Stack Agency Gig](https://www.fiverr.com/users/aftab569)\n` +
        `• ✉️ **Project Proposal:** Use the **Contact Us** page on this website.\n\n` +
        `Click the floating (+) button at the bottom-right for instant WhatsApp and Fiverr access!`
      );
    }

    // Default intelligent guidance
    return (
      `**Beemim AI:** Thank you for your question!\n\n` +
      `At **Creative Stack Agency**, we engineer modern digital products, responsive web platforms, cross-platform Flutter mobile applications, and bespoke AI automations.\n\n` +
      `If you have questions regarding our projects, tech stack, courses, or pricing, please ask! ` +
      (notice ? `\n\n> ℹ️ *${notice}*` : '')
    );
  }

  /**
   * Helper to execute Gemini generation with fallback
   */
  private static async executeGeneration(
    content: any,
    options: { systemInstruction?: string; temperature?: number; responseMimeType?: string; apiKey?: string } = {}
  ): Promise<string> {
    const key = (options.apiKey || ENV.GEMINI_API_KEY || '').trim();

    if (!key) {
      // Extract prompt text for smart fallback
      let userPrompt = '';
      if (typeof content === 'string') {
        userPrompt = content;
      } else if (Array.isArray(content)) {
        const last = content[content.length - 1];
        userPrompt = last?.parts?.[0]?.text || '';
      }
      return this.generateSmartFallback(userPrompt);
    }

    const genAI = getGeminiClient(key);
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
    } catch (err: any) {
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
      } catch (fallbackErr: any) {
        let userPrompt = '';
        if (typeof content === 'string') userPrompt = content;
        else if (Array.isArray(content)) userPrompt = content[content.length - 1]?.parts?.[0]?.text || '';
        return this.generateSmartFallback(userPrompt, `Gemini API Notice: ${fallbackErr.message || err.message}`);
      }
    }
  }

  /**
   * 1. General Beemim Chat with dynamic API key support
   */
  static async chat(prompt: string, history: ChatMessage[] = [], customContext?: string, customApiKey?: string): Promise<string> {
    const contents: any[] = [];

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
      apiKey: customApiKey,
    });
  }

  /**
   * 2. Image Question Analyzer / OCR / Diagrams
   */
  static async analyzeImage(
    buffer: Buffer,
    mimeType: string,
    action: ImageActionType = 'solve',
    query?: string,
    customApiKey?: string
  ): Promise<string> {
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
      apiKey: customApiKey,
    });
  }

  /**
   * 3. PDF Document Q&A / Summarizer / Notes
   */
  static async analyzeDocument(
    documentText: string,
    action: DocumentActionType = 'summarize',
    query?: string,
    customApiKey?: string
  ): Promise<string> {
    const promptText = buildDocumentPrompt(documentText, action, query);
    return await this.executeGeneration(promptText, {
      systemInstruction: BEEMIM_SYSTEM_INSTRUCTION,
      temperature: 0.5,
      apiKey: customApiKey,
    });
  }

  /**
   * 4. Quiz & MCQ Generator (JSON)
   */
  static async generateQuiz(params: QuizGenerationParams, customApiKey?: string): Promise<any> {
    const promptText = buildQuizPrompt(params);

    const rawResponse = await this.executeGeneration(promptText, {
      systemInstruction: 'You are Beemim Quiz Generator. Always output strictly valid JSON.',
      responseMimeType: 'application/json',
      temperature: 0.6,
      apiKey: customApiKey,
    });

    try {
      const cleaned = rawResponse.replace(/```json/gi, '').replace(/```/g, '').trim();
      return JSON.parse(cleaned);
    } catch {
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
  static async generateNotes(topic: string, level: string = 'intermediate', customApiKey?: string): Promise<string> {
    const promptText = buildNotesPrompt(topic, level);
    return await this.executeGeneration(promptText, {
      systemInstruction: BEEMIM_SYSTEM_INSTRUCTION,
      temperature: 0.6,
      apiKey: customApiKey,
    });
  }

  static async generateFlashcards(topic: string, count: number = 6, customApiKey?: string): Promise<any> {
    const promptText = buildFlashcardsPrompt(topic, count);
    const rawResponse = await this.executeGeneration(promptText, {
      systemInstruction: 'Reply strictly in JSON array format.',
      responseMimeType: 'application/json',
      temperature: 0.6,
      apiKey: customApiKey,
    });

    try {
      const cleaned = rawResponse.replace(/```json/gi, '').replace(/```/g, '').trim();
      return JSON.parse(cleaned);
    } catch {
      return [{ id: 1, front: topic, back: rawResponse }];
    }
  }

  /**
   * 6. AI Writing Assistant
   */
  static async assistWriting(text: string, action: WritingActionType, options?: any, customApiKey?: string): Promise<string> {
    const promptText = buildWritingPrompt(text, action, options);
    return await this.executeGeneration(promptText, {
      systemInstruction: BEEMIM_SYSTEM_INSTRUCTION,
      temperature: 0.7,
      apiKey: customApiKey,
    });
  }
}

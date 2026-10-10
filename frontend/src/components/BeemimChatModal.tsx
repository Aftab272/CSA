import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface BeemimChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEFAULT_WELCOME: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content: `**Salam & Welcome!** 👋\n\nI am **Beemim AI**, your intelligent assistant for **Creative Stack Agency**.\n\nHow can I help you today? You can ask me about our services, pricing, courses, or team!`,
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
};

const SUGGESTION_CHIPS = [
  { label: '🚀 Our Services', prompt: 'What services does Creative Stack Agency provide?' },
  { label: '💰 Pricing & Timeline', prompt: 'What are your project pricing rates and turnaround time?' },
  { label: '🎓 Etsy Masterclass', prompt: 'Tell me about the 12-Module Etsy Masterclass.' },
  { label: '📞 Contact Team', prompt: 'How can I contact and hire Creative Stack Agency directly?' },
];

export default function BeemimChatModal({ isOpen, onClose }: BeemimChatModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([DEFAULT_WELCOME]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const apiBase =
    (import.meta as { env?: { VITE_API_URL?: string } }).env?.VITE_API_URL?.trim() || '';
  const api = (path: string) => (apiBase ? `${apiBase.replace(/\/$/, '')}${path}` : path);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        scrollToBottom();
      }, 200);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const userPrompt = (textToSend !== undefined ? textToSend : input).trim();
    if (!userPrompt || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: userPrompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (textToSend === undefined) setInput('');
    setIsLoading(true);

    try {
      const history = messages
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({
          role: m.role,
          parts: [{ text: m.content }],
        }));

      // Call backend AI chat endpoint
      const res = await fetch(api('/api/ai/chat'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userPrompt,
          conversationHistory: history,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      const replyText = data?.reply || data?.message || "I apologize, I could not generate a response right now. Please try again or reach out on WhatsApp!";

      const botMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch {
      // Graceful smart fallback if backend or network is down
      const fallbackReply = generateFallbackResponse(userPrompt);
      const botMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: fallbackReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const generateFallbackResponse = (q: string): string => {
    const query = q.toLowerCase();
    if (query.includes('service') || query.includes('development') || query.includes('design') || query.includes('kaam')) {
      return `Creative Stack Agency provides high-end digital services:

• **Full-Stack Web Engineering:** React 19, Next.js, Node.js, Express, TypeScript, Tailwind CSS, Supabase & PostgreSQL.
• **Mobile App Development:** Flutter cross-platform iOS & Android apps.
• **AI & Automation:** Custom AI agents, LLM integrations, and chatbots.
• **UI/UX Strategy & Branding:** High-conversion modern interfaces.
• **SEO & Performance Optimization:** 95+ PageSpeed scores.`;
    }
    if (query.includes('price') || query.includes('cost') || query.includes('rate') || query.includes('timeline') || query.includes('pese')) {
      return `Our pricing is flexible and tailored to your project scope:

• **Web & Landing Pages:** 1-2 weeks fast turnaround.
• **Full-Stack SaaS / Web Apps:** 2-4 weeks enterprise delivery.
• **Payment options:** Flexible milestones in PKR or USD.

You can message our Lead Developer directly on WhatsApp: **+92 302 7434569**!`;
    }
    if (query.includes('course') || query.includes('etsy') || query.includes('training') || query.includes('seekhna')) {
      return `We offer a **12-Module Etsy Masterclass** with full mentorship and scholarships!

• Learn shop setup, product optimization, international ranking, and store scaling.
• Complete student portal & live interactive guidance.`;
    }
    if (query.includes('contact') || query.includes('whatsapp') || query.includes('rabta')) {
      return `You can connect with our leadership right away:

• **Lead Developer (Aftab):** WhatsApp: +92 302 7434569
• **Co-Founder (Maryam):** WhatsApp: +92 304 7556084
• **Fiverr Profile:** [Order Directly on Fiverr](https://www.fiverr.com/users/aftab569)`;
    }
    return `Thank you for your message! At Creative Stack Agency, we engineer intelligent web applications, AI systems, and scalable digital solutions.

How can we assist you with your project today? You can also message us directly on WhatsApp at **+92 302 7434569**!`;
  };

  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('### ')) {
        return (
          <h4 key={idx} className="font-bold text-sm text-cyan-400 mt-2.5 mb-1">
            {trimmed.replace('### ', '')}
          </h4>
        );
      }
      if (trimmed.startsWith('## ')) {
        return (
          <h3 key={idx} className="font-bold text-base text-cyan-300 mt-3 mb-1.5">
            {trimmed.replace('## ', '')}
          </h3>
        );
      }
      if (trimmed.startsWith('• ') || trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const itemText = trimmed.substring(2);
        return (
          <div key={idx} className="flex items-start gap-2 my-1 ml-1 text-xs sm:text-sm">
            <span className="text-cyan-400 font-bold shrink-0 mt-0.5">•</span>
            <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(itemText) }} />
          </div>
        );
      }
      if (/^\d+\.\s/.test(trimmed)) {
        return (
          <div key={idx} className="my-1 ml-1 text-xs sm:text-sm" dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(trimmed) }} />
        );
      }
      if (trimmed === '') {
        return <div key={idx} className="h-1.5" />;
      }
      return (
        <p key={idx} className="my-1 text-xs sm:text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(trimmed) }} />
      );
    });
  };

  const formatInlineMarkdown = (text: string) => {
    let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>');
    formatted = formatted.replace(
      /\[(.*?)\]\((.*?)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-cyan-400 underline hover:text-cyan-300 transition-colors inline-flex items-center gap-0.5">$1</a>'
    );
    formatted = formatted.replace(
      /`(.*?)`/g,
      '<code class="px-1.5 py-0.5 rounded bg-black/40 text-cyan-300 font-mono text-[11px]">$1</code>'
    );
    return formatted;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-100 flex items-end sm:items-end justify-end p-2 sm:p-6 pointer-events-none">
        {/* Backdrop for mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs pointer-events-auto sm:hidden"
        />

        {/* Big, Clean & Spacious Chat Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 25 }}
          transition={{ type: 'spring', damping: 26, stiffness: 300 }}
          className="pointer-events-auto relative w-full sm:w-[480px] md:w-[510px] h-[85vh] sm:h-[660px] max-h-[92vh] flex flex-col rounded-3xl bg-[#090d1a]/95 backdrop-blur-2xl border border-blue-500/30 shadow-[0_25px_80px_rgba(0,0,0,0.85)] overflow-hidden text-white font-sans"
        >
          {/* Clean, Simple Header (Clutter Removed) */}
          <div className="relative px-5 py-4 border-b border-white/10 bg-gradient-to-r from-blue-900/50 via-indigo-900/30 to-slate-900/70 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/30 flex items-center justify-center">
                <div className="w-full h-full rounded-[14px] bg-[#090d1a] flex items-center justify-center text-cyan-400">
                  <Bot size={22} className="animate-pulse" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#090d1a]" />
              </div>
              <div>
                <h3 className="font-bold font-display text-base text-white tracking-wide flex items-center gap-1.5">
                  <span>Beemim AI</span>
                  <Sparkles size={14} className="text-cyan-400" />
                </h3>
                <p className="text-xs text-gray-400 flex items-center gap-1.5 mt-0.5">
                  <span>Creative Stack Assistant</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-semibold">Online</span>
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>

          {/* Spacious Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 scrollbar-thin">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-sm">
                    <Bot size={16} />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl px-4.5 py-3.5 text-xs sm:text-sm leading-relaxed shadow-md ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-none'
                      : 'bg-white/10 dark:bg-slate-800/80 border border-white/10 text-gray-100 rounded-tl-none backdrop-blur-md'
                  }`}
                >
                  {msg.role === 'assistant' ? (
                    <div className="space-y-1.5">{renderFormattedContent(msg.content)}</div>
                  ) : (
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  )}
                  <span className="block text-[10px] text-gray-400/80 mt-1.5 text-right font-mono">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shrink-0 shadow-sm animate-pulse">
                  <Bot size={16} />
                </div>
                <div className="bg-white/10 border border-white/10 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1.5 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="text-xs text-gray-300 ml-2 font-mono">Beemim is typing...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Clean Quick Suggestion Chips */}
          <div className="px-4 py-2.5 border-t border-white/10 bg-black/25 flex gap-2 overflow-x-auto scrollbar-none shrink-0">
            {SUGGESTION_CHIPS.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(chip.prompt)}
                disabled={isLoading}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-300 border border-white/10 hover:border-cyan-500/40 text-gray-300 shrink-0 transition-all cursor-pointer whitespace-nowrap disabled:opacity-50"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Roomy Input Box */}
          <div className="p-3.5 sm:p-4 bg-black/40 border-t border-white/10 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2.5"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Beemim anything about CSA..."
                disabled={isLoading}
                className="flex-1 bg-white/5 border border-white/15 focus:border-cyan-400 text-white rounded-xl px-4 py-3 text-xs sm:text-sm placeholder-gray-500 outline-none transition disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-11 h-11 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white flex items-center justify-center transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-blue-500/25 shrink-0"
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

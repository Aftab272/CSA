/**
 * BEEMIM AI WRITING TOOLS PROMPTS
 * ===============================
 */
export function buildWritingPrompt(text, action, options) {
    const tone = options?.tone || 'professional';
    switch (action) {
        case 'rewrite':
            return `Rewrite the following text with a ${tone} tone, maintaining the original meaning while enhancing flow and vocabulary:\n\n"${text}"`;
        case 'grammar':
            return `Correct all grammatical errors, typos, and punctuation issues in the following text. Provide both the corrected version and a brief list of improvements made:\n\n"${text}"`;
        case 'expand':
            return `Expand the following text with richer explanations, supporting arguments, and examples without adding fluff:\n\n"${text}"`;
        case 'shorten':
            return `Shorten the following text to make it punchy, crisp, and concise while keeping all core facts:\n\n"${text}"`;
        case 'email':
            return `Draft a polished ${tone} email based on these points/draft:\n\n"${text}"\nInclude a clear Subject Line, professional Greeting, Body, Call to Action, and Sign-off.`;
        case 'article_outline':
            return `Create a comprehensive, SEO-friendly article outline for the topic/idea:\n\n"${text}"\nInclude H1 title, target audience, meta description suggestion, H2 & H3 section headers, and key talking points per section.`;
        case 'captions':
            return `Generate 5 catchy, engaging social media captions with relevant hashtags for:\n\n"${text}"`;
        default:
            return `Improve and polish the following text:\n\n"${text}"`;
    }
}

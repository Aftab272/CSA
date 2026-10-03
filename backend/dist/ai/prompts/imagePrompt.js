/**
 * BEEMIM IMAGE QUESTION ANALYZER PROMPTS
 * ======================================
 * You can customize how Beemim extracts, analyzes, and solves questions from uploaded images.
 */
export function buildImagePrompt(action = 'solve', userQuery) {
    const baseInstruction = userQuery ? `User question/notes: "${userQuery}".\n` : '';
    switch (action) {
        case 'solve':
            return `${baseInstruction}
Examine the image carefully. Identify all questions, formulas, diagrams, or printed/handwritten text.
1. Transcribe the detected question/problem clearly.
2. Provide the step-by-step solution.
3. State the final answer clearly in a highlight block.
4. Explain the key concept behind the question.
Format with clean Markdown.`.trim();
        case 'explain':
            return `${baseInstruction}
Analyze the diagram, chart, or text in this image.
1. Explain what is being depicted in simple terms.
2. Break down the components/stages.
3. Highlight key takeaways and importance.`.trim();
        case 'extract_text':
            return `${baseInstruction}
Extract all visible text from this image with high OCR accuracy. Maintain original paragraphs, formulas, and bullet points. Do not add commentary unless asked.`.trim();
        case 'summarize':
            return `${baseInstruction}
Read the content in this image and provide a concise summary with the most critical points.`.trim();
        case 'similar_questions':
            return `${baseInstruction}
Identify the core problem/topic in this image, solve it briefly, and then generate 3 similar practice questions (with answer keys) of varying difficulty levels.`.trim();
        default:
            return `${baseInstruction}Analyze this image thoroughly and answer the user's inquiry with high precision.`;
    }
}

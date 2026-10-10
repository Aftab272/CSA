/**
 * BEEMIM PDF & DOCUMENT ANALYZER PROMPTS
 * ======================================
 * You can customize how Beemim reads, summarizes, and answers questions from uploaded documents.
 */
export function buildDocumentPrompt(documentText, action = 'summarize', userQuestion) {
    // Truncate document context if extremely large (e.g. 50,000 characters)
    const safeText = documentText.slice(0, 80000);
    switch (action) {
        case 'ask':
            return `
You are Beemim analyzing an uploaded document for a user.
DOCUMENT CONTENT:
"""
${safeText}
"""

USER QUESTION:
"${userQuestion || 'What are the main insights in this document?'}"

Instructions:
1. Answer the user's question accurately based STRICTLY on the document content.
2. If the document does not contain enough info, state this clearly.
3. Cite relevant sections or headers where applicable.
`.trim();
        case 'summarize':
            return `
You are Beemim analyzing this document.
DOCUMENT CONTENT:
"""
${safeText}
"""

Provide an executive, high-impact summary:
- Document Overview / Purpose (2-3 sentences)
- Core Themes / Key Sections
- Bulleted Key Takeaways
- Conclusions or Recommended Actions
`.trim();
        case 'extract_points':
            return `
Extract all important facts, definitions, dates, and core points from the following document into structured, easy-to-read bullet points:
"""
${safeText}
"""
`.trim();
        case 'generate_notes':
            return `
Transform the following document into comprehensive, structured revision notes for students or professionals:
- Main Headings & Subheadings
- Key Definitions and Formulas
- Summary Tables or Comparison points
- Quick Revision Checklist

DOCUMENT:
"""
${safeText}
"""
`.trim();
        case 'generate_mcqs':
            return `
Read the following document and generate 10 high-quality Multiple Choice Questions (MCQs) with 4 options each (A, B, C, D), marking the correct answer and providing an explanation for each. Return in clean Markdown.

DOCUMENT:
"""
${safeText}
"""
`.trim();
        default:
            return `Analyze the following document and provide helpful insights:\n\n${safeText}`;
    }
}

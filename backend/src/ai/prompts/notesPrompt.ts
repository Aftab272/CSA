/**
 * BEEMIM NOTES & FLASHCARDS PROMPTS
 * =================================
 */

export function buildNotesPrompt(topic: string, level: string = 'intermediate'): string {
  return `
You are Beemim Study Engine by Creative Stack Agency.
Create structured, beautiful study revision notes on: "${topic}" (${level} level).

Structure:
# ${topic} — Comprehensive Study Notes
## 1. Overview & Core Concept
## 2. Key Terminology & Definitions
## 3. Detailed Breakdown & Mechanisms
## 4. Examples & Real-world Applications
## 5. Common Pitfalls & Mistakes to Avoid
## 6. Quick Review Checklist

Use clean Markdown formatting.
`.trim();
}

export function buildFlashcardsPrompt(topic: string, count: number = 6): string {
  return `
Create ${count} high-yield flashcards for studying "${topic}".
CRITICAL: Reply ONLY in valid JSON array format:
[
  {
    "id": 1,
    "front": "Question or term on front of flashcard",
    "back": "Clear, concise answer or definition on back"
  }
]
`.trim();
}

export function buildPracticeQuestionPrompt(topic: string, previousAnswer?: string): string {
  if (previousAnswer) {
    return `
The user submitted this answer for a practice question on "${topic}":
"${previousAnswer}"

Evaluate their answer:
1. Score out of 10
2. Strengths of their answer
3. Missing points or mistakes
4. Model ideal answer
5. Follow-up practice question
`.trim();
  }

  return `
Provide an engaging practice question for a student studying "${topic}". Ask them to solve or explain it, and tell them to reply with their answer for immediate grading and feedback.
`.trim();
}

/**
 * BEEMIM QUIZ & MCQ GENERATOR PROMPTS
 * ===================================
 * Generates interactive quizzes in structured JSON format.
 */
export function buildQuizPrompt(params) {
    const { topic, difficulty = 'intermediate', questionCount = 5, questionType = 'mcq' } = params;
    return `
You are Beemim Quiz Engine by Creative Stack Agency.
Create an interactive quiz on the topic: "${topic}".
Difficulty: ${difficulty}.
Total Questions: ${questionCount}.
Format: ${questionType}.

CRITICAL: You MUST reply ONLY with a valid JSON object matching this exact schema:
{
  "title": "Quiz Title",
  "topic": "${topic}",
  "difficulty": "${difficulty}",
  "questions": [
    {
      "id": 1,
      "question": "Question text here",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 0,
      "explanation": "Detailed explanation of why this answer is correct."
    }
  ]
}

Rules:
1. "correctAnswer" must be the 0-indexed number of the correct option (0, 1, 2, or 3).
2. Options must be clear, distinct, and unambiguous.
3. No Markdown codeblocks around the JSON if possible, just the raw JSON object.
`.trim();
}

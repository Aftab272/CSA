# Beemim AI Backend (Creative Stack Agency)

**Beemim (بیمِم)** is the dedicated, autonomous AI and digital utilities backend for **Creative Stack Agency** (`creativestackagency.dev`).

---

## 📁 Modular AI Structure (Customization Guide)

Aap apni marzi se Beemim ke rawaiye aur prompts ko edit kar sakte hain. Tamam instructions is folder mein hain:

```text
backend/src/ai/prompts/
├── systemPrompt.ts       <-- Beemim ki identity, tone aur rules
├── chatPrompt.ts         <-- General chat, coding aur math explanation rules
├── imagePrompt.ts        <-- Image question analyzer (paper solving, OCR, diagrams)
├── pdfPrompt.ts          <-- PDF summary aur document Q&A rules
├── quizPrompt.ts         <-- Interactive Quiz & MCQ structure (JSON schema)
├── notesPrompt.ts        <-- Structured study notes aur flashcards rules
└── writingPrompt.ts      <-- AI Writing (rewrite, grammar, expand, email)
```

Kisi bhi prompt ko customize karne ke liye sirf us file ko open karein aur apni marzi ka text ya rules likh dein!

---

## 🚀 Local Development Setup

1. **Navigate into the backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment:**
   Open `.env` and add your free Google Gemini API key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=3001
   ```

4. **Start in Development Mode:**
   ```bash
   npm run dev
   ```
   Backend `http://localhost:3001` par live ho jayega aur Vite frontend (`http://localhost:5173`) ke sath automatically proxy ke zariye connect rahega!

---

## 🌐 Hosting & Deployment Options

Yeh backend bilkul standalone hai aur kisi bhi cloud platform par host ho sakta hai:

### 1. Azure App Service / Azure Container Apps
* Dockerfile already included hai: `backend/Dockerfile`.
* Azure Portal se **Container App** ya **Web App (Node.js 20)** select karein aur repository connect karein.
* Application Settings mein `GEMINI_API_KEY` set karein.

### 2. Render / Railway / Heroku
* **Build Command:** `npm install && npm run build`
* **Start Command:** `npm start`
* **Port:** Auto-detected (environment variable `PORT`).

### 3. Cloudflare (Cloudflare Pages Functions / Workers)
* Backend standard REST JSON endpoints provide karta hai, jo Cloudflare reverse proxy ya worker ke through easily map ho sakta hai.

---

## 📡 API Endpoints Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health check & service status |
| `POST` | `/api/ai/chat` | General AI Assistant chat |
| `POST` | `/api/ai/vision` | Image question solver (file upload / base64) |
| `POST` | `/api/ai/pdf` | PDF & Document analysis / Q&A |
| `POST` | `/api/ai/quiz` | Interactive Quiz & MCQ generator |
| `POST` | `/api/ai/notes` | Study Notes generator |
| `POST` | `/api/ai/flashcards` | Study Flashcards generator |
| `POST` | `/api/ai/writing` | AI Writing & Grammar tools |
| `POST` | `/api/ai/image-gen` | Prompt to AI Image generator (Free) |
| `POST` | `/api/pdf-tools/merge` | Merge multiple PDFs |
| `POST` | `/api/pdf-tools/split` | Split / Extract PDF pages |
| `POST` | `/api/pdf-tools/image-to-pdf` | Convert images to PDF |

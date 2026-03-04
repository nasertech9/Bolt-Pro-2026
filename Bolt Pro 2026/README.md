# DimoAI | Bolt-Style Website Generator (2026 Edition)

DimoAI is a powerful, autonomous AI web architect that generates fully functional websites from simple text prompts.

## 🚀 Features

- **Prompt → Website**: Enter a description and watch DimoAI build the HTML, CSS, and JS.
- **Live Preview**: Real-time rendering of generated code in a sandboxed iframe.
- **Pro Code Editor**: Integrated Monaco Editor (VS Code engine) for manual refinements.
- **File Explorer**: Seamlessly navigate through generated project files.
- **Premium UI**: Modern, responsive dashboard with glassmorphism and smooth animations.

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, Tailwind CSS 4, Framer Motion, Lucide Icons.
- **AI Core**: Gemini 1.5 Flash via Vercel AI SDK (`ai`).
- **Editor**: Monaco Editor (`@monaco-editor/react`).

## 🚦 Getting Started

### 1. Prerequisites
- Node.js 18+
- A Gemini API Key from [Google AI Studio](https://aistudio.google.com/)

### 2. Installation
```bash
git clone <your-repo-url>
cd DimoAI
npm install
```

### 3. Configuration
Rename `.env.local.example` to `.env.local` and add your API key:
```env
GOOGLE_GENERATIVE_AI_API_KEY=your_actual_api_key_here
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to start generating.

## 📦 Deployment

This project is ready for deployment on **Vercel** or **Render**.
- **Vercel**: Simply import the repository and set the `GOOGLE_GENERATIVE_AI_API_KEY` environment variable.
- **Render**: Connect your repo, use `npm run build` as the build command, and `npm start` as the start command.

---
Built by Antigravity 2026.

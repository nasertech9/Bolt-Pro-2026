# Bolt Pro 2026 | AI Website Generator

A high-performance, autonomous AI web architect built with a split-architecture (Node.js + Vanilla JS).

## 🚀 Pro Features

- **Multi-Agent AI**: Simulates a Planner/Developer collaboration for better code.
- **Real-time Streaming**: Token-by-token streaming from Gemini for a "live builds" experience.
- **Monaco Editor Pro**: Integrated VS Code engine for professional editing.
- **Ultra-Fast Frontend**: Lightweight Vanilla JS (ES2026) for maximum performance.
- **Sandboxed Preview**: Safe execution of AI-generated scripts in an iframe.

## 📁 Project Structure

```text
bolt-simplified/
├── backend/
│   ├── index.js        # Express server with Streaming AI
│   └── package.json    # Backend dependencies
├── frontend/
│   ├── index.html      # Pro UI Dashboard
│   ├── style.css       # Premium Glassmorphism UI
│   └── app.js          # Core Streaming & Editor Logic
└── README.md
```

## 🛠️ Getting Started

### 1. Backend Setup
```bash
cd backend
npm install
# Add GOOGLE_GENERATIVE_AI_API_KEY to a .env file
npm start
```

### 2. Frontend Setup
Simply open `frontend/index.html` in your browser (Live Server recommended).
Ensure the backend is running at `http://localhost:3001`.

## 📦 Deployment

### Backend (Render/Vercel)
- Set Environment Variable: `GOOGLE_GENERATIVE_AI_API_KEY`.
- Build Command: `npm install`.
- Start Command: `node index.js`.

### Frontend (Any Static Host)
- Upload the `frontend/` folder.
- Update the API URL in `app.js` if deploying to production.

---
Built by Antigravity 2026.

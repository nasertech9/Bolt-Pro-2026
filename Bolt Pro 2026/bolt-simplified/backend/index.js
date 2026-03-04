import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.post('/api/generate', async (req, res) => {
    const { prompt } = req.json || req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    // Multi-Agent Simulation: System Prompt defines the "Architect" and "Developer" roles
    const system = `
    You are a Multi-Agent AI System acting as an Autonomous Web Architect.
    
    AGENT 1: PLANNER
    Identify the necessary components, layout, and color scheme for the requested website.
    
    AGENT 2: DEVELOPER
    Generate the high-quality HTML5, CSS3, and Vanilla JavaScript code.
    
    OUTPUT FORMAT:
    You must return a single JSON object.
    {
      "files": [
        { "path": "index.html", "content": "..." },
        { "path": "style.css", "content": "..." },
        { "path": "script.js", "content": "..." }
      ]
    }
    
    RULES:
    - Use modern, premium aesthetics (glassmorphism, vibrant gradients).
    - Ensure responsive design.
    - index.html must link to style.css and script.js.
    - Return ONLY the JSON object. No markdown blocks, no explanations.
  `;

    try {
        const result = streamText({
            model: google('gemini-1.5-flash'),
            system,
            prompt: `Website Request: ${prompt}`,
        });

        result.pipeDataStreamToResponse(res);
    } catch (error) {
        console.error('Generation Error:', error);
        res.status(500).json({ error: 'Failed to generate website' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Pro Backend running at http://localhost:${PORT}`);
});

import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const system = `
    You are an expert web developer that generates high-quality, modern, and responsive websites.
    The user will provide a prompt, and you must generate a set of files (HTML, CSS, and JS) that fulfill the request.
    
    CRITICAL RULES:
    1. Output ONLY a valid JSON object.
    2. The JSON object must have a "files" array.
    3. Each file object in the array must have "path" and "content" fields.
    4. Keep file paths simple (e.g., "index.html", "style.css", "script.js").
    5. Ensure the HTML links to the generated CSS and JS files correctly.
    6. Use modern CSS (Flexbox/Grid), clean typography (Google Fonts), and vibrant color palettes.
    7. Do NOT include any explanations outside the JSON object.
    
    Example format:
    {
      "files": [
        { "path": "index.html", "content": "<!DOCTYPE html>..." },
        { "path": "style.css", "content": "body { ... }" },
        { "path": "script.js", "content": "console.log('Hello');" }
      ]
    }
  `;

  const result = streamText({
    model: google('gemini-1.5-flash'),
    system,
    prompt: `Generate a website based on this prompt: ${prompt}`,
  });

  return result.toDataStreamResponse();
}

import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SimulationType } from "../types";

const SYSTEM_INSTRUCTION = `
You are an expert Educational Technologist and Frontend Engineer. 
Your goal is to convert STEM (Science, Technology, Engineering, Math) problems into interactive, self-contained HTML5 visualizations.

RULES:
1.  **Output Format**: Return ONLY raw HTML code. Do not use Markdown code blocks (no \`\`\`html). Do not include explanations outside the code.
2.  **Tech Stack**: Use HTML5 Canvas API for rendering and vanilla JavaScript for logic. Do not use external libraries (like p5.js or Matter.js) unless absolutely necessary for complex physics, to ensure the code is self-contained and reliable. If you use external libs, use a reliable CDN (cdnjs).
3.  **Layout**:
    *   Create a clean layout with a visualization area (Canvas) on the left/top.
    *   Create a "Control Panel" on the right/bottom with HTML inputs (sliders type="range", number inputs, buttons) to manipulate variables.
    *   Include a "Status" section showing real-time values (e.g., Velocity: 10m/s).
4.  **Styling**: Use internal CSS (<style> tag). Make it look clean, academic, and minimalist. Use white backgrounds for the canvas with subtle grid lines. Use legible fonts (Inter, system-ui).
5.  **Interactivity - EXTREMELY IMPORTANT**: 
    *   The simulation MUST be interactive. Changing inputs should update the canvas immediately.
    *   **MAXIMIZE CONTROLS**: Do not just create controls for variables mentioned in the prompt. Infer and expose *every possible parameter* that could be interesting to tweak. 
    *   Examples: If simulating a pendulum, add sliders for gravity, air resistance, rod length, mass, and initial angle. If simulating a projectile, add air density, wind speed, elasticity of ground, etc.
    *   Give the user "God Mode" capabilities to explore the physics engine.
6.  **Responsiveness**: The canvas should fit its container.
7.  **Content**: 
    *   Analyze the user's text and/or image input to determine the physical/mathematical scenario.
    *   Extract variables (mass, length, voltage, etc.) and create controls for them.
    *   Extract constants and constraints.
    *   Implement the physics/math logic in the render loop.
8.  **Comments**: Write all code comments in ENGLISH.

Example structure:
<html>
<head>
<style>...</style>
</head>
<body>
<div class="app-container">
  <div class="canvas-container"><canvas id="simCanvas"></canvas></div>
  <div class="controls">
    <!-- Controls generated based on problem, PLUS extra inferred parameters for deep exploration -->
  </div>
</div>
<script>
  // Physics engine and rendering logic (Comments in English)
</script>
</body>
</html>
`;

export const analyzeAndGenerateSimulation = async (
  promptText: string,
  imageFile: File | null,
  apiKey: string,
  model: string,
  baseUrl?: string,
  providerId?: string,
  apiPath?: string
): Promise<{ code: string; type: SimulationType }> => {
  
  try {
    const parts: any[] = [];

    // Add image if present
    if (imageFile) {
      const base64Data = await fileToGenerativePart(imageFile);
      parts.push({
        inlineData: {
          data: base64Data,
          mimeType: imageFile.type,
        },
      });
    }

    // Add text prompt
    parts.push({
      text: `Create an interactive simulation for this problem: "${promptText}". 
      If the input is sparse, infer a reasonable educational scenario. 
      Identify the category (Mechanics, Electricity, Geometry, Algebra) in the first comment line of the HTML.`
    });

    const useClient = providerId === 'gemini' && (!baseUrl || baseUrl.includes('generativelanguage.googleapis.com'));
    let responseText = '';

    if (useClient) {
      const client = new GoogleGenAI({ apiKey });
      const response: GenerateContentResponse = await client.models.generateContent({
        model: model || 'gemini-3-pro-preview', 
        contents: { parts },
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.3, 
        },
      });
      responseText = response.text || '';
    } else if (providerId === 'deepseek') {
      const urlBase = (baseUrl || 'https://api.deepseek.com').replace(/\/$/, '');
      const path = (apiPath || 'v1/chat/completions');
      const endpoint = `${urlBase}/${path}`;
      const body: any = {
        model: model || 'deepseek-chat',
        messages: [
          { role: 'system', content: SYSTEM_INSTRUCTION },
          { role: 'user', content: `Create an interactive simulation for this problem: "${promptText}". If the input is sparse, infer a reasonable educational scenario. Identify the category in the first comment line.` }
        ],
        temperature: 0.3
      };
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
        body: JSON.stringify(body)
      });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errText}`);
      }
      const data: any = await res.json();
      responseText = data.choices?.[0]?.message?.content || '';
    } else if (providerId === 'aliyun') {
      const urlBase = (baseUrl || 'https://dashscope.aliyuncs.com').replace(/\/$/, '');
      const path = (apiPath || 'v1/chat/completions');
      const endpoint = `${urlBase}/${path}`;
      const body: any = {
        model: model || 'qwen-plus',
        messages: [
          { role: 'system', content: SYSTEM_INSTRUCTION },
          { role: 'user', content: `Create an interactive simulation for this problem: "${promptText}". If the input is sparse, infer a reasonable educational scenario. Identify the category in the first comment line.` }
        ],
        temperature: 0.3
      };
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
        body: JSON.stringify(body)
      });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errText}`);
      }
      const data: any = await res.json();
      responseText = data.choices?.[0]?.message?.content || data.output_text || '';
    } else if (providerId === 'openai') {
      const urlBase = (baseUrl || 'https://api.openai.com').replace(/\/$/, '');
      const path = (apiPath || 'v1/chat/completions');
      const endpoint = `${urlBase}/${path}`;
      const body: any = {
        model: model || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_INSTRUCTION },
          { role: 'user', content: `Create an interactive simulation for this problem: "${promptText}". If the input is sparse, infer a reasonable educational scenario. Identify the category in the first comment line.` }
        ],
        temperature: 0.3
      };
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
        body: JSON.stringify(body)
      });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errText}`);
      }
      const data: any = await res.json();
      responseText = data.choices?.[0]?.message?.content || '';
    } else if (providerId === 'anthropic') {
      const urlBase = (baseUrl || 'https://api.anthropic.com').replace(/\/$/, '');
      const path = (apiPath || 'v1/messages');
      const endpoint = `${urlBase}/${path}`;
      const body: any = {
        model: model || 'claude-3-5-sonnet-20241022',
        system: SYSTEM_INSTRUCTION,
        max_tokens: 1024,
        messages: [
          { role: 'user', content: `Create an interactive simulation for this problem: "${promptText}". If the input is sparse, infer a reasonable educational scenario. Identify the category in the first comment line.` }
        ]
      };
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
        body: JSON.stringify(body)
      });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errText}`);
      }
      const data: any = await res.json();
      const pieces = Array.isArray(data.content) ? data.content.map((p: any) => p.text || '').join('') : '';
      responseText = pieces || data.output_text || '';
    } else {
      const urlBase = (baseUrl || 'https://generativelanguage.googleapis.com').replace(/\/$/, '');
      const path = (apiPath || 'v1beta/models/{model}:generateContent').replace('{model}', model || 'gemini-3-pro-preview');
      const endpoint = `${urlBase}/${path}?key=${encodeURIComponent(apiKey)}`;
      const body = {
        contents: [{ parts }],
        systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
        generationConfig: { temperature: 0.3 }
      };
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errText}`);
      }
      const data: any = await res.json();
      responseText = data.candidates?.[0]?.content?.parts?.map((p: any) => p.text || '').join('') || data.output_text || '';
    }

    let code = responseText || '';

    // Clean up potential markdown formatting if the model disobeys
    code = code.replace(/```html/g, '').replace(/```/g, '');

    // Simple heuristic to guess type based on content if not explicitly parsed
    let type = SimulationType.UNKNOWN;
    const lowerCode = code.toLowerCase();
    if (lowerCode.includes('gravity') || lowerCode.includes('mass') || lowerCode.includes('velocity')) type = SimulationType.MECHANICS;
    else if (lowerCode.includes('voltage') || lowerCode.includes('resistor') || lowerCode.includes('charge')) type = SimulationType.ELECTRICITY;
    else if (lowerCode.includes('triangle') || lowerCode.includes('angle') || lowerCode.includes('polygon')) type = SimulationType.GEOMETRY;
    else if (lowerCode.includes('function') || lowerCode.includes('equation') || lowerCode.includes('slope')) type = SimulationType.ALGEBRA;

    return { code, type };

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Failed to generate simulation.");
  }
};

export async function testGeminiKey(apiKey: string, model: string): Promise<void> {
  const urlBase = 'https://generativelanguage.googleapis.com';
  const path = `v1beta/models/${model || 'gemini-3-pro-preview'}:generateContent`;
  const endpoint = `${urlBase}/${path}?key=${encodeURIComponent(apiKey)}`;
  const body = { contents: [{ parts: [{ text: 'ping' }] }] };
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}

// Helper to convert File to Base64
async function fileToGenerativePart(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(',')[1];
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

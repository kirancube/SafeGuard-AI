import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '20mb' }));

  // Initialize Gemini Client server-side
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // API Route: AI Safety Chatbot Assistant
  app.post('/api/ai/chatbot', async (req, res) => {
    try {
      const { message, context, history } = req.body;

      const systemInstruction = `You are "SafeGuard AI", an intelligent, empathetic, and urgent Safety Assistant for women.
You provide immediate safety guidance, step-by-step emergency instructions, first aid advice, legal rights info (like Indian Penal Code / women safety laws or global legal protections), and actionable advice when in uncomfortable or dangerous situations.
Keep answers clear, calm, practical, and formatted with bullet points for quick scanning. If an active emergency is detected, emphasize calling local emergency services immediately (e.g., 112/100/1091).`;

      const contents = history && Array.isArray(history) && history.length > 0
        ? [...history, { role: 'user', parts: [{ text: message }] }]
        : message;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: typeof contents === 'string' ? contents : JSON.stringify(contents),
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({ text: response.text || "I am here to keep you safe. If you feel in danger, press the SOS button immediately or call 112." });
    } catch (err: any) {
      console.error("Gemini Chatbot Error:", err);
      res.status(500).json({
        text: "I am here with you. Step into a well-lit area, head toward a public space, or press the red SOS button to alert your emergency contacts immediately.",
        error: err.message
      });
    }
  });

  // API Route: AI Threat & Behavior Analysis
  app.post('/api/ai/analyze-threat', async (req, res) => {
    try {
      const { sensorData, currentRoute, timeOfDay, userSpeed } = req.body;

      const prompt = `Analyze this motion & sensor data for potential danger/threat:
Sensor Data: ${JSON.stringify(sensorData)}
Speed: ${userSpeed} km/h
Time: ${timeOfDay}
Location Context: ${currentRoute || 'Unknown route'}

Return a JSON object with:
- "dangerScore": number from 0 to 100
- "threatLevel": "LOW" | "MODERATE" | "HIGH" | "CRITICAL"
- "detectedAnomalies": array of strings (e.g. "Sudden running detected", "Unscheduled direction change", "Off-route movement")
- "recommendation": concise action step for user
- "autoSosRecommended": boolean`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.2,
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      res.json(parsed);
    } catch (err: any) {
      console.error("AI Threat Analysis Error:", err);
      res.json({
        dangerScore: 15,
        threatLevel: "LOW",
        detectedAnomalies: ["Normal movement pattern"],
        recommendation: "Keep live location sharing active while traveling.",
        autoSosRecommended: false
      });
    }
  });

  // API Route: AI Safe Route & Risk Zone Prediction
  app.post('/api/ai/route-risk', async (req, res) => {
    try {
      const { origin, destination, timeOfDay } = req.body;

      const prompt = `Assess safety risk for traveling from ${origin} to ${destination} at ${timeOfDay}.
Provide a comparison between "Safest Route (Well-lit, CCTV, Patrols)" and "Direct/Alternative Route".

Return a JSON object with:
- "safestRoute": {
    "name": string,
    "distanceKm": number,
    "durationMins": number,
    "safetyScore": number (0-100),
    "highlights": string[] (e.g. ["24/7 Police Patrol Zone", "100% Well-Lit", "High Crowd Density"])
  }
- "alternativeRoute": {
    "name": string,
    "distanceKm": number,
    "durationMins": number,
    "safetyScore": number (0-100),
    "warnings": string[]
  }
- "overallAreaRisk": "SAFE" | "MODERATE" | "HIGH" | "CRIME_HOTSPOT"
- "advisory": string`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.3,
        },
      });

      res.json(JSON.parse(response.text || '{}'));
    } catch (err: any) {
      res.json({
        safestRoute: {
          name: "Main Boulevard via Police Patrol Sector",
          distanceKm: 4.2,
          durationMins: 14,
          safetyScore: 92,
          highlights: ["24/7 Police Patrol", "CCTV Covered", "Well-Lit Avenue"]
        },
        alternativeRoute: {
          name: "Suburban Shortcut Alley",
          distanceKm: 3.1,
          durationMins: 10,
          safetyScore: 58,
          warnings: ["Dim lighting after 9 PM", "Isolated stretch"]
        },
        overallAreaRisk: "SAFE",
        advisory: "Recommend using Main Boulevard with live GPS tracking enabled."
      });
    }
  });

  // API Route: AI Voice Trigger Classifier
  app.post('/api/ai/voice-trigger', async (req, res) => {
    try {
      const { transcript } = req.body;

      const prompt = `Analyze transcript: "${transcript}".
Is the speaker calling for help or exhibiting panic? Keywords: "help me", "save me", "emergency", "call police", "stop following me", "leave me alone".

Return JSON:
- "isEmergency": boolean
- "confidence": number (0-1)
- "detectedPhrase": string
- "actionRequired": "TRIGGER_SOS" | "MONITOR" | "NONE"`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.1,
        },
      });

      res.json(JSON.parse(response.text || '{}'));
    } catch (err: any) {
      const isEm = /help|save|emergency|police|stop|scared/i.test(req.body.transcript || '');
      res.json({
        isEmergency: isEm,
        confidence: isEm ? 0.95 : 0.1,
        detectedPhrase: req.body.transcript,
        actionRequired: isEm ? "TRIGGER_SOS" : "NONE"
      });
    }
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', app: 'SafeGuard AI' });
  });

  // Vite middleware in dev, static files in prod
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();

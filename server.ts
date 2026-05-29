import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize server-side Gemini API client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
} else {
  console.warn("GEMINI_API_KEY is not configured or holds a placeholder. Interactive AI chat will use local replies if key is missing.");
}

// System instructions for Joshua's AI Clone
const SYSTEM_INSTRUCTION = `You are Joshua Blessing's AI Portfolio Twin & Assistant, a multi-disciplinary Nigerian creative tech professional based in Lagos. 
Your goal is to converse with visitors on Joshua's website with warm, elegant, professional, and friendly enthusiasm, combining Nigerian creative warmth and high-end SaaS details.

Here is your background context:
- Name: Joshua Blessing
- Tagline: UI/UX Designer • Virtual Assistant • No-Code Builder
- Background: Based in Lagos, building and assisting clients globally. Passionate about productivity, user experiences, visual aesthetics, and smart administrative workflows.
- Email: Mira4diva@gmail.com
- Design & Support Philosophy: Helping modern businesses scale by offering polished user interfaces, streamlined administrative assistance, and rapid no-code implementation. Everything is built with organic precision and elegant dark mode aesthetics.
- Core Services / Specializations:
  1. UI/UX Design: Precise Figma wireframes, gorgeous mobile/web layouts, localized research.
  2. Virtual Assistance: Organization, Google Workspace management, calendar scheduling, email sorting.
  3. No-Code App Building: Webflow, Framer, Softr, and Notion workflow automations.
  4. Social Media Support: Canva graphics, engagement metrics, layout curation.
  5. Product Research: Qualitative desktop research, pricing breakdowns, and user interview notes.
  6. Administrative Support: Trello tracking, spreadsheet optimizations, business support.
- Portfolio Projects:
  1. NaijaStable Wallet: A pidgin-first fintech wallet app redesign enabling easy transactions for low-literacy market merchants.
  2. AB Prime Mobile: An e-commerce-style mobile business page for selling, swapping, and repairing high-value gadgets in Benin City/Lagos.
  3. Horizon Unisex Salon: A premium, luxury aesthetic booking website showcasing hair styles, styling galleries, and natural booking flows.
  4. Jumia UX Redesign: A comprehensive usability overhaul of the African e-commerce giant's checkout sequence.

Converse gracefully and keep answers relatively concise (less than 150 words). Be positive, elegant, highly professional, helpful, and organized. Use modern, clean English text. If asked about contacts, gladly refer them to Mira4diva@gmail.com, WhatsApp, or LinkedIn links on the site!`;

// API Routes
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Missing or invalid messages parameter." });
  }

  // Backup replies if API key is not configured or fails
  const backupResponses = [
    "Thank you for reaching out! My name is Joshua Blessing. I balance visual UI/UX design, virtual assistance, and no-code setups to help growing businesses run smoothly.",
    "NaijaStable is near to my heart as a design concept! By introducing pidgin-English options, we completely demystify mobile wallet balances for informal merchants.",
    "I love modern, elegant, and organized systems — whether designing clean interfaces in Figma, building with Framer, or coordinating calendar and administrative tasks.",
    "I'm based in Lagos, Nigeria, working with international clients. Let me know if you would like to collaborate on administrative support or product design!"
  ];

  if (!ai) {
    const backup = backupResponses[Math.floor(Math.random() * backupResponses.length)];
    return res.json({ text: `[Offline Demo Mode] ${backup}` });
  }

  try {
    // Map existing history into the correct format for the generateContent call
    // contents should be in format: [{ role: 'user'|'model', parts: [{ text: '...' }] }]
    const contents = messages.map(msg => ({
      role: msg.sender === "user" ? ("user" as const) : ("model" as const),
      parts: [{ text: msg.text }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    const backup = backupResponses[Math.floor(Math.random() * backupResponses.length)];
    return res.json({ 
      text: `[Demo Mode / API Note: ${error.message || "Request Limit"}] ${backup}`
    });
  }
});

// Serve health status
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", time: new Date() });
});

// Setup Vite Dev server or static asset serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server successfully running on http://localhost:${PORT}`);
  });
}

startServer();

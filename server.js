// server.js

import express from "express";
import { runSQLAgent } from "./agent.js"; // Custom AI agent to handle SQL logic

// PostgreSQL connection

const app = express();
app.use(express.json()); // <-- This is critical

app.post("/ai", async (req, res) => {
  console.log(req.body);
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  try {
    const response = await runSQLAgent(message);
    res.json({ result: response });
  } catch (err) {
    console.error("Agent Error:", err);
    res.status(500).json({ error: err.message || "Unknown error" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

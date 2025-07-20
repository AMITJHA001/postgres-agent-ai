// agent.js
import pool from "./db.js";

import { callOllama } from "./llm/ollama.js";

export async function runSQLAgent(message) {
  const prompt = `
You are a PostgreSQL SQL assistant.

Convert the user's message into a SQL query.
Wrap the result in JSON only like:
{ "sql": "YOUR_QUERY_HERE" }

Examples:
User: Show all high priority tasks
→ { "sql": "SELECT * FROM tasks WHERE priority = 'high';" }

User: Mark task with id 2 as completed
→ { "sql": "UPDATE tasks SET completed = true WHERE id = 2;" }

Only return the JSON object. Do not add explanation.

Message: "${message}"
`;

  const response = await callOllama(prompt);
  console.log(response);
  try {
    const match = response.response.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("No JSON found");

    const { sql } = JSON.parse(match[0]);

    const result = await pool.query(sql);
    return result.rows ?? result;
  } catch (err) {
    throw new Error("Agent failed: " + err.message);
  }
}

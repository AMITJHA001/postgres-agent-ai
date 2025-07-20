// runAgent.js
import { runSQLAgent } from "./agent.js";

const test = async () => {
  const message = "Get all pending tasks with high priority";
  const result = await runSQLAgent(message);
  console.log("🟢 Query Result:\n", result);
};

test();

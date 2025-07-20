# 🧠 Postgres Agent AI

A local AI-powered agent that answers natural language questions using PostgreSQL as its data source. Built using **Node.js**, **Vue 3**, **LangChain**, **Ollama**, and **pg**.

---

## 📦 Features

- 🔍 Ask natural language queries and get precise answers from your PostgreSQL DB
- 🧠 Powered by Ollama + LangChain for LLM-based intelligence
- 🖥️ Simple and clean Vue 3 frontend with role-based access (e.g., customer, manager, admin)
- ⚙️ Custom agents with business logic and memory
- 🗄️ Local database integration using `pg` (Node PostgreSQL client)

---

## 📁 Project Structure

postgres-agent-ai/
│
├── ai-backend/ # Node.js server with LangChain + Ollama agent
│ └── agent.js
│ └── db.js
│ └── server.js
│
├── frontend/ # Vue 3 frontend (Vite setup)
│ └── src/
│ └── components/
│ └── App.vue
│ └── main.js

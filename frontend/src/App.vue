<template>
  <div class="container">
    <h1>AI Task Agent</h1>

    <textarea
      v-model="message"
      placeholder="Ask me anything..."
      rows="3"
    ></textarea>

    <button @click="askAgent" :disabled="loading">
      {{ loading ? "Loading..." : "Submit" }}
    </button>

    <div v-if="loading" class="loader"></div>

    <table v-if="responseData && !loading" class="response-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Priority</th>
          <th>Status</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in responseData" :key="task.id">
          <td>{{ task.title }}</td>
          <td>{{ task.description }}</td>
          <td>{{ task.priority }}</td>
          <td>
            <span :class="task.completed ? 'text-green' : 'text-red'">
              {{ task.completed ? "Yes" : "No" }}
            </span>
          </td>
          <td>{{ formatDate(task.created_at) }}</td>
        </tr>
      </tbody>
    </table>

    <div v-if="!loading && responseText" class="response-box">
      <pre>{{ responseText }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const message = ref("");
const responseText = ref("");
const responseData = ref(null);
const loading = ref(false);

const askAgent = async () => {
  if (!message.value.trim()) return;

  loading.value = true;
  responseText.value = "";
  responseData.value = null;

  try {
    const res = await fetch("http://localhost:3000/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: message.value }),
    });

    const data = await res.json();
    console.log(data.result);

    if (Array.isArray(data.result)) {
      responseData.value = data.result;
    } else {
      responseText.value = JSON.stringify(data.result, null, 2);
    }
  } catch (err) {
    responseText.value = "Error: " + err.message;
  } finally {
    loading.value = false;
  }
};

const formatDate = (isoDate) =>
  new Date(isoDate).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
</script>

<style scoped>
.container {
  max-width: 700px;
  margin: 2rem auto;
  font-family: sans-serif;
  text-align: center;
}

textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 1rem;
  font-size: 1rem;
}

button {
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 1rem;
}

.loader {
  margin: 20px auto;
  border: 6px solid #f3f3f3;
  border-top: 6px solid #333;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.response-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.response-table th,
.response-table td {
  border: 1px solid #ccc;
  padding: 8px 12px;
  text-align: left;
}

.response-box {
  margin-top: 2rem;
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
  text-align: left;
  color: #333;
}

.text-green {
  color: green;
}

.text-red {
  color: red;
}
/*  */
</style>

async function callOllama(prompt, model = "llama3.2:latest") {
  const res = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      prompt,
      stream: false,
    }),
  });

  const data = await res.json();
  console.log(data);
  return data;
}

export { callOllama };

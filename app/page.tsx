"use client";

import { useEffect, useState } from "react";

type Todo = { id: number; title: string; done: boolean };

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadTodos() {
    const res = await fetch("/api/todos", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to load todos");
    const data = (await res.json()) as Todo[];
    setTodos(data);
  }

  useEffect(() => {
    loadTodos().catch(console.error);
  }, []);

  async function addTodo(e: React.FormEvent) {
    e.preventDefault();
    const t = title.trim();
    if (!t) return;

    setLoading(true);
    try {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: t }),
      });

      if (!res.ok) {
        console.error(await res.text());
        return;
      }

      const created = (await res.json()) as Todo;``
      setTodos((prev) => [...prev, created]);
      setTitle("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: 24, fontFamily: "system-ui, sans-serif", maxWidth: 720 }}>
      <h1>Todo app</h1>

      <form onSubmit={addTodo} style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nieuwe todo..."
          style={{
            flex: 1,
            padding: "10px 12px",
            borderRadius: 8,
            border: "1px solid #ccc",
          }}
        />
        <button
          disabled={loading}
          style={{
            padding: "10px 14px",
            borderRadius: 8,
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        >
          {loading ? "..." : "Add"}
        </button>
      </form>

      <ul style={{ marginTop: 16, paddingLeft: 18 }}>
        {todos.map((t) => (
          <li key={t.id}>{t.title}</li>
        ))}
      </ul>

      <p style={{ marginTop: 16, opacity: 0.7 }}>
       dit werkt via een database. nice!
      </p>
    </main>
  );
}
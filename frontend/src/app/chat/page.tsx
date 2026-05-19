"use client";

import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react";

const initialMessages = [
  { role: "ai", content: "Hi! I am your MentorMind assistant. I have context from your previous sessions about your React learning journey and portfolio project. How can I help you today?" },
];

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function ChatPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [memories, setMemories] = useState<string[]>([]);
  const [runtime, setRuntime] = useState({ model: "", reason: "", latency: "" });
  const [logs, setLogs] = useState<{ question: string; model: string; reason: string }[]>([]);

  const loadMemories = async () => {
    const response = await fetch(`${API_URL}/memories`);
    const data = await response.json();
    setMemories(data.memories);
  };

  useEffect(() => {
    loadMemories();
    const savedLogs = localStorage.getItem("runtimeLogs");
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs));
    }
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = input;
    setMessages([...messages, { role: "user", content: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const startTime = Date.now();
      const response = await fetch(`${API_URL}/chat?msg=` + encodeURIComponent(userMessage));
      const data = await response.json();
      const latency = ((Date.now() - startTime) / 1000).toFixed(2) + "s";
      setMessages((prev) => [...prev, { role: "ai", content: data.reply }]);
      setRuntime({
        model: data.model || "unknown",
        reason: data.reason || "unknown",
        latency: latency
      });
      const newLogs = [...logs, { question: userMessage, model: data.model || "unknown", reason: data.reason || "unknown" }];
      setLogs(newLogs);
      localStorage.setItem("runtimeLogs", JSON.stringify(newLogs));
      await loadMemories();
    } catch (error) {
      console.log(error);
      setMessages((prev) => [...prev, { role: "ai", content: "Sorry, I encountered an error. Please try again." }]);
    }

    setLoading(false);
  };

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="app-content">
        <div className="chat-shell">
          <div className="chat-main">
            <div className="page-header">
              <h1>Chat</h1>
              <p>Your AI mentor with full memory context</p>
            </div>
            <div className="chat-messages">
              {messages.map((msg, i) => (
                <div key={i} className={`message ${msg.role}`}>
                  {msg.content}
                </div>
              ))}
              {loading && <div className="message ai">MentorMind thinking...</div>}
            </div>
            <div className="chat-input-area">
              <textarea
                className="chat-input"
                placeholder="Ask anything about your goals, projects, or growth..."
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
              />
              <button className="button-primary" onClick={handleSend} style={{ padding: "0 20px" }}>
                Send
              </button>
            </div>
          </div>

          <div className="card" style={{ padding: "20px", height: "fit-content" }}>
            <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "16px" }}>Memory context</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {memories.length === 0 ? (
                <p style={{ color: "var(--subtle)", fontSize: "13px" }}>No memories yet. Start chatting to build context.</p>
              ) : (
                memories.map((memory, index) => (
                  <div key={index} style={{ padding: "12px", border: "1px solid var(--line)", borderRadius: "6px", fontSize: "13px" }}>
                    <span style={{ color: "var(--subtle)" }}>Recall</span>
                    <p style={{ margin: "4px 0 0", fontWeight: "600" }}>{memory}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
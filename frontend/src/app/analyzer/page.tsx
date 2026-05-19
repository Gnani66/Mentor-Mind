"use client";

import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function AnalyzerPage() {
  const [analyzing, setAnalyzing] = useState(false);
  const [done, setDone] = useState(false);
  const [memories, setMemories] = useState<string[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/memories`)
      .then(res => res.json())
      .then(data => {
        setMemories(data.memories);
        if (data.memories.length > 0) {
          setDone(true);
        }
      });
  }, []);

  const currentSkills = memories.length > 0 
    ? ["Learning", "Communication", "Goal Setting", "Self-reflection"]
    : [];
  const missingSkills = memories.length === 0 
    ? ["Start chatting to analyze your skills"] 
    : ["Add more context for detailed analysis"];

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setDone(true);
    }, 2000);
  };

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="app-content">
        <div className="page-header">
          <h1>Skill Gap Analyzer</h1>
          <p>Identify and bridge your skill gaps</p>
        </div>

        <div className="analyzer-shell">
          <div className="analyzer-section">
            <h2>Analysis</h2>
            {!done ? (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <p style={{ color: "var(--muted)", marginBottom: "24px" }}>Upload your code or link your portfolio to analyze your current skill level</p>
                <button className="button-primary" onClick={handleAnalyze} disabled={analyzing}>
                  {analyzing ? "Analyzing..." : "Start analysis"}
                </button>
              </div>
            ) : (
              <>
                <p style={{ fontSize: "14px", color: "var(--muted)", marginBottom: "16px" }}>Analysis complete. Based on your projects and goals.</p>
                <h3 style={{ fontSize: "14px", fontWeight: "600", marginBottom: "12px" }}>Your current skills</h3>
                <div style={{ marginBottom: "24px" }}>
                  {currentSkills.length === 0 ? (
                    <p style={{ color: "var(--subtle)", fontSize: "14px" }}>Start chatting to see your skills</p>
                  ) : (
                    currentSkills.map((s) => (
                      <span key={s} className="skill-tag">{s}</span>
                    ))
                  )}
                </div>
                <h3 style={{ fontSize: "14px", fontWeight: "600", marginBottom: "12px" }}>Skills to develop</h3>
                <div>
                  {missingSkills.map((s) => (
                    <span key={s} className="skill-tag missing">{s}</span>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="analyzer-section">
            <h2>Learning roadmap</h2>
            {memories.length === 0 ? (
              <p style={{ color: "var(--subtle)", fontSize: "14px" }}>Start building context to generate your personalized roadmap.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ padding: "16px", border: "1px solid var(--line)", borderRadius: "6px" }}>
                  <span style={{ fontSize: "12px", color: "var(--clay)", fontWeight: "600" }}>Based on your memories</span>
                  <p style={{ fontSize: "14px", margin: "8px 0 4px" }}>Your roadmap will be personalized based on {memories.length} conversation(s)</p>
                  <span style={{ fontSize: "12px", color: "var(--subtle)" }}>Active</span>
                </div>
                <div style={{ padding: "16px", border: "1px solid var(--line)", borderRadius: "6px" }}>
                  <span style={{ fontSize: "12px", color: "var(--clay)", fontWeight: "600" }}>Next step</span>
                  <p style={{ fontSize: "14px", margin: "8px 0 4px" }}>Continue chatting to build more context</p>
                  <span style={{ fontSize: "12px", color: "var(--subtle)" }}>In Progress</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
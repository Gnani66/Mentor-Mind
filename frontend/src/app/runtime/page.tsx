"use client";

import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react";

export default function RuntimePage() {
  const [logs, setLogs] = useState<{ question: string; model: string; reason: string }[]>([]);

  useEffect(() => {
    const savedLogs = localStorage.getItem("runtimeLogs");
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs));
    }
  }, []);

  const metrics = [
    { label: "API calls today", value: logs.length.toString(), trend: logs.length > 0 ? "Active" : "No calls" },
    { label: "Total memories", value: "Based on chat", trend: "Dynamic" },
    { label: "Active sessions", value: "1", trend: "Current" },
    { label: "Reflection patterns", value: logs.length > 0 ? "Active" : "None", trend: logs.length > 0 ? "Detected" : "None" },
  ];

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="app-content">
        <div className="page-header">
          <h1>Runtime Dashboard</h1>
          <p>System performance and activity monitoring</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
          <div className="card" style={{ padding: "20px" }}>
            <p style={{ fontSize: "12px", color: "var(--subtle)", marginBottom: "8px" }}>Model Used</p>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>{logs.length > 0 ? logs[logs.length - 1].model : "—"}</h2>
          </div>
          <div className="card" style={{ padding: "20px" }}>
            <p style={{ fontSize: "12px", color: "var(--subtle)", marginBottom: "8px" }}>Reason</p>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>{logs.length > 0 ? logs[logs.length - 1].reason : "—"}</h2>
          </div>
          <div className="card" style={{ padding: "20px" }}>
            <p style={{ fontSize: "12px", color: "var(--subtle)", marginBottom: "8px" }}>Total Queries</p>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>{logs.length}</h2>
          </div>
          <div className="card" style={{ padding: "20px" }}>
            <p style={{ fontSize: "12px", color: "var(--subtle)", marginBottom: "8px" }}>System Status</p>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>Active</h2>
          </div>
        </div>

        <div className="card" style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>Routing History</h2>
          {logs.length === 0 ? (
            <p style={{ color: "var(--subtle)" }}>No routing history yet. Start a conversation in the Chat page.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--line)" }}>
                  <th style={{ textAlign: "left", padding: "12px", fontSize: "12px", color: "var(--subtle)" }}>Question</th>
                  <th style={{ textAlign: "left", padding: "12px", fontSize: "12px", color: "var(--subtle)" }}>Model</th>
                  <th style={{ textAlign: "left", padding: "12px", fontSize: "12px", color: "var(--subtle)" }}>Reason</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid var(--line)" }}>
                    <td style={{ padding: "12px", fontSize: "14px" }}>{log.question}</td>
                    <td style={{ padding: "12px", fontSize: "14px" }}>{log.model}</td>
                    <td style={{ padding: "12px", fontSize: "14px", color: "var(--muted)" }}>{log.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="metrics-grid">
          {metrics.map((m) => (
            <div key={m.label} className="stat-card">
              <h3>{m.label}</h3>
              <p className="value">{m.value}</p>
              <span className="label">{m.trend}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
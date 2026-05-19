"use client";

import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState({ activeGoals: 0, savedInsights: 0, readinessScore: 0 });
  const [activity, setActivity] = useState<{ title: string; time: string; type: string }[]>([]);
  const [memories, setMemories] = useState<string[]>([]);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  useEffect(() => {
    fetch(`${API_URL}/stats`)
      .then(res => res.json())
      .then(data => setStats(data));

    fetch(`${API_URL}/activity`)
      .then(res => res.json())
      .then(data => setActivity(data.activity));

    fetch(`${API_URL}/memories`)
      .then(res => res.json())
      .then(data => setMemories(data.memories));
  }, []);

  const recommendations = memories.length > 0 
    ? [
        { text: `Review your recent conversation about: ${memories[memories.length - 1].substring(0, 40)}...`, priority: "high" },
        { text: "Continue building on your progress", priority: "medium" },
        { text: "Explore new topics with your mentor", priority: "low" },
      ]
    : [
        { text: "Start a conversation to build your growth context", priority: "high" },
        { text: "Share your goals with MentorMind", priority: "medium" },
        { text: "Ask about skill development", priority: "low" },
      ];

  const quickActions = [
    { label: "Start new chat", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z", action: () => router.push("/chat") },
    { label: "View timeline", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", action: () => router.push("/timeline") },
    { label: "Check runtime", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", action: () => router.push("/runtime") },
  ];

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="app-content">
        <div className="dashboard-layout">
          <div className="dashboard-main">
            <div className="page-header">
              <h1>Dashboard</h1>
              <p>Your growth operating system at a glance</p>
            </div>

            <div className="dashboard-grid">
              <div className="stat-card">
                <h3>Active goals</h3>
                <p className="value">{stats.activeGoals}</p>
                <span className="label">From memories</span>
              </div>
              <div className="stat-card">
                <h3>Saved insights</h3>
                <p className="value">{stats.savedInsights}</p>
                <span className="label">Total memories</span>
              </div>
              <div className="stat-card">
                <h3>Readiness score</h3>
                <p className="value">{stats.readinessScore}</p>
                <span className="label">Based on activity</span>
              </div>
            </div>

            <div className="dashboard-row">
              <div className="card">
                <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "20px" }}>Recent activity</h2>
                {activity.length === 0 ? (
                  <p style={{ color: "var(--subtle)", fontSize: "14px" }}>Start chatting to build your activity history.</p>
                ) : (
                  activity.map((item, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "14px 0", borderBottom: i < activity.length - 1 ? "1px solid var(--line)" : "none" }}>
                      <span style={{ fontSize: "14px" }}>{item.title}</span>
                      <span style={{ fontSize: "12px", color: "var(--subtle)" }}>{item.time}</span>
                    </div>
                  ))
                )}
              </div>

              <div className="card">
                <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "20px" }}>Recommendations</h2>
                {recommendations.map((rec, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "14px 0", borderBottom: i < recommendations.length - 1 ? "1px solid var(--line)" : "none" }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "999px", background: rec.priority === "high" ? "var(--brand)" : rec.priority === "medium" ? "var(--clay)" : "var(--subtle)", marginTop: "6px", flexShrink: 0 }} />
                    <span style={{ fontSize: "14px" }}>{rec.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card" style={{ marginTop: "24px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "20px" }}>Today&apos;s briefing</h2>
              <p style={{ fontSize: "16px", color: "var(--muted)", marginBottom: "16px" }}>
                {memories.length > 0 
                  ? `You have ${memories.length} memories recorded. Keep building context for personalized guidance.`
                  : "Start your first conversation to build your growth context."}
              </p>
              <div style={{ display: "inline-flex", border: "1px solid rgba(183, 255, 106, 0.26)", borderRadius: "999px", padding: "10px 18px", color: "var(--brand)", fontSize: "14px", fontWeight: "600" }}>
                {stats.readinessScore} readiness
              </div>
            </div>
          </div>

          <aside className="dashboard-sidebar">
            <div className="card">
              <h2 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "20px" }}>Quick actions</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {quickActions.map((action) => (
                  <button key={action.label} onClick={action.action} className="button-secondary" style={{ justifyContent: "flex-start", gap: "12px", width: "100%", padding: "14px 16px" }}>
                    <svg aria-hidden="true" style={{ width: "18px", height: "18px" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d={action.icon} />
                    </svg>
                    {action.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="card" style={{ marginTop: "20px" }}>
              <h2 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "16px" }}>Memory stream</h2>
              {memories.length === 0 ? (
                <p style={{ fontSize: "13px", color: "var(--subtle)" }}>No memories yet. Start chatting to build context.</p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {memories.slice(-3).reverse().map((mem, i) => (
                    <div key={i} style={{ padding: "14px", border: "1px solid var(--line)", borderRadius: "6px" }}>
                      <span style={{ fontSize: "11px", color: "var(--subtle)", textTransform: "uppercase" }}>Memory {memories.length - i}</span>
                      <p style={{ fontSize: "14px", fontWeight: "600", margin: "4px 0 0" }}>{mem.substring(0, 40)}...</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
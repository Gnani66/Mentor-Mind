"use client";

import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function TimelinePage() {
  const [events, setEvents] = useState<{ num: string; title: string; desc: string; time: string }[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/timeline`)
      .then(res => res.json())
      .then(data => setEvents(data.events));
  }, []);

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="app-content">
        <div className="page-header">
          <h1>Memory Timeline</h1>
          <p>Your growth story captured over time</p>
        </div>

        <div className="timeline-shell">
          {events.length === 0 ? (
            <p style={{ color: "var(--subtle)", textAlign: "center", padding: "40px" }}>No events yet. Start chatting to build your timeline.</p>
          ) : (
            events.map((event) => (
              <div key={event.num} className="timeline-item">
                <div className="timeline-marker">{event.num}</div>
                <div className="timeline-content">
                  <h3>{event.title}</h3>
                  <p>{event.desc}</p>
                  <span className="meta">{event.time}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1000);
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-header">
          <div style={{ marginBottom: "16px", display: "flex", justifyContent: "center" }}>
            <span className="brand-mark" style={{ display: "inline-flex", width: "48px", height: "48px", alignItems: "center", justifyContent: "center", border: "1px solid rgba(183, 255, 106, 0.28)", borderRadius: "10px", background: "rgba(183, 255, 106, 0.12)", color: "var(--brand)", fontSize: "20px" }}>M</span>
          </div>
          <h1>Welcome back</h1>
          <p>Sign in to continue your growth journey</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email" className="input-label">Email address</label>
            <input
              id="email"
              type="email"
              className="input-field"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password" className="input-label">Password</label>
            <input
              id="password"
              type="password"
              className="input-field"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="button-primary" style={{ width: "100%", marginTop: "8px" }} disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="auth-footer">
          Do not have an account?<Link href="/auth/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
}
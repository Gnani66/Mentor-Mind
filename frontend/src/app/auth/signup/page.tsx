"use client";

import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1000);
  };

  return (
    <div className="auth-shell">
      <div className="auth-card" style={{ maxWidth: "480px" }}>
        <div className="auth-header">
          <div style={{ marginBottom: "16px", display: "flex", justifyContent: "center" }}>
            <span className="brand-mark" style={{ display: "inline-flex", width: "48px", height: "48px", alignItems: "center", justifyContent: "center", border: "1px solid rgba(183, 255, 106, 0.28)", borderRadius: "10px", background: "rgba(183, 255, 106, 0.12)", color: "var(--brand)", fontSize: "20px" }}>M</span>
          </div>
          <h1>Create your account</h1>
          <p>Start building your personal growth mentor</p>
        </div>

        <div className="step-indicator" style={{ display: "flex", gap: "8px", marginBottom: "32px" }}>
          {[1, 2, 3].map((s) => (
            <div key={s} style={{ flex: 1, height: "4px", borderRadius: "2px", background: s <= step ? "var(--brand)" : "var(--line)", transition: "background 220ms" }} />
          ))}
        </div>

        <form className="auth-form" onSubmit={(e) => { e.preventDefault(); step === 3 ? handleSubmit() : handleNext(); }}>
          {step === 1 && (
            <>
              <div className="input-group">
                <label htmlFor="name" className="input-label">Full name</label>
                <input id="name" type="text" className="input-field" placeholder="Alex Johnson" required />
              </div>
              <div className="input-group">
                <label htmlFor="email" className="input-label">Email address</label>
                <input id="email" type="email" className="input-field" placeholder="alex@company.com" required />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="input-group">
                <label htmlFor="password" className="input-label">Password</label>
                <input id="password" type="password" className="input-field" placeholder="Create a strong password" required />
              </div>
              <div className="input-group">
                <label htmlFor="confirm" className="input-label">Confirm password</label>
                <input id="confirm" type="password" className="input-field" placeholder="Confirm your password" required />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="input-group">
                <label htmlFor="role" className="input-label">Current role</label>
                <select id="role" className="input-field">
                  <option value="">Select your role</option>
                  <option value="engineer">Software Engineer</option>
                  <option value="designer">Product Designer</option>
                  <option value="manager">Product Manager</option>
                  <option value="lead">Tech Lead</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="input-group">
                <label htmlFor="goals" className="input-label">Primary goal</label>
                <select id="goals" className="input-field">
                  <option value="">What do you want to achieve?</option>
                  <option value="skills">Build new skills</option>
                  <option value="career">Advance career</option>
                  <option value="projects">Deliver better projects</option>
                  <option value="leadership">Develop leadership</option>
                </select>
              </div>
            </>
          )}

          <button type="submit" className="button-primary" style={{ width: "100%", marginTop: "8px" }} disabled={loading}>
            {loading ? "Creating account..." : step === 3 ? "Create account" : "Continue"}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?<Link href="/auth/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
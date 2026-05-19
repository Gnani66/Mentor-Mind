"use client";

import Sidebar from "@/components/Sidebar";
import { useState } from "react";

export default function ProfilePage() {
  const [toggles, setToggles] = useState({
    notifications: true,
    weeklyDigest: true,
    darkMode: false,
    publicProfile: false,
  });

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    role: "",
    company: "",
    goal: ""
  });

  const toggle = (key: keyof typeof toggles) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="app-content">
        <div className="page-header">
          <h1>Profile</h1>
          <p>Manage your account and preferences</p>
        </div>

        <div className="profile-section">
          <h2>Personal information</h2>
          <div className="profile-grid">
            <div className="input-group">
              <label className="input-label">Full name</label>
              <input 
                className="input-field" 
                placeholder="Enter your name"
                value={profile.fullName}
                onChange={(e) => setProfile({...profile, fullName: e.target.value})}
              />
            </div>
            <div className="input-group">
              <label className="input-label">Email</label>
              <input 
                className="input-field" 
                placeholder="Enter your email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
              />
            </div>
            <div className="input-group">
              <label className="input-label">Current role</label>
              <input 
                className="input-field" 
                placeholder="e.g. Software Engineer"
                value={profile.role}
                onChange={(e) => setProfile({...profile, role: e.target.value})}
              />
            </div>
            <div className="input-group">
              <label className="input-label">Company</label>
              <input 
                className="input-field" 
                placeholder="Enter your company"
                value={profile.company}
                onChange={(e) => setProfile({...profile, company: e.target.value})}
              />
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h2>Preferences</h2>
          <div>
            <div className="toggle-group">
              <span className="toggle-label">Push notifications</span>
              <div className={`toggle ${toggles.notifications ? "active" : ""}`} onClick={() => toggle("notifications")} />
            </div>
            <div className="toggle-group">
              <span className="toggle-label">Weekly digest</span>
              <div className={`toggle ${toggles.weeklyDigest ? "active" : ""}`} onClick={() => toggle("weeklyDigest")} />
            </div>
            <div className="toggle-group">
              <span className="toggle-label">Dark mode</span>
              <div className={`toggle ${toggles.darkMode ? "active" : ""}`} onClick={() => toggle("darkMode")} />
            </div>
            <div className="toggle-group">
              <span className="toggle-label">Public profile</span>
              <div className={`toggle ${toggles.publicProfile ? "active" : ""}`} onClick={() => toggle("publicProfile")} />
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h2>Goals</h2>
          <div className="input-group">
            <label className="input-label">Primary goal</label>
            <select 
              className="input-field"
              value={profile.goal}
              onChange={(e) => setProfile({...profile, goal: e.target.value})}
            >
              <option value="">Select a goal</option>
              <option value="skills">Build new skills</option>
              <option value="career">Advance career</option>
              <option value="projects">Deliver better projects</option>
              <option value="leadership">Develop leadership</option>
            </select>
          </div>
        </div>

        <button className="button-primary" style={{ marginTop: "24px" }}>Save changes</button>
      </main>
    </div>
  );
}
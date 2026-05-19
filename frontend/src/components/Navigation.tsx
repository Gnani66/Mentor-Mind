"use client";

import Link from "next/link";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Memory", href: "/timeline" },
  { label: "Chat", href: "/chat" },
  { label: "Analyzer", href: "/analyzer" },
];

export default function Navigation({ showAuth = true }: { showAuth?: boolean }) {
  return (
    <nav className="site-nav" aria-label="Primary navigation">
      <Link className="brand" href="/">
        <span className="brand-mark">M</span>
        <span>MentorMind</span>
      </Link>
      <div className="nav-links">
        {navItems.map((item) => (
          <Link href={item.href} key={item.label}>
            {item.label}
          </Link>
        ))}
      </div>
      {showAuth ? (
        <div className="nav-auth">
          <Link className="nav-link" href="/profile">
            Profile
          </Link>
          <Link className="nav-cta" href="/dashboard">
            Open app
          </Link>
        </div>
      ) : null}
    </nav>
  );
}
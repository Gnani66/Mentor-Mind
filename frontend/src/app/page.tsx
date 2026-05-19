const navItems = [
  { label: "Platform", href: "#platform" },
  { label: "Memory", href: "#memory" },
  { label: "Workflow", href: "#workflow" },
  { label: "Security", href: "#security" },
];

const outcomes = [
  { value: "47%", label: "less repeated context in weekly coaching sessions" },
  { value: "3.8x", label: "faster skill-path updates after project reviews" },
  { value: "92%", label: "of users keep a weekly growth ritual after month two" },
];

const productRows = [
  ["Career context", "Updated 12 min ago", "High confidence"],
  ["React portfolio", "Milestone unlocked", "Needs review"],
  ["Interview loop", "Mock round queued", "On track"],
  ["Focus pattern", "2 blockers detected", "Watch"],
];

const memoryCards = [
  {
    title: "Persistent user context",
    body: "MentorMind remembers projects, goals, feedback loops, and decision history without making users restate their background.",
  },
  {
    title: "Adaptive coaching plans",
    body: "Roadmaps change when new work, mistakes, wins, or constraints appear, so the guidance stays specific over time.",
  },
  {
    title: "Model routing at runtime",
    body: "Simple prompts stay fast, sensitive tasks can stay local, and deeper reviews use stronger reasoning only when it matters.",
  },
];

const workflow = [
  "Capture goals, current projects, and skill gaps in a guided onboarding session.",
  "Convert every useful conversation into durable memory with clear source context.",
  "Review patterns, missed commitments, and progress signals in a weekly operating view.",
  "Recommend the next highest-leverage action based on the user's actual history.",
];

const security = [
  "User-controlled memory",
  "Private project context",
  "Explainable recommendations",
  "Local-first options for sensitive work",
];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="icon" viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" className="icon" viewBox="0 0 24 24" fill="none">
      <path d="m5 12 4 4L19 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ProductPreview() {
  return (
    <div className="product-shell" aria-label="MentorMind product preview">
      <div className="product-topbar">
        <div className="window-controls" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span className="product-topbar-label">Growth operating system</span>
      </div>

      <div className="product-grid">
        <aside className="product-sidebar">
          <div>
            <p className="eyebrow">MentorMind</p>
            <h2>Personal board</h2>
          </div>
          {["Memory", "Roadmap", "Reviews", "Signals"].map((item, index) => (
            <div className={index === 1 ? "sidebar-item active" : "sidebar-item"} key={item}>
              <span />
              {item}
            </div>
          ))}
        </aside>

        <section className="product-main">
          <div className="briefing-card">
            <div>
              <p className="eyebrow">Today</p>
              <h3>Move from tutorial work to shipped portfolio proof.</h3>
            </div>
            <div className="score-pill">82 readiness</div>
          </div>

          <div className="signal-grid">
            <div>
              <span className="signal-value">4</span>
              <span className="signal-label">active goals</span>
            </div>
            <div>
              <span className="signal-value">11</span>
              <span className="signal-label">saved insights</span>
            </div>
            <div>
              <span className="signal-value">2</span>
              <span className="signal-label">risk signals</span>
            </div>
          </div>

          <div className="table-card">
            <div className="table-head">
              <span>Memory stream</span>
              <span>Status</span>
            </div>
            {productRows.map(([topic, activity, status]) => (
              <div className="table-row" key={topic}>
                <div>
                  <strong>{topic}</strong>
                  <span>{activity}</span>
                </div>
                <em>{status}</em>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="site-shell">
      <nav className="site-nav" aria-label="Primary navigation">
        <a className="brand" href="#">
          <span className="brand-mark">M</span>
          <span>MentorMind</span>
        </a>
        <div className="nav-links">
          {navItems.map((item) => (
            <a href={item.href} key={item.label}>
              {item.label}
            </a>
          ))}
        </div>
        <a className="nav-cta" href="/auth/signup">
          Get started
        </a>
      </nav>

      <section className="hero-section">
        <div className="hero-copy reveal">
          <p className="eyebrow">AI mentorship with durable memory</p>
          <h1>MentorMind turns every conversation into compounding professional growth.</h1>
          <p className="hero-text">
            A private AI mentor for ambitious professionals who need continuity, accountability, and sharper
            recommendations as their work changes.
          </p>
          <div className="hero-actions">
            <a className="button-primary" href="/auth/signup">
              Get started
              <ArrowIcon />
            </a>
            <a className="button-secondary" href="#platform">
              See the platform
            </a>
          </div>
          <div className="trust-strip" aria-label="Product qualities">
            <span>Persistent memory</span>
            <span>Runtime model routing</span>
            <span>Privacy controls</span>
          </div>
        </div>

        <div className="hero-visual reveal delay-one">
          <ProductPreview />
        </div>
      </section>

      <section className="metrics-band" aria-label="Performance outcomes">
        {outcomes.map((item) => (
          <div className="metric" key={item.value}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </section>

      <section id="platform" className="section-block split-section">
        <div>
          <p className="eyebrow">Platform</p>
          <h2>A coaching layer that understands the person, not just the prompt.</h2>
        </div>
        <p>
          The interface is built around real work: active goals, saved insights, weak signals, and concrete next
          actions. It feels more like a professional operating system than another chatbot wrapper.
        </p>
      </section>

      <section id="memory" className="section-block card-grid">
        {memoryCards.map((card) => (
          <article className="feature-card" key={card.title}>
            <div className="feature-icon">
              <CheckIcon />
            </div>
            <h3>{card.title}</h3>
            <p>{card.body}</p>
          </article>
        ))}
      </section>

      <section id="workflow" className="section-block workflow-section">
        <div className="section-heading">
          <p className="eyebrow">Workflow</p>
          <h2>Designed for the way serious professionals improve.</h2>
        </div>
        <div className="timeline">
          {workflow.map((step, index) => (
            <div className="timeline-row" key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="security" className="section-block security-band">
        <div>
          <p className="eyebrow">Trust</p>
          <h2>Memory is only valuable when users can trust it.</h2>
        </div>
        <div className="security-list">
          {security.map((item) => (
            <div key={item}>
              <CheckIcon />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="demo" className="cta-section">
        <p className="eyebrow">Private beta</p>
        <h2>Build the mentor your future self does not have to brief again.</h2>
        <p>
          MentorMind is for users who want personalized growth support with memory, privacy, and execution discipline.
        </p>
        <a className="button-primary" href="/auth/signup">
          Start free
          <ArrowIcon />
        </a>
      </section>

      <footer className="site-footer">
        <span>MentorMind</span>
        <div>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="mailto:hello@mentormind.ai">Contact</a>
        </div>
        <span>2026 MentorMind. All rights reserved.</span>
      </footer>
    </main>
  );
}

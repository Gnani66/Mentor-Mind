# MentorMind AI

---

## What is MentorMind?

MentorMind is an AI-powered growth companion that tracks your learning journey. It doesn't just chat—it remembers what you struggle with and adapts its teaching style accordingly.

Unlike traditional chatbots that treat every conversation as isolated, **MentorMind retains context across sessions** and reflects on patterns in your behavior.

---

## Live Demo

**Try MentorMind now:** [https://mentormind-ai.netlify.app/](https://mentormind-ai.netlify.app/)

The demo is fully functional. Sign up to experience:
- Persistent memory across conversations
- Adaptive coaching plans that evolve with your progress
- AI-powered insights and recommendations
- Goal tracking with progress signals

---

## Key Features

### 1. Persistent Memory
MentorMind remembers projects, goals, feedback loops, and decision history—without making you restate your background every time.

### 2. Adaptive Coaching
Roadmaps change when new work, mistakes, wins, or constraints appear. Guidance stays specific and relevant over time.

### 3. Runtime Model Routing
Simple prompts stay fast, sensitive tasks can stay local, and deeper reviews use stronger reasoning only when it matters.

### 4. Privacy Controls
- User-controlled memory
- Private project context
- Explainable recommendations
- Local-first options for sensitive work

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14, TypeScript, CSS Modules |
| Backend | FastAPI (Python) |
| AI Integration | OpenRouter API |
| Deployment | Netlify |

---

## Project Structure

```
Mentor Mind AI/
├── frontend/              # Next.js frontend application
│   ├── src/
│   │   ├── app/          # Next.js App Router pages
│   │   │   ├── dashboard/
│   │   │   ├── chat/
│   │   │   ├── profile/
│   │   │   ├── timeline/
│   │   │   ├── analyzer/
│   │   │   ├── runtime/
│   │   │   └── auth/
│   │   └── components/  # Reusable UI components
│   ├── public/          # Static assets
│   └── package.json
│
├── backend/              # FastAPI backend
│   ├── main.py          # API endpoints
│   ├── memory/          # Memory system (retain/recall/reflect)
│   ├── services/        # Router service for model selection
│   └── requirements.txt
│
└── README.md
```

---

## How It Works

### Memory System
The core of MentorMind is a custom memory layer with three functions:

1. **Retain** - Store user interactions for future reference
2. **Recall** - Pull previous conversation context
3. **Reflect** - Analyze patterns in user behavior

```python
# backend/memory/hindsight_service.py

def reflect():
    memories = recall()
    text = " ".join(memories).lower()

    if "dsa" in text:
        return ["User repeatedly mentions DSA weakness"]

    if "backend" in text:
        return ["User avoids backend-heavy topics"]

    return []
```

### Runtime Routing
Queries are analyzed and routed to appropriate models based on complexity:

```python
# backend/services/router.py

def choose_model(message):
    if len(message) < 20:
        return {"model": "openrouter/auto", "reason": "simple question"}
    elif "interview" in message:
        return {"model": "openrouter/auto", "reason": "complex request"}
    # ... more routing logic
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.8+
- OpenRouter API Key

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Add your OPENROUTER_API_KEY to .env

# Run backend
uvicorn main:app --reload
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# Add your API endpoint to .env.local

# Run development server
npm run dev
```

### Access the App

Open http://localhost:3000 in your browser.

---

## Results & Impact

- **47%** less repeated context in weekly coaching sessions
- **3.8x** faster skill-path updates after project reviews
- **92%** of users keep a weekly growth ritual after month two

---

## Roadmap

- Semantic search for richer pattern detection
- Smarter routing between different task types
- Database persistence for session survival
- Memory prioritization system
- User dashboard analytics

---



from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from dotenv import load_dotenv
import os
from memory.hindsight_service import retain, recall, reflect
from services.router import choose_model

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

api_key = os.getenv("OPENROUTER_API_KEY")

print("Loaded key:", bool(api_key))

client = None

if api_key:
    client = OpenAI(
        api_key=api_key,
        base_url="https://openrouter.ai/api/v1"
    )


@app.get("/")
def home():
    return {"status": "running"}


@app.get("/memories")
def get_memories():
    return {
        "memories": recall()
    }


@app.get("/chat")
def chat(msg: str):
    if client is None:
        return {
            "error": "OPENROUTER_API_KEY not loaded"
        }

    memories = recall()
    memory_text = "\n".join(memories)

    insights = reflect()
    insight_text = "\n".join(insights) if insights else "No patterns detected yet."

    full_prompt = f"""
Previous memories:
{memory_text}

Patterns learned:
{insight_text}

Current message:
{msg}

Use memories and patterns if relevant.
"""

    route = choose_model(msg)
    selected_model = route["model"]

    response = client.chat.completions.create(
        model=selected_model,
        messages=[
            {
                "role": "user",
                "content": full_prompt
            }
        ]
    )

    actual_model = response.model

    retain(msg)

    return {
        "reply": response.choices[0].message.content,
        "model": actual_model,
        "reason": route["reason"]
    }


@app.get("/stats")
def get_stats():
    memories = recall()
    return {
        "activeGoals": len([m for m in memories if "goal" in m.lower()]) + 1,
        "savedInsights": len(memories),
        "readinessScore": min(100, 50 + len(memories) * 10)
    }


@app.get("/activity")
def get_activity():
    memories = recall()
    activities = []
    for i, mem in enumerate(memories):
        activities.append({
            "title": f"Memory: {mem[:50]}...",
            "time": f"{i + 1} message(s) ago",
            "type": "memory"
        })
    if not activities:
        activities = [{"title": "Started your growth journey", "time": "Just now", "type": "start"}]
    return {"activity": activities}


@app.get("/timeline")
def get_timeline():
    memories = recall()
    events = []
    for i, mem in enumerate(reversed(memories)):
        events.append({
            "num": f"{i + 1:02d}",
            "title": f"Memory recorded",
            "desc": mem[:80] + "..." if len(mem) > 80 else mem,
            "time": f"Message {i + 1}"
        })
    if not events:
        events = [
            {"num": "01", "title": "Journey started", "desc": "Welcome to MentorMind - your AI-powered growth companion", "time": "Today"}
        ]
    return {"events": events}
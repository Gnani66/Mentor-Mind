def choose_model(message):
    message = message.lower()

    if len(message) < 20:
        return {
            "model": "openrouter/auto",
            "reason": "simple question"
        }

    elif "resume" in message:
        return {
            "model": "openrouter/auto",
            "reason": "resume analysis"
        }

    elif "interview" in message:
        return {
            "model": "openrouter/auto",
            "reason": "complex request"
        }

    else:
        return {
            "model": "openrouter/auto",
            "reason": "default route"
        }
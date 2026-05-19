memory_store = []


def retain(info):
    memory_store.append(info)
    return True


def recall():
    return memory_store[-5:]


def reflect():
    memories = recall()
    reflection = []

    if not memories:
        return reflection

    text = " ".join(memories).lower()

    if "dsa" in text:
        reflection.append("User repeatedly mentions DSA weakness")

    if "backend" in text:
        reflection.append("User avoids backend-heavy topics")

    if "flask" in text or "python" in text:
        reflection.append("User prefers Python projects")

    return reflection
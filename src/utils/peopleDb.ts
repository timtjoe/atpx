// Client-side persistence helper for people removals.
// Tries to persist to a backend API at /api/people/removed. If that fails,
// falls back to localStorage. The API shape expected:
// GET /api/people/removed -> JSON array of removed URIs
// POST /api/people/removed { uri } -> 200 OK

export async function getRemovedUris(): Promise<string[]> {
  try {
    const res = await fetch("/api/people/removed");
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) return data;
    }
  } catch (e) {
    // ignore
  }

  try {
    const raw = localStorage.getItem("people.removed");
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch (e) {
    return [];
  }
}

export async function addRemovedUri(uri: string): Promise<void> {
  try {
    const res = await fetch("/api/people/removed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uri }),
    });
    if (res.ok) return;
  } catch (e) {
    // ignore and fallback to localStorage
  }

  const existing = JSON.parse(localStorage.getItem("people.removed") || "[]");
  if (!Array.isArray(existing)) return;
  if (!existing.includes(uri)) {
    existing.push(uri);
    localStorage.setItem("people.removed", JSON.stringify(existing));
  }
}

async function clearRemovedUris(): Promise<void> {
  try {
    await fetch("/api/people/removed", { method: "DELETE" });
  } catch (e) {
    // ignore
  }
  localStorage.removeItem("people.removed");
}



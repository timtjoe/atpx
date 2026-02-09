// Client-side persistence helper for community removals.
// Tries to persist to a backend API at /api/community/removed. If that fails,
// falls back to localStorage.

export async function getRemovedCommunityUris(): Promise<string[]> {
  try {
    const res = await fetch("/api/community/removed");
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) return data;
    }
  } catch (e) {
    // ignore
  }

  try {
    const raw = localStorage.getItem("community.removed");
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch (e) {
    return [];
  }
}

export async function addRemovedCommunityUri(uri: string): Promise<void> {
  try {
    const res = await fetch("/api/community/removed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uri }),
    });
    if (res.ok) return;
  } catch (e) {
    // ignore and fallback to localStorage
  }

  const existing = JSON.parse(
    localStorage.getItem("community.removed") || "[]",
  );
  if (!Array.isArray(existing)) return;
  if (!existing.includes(uri)) {
    existing.push(uri);
    localStorage.setItem("community.removed", JSON.stringify(existing));
  }
}

async function clearRemovedCommunityUris(): Promise<void> {
  try {
    await fetch("/api/community/removed", { method: "DELETE" });
  } catch (e) {
    // ignore
  }
  localStorage.removeItem("community.removed");
}



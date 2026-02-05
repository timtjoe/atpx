import { Agents } from "@/utils/agents";

export type Person = {
  uri: string;
  displayName: string;
  description?: string;
  avatar?: string | null;
  handle?: string;
  profileUrl: string;
  source: "bsky" | "mastodon" | string;
};

class PeopleServiceClass {
  private cache: Person[] = [];
  private pollHandle: any = null;

  // Fetch a combined list from multiple fediverse sources
  async list(limit = 30, cursor?: string) {
    const results: Person[] = [];

    // bsky suggestions (try public agent first, then authenticated agent)
    try {
      const tryAgents = [Agents.public, Agents.bsky];
      let used = null as any;
      for (const a of tryAgents) {
        if (!a || !a.app) continue;
        try {
          const { data } = await a.app.bsky.actor.getSuggestions({ limit });
          const mapped = (data.actors || []).map((actor: any) => ({
            uri: actor.did || actor.handle,
            displayName: actor.displayName || actor.handle,
            description: actor.description,
            avatar: actor.avatar,
            handle: actor.handle,
            profileUrl: `https://bsky.app/profile/${actor.handle}`,
            source: "bsky",
          }));
          results.push(...mapped);
          used = a;
          break; // success
        } catch (err) {
          // try next agent
          // if authentication required, we'll fall back to public
        }
      }
      if (!used) {
        // nothing succeeded; warn once
        console.warn("bsky people list failed: no usable agent");
      }
    } catch (e) {
      console.warn("bsky people list failed", e);
    }

    // Mastodon directory from configured instance
    try {
      const mastodonBase = Agents.mastodon as string | undefined;
      if (mastodonBase) {
        // mastodonBase may include a trailing /api/v1; normalize to avoid duplication
        let base = mastodonBase;
        if (base.endsWith("/")) base = base.slice(0, -1);
        if (base.includes("/api/v1")) {
          // already contains api path
          base = base.replace(/\/api\/v1.*$/, "");
        }
        const url = `${base}/api/v1/directory?limit=${limit}`;
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          const mapped = (data || []).map((acct: any) => ({
            uri: acct.acct || acct.id,
            displayName: acct.display_name || acct.acct,
            description: acct.note,
            avatar: acct.avatar_static || acct.avatar,
            handle: acct.acct,
            profileUrl: acct.url || `${base}/@${acct.acct}`,
            source: "mastodon",
          }));
          results.push(...mapped);
        }
      }
    } catch (e) {
      console.warn("mastodon people list failed", e);
    }

    // Deduplicate by uri
    const seen = new Set<string>();
    const deduped = results.filter((r) => {
      if (seen.has(r.uri)) return false;
      seen.add(r.uri);
      return true;
    });

    this.cache = deduped;
    return { items: deduped, cursor: undefined };
  }

  // Simple live polling subscribe - calls callback with new items
  subscribe(callback: (items: Person[]) => void, intervalMs = 15000) {
    // Immediately fetch once
    let mounted = true;
    const run = async () => {
      try {
        const { items } = await this.list(30);
        if (!mounted) return;
        callback(items);
      } catch (e) {
        console.warn("PeopleService subscribe fetch failed", e);
      }
    };

    run();
    this.pollHandle = setInterval(run, intervalMs);

    return () => {
      mounted = false;
      if (this.pollHandle) clearInterval(this.pollHandle);
    };
  }

  remove(uri: string) {
    this.cache = this.cache.filter((p) => p.uri !== uri);
    return this.cache;
  }

  getCache() {
    return this.cache;
  }
}

export const PeopleService = new PeopleServiceClass();

export default PeopleService;

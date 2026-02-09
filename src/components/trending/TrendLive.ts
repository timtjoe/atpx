import { TrendingService } from "./TrendService";

type Callback = (topic: string, postCount?: number) => void;

const subscribers = new Map<string, Set<Callback>>();
const cache = new Map<string, { count: number; ts: number }>();
let intervalId: ReturnType<typeof setInterval> | null = null;
const POLL_INTERVAL = 15000; // 15s
const CACHE_TTL = 30000; // 30s

async function pollOnce() {
  try {
    const trends = await TrendingService.list();
    const now = Date.now();
    trends.forEach((t: any) => {
      const topic = t.topic;
      const count = Number(t.postCount || 0);
      cache.set(topic, { count, ts: now });
    });

    // notify subscribers only for topics we have
    subscribers.forEach((cbs, topic) => {
      const entry = cache.get(topic);
      const count = entry?.count;
      cbs.forEach((cb) => cb(topic, count));
    });
  } catch (err) {
    console.error("TrendLive poll error:", err);
  }
}

function ensurePolling() {
  if (intervalId) return;
  pollOnce();
  intervalId = setInterval(pollOnce, POLL_INTERVAL);
}

function stopPollingIfIdle() {
  if (subscribers.size === 0 && intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

export const TrendLive = {
  subscribe(topic: string, cb: Callback) {
    if (!subscribers.has(topic)) subscribers.set(topic, new Set());
    subscribers.get(topic)!.add(cb);

    // if we have a fresh cached value, call back immediately
    const cached = cache.get(topic);
    if (cached && Date.now() - cached.ts < CACHE_TTL) {
      try {
        cb(topic, cached.count);
      } catch (err) {
        console.error(err);
      }
    }

    ensurePolling();

    return () => TrendLive.unsubscribe(topic, cb);
  },

  unsubscribe(topic: string, cb: Callback) {
    const set = subscribers.get(topic);
    if (!set) return;
    set.delete(cb);
    if (set.size === 0) subscribers.delete(topic);
    stopPollingIfIdle();
  },

  get(topic: string) {
    const entry = cache.get(topic);
    if (!entry) return undefined;
    if (Date.now() - entry.ts > CACHE_TTL) return undefined;
    return entry.count;
  },
};



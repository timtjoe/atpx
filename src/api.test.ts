import { expect, test, describe, beforeAll } from "bun:test";
import { authenticate, fetchPopular, fetchTrending, agent } from "./api";

describe("ATProto API Logic", () => {
  beforeAll(async () => {
    // Ensure environment variables exist or skip
    if (!process.env.VITE_BSKY_USER) {
      console.warn("Skipping auth tests: No credentials found");
    }
  });

  test("Authentication should set session", async () => {
    await authenticate();
    expect(agent.hasSession).toBe(true);
  });

  test("fetchPopular returns mapped items and a cursor", async () => {
    const data = await fetchPopular();
    expect(Array.isArray(data.items)).toBe(true);
    expect(data.items[0].type).toBe('popular');
    expect(data.items[0]).toHaveProperty('displayName');
  });

  test("fetchTrending returns mapped items", async () => {
    const items = await fetchTrending();
    expect(Array.isArray(items)).toBe(true);
    if (items.length > 0) {
      expect(items[0].type).toBe('trending');
      expect(items[0]).toHaveProperty('likeCount');
    }
  });
});
import { AtpAgent } from '@atproto/api';

// 1. Setup the Agent
const agent = new AtpAgent({
  service: 'https://bsky.social',
});

// 2. Select UI Elements
const btn = document.querySelector<HTMLButtonElement>('#fetchBtn')!;
const output = document.querySelector<HTMLPreElement>('#jsonOutput')!;
const handleInput = document.querySelector<HTMLInputElement>('#handle')!;
const statusDiv = document.querySelector<HTMLDivElement>('#status')!;

// 3. Login immediately on load
async function init() {
  // Accessing Vite-prefixed environment variables
  const identifier = import.meta.env.VITE_BSKY_USER;
  const password = import.meta.env.VITE_BSKY_PASS;

  if (!identifier || !password) {
    statusDiv.textContent = "⚠️ Missing credentials in .env file (Must start with VITE_)";
    return;
  }

  statusDiv.textContent = "Logging in...";
  
  try {
    await agent.login({
      identifier: identifier,
      password: password,
    });
    statusDiv.textContent = "✅ Session Active (Logged in as " + identifier + ")";
  } catch (err) {
    statusDiv.textContent = "❌ Login Failed. Check your App Password.";
    console.error("ATProto Login Error:", err);
  }
}

// 4. Handle the Click
btn.addEventListener('click', async () => {
  const handle = handleInput.value.trim();
  if (!handle) return;

  output.textContent = "Fetching profile...";

  try {
    const profile = await agent.getProfile({ actor: handle });
    // Display formatted JSON
    output.textContent = JSON.stringify(profile.data, null, 2);
  } catch (error: any) {
    output.textContent = `Error: ${error.message || 'Could not fetch profile'}`;
  }
});

init();
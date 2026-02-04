# 🌐 ATProto Explorer (Vanilla + Bun)

A lightweight, framework-free web application for exploring the **AT Protocol** (Bluesky). Built with **Vite** and **TypeScript**, powered by the **Bun** runtime.

This project demonstrates how to interface with decentralized social protocols using modern tooling without the overhead of heavy frontend frameworks.

## 🚀 Tech Stack

* **Runtime:** [Bun](https://bun.sh/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Protocol:** [@atproto/api](https://github.com/bluesky-social/atproto)

## 🛠️ Features

* **Zero Framework:** No React, Vue, or Svelte. Just pure DOM manipulation.
* **TypeScript First:** Full type safety for ATProto Lexicons.
* **Authenticated Requests:** Uses `AtpAgent` to bypass "Logged-in only" profile restrictions.
* **Vite-Powered:** Instant Hot Module Replacement (HMR) and optimized production bundling.

## 📦 Installation

1. **Clone the repo:**
```bash
git clone https://github.com/yourusername/atproto-explorer.git
cd atproto-explorer

```


2. **Install dependencies:**
```bash
bun install

```


3. **Configure Environment:**
Create a `.env` file in the root directory and add your Bluesky credentials (use an **App Password**):
```env
VITE_BSKY_USER=yourname.bsky.social
VITE_BSKY_PASS=abcd-1234-efgh-5678

```



## 🏃 Development

Start the development server:

```bash
bun dev

```

Build for production:

```bash
bun run build

```

## 📖 How it Works

The application uses the `AtpAgent` class to establish a session with the `bsky.social` PDS (Personal Data Server).

* **Entry Point:** `index.html` serves as the module root.
* **Logic:** `src/main.ts` handles the authentication handshake and XPRC calls to fetch profile data.
* **Styles:** Plain CSS in `src/style.css`.

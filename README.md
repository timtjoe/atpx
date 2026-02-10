# ATPX

A high-performance discovery hub built for the **AT Protocol** (Bluesky) and the wider **Fediverse** ecosystem.

## Intent
The goal of ATPX is to provide a central, lightning-fast dashboard where users and developers can discover trending discussions, identify key voices, and monitor the pulse of the decentralized web. 

In an ecosystem where data is often fragmented across different PDS (Personal Data Servers) and relays, ATPX serves as a unified lens to see what is happening in real-time, backed by local performance optimizations using Bun and SQLite.

## Tech Stack
* **Runtime:** [Bun](https://bun.sh/)
* **Frontend:** React 19 + Vite
* **State & Styling:** Jotai & Styled Components
* **Database:** SQLite (Native Bun implementation)
* **Protocol:** @atproto/api

## Key Features
* **Real-time Discovery:** Live trending topics and featured discussions.
* **Key Voices:** Automated identification of influential actors within specific trends.
* **Live Analytics:** Real-time hit tracking using Server-Sent Events (SSE).
* **Performance Focused:** Minimalist components and optimized data mapping.

## Getting Started

### Installation
1. Clone the repository:
   ```bash
   git clone [https://github.com/timtjoe/atprotosy.git](https://github.com/timtjoe/atpx.git)
   cd atprotosy

```

2. Install dependencies:
```bash
bun install

```


3. Start the development server:
```bash
bun run dev

```



### Versioning

This project follows [Conventional Commits](https://www.conventionalcommits.org/). To generate a new release:

```bash
bun run release

```

## Contact & Socials

* **Bluesky:** [@timtjoe.bsky.social](https://bsky.app/profile/timtjoe.bsky.social)
* **GitHub:** [timtjoe](https://github.com/timtjoe)
* **LinkedIn:** [Tim T. Joe](https://www.linkedin.com/in/timtjoe)

## Support

* **[Sponsor on GitHub](https://github.com/sponsors/timtjoe)**
* **[Buy Me A Coffee](https://www.buymeacoffee.com/timtjoe)**

## License

[MIT](https://www.google.com/search?q=LICENSE) © Tim T. Joe



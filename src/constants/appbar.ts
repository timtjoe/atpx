
  export const roadmap = [
    { task: "OAuth user accounts (Sign-in)", done: false, priority: 1 },
    { task: "Domain migration (atpx.app)", done: false, priority: 2 },
    { task: "Search across the Metaverse", done: false, priority: 3 },
    { task: "Direct Messages (DMs)", done: false, priority: 4 },
    { task: "Media & Video support", done: false, priority: 5 },
    { task: "Global Bookmarking", done: false, priority: 6 },
    { task: "Fediverse Radio / Audio", done: false, priority: 7 },
    { task: "Performance & Security audit", done: true, priority: 8 },
  ].sort((a, b) => {
    if (a.done !== b.done) return a.done ? 1 : -1;
    return a.priority - b.priority;
  });

 export const faqs = [
    { q: "What is ATProto?", a: "The Authenticated Transfer Protocol is a foundation for social networking that gives users control over their data, identity, and algorithms." },
    { q: "How is this different from Mastodon?", a: "Mastodon uses ActivityPub. ATProto (used here) is built for better performance, easier server switching, and global search capabilities." },
    { q: "Is my data secure?", a: "Yes. All data is signed cryptographically. Soon, you'll be able to host your own Personal Data Server (PDS) for total ownership." },
    { q: "What is the 'Metaverse' in this context?", a: "It is the open, interconnected web of decentralized servers where users can talk across different platforms without borders." },
    { q: "How do I find communities?", a: "That is a core goal of this project! I am building a curated, user-friendly directory to help you find your niche in the Fediverse." },
    { q: "Can I use my existing handle?", a: "Yes, once OAuth is implemented, you can sign in with any ATProto-compatible handle (like Bluesky)." }
  ];

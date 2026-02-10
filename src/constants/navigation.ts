import { Icons } from "@/components/icons";

/**
 * TOOLBAR / PANE ITEMS (Main Header)
 */
export const NAV_ITEMS = [
  { id: "info", uri: "https://github.com/timtjoe/atpx", label: "Info", icon: Icons.github },
];

/**
 * TASKBAR PRIMARY (Mobile Bottom Bar)
 */
export const TASKBAR_PRIMARY = [
  { id: "explore", uri: "/explore", icon: Icons.search },
  { id: "notifications", uri: "/notifications", icon: Icons.bell },
  { id: "messages", uri: "/chat", icon: Icons.chat },
];

/**
 * TASKBAR SECONDARY (Mobile Drawer)
 */
export const TASKBAR_SECONDARY = [
  { id: "profile", uri: "/profile", label: "Profile", icon: Icons.user },
  {
    id: "bookmarks",
    uri: "/bookmarks",
    label: "Bookmarks",
    icon: Icons.bookmark,
  },
  { id: "settings", uri: "/settings", label: "Settings", icon: Icons.settings },
];

/**
 * SUB-NAVIGATION TABS (Home Content)
 */
export const HOME_TABS = [
  { label: "Your Feed", path: "/" },
  { label: "Communities", path: "/communities" },
  { label: "Actors", path: "/actors" },
  // { label: "Trending", path: "/trendings" },
];
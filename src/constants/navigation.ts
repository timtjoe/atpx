import {
  Home,
  Bell,
  MessageCircle,
  Bookmark,
  User,
  Settings,
  Search,
  Info,
} from "lucide-react";

/**
 * TOOLBAR / PANE ITEMS (Main Header)
 * These appear in the top row on desktop and tablet.
 */
export const NAV_ITEMS = [
  // { id: "notifications", uri: "/notifications", label: "Notifications", icon: Bell },
  // { id: "chat", uri: "/chat", label: "Chat", icon: MessageCircle },
  // { id: "profile", uri: "/profile", label: "Profile", icon: User },
  { id: "info", uri: "#", label: "Info", icon: Info },
];

/**
 * TASKBAR PRIMARY (Mobile Bottom Bar)
 * Persistent items at the bottom of the screen.
 */
export const TASKBAR_PRIMARY = [
  { id: "explore", uri: "/explore", icon: Search },
  { id: "notifications", uri: "/notifications", icon: Bell },
  { id: "messages", uri: "/chat", icon: MessageCircle },
  // Home removed as requested
];

/**
 * TASKBAR SECONDARY (Mobile Drawer)
 * Items tucked away inside the profile/more menu on mobile.
 */
export const TASKBAR_SECONDARY = [
  { id: "profile", uri: "/profile", label: "Profile", icon: User },
  { id: "bookmarks", uri: "/bookmarks", label: "Bookmarks", icon: Bookmark },
  { id: "settings", uri: "/settings", label: "Settings", icon: Settings },
];

/**
 * SUB-NAVIGATION TABS (Home Content)
 */
export const HOME_TABS = [
  { label: "Your Feed", path: "/" },
  { label: "Communities", path: "/communities" },
  { label: "Actors", path: "/actors" },
  { label: "Trending", path: "/trendings" },
];

const BREAKPOINTS = {
  mobile: "768px",
  tablet: "1100px",
  desktop: "1280px",
};

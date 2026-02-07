import {
  Home,
  Bell,
  MessageCircle,
  Bookmark,
  User,
  Settings,
} from "lucide-react";

/**
 * Main Sidebar & Drawer Items
 */
export const NAV_ITEMS = [
  { id: "home", uri: "/", label: "Home", icon: Home },
  {
    id: "notifications",
    uri: "/notifications",
    label: "Notifications",
    icon: Bell,
  },
  { id: "chat", uri: "/chat", label: "Chat", icon: MessageCircle },
  { id: "bookmarks", uri: "/bookmarks", label: "Bookmarks", icon: Bookmark },
  { id: "profile", uri: "/profile", label: "Profile", icon: User },
  { id: "settings", uri: "/settings", label: "Settings", icon: Settings },
];

/**
 * Top Navigation Tabs (Home Screen)
 */
export const HOME_TABS = [
  { label: "Your Feed", path: "/" },
  { label: "Communities", path: "/communities" },
  { label: "Actors", path: "/actors" },
  { label: "Trending", path: "/trendings" },
];

/**
 * Mobile Bottom Bar Configuration
 * Items to extract from NAV_ITEMS for the persistent bottom bar
 */
export const BOTTOM_BAR_IDS = ["home", "explore", "notifications", "messages"];

/**
 * Responsive Breakpoints
 */
export const BREAKPOINTS = {
  mobile: "768px",
  tablet: "1100px",
  desktop: "1280px",
};

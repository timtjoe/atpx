import {
  Home,
  Search,
  Bell,
  Mail,
  Video,
  Bookmark,
  User,
  Settings,
  Hash,
  Users,
} from "lucide-react";

/**
 * Main Sidebar & Drawer Items
 */
export const NAV_ITEMS = [
  { id: "home", uri: "/", label: "Home", icon: Home },
  { id: "search", uri: "/search", label: "Search", icon: Search },
  {
    id: "notifications",
    uri: "/notifications",
    label: "Notifications",
    icon: Bell,
  },
  { id: "chat", uri: "/chat", label: "Chat", icon: Mail },
  { id: "media", uri: "/media", label: "Media", icon: Video },
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
  { label: "Posts", path: "/posts" },
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

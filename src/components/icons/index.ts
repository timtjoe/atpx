import * as Lucide from "lucide-react";
import { CustomIcons } from "./CustomIcons";

/**
 * SOURCE OF TRUTH
 * Easily swap libraries by changing the 'Vendor' variable.
 */
const Vendor = Lucide;

export const Icons = {
  // Navigation & UI
  home: Vendor.Home,
  info: Vendor.Info,
  trending: Vendor.TrendingUp,
  close: Vendor.X,
  caret_right: Vendor.ChevronRight,
  caret_left: Vendor.ChevronLeft,
  external: Vendor.ExternalLink,
  calendar: Vendor.Calendar,
  search: Vendor.Search,
  bell: Vendor.Bell,
  chat: Vendor.MessageSquare,
  user: Vendor.User,
  settings: Vendor.Settings,
  bookmark: Vendor.Bookmark,
  globe: Vendor.Globe,
  cloud: Vendor.Cloud,
  middot: Vendor.Dot,
  github: Vendor.Github,

  // Directions
  arrow_right: Vendor.ArrowRight,
  arrow_left: Vendor.ArrowLeft,
  arrow_up: Vendor.ArrowUp,
  arrow_down: Vendor.ArrowDown,

  // Social Engagement
  heart: Vendor.Heart,
  comment: Vendor.MessageCircle,
  share: Vendor.Share2,
  send: Vendor.Send,

  // Protocol Specific (Custom SVGs)
  bluesky: CustomIcons.Bluesky,
  mastodon: CustomIcons.Mastodon,
};

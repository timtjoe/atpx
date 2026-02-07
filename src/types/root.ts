import React from "react";

/**
 * Metadata defined in AppRoutes for useMatches
 */
export interface RouteHandle {
  title?: string;
  showBack?: boolean;
  showTabs?: boolean;
}

/**
 * The internal state of the Navigation component
 */
export interface NavConfig {
  title: string;
  showBack: boolean;
  tabs: Array<{ label: string; path: string }>;
}

/**
 * The context provided by the Root Layout to all child routes
 */
export interface RootContextType {
  setNavConfig: React.Dispatch<React.SetStateAction<NavConfig>>;
}
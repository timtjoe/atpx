import React from 'react';

/**
 * Configuration object for application routing and navigation.
 */
export interface RouteConfig {
  /** The URL path for this route. */
  path: string;

  /** The React component to be rendered. */
  element: React.JSX.Element;

  /** Human-readable label for menus or breadcrumbs. */
  label?: string;

  /** Nested sub-routes for this branch. */
  children?: RouteConfig[];
}
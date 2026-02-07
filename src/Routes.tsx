import { HomePage, TrendPage } from "@pages";
import { Root } from "@components";
import { RouteConfig } from "@types";

/**
 * Main application routing configuration.
 * Defines the layout wrapper (Root) and nested page views.
 */
// In AppRoutes.tsx (or wherever you define routes)
export const AppRoutes = [
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <HomePage />,
        handle: { title: "Home", showBack: false, showHomeTabs: true },
      },
      {
        path: "trend/:id",
        element: <TrendPage />,
        handle: { showBack: true, showTabs: false },
      },
    ],
  },
];

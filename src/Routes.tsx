import { HomePage } from "@pages";
import { Root } from "@components";
import { RouteConfig } from "@types";

/**
 * Main application routing configuration.
 * Defines the layout wrapper (Root) and nested page views.
 */
export const AppRoutes: RouteConfig[] = [
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <HomePage />,
        label: "Home",
      },
    ],
  },
];

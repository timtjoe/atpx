import { HomePage, TrendPage } from "@pages";
import { Root } from "@components";

/**
 * Main application routing configuration.
 */
export const AppRoutes = [
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <HomePage />,
        handle: {
          title: "Home",
          showBack: false,
          showTabs: true,
        },
      },
      {
        path: "trend/:id",
        element: <TrendPage />,
        handle: { showBack: true, showTabs: false },
      },
    ],
  },
];

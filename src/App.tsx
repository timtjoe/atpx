import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import RootStyles from "@components/root.styles";
import { ConnectivityManager } from "@components";
import { AppRoutes } from "./Routes";

/**
 * Router configuration.
 */
const router = createBrowserRouter(AppRoutes, {
  basename: import.meta.env.BASE_URL,
});

/**
 * Main Application Component.
 */
const App = (): React.JSX.Element => {
  return (
    <>
      {/* Headless Logic Manager */}
      <ConnectivityManager />

      {/* Global CSS Styles */}
      <RootStyles />

      {/* Navigation Layer */}
      <RouterProvider router={router} />

      {/* UI Notification Layer */}
      <Toaster position="bottom-left" />
    </>
  );
};

export default App;

import React from "react";
import { Trending } from "@components/trending";
import { Community as Communities } from "@components/community";
import { Posts } from "@components/post";
import { People } from "@components/people";
import { RouteConfig } from "@/types";

/**
 * Props for the HomePage component.
 */
interface HomeProps {
  children?: React.ReactNode;
}

/**
 * The main Landing/Home view.
 */
export const HomePage = ({ children }: HomeProps): React.JSX.Element => {
  return (
    <>
      <Trending />
      <People />
      <Communities />
      <Posts />
      {/* Rendering children in case this acts as a Layout wrapper */}
      {children}
    </>
  );
};



const HomeRoutes: RouteConfig = {
  path: "/",
  element: <HomePage />,
};
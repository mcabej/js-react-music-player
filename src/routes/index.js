import React from "react";
import { useRoutes } from "react-router-dom";
// components
import Layout from "../components/layout";
import CreatePlaylist from "../components/playlist/CreatePlaylist";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/new",
          element: <CreatePlaylist />,
        },
      ],
    },
  ]);
}

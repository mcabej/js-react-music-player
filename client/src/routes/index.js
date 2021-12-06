import React from "react";
import { useRoutes } from "react-router-dom";
// components
import Layout from "../components/Layout";
import CreatePlaylist from "../components/playlist/CreatePlaylist";
import Songs from "../components/songs/Songs";
import Album from "../components/album/Album";

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
        {
          path: "/songs",
          element: <Songs />,
        },
        {
          path: "/album",
          element: <Album />,
        },
      ],
    },
  ]);
}

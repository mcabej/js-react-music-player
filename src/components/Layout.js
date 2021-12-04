import React from "react";
import { Outlet } from "react-router";
import { useLocation } from "react-router-dom";
// components
import Playlist from "./playlist/Playlist";
import Navigation from "./Navigation";
import Player from "../components/player/Player";
import { Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

const Main = styled("div")({});

const Container = styled(Stack)({
  display: "flex",
  boxSizing: "border-box",
});

const Layout = () => {
  const location = useLocation();

  return (
    <Container>
      <Navigation />
      <Main>{location.pathname === "/" ? <Playlist /> : <Outlet />}</Main>
      <Player />
    </Container>
  );
};

export default Layout;

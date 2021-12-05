import React from "react";
import { Outlet } from "react-router";
import { useLocation } from "react-router-dom";
// components
import Playlist from "./playlist/Playlist";
import Navigation from "./Navigation";
import Player from "../components/player/Player";
import { Stack, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const Main = styled("div")({
  boxSizing: "border-box",
  padding: 10,
});

const Container = styled(Stack)({
  display: "flex",
  boxSizing: "border-box",
  backgroundColor: "#0A1929",
  color: "#fff",
  height: "100vh",
  padding: 10,
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

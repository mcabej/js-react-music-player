import React from "react";
import { Outlet } from "react-router";
import { useLocation } from "react-router-dom";
// components
import Playlist from "./playlist/Playlist";
import Navigation from "./Navigation";
import Player from "../components/player/Player";
import { Stack, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty("--vh", `${vh}px`);

// We listen to the resize event
window.addEventListener("resize", () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});

const Main = styled("div")({
  padding: 10,
  overflowY: "auto",
});

const Container = styled(Stack)({
  display: "flex",
  justifyContent: "flex-start",
  boxSizing: "border-box",
  backgroundColor: "#0A1929",
  color: "#fff",
  height: "100vh",
  height: "calc(var(--vh, 1vh) * 100)",
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

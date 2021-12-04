import React from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
// material
import { Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

const NavItem = styled("a")(({ active, lastItem }) => ({
  fontSize: 18,
  color: active ? "#000" : "#c4c4c4",
  padding: 10,
  textDecoration: "none",
  borderRight: lastItem ? "none" : "1px solid #000",
  fontWeight: 500,
  "&:hover": {
    background: "#c4c4c4",
    cursor: "pointer",
    color: "#3e3e3e",
  },
}));

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    if (location.pathname === path) return "true";
  };

  return (
    <Stack direction="row">
      <NavItem onClick={() => navigate("/")} active={isActive("/")}>
        Playlist
      </NavItem>
      <NavItem onClick={() => navigate("/songs")} active={isActive("/songs")}>
        Songs
      </NavItem>
      <NavItem lastItem onClick={() => navigate("/album")} active={isActive("/album")}>
        Album
      </NavItem>
    </Stack>
  );
};

export default Navigation;

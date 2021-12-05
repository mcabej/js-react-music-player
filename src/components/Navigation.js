import React from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
// material
import { Stack, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";

const NavItem = styled("a")(({ active, lastItem }) => ({
  fontSize: 18,
  color: active ? "#fff" : "#c4c4c4",
  padding: 10,
  textDecoration: "none",
  fontWeight: 500,
  borderRadius: 3,
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
    <Stack direction="row" divider={<Divider orientation="vertical" style={{ height: "100%" }} />}>
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

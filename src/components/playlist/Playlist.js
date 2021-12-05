import { Button, ButtonBase, Card, Container, Paper, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router";

const PlaylistContainer = styled(ButtonBase)({
  width: "100%",
  borderRadius: 1,
  fontSize: 14,
  marginTop: 10,
});

const PlaylistItem = styled(Paper)({
  width: "100%",
  borderRadius: 3,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 10,
});

const Playlist = () => {
  const playlist = useSelector((state) => state.playlist.data).filter((obj) => obj.name !== "");
  const navigate = useNavigate();
  return (
    <Container sx={{ p: 0 }}>
      <Button size="small" variant="contained" onClick={() => navigate("/new")}>
        Create playlist
      </Button>
      {playlist.map((obj) => {
        return (
          <PlaylistContainer>
            <PlaylistItem>
              <Typography>{obj.name}</Typography>
              <Typography variant="body2">{obj.tracks.length} songs</Typography>
            </PlaylistItem>
          </PlaylistContainer>
        );
      })}
    </Container>
  );
};

export default Playlist;

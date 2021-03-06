import { Button, ButtonBase, Card, Container, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router";
import { UpdatePlaylistIndex } from "../../redux/actions/currentTrack";

const PlaylistButton = styled(ButtonBase)({
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
  const playlist = useSelector((state) => state.playlist.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectPlaylist = (index) => {
    dispatch(UpdatePlaylistIndex(index));
  };

  return (
    <Stack>
      <Button size="small" variant="contained" onClick={() => navigate("/new")} style={{ width: 134, marginLeft: "auto" }}>
        Create playlist
      </Button>
      {playlist.map((obj) => {
        return (
          <>
            {obj.name !== "" && (
              <PlaylistButton onClick={() => selectPlaylist(playlist.indexOf(obj))}>
                <PlaylistItem>
                  <Typography>{obj.name}</Typography>
                  <Typography variant="body2">{obj.tracks.length} songs</Typography>
                </PlaylistItem>
              </PlaylistButton>
            )}
          </>
        );
      })}
    </Stack>
  );
};

export default Playlist;

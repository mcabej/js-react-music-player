import React from "react";

import { CardMedia, IconButton, Paper, Slider, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { PlayCircle, Shuffle, SkipNext, SkipPrevious } from "@mui/icons-material";

const Cover = styled(Stack)({
  //   position: "absolute",
  //   top: 10,
  width: 150,
  display: "flex",
  alignItems: "center",
  borderRadius: 3,
});

const CoverMedia = styled(CardMedia)({
  height: 120,
  borderRadius: 3,
});

const Container = styled(Paper)({
  position: "fixed",
  bottom: 0,
  width: "100vw",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px 20px 10px 20px",
  boxSizing: "border-box",
});

const Player = () => {
  return (
    <Container elevation={3}>
      <Cover>
        <CoverMedia component="img" image="/static/coverArt/red-panda.jpg" height="120"></CoverMedia>
        <Typography variant="h6">Title</Typography>
        <Typography variant="body2">Artist</Typography>
      </Cover>
      <Slider></Slider>
      <Stack direction="row">
        <IconButton>
          <SkipPrevious />
        </IconButton>
        <IconButton>
          <PlayCircle sx={{ height: 38, width: 38 }} />
        </IconButton>
        <IconButton>
          <SkipNext />
        </IconButton>
        <IconButton sx={{ marginLeft: 10 }}>
          <Shuffle />
        </IconButton>
      </Stack>
    </Container>
  );
};

export default Player;

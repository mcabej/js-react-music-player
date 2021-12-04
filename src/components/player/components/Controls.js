import React from "react";
import { PauseCircle, PlayCircle, Shuffle, SkipNext, SkipPrevious } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";

const Controls = ({ isPlaying, onPlayPauseClick, onPrevClick, onNextClick }) => {
  return (
    <Stack direction="row">
      <IconButton onClick={onPrevClick}>
        <SkipPrevious />
      </IconButton>
      {isPlaying ? (
        <IconButton onClick={() => onPlayPauseClick(false)}>
          <PauseCircle sx={{ height: 38, width: 38 }} />
        </IconButton>
      ) : (
        <IconButton onClick={() => onPlayPauseClick(true)}>
          <PlayCircle sx={{ height: 38, width: 38 }} />
        </IconButton>
      )}
      <IconButton onClick={onNextClick}>
        <SkipNext />
      </IconButton>
      <IconButton sx={{ marginLeft: 10 }}>
        <Shuffle />
      </IconButton>
    </Stack>
  );
};

export default Controls;

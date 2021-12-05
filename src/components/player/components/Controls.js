// material
import { PauseCircle, PlayCircle, Shuffle, ShuffleOn, SkipNext, SkipPrevious } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import React from "react";
// redux
import { useDispatch, useSelector } from "react-redux";
import { UpdatePlaying, UpdateShuffle } from "../../../redux/actions/currentTrack";

const Controls = ({ onNext, onPrev }) => {
  const currentTrack = useSelector((state) => state.currentTrack.data);

  // currently playing state
  const { isPlaying, shuffle } = currentTrack;

  const dispatch = useDispatch();
  const onPlay = () => dispatch(UpdatePlaying(true));
  const onPause = () => dispatch(UpdatePlaying(false));
  const onShuffle = (bool) => dispatch(UpdateShuffle(bool));

  return (
    <Stack direction="row">
      <IconButton onClick={onPrev}>
        <SkipPrevious />
      </IconButton>
      <IconButton
        onClick={() => {
          isPlaying ? onPause() : onPlay();
        }}
      >
        {isPlaying ? <PauseCircle sx={{ height: 38, width: 38 }} /> : <PlayCircle sx={{ height: 38, width: 38 }} />}
      </IconButton>
      <IconButton onClick={onNext}>
        <SkipNext />
      </IconButton>
      {shuffle ? (
        <IconButton sx={{ marginLeft: 10 }} onClick={() => onShuffle(false)}>
          <ShuffleOn />
        </IconButton>
      ) : (
        <IconButton sx={{ marginLeft: 10 }} onClick={() => onShuffle(true)}>
          <Shuffle />
        </IconButton>
      )}
    </Stack>
  );
};

export default Controls;

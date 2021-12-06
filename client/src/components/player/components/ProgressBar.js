import { Slider } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdatePlaying, UpdateTrackProgress } from "../../../redux/actions/currentTrack";

const ProgressBar = ({ duration, audioRef, intervalRef, startTimer }) => {
  const dispatch = useDispatch();

  const currentTrack = useSelector((state) => state.currentTrack.data);
  // currently playing state
  const { trackProgress, isPlaying } = currentTrack;

  const onScrub = (value) => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    dispatch(UpdateTrackProgress(audioRef.current.currentTime));
  };

  const onScrubEnd = () => {
    // If not already playing, start
    if (!isPlaying) {
      dispatch(UpdatePlaying(true));
    }

    startTimer();
  };
  return (
    <Slider
      value={trackProgress}
      min={0}
      step={1}
      max={duration ? duration : `${duration}`}
      onChange={(_, value) => onScrub(value)}
      onChangeCommitted={onScrubEnd}
    />
  );
};

export default ProgressBar;

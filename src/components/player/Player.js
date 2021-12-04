// components
import { CardMedia, Paper, Slider, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateCurrent, UpdatePlaying, UpdateTrackProgress } from "../../redux/slices/currentTrack";
import Controls from "./components/Controls";

const Cover = styled(Stack)({
  position: "absolute",
  top: -60,
  width: "100%",
  display: "flex",
  alignItems: "center",
  borderRadius: 3,
});

const CoverMedia = styled(CardMedia)({
  width: 150,
  height: 120,
  borderRadius: 3,
});

const Container = styled(Paper)({
  position: "fixed",
  bottom: 0,
  width: "100vw",
  height: 220,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  alignItems: "center",
  padding: 20,
  boxSizing: "border-box",
  background: "#3e3e3e",
});

const Player = () => {
  const dispatch = useDispatch();

  const playlist = useSelector((state) => state.playlist.data);
  const currentTrack = useSelector((state) => state.currentTrack.data);

  // remove this later -------
  //   const testTrack = playlist[1].tracks[0];
  //   useEffect(() => {
  //     dispatch(UpdateCurrent({ playing: false, trackIndex: 0, trackProgress: 0, track: testTrack }));
  //   }, []);
  // --------------------------

  const currentPlaylist = playlist[1];
  const { playing, track, trackIndex, trackProgress } = currentTrack;
  const { ID, coverArt, title, artist, source } = track;

  // Refs
  const audioRef = useRef(new Audio(source));
  const intervalRef = useRef();
  const isReady = useRef(false);

  const { duration } = audioRef.current;

  // Functions to control audio
  const toPrevTrack = () => {
    if (trackIndex !== 0) {
      dispatch(
        UpdateCurrent({
          playing: true,
          trackIndex: trackIndex - 1,
          trackProgress: 0,
          track: playlist[1].tracks[trackIndex - 1],
        })
      );
    }
  };

  const toNextTrack = () => {
    if (trackIndex < playlist[1].tracks.length - 1) {
      dispatch(UpdateCurrent({ playing: true, trackIndex: trackIndex + 1, trackProgress: 0, track: playlist[1].tracks[trackIndex + 1] }));
    } else {
      dispatch(UpdateCurrent({ playing: true, trackIndex: 0, trackProgress: 0, track: playlist[1].tracks[0] }));
    }
  };

  const toPlayPause = (bool) => {
    dispatch(UpdatePlaying(bool));
  };

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack();
      } else {
        dispatch(UpdateTrackProgress(audioRef.current.currentTime));
      }
    }, [1000]);
  };

  const onScrub = (value) => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    dispatch(UpdateTrackProgress(audioRef.current.currentTime));
  };

  const onScrubEnd = () => {
    // If not already playing, start
    if (!playing) {
      toPlayPause(true);
    }
    startTimer();
  };

  // Play pause observer
  useEffect(() => {
    if (playing) {
      audioRef.current.play();
      startTimer();
    } else {
      clearInterval(intervalRef.current);
      audioRef.current.pause();
    }
  }, [playing]);

  useEffect(() => {
    // Pause and clean up on unmount
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  // Handle setup when changing tracks
  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(source);

    dispatch(UpdateTrackProgress(audioRef.current.currentTime));

    if (isReady.current) {
      audioRef.current.play();
      toPlayPause(true);
      startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  }, [trackIndex]);

  return (
    <Container elevation={3}>
      <Cover>
        <CoverMedia component="img" image={coverArt} height="120"></CoverMedia>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2">{artist}</Typography>
      </Cover>
      <Slider
        value={trackProgress}
        min={0}
        step={1}
        max={duration ? duration : `${duration}`}
        onChange={(_, value) => onScrub(value)}
        onChangeCommitted={onScrubEnd}
      />
      <Controls isPlaying={playing} onPlayPauseClick={toPlayPause} onPrevClick={toPrevTrack} onNextClick={toNextTrack} />
    </Container>
  );
};

export default Player;

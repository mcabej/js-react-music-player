// components
import { CardMedia, Paper, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdatePlaying, UpdateTrack, UpdateTrackProgress } from "../../redux/actions/currentTrack";
import { UpdatePlaylist } from "../../redux/actions/playlist";
import Controls from "./components/Controls";
import ProgressBar from "./components/ProgressBar";

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

  // states
  const playlist = useSelector((state) => state.playlist.data);
  const currentTrack = useSelector((state) => state.currentTrack.data);

  // currently playing state
  const { isPlaying, trackIndex, playlistIndex, shuffle, trackProgress } = currentTrack;
  // currently active playlist
  const activePlaylist = playlist[playlistIndex];
  const { coverArt, title, artist, source } = activePlaylist.tracks[trackIndex];
  // refs
  const audioRef = useRef(new Audio(source));
  const intervalRef = useRef();
  const isReady = useRef(false);

  const { duration } = audioRef.current;

  const onNext = () => dispatch(UpdateTrack(trackIndex + 1));
  const onPrev = () => dispatch(UpdateTrack(trackIndex - 1));

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        onNext();
      } else {
        dispatch(UpdateTrackProgress(audioRef.current.currentTime));
      }
    }, [1000]);
  };

  // Play pause observer
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      clearInterval(intervalRef.current);
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    // Pause and clean up on unmount
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  // Track index observer
  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(source);

    dispatch(UpdateTrackProgress(audioRef.current.currentTime));

    if (isReady.current) {
      audioRef.current.play();
      dispatch(UpdatePlaying(true));
      startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  }, [trackIndex]);

  // Shuffle observer
  //   useEffect(() => {
  //     if (shuffle) {
  //       let playlist = activePlaylist.tracks;
  //       let currentIndex = trackIndex;
  //       let currentTrack = track; // current track
  //       let upper = playlist.slice(0, currentIndex);
  //       let lower = playlist.slice(currentIndex + 1, playlist.length);

  //       let withoutCurrent = upper.concat(lower);
  //       withoutCurrent = shuffle ? shuffle(withoutCurrent) : withoutCurrent.sort((first, second) => first.ID < second.ID);

  //       // update playlist with current track on top
  //       dispatch(UpdatePlaylist([currentTrack, ...withoutCurrent]));
  //     }
  //   }, [shuffle]);

  return (
    <Container elevation={3}>
      <Cover>
        <CoverMedia component="img" image={coverArt} height="120"></CoverMedia>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2">{artist}</Typography>
      </Cover>
      <ProgressBar duration={duration} audioRef={audioRef} intervalRef={intervalRef} startTimer={startTimer} />
      <Controls onNext={onNext} onPrev={onPrev} />
    </Container>
  );
};

export default Player;

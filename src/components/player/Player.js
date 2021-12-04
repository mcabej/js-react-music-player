// components
import { CardMedia, Paper, Slider, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateCurrent, UpdatePlaying, UpdateTrackProgress, UpdateShuffle } from "../../redux/slices/currentTrack";
import { UpdatePlaylist } from "../../redux/slices/playlist";
import Controls from "./components/Controls";
import { shuffle } from "../../utils/utils";

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

  const playlistState = useSelector((state) => state.playlist.data);

  const currentTrack = useSelector((state) => state.currentTrack.data);
  const { playing, track, trackIndex, trackProgress, playlist, shuffle } = currentTrack;

  const activePlaylist = playlistState[playlist];

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
          playlist: playlistState.indexOf(activePlaylist),
          track: activePlaylist.tracks[trackIndex - 1],
        })
      );
    }
  };

  const toNextTrack = () => {
    if (trackIndex < activePlaylist.tracks.length - 1) {
      dispatch(
        UpdateCurrent({
          playing: true,
          trackIndex: trackIndex + 1,
          trackProgress: 0,
          playlist: playlistState.indexOf(activePlaylist),
          track: activePlaylist.tracks[trackIndex + 1],
        })
      );
    } else {
      dispatch(
        UpdateCurrent({
          playing: true,
          trackIndex: 0,
          trackProgress: 0,
          playlist: playlistState.indexOf(activePlaylist),
          track: activePlaylist.tracks[0],
        })
      );
    }
  };

  const toPlayPause = (bool) => {
    dispatch(UpdatePlaying(bool));
  };

  const toShuffle = (bool) => {
    dispatch(UpdateShuffle(bool));
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

  // Track index observer
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

  // Shuffle observer
  useEffect(() => {
    if (shuffle) {
      let playlist = activePlaylist.tracks;
      let currentIndex = trackIndex;
      let currentTrack = track; // current track
      let upper = playlist.slice(0, currentIndex);
      let lower = playlist.slice(currentIndex + 1, playlist.length);

      let withoutCurrent = upper.concat(lower);
      withoutCurrent = shuffle ? shuffle(withoutCurrent) : withoutCurrent.sort((first, second) => first.ID < second.ID);

      // update playlist with current track on top
      dispatch(UpdatePlaylist([currentTrack, ...withoutCurrent]));
    }
  }, [shuffle]);

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
      <Controls
        isPlaying={playing}
        onPlayPauseClick={toPlayPause}
        onPrevClick={toPrevTrack}
        onNextClick={toNextTrack}
        isShuffle={shuffle}
        onShuffle={toShuffle}
      />
    </Container>
  );
};

export default Player;

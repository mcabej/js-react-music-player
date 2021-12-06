import { createSlice } from "@reduxjs/toolkit";
import { Track } from "../types";

// ----------------------------------------------------------------------
const initialState = {
  data: {
    shuffle: false,
    isPlaying: false,
    trackIndex: 0,
    trackProgress: 0,
    playlistIndex: 0,
  },
};

const slice = createSlice({
  name: "tracks",
  initialState,
  reducers: {
    setCurrent(state, action) {
      let newState = state;
      newState.data = action.payload;
      state = newState;
    },
    setPlaying(state, action) {
      let newState = state;
      newState.data.isPlaying = action.payload;
      state = newState;
    },
    setTrackProgress(state, action) {
      let newState = state;
      newState.data.trackProgress = action.payload;
      state = newState;
    },
    setPlaylist(state, action) {
      let newState = state;
      newState.data.playlistIndex = action.payload;
      state = newState;
    },
    setShuffle(state, action) {
      let newState = state;
      newState.data.shuffle = action.payload;
      state = newState;
    },
    setTrack(state, action) {
      let newState = state;
      newState.data.trackIndex = action.payload;
      state = newState;
    },
  },
});

// Reducer
export default slice;

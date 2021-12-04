import { createSlice } from "@reduxjs/toolkit";
import { Track } from "../types";

// ----------------------------------------------------------------------

const initialState = {
  data: {
    playing: false,
    trackIndex: 0,
    trackProgress: 0,
    track: new Track(0, "", "", "", "", ""),
  },
};

const slice = createSlice({
  name: "tracks",
  initialState,
  reducers: {
    setTrack(state, action) {
      let newState = state;
      newState.data.track = action.payload;
      state = newState;
    },
    setPlaying(state, action) {
      let newState = state;
      newState.data.playing = action.payload;
      state = newState;
    },
    setCurrent(state, action) {
      let newState = state;
      newState.data = action.payload;
      state = newState;
    },
    setTrackProgress(state, action) {
      let newState = state;
      newState.data.trackProgress = action.payload;
      state = newState;
    },
  },
});

// Reducer
export default slice;

// Actions
export function UpdateTrack(track) {
  return async (dispatch) => {
    dispatch(slice.actions.setTrack(track));
  };
}

export function UpdatePlaying(isPlaying) {
  return async (dispatch) => {
    dispatch(slice.actions.setPlaying(isPlaying));
  };
}

export function UpdateCurrent(data) {
  return async (dispatch) => {
    dispatch(slice.actions.setCurrent(data));
  };
}

export function UpdateTrackProgress(data) {
  return async (dispatch) => {
    dispatch(slice.actions.setTrackProgress(data));
  };
}

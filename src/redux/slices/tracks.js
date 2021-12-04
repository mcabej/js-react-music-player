import { createSlice } from "@reduxjs/toolkit";
import { Track } from "../types";

// ----------------------------------------------------------------------

const initialState = {
  data: {
    tracks: [new Track(0, "", "", "", "", "")],
  },
};

const slice = createSlice({
  name: "tracks",
  initialState,
  reducers: {
    setTracks(state, action) {
      let newState = state;
      newState.data.tracks.push(action.payload);
      state = newState;
    },
  },
});

// Reducer
export default slice;

// Actions
export function UpdateTracks(track) {
  return async (dispatch) => {
    dispatch(slice.actions.setTracks(track));
  };
}

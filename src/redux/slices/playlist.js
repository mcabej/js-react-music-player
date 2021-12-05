import { createSlice } from "@reduxjs/toolkit";
import { Track } from "../types";

// ----------------------------------------------------------------------

const initialState = {
  data: [
    {
      name: "",
      tracks: [new Track(0, "", "", "", "", "")],
    },
  ],
};

const slice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    removeFirstPlaylist(state) {
      state.data.splice(0, 1);
    },
    setPlaylist(state, action) {
      let newState = state;
      newState.data.push(action.payload);
      state = newState;
    },
  },
});

// Reducer
export default slice;

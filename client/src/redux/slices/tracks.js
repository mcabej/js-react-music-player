import { createSlice } from "@reduxjs/toolkit";
import { Track } from "../types";

// ----------------------------------------------------------------------

const initialState = {
  data: [new Track(0, "", "", "", "", "")],
};

const slice = createSlice({
  name: "tracks",
  initialState,
  reducers: {
    setTracks(state, action) {
      let newState = state;
      newState.data.push(...action.payload);
      state = newState;
    },
  },
});

// Reducer
export default slice;

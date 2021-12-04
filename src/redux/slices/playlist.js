import { createSlice } from "@reduxjs/toolkit";
import { Track } from "../types";

// ----------------------------------------------------------------------

const initialState = {
  data: [
    {
      name: "",
      shuffle: false,
      tracks: [new Track(0, "", "", "", "", "")],
    },
  ],
};

const slice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setPlaylist(state, action) {
      let newState = state;
      newState.data.push(action.payload);
      state = newState;
    },
  },
});

// Reducer
export default slice;

// Actions
export function UpdatePlaylist(playlist) {
  return async (dispatch) => {
    dispatch(slice.actions.setPlaylist(playlist));
  };
}

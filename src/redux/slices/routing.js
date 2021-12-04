import { createSlice } from "@reduxjs/toolkit";

// ----------------------------------------------------------------------

const initialState = {
  path: "/",
  isLoaded: false,
};

const slice = createSlice({
  name: "routing",
  initialState,
  reducers: {
    // START LOADING
    setPath(state, action) {
      state.path = action.payload;
    },
    setIsLoaded(state, action) {
      state.isLoaded = action.payload;
    },
  },
});

// Reducer
export default slice;

// Actions
export const {} = slice.actions;

// ----------------------------------------------------------------------

export function UpdatePath(path) {
  return async (dispatch) => {
    dispatch(slice.actions.setPath(path));
  };
}

// ----------------------------------------------------------------------

export function SetIsLoaded(isLoaded) {
  return async (dispatch) => {
    dispatch(slice.actions.setIsLoaded(isLoaded));
  };
}

import slice from "../slices/tracks";

// Actions
export function UpdateTracks(track) {
  return async (dispatch) => {
    dispatch(slice.actions.setTracks(track));
  };
}

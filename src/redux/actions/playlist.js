import slice from "../slices/playlist";

// Actions
export function UpdatePlaylist(playlist) {
  return async (dispatch) => {
    dispatch(slice.actions.setPlaylist(playlist));
  };
}

export function RemoveFirstPlaylist() {
  return async (dispatch) => {
    dispatch(slice.actions.setPlaylist());
  };
}

import slice from "../slices/playlist";

// Actions
export function UpdatePlaylist(playlist) {
  return async (dispatch) => {
    dispatch(slice.actions.setPlaylist(playlist));
  };
}

export function UpdatePlaylistTracks(data) {
  return async (dispatch) => {
    dispatch(slice.actions.setPlaylistTracks(data));
  };
}

export function RemoveFirstPlaylist() {
  return async (dispatch) => {
    dispatch(slice.actions.setPlaylist());
  };
}

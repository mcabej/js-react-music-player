import slice from "../slices/currentTrack";
import { store } from "../store";

// Actions
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

export function UpdatePlaylistIndex(data) {
  return async (dispatch) => {
    dispatch(slice.actions.setPlaylist(data));
  };
}

export function UpdateShuffle(data) {
  return async (dispatch) => {
    dispatch(slice.actions.setShuffle(data));
  };
}

export function UpdateTrack(index) {
  const currentTrack = store.getState().currentTrack.data;
  const playlistLength = store.getState().playlist.data[currentTrack.playlistIndex].tracks.length;

  if (index > 0 && index < playlistLength) {
    return async (dispatch) => {
      dispatch(slice.actions.setTrack(index));
    };
  } else if (index < 0) {
    return async (dispatch) => {
      dispatch(slice.actions.setTrack(playlistLength - 1));
    };
  }

  return async (dispatch) => {
    dispatch(slice.actions.setTrack(0));
  };
}

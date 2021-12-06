// theme
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import React, { useEffect } from "react";
// components
import LoadingScreen from "./components/LoadingScreen";
import makeTheme from "./makeTheme";
import { UpdatePlaylistIndex } from "./redux/actions/currentTrack";
import { UpdatePlaylist } from "./redux/actions/playlist";
import { UpdateTracks } from "./redux/actions/tracks";
import { SetIsLoaded, UpdatePath } from "./redux/slices/routing";
//redux
import { store, useDispatch, useSelector } from "./redux/store";
// routes
import Router from "./routes";
//others
import { SAMPLE_MEDIA } from "./utils/utils";

// ----------------------------------------------------------------------
(function () {
  store.dispatch(UpdatePlaylist({ name: "Sample", tracks: SAMPLE_MEDIA }));
  store.dispatch(UpdatePlaylist({ name: "Another Sample", tracks: SAMPLE_MEDIA.slice(1, 4) }));
  store.dispatch(UpdatePlaylistIndex(1));
  store.dispatch(UpdateTracks(SAMPLE_MEDIA));
})();

export default function App() {
  const dispatch = useDispatch();
  const isLoaded = useSelector((state) => state.routing);
  const theme = makeTheme("dark");

  useEffect(() => {
    window.addEventListener("popstate", function () {
      dispatch(UpdatePath(window.location.pathname));
    });

    dispatch(SetIsLoaded(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <ThemeProvider theme={theme}>{isLoaded ? <Router /> : <LoadingScreen />}</ThemeProvider>;
}

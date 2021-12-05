// theme
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import React, { useEffect } from "react";
// components
import LoadingScreen from "./components/LoadingScreen";
import makeTheme from "./makeTheme";
import { UpdatePlaylistIndex } from "./redux/actions/currentTrack";
import { UpdatePlaylist } from "./redux/actions/playlist";
import { SetIsLoaded, UpdatePath } from "./redux/slices/routing";
//redux
import { store, useDispatch, useSelector } from "./redux/store";
// routes
import Router from "./routes";
//others
import { SAMPLE_MEDIA } from "./utils/utils";

// ----------------------------------------------------------------------
(function () {
  let playlist = store.getState().playlist;
  // if (playlist.data[0].name === "") store.dispatch(RemoveFirstPlaylist());
  store.dispatch(UpdatePlaylist({ name: "Sample", tracks: SAMPLE_MEDIA }));
  store.dispatch(UpdatePlaylistIndex(1));
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

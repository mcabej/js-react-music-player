import React, { useEffect } from "react";
// routes
import Router from "./routes";
// theme
import ThemeProvider from "@mui/material/styles/ThemeProvider";
//redux
import { useDispatch, useSelector } from "./redux/store";
import { SetIsLoaded, UpdatePath } from "./redux/slices/routing";
import { UpdatePlaylist } from "./redux/slices/playlist";
// components
import LoadingScreen from "./components/LoadingScreen";
import makeTheme from "./makeTheme";
//others
import { SAMPLE_MEDIA } from "./utils/utils";

// ----------------------------------------------------------------------

export default function App() {
  const dispatch = useDispatch();
  const isLoaded = useSelector((state) => state.routing);
  const theme = makeTheme("dark");

  dispatch(UpdatePlaylist({ name: "Sample", tracks: SAMPLE_MEDIA }));

  useEffect(() => {
    window.addEventListener("popstate", function () {
      dispatch(UpdatePath(window.location.pathname));
    });

    dispatch(SetIsLoaded(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <ThemeProvider theme={theme}>{isLoaded ? <Router /> : <LoadingScreen />}</ThemeProvider>;
}

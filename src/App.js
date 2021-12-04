import React, { useEffect } from "react";
// routes
import Router from "./routes";
// theme
import ThemeProvider from "@mui/material/styles/ThemeProvider";
//redux
import { useDispatch, useSelector } from "./redux/store";
import { SetIsLoaded, UpdatePath } from "./redux/slices/routing";
// components
import LoadingScreen from "./components/LoadingScreen";
import makeTheme from "./makeTheme";

// ----------------------------------------------------------------------

export default function App() {
  const dispatch = useDispatch();
  const isLoaded = useSelector((state) => state.routing);
  const theme = makeTheme("dark");

  useEffect(() => {
    window.addEventListener("popstate", function () {
      dispatch(UpdatePath(window.location.pathname));
    });

    dispatch(SetIsLoaded(true));
  }, []);

  return <ThemeProvider theme={theme}>{isLoaded ? <Router /> : <LoadingScreen />}</ThemeProvider>;
}

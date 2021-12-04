import { configureStore } from "@reduxjs/toolkit";
import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from "react-redux";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";

import storage from "redux-persist/lib/storage";

// slices/reducers
import currentTrackReducer from "./slices/currentTrack";
import playlistReducer from "./slices/playlist";
import routingReducer from "./slices/routing";
import tracksReducer from "./slices/tracks";

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
};

const playlistPersistConfig = {
  key: "playlist",
  storage,
  keyPrefix: "redux-",
};

const routingPersistConfig = {
  key: "routing",
  storage,
};

const tracksPersistConfig = {
  key: "tracks",
  storage,
  keyPrefix: "redux-",
};

const currentTrackPersistConfig = {
  key: "currentTrack",
  storage,
  keyPrefix: "redux-",
};

const reducers = combineReducers({
  routing: persistReducer(routingPersistConfig, routingReducer.reducer),
  playlist: persistReducer(playlistPersistConfig, playlistReducer.reducer),
  tracks: persistReducer(tracksPersistConfig, tracksReducer.reducer),
  currentTrack: persistReducer(currentTrackPersistConfig, currentTrackReducer.reducer),
});

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

const useSelector = useReduxSelector;
const useDispatch = () => useReduxDispatch();

export { store, persistor, useSelector, useDispatch, rootPersistConfig };

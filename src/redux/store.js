import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from "react-redux";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, persistStore } from "redux-persist";
// slices/reducers
import playlistReducer from "./slices/playlist";
import routingReducer from "./slices/routing";
import tracksReducer from "./slices/tracks";

const playlistPersistConfig = {
  key: "playlist",
  storage,
};

const routingPersistConfig = {
  key: "routing",
  storage,
};

const tracksPersistConfig = {
  key: "tracks",
  storage,
};

const reducers = combineReducers({
  routing: persistReducer(routingPersistConfig, routingReducer.reducer),
  playlist: persistReducer(playlistPersistConfig, playlistReducer.reducer),
  tracks: persistReducer(tracksPersistConfig, tracksReducer.reducer),
});

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

const useSelector = useReduxSelector;
const useDispatch = () => useReduxDispatch();

export { store, persistor, useSelector, useDispatch };

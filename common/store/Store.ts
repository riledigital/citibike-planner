import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  FLUSH, PAUSE,
  PERSIST, persistReducer, PURGE,
  REGISTER, REHYDRATE
} from "reduxjs-toolkit-persist";
import storage from 'redux-persist-indexeddb-storage';
// import storage from "reduxjs-toolkit-persist/lib/storage"; // defaults to localStorage for web
import AppSlice from "./AppSlice";

import { cbStaticApi, cbserverApi } from './CBServer';


const persistConfig = {
  key: "root",
  storage: storage("citibikeplanner"),
};

const _persistedReducer = {
  AppSlice: persistReducer(persistConfig, AppSlice),
  [cbserverApi.reducerPath]: cbserverApi.reducer,
  [cbStaticApi.reducerPath]: cbStaticApi.reducer
};

 const store = configureStore({
   reducer: _persistedReducer,
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      cbserverApi.middleware
    ),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

export default store;
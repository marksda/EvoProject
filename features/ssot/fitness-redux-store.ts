import { combineReducers, configureStore } from "@reduxjs/toolkit";
import reduxStorageMMKV from "./storageMMKV";
import tokenReducer from "@/services/fitness-app/token-slice";
import bottomTabReducer from "@/services/fitness-app/bottom-tab-slice";
import profileReducer from "@/services/fitness-app/profile-slice";
import kelasReducer from "@/services/fitness-app/kelas-slice";
import { persistReducer, persistStore } from "redux-persist";
import { fitnessApi } from "@/services/fitness-app/fitness-api-rtkquery-service";

const persistConfig = {
  key: 'root',
  // version: 1,
  storage: reduxStorageMMKV,
  blacklist: ['bottom_tab', 'kelas'], // these reduce will not persist data
  whitelist: ['token', 'profile'], // these reduce will persist data
};

const rootReducer = combineReducers({ 
  token: tokenReducer,
  bottom_tab: bottomTabReducer,
  profile: profileReducer,
  kelas: kelasReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: {
    persisted: persistedReducer,
    [fitnessApi.reducerPath]: fitnessApi.reducer, 
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false,})
                                      .concat(fitnessApi.middleware)
});

export const persistor = persistStore(store)
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
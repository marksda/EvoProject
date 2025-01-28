import { combineReducers, configureStore } from "@reduxjs/toolkit";
import reduxStorageMMKV from "./storageMMKV";
import tokenReducer from "@/services/token-slice";
import bottomTabReducer from "@/services/bottom-tab-slice";
import profileReducer from "@/services/profile-slice";
import { persistReducer, persistStore } from "redux-persist";
import { fitnessApi } from "@/services/fitness-api-rtkquery-service";

const persistConfig = {
  key: 'root',
  // version: 1,
  storage: reduxStorageMMKV,
  blacklist: ['bottom_tab'], // these reduce will not persist data
  whitelist: ['token', 'profile'], // these reduce will persist data
};

const rootReducer = combineReducers({ 
  token: tokenReducer,
  bottom_tab: bottomTabReducer,
  profile: profileReducer,
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
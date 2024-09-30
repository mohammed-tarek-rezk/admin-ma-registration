import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import { setupListeners } from "@reduxjs/toolkit/query";
import { mainApi } from "./RTK/mainApi";
import moderatorSlice from "./slices/moderatorSlice";
import { blacklist } from "validator";
import persistStore from "redux-persist/es/persistStore";


const authPersistConfig = {
  key: "moderatorLogin",
  storage: storageSession,
  blacklist: [mainApi.reducerPath],
};

const rootReducer = combineReducers({
  moderator: moderatorSlice,
  [mainApi.reducerPath]: mainApi.reducer,
});

const persistedReducer = persistReducer(authPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainApi.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

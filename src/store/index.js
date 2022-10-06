import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import appSlice from "./appSice";

const persistConfig = {
  key: "root",
  storage: storage,
};

// const persistedReducerUser = persistReducer(persistConfig, userSlice.reducer);
// const persistedReducerPost = persistReducer(persistConfig, postSlice.reducer);
// const persistedReducerProposal = persistReducer(
//   persistConfig,
//   proposalSlice.reducer
// );

const reducer = combineReducers({
  app: appSlice.reducer,
});
const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import loginSlice from "../reducers/auth";
import categorySlice from "../reducers/category";
import productSlice from "../reducers/product";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  logindata: loginSlice.reducer,
  categorydata:categorySlice.reducer,
  prodata:productSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({ reducer: { root: persistedReducer } });

const persistor=persistStore(store)

export {persistor};
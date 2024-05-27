import { combineReducers, configureStore } from "@reduxjs/toolkit";
import colorGeneratorSlice from "./features/color_generator/colorGeneratorSlice";
import themeSlice from "./features/theme/themeSlice";
import enabledSlice from "./features/enable/enableSlice";
import clipboardSlice from "./features/clipboard/clipboardSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage/session";

const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["enabled"],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    enabled: enabledSlice,
    theme: themeSlice,
    random: colorGeneratorSlice,
    clipboard: clipboardSlice,
  })
);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

import { configureStore } from "@reduxjs/toolkit";
import colorGeneratorSlice from "./features/color_generator/colorGeneratorSlice";
import themeSlice from "./features/theme/themeSlice";
import enabledSlice from "./features/enable/enableSlice";

export const store = configureStore({
  reducer: {
    enabled: enabledSlice,
    theme: themeSlice,
    random: colorGeneratorSlice,
  },
});

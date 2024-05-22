import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  color: "",
  hex: "",
};

export const colorGeneratorSlice = createSlice({
  name: "colorGenerator",
  initialState,
  reducers: {
    setColor: (state, action) => {
      state.color = action.payload;
    },
    setHex: (state, action) => {
      state.hex = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setColor, setHex } = colorGeneratorSlice.actions;

export default colorGeneratorSlice.reducer;

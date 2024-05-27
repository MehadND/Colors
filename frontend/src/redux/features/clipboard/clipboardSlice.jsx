import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  idCopy: "",
  colorCopy: "",
  hexCopy: "",
};

export const clipboardSlice = createSlice({
  name: "clipboard",
  initialState,
  reducers: {
    copyToClipboard: (state, action) => {
      state.idCopy = action.payload.idCopy;
      state.colorCopy = action.payload.colorCopy;
      state.hexCopy = action.payload.hexCopy;
    },
  },
});

// Action creators are generated for each case reducer function
export const { copyToClipboard } = clipboardSlice.actions;

export default clipboardSlice.reducer;

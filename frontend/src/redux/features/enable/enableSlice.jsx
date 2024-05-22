import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const enabledSlice = createSlice({
  name: "enable",
  initialState,
  reducers: {
    toggleEnable: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleEnable } = enabledSlice.actions;

export default enabledSlice.reducer;

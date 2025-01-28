import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const bottomTabSlice = createSlice({
  name: 'bottomTabs',
  initialState: "Beranda",
  reducers: {
    setBottomTab: (state, action: PayloadAction<string>) => {
      return action.payload;
    },
    resetBottomTab: (state, action: PayloadAction<null>) => {
      return "Beranda";
    },
  }
});

export const { setBottomTab, resetBottomTab } = bottomTabSlice.actions;

export default bottomTabSlice.reducer;
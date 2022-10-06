import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "App",
  initialState: {
    username: null,
    fullname: null,
    imagelist: null,
  },
  reducers: {
    setUser(state, action) {
      const { username, fullname, imagelist } = action.payload;
      state.username = username;
      state.fullname = fullname;
      state.imagelist = imagelist;
    },
    setNewImage(state, action) {
      state.imagelist = [...state.imagelist, action.payload];
    },
    resetImageList(state, action) {
      state.imagelist = action.payload;
    },
    logout(state) {
      state.username = null;
      state.fullname = null;
      state.imagelist = null;
    },
  },
});

export const appActions = appSlice.actions;
export default appSlice;

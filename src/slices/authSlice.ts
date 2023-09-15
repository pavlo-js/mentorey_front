import { createSlice } from "@reduxjs/toolkit";

import { AppState } from "~/store/store";

export interface AuthState {
  authState: any;
}

const initialState: AuthState = {
  authState: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState(state, action) {
      state.authState = action.payload;
    },
  },
});

export const { setAuthState } = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth?.authState;

export default authSlice.reducer;

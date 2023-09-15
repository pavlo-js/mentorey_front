import { createSlice } from "@reduxjs/toolkit";

import { AppState } from "~/store/store";

export interface LessonBookingState {
  lessonBookingState: any;
}

const initialState: LessonBookingState = {
  lessonBookingState: null,
};

export const lessonBookingSlice = createSlice({
  name: "lesson_booking",
  initialState,
  reducers: {
    setLessonBookingState(state, action) {
      state.lessonBookingState = action.payload;
    },
  },
});

export const { setLessonBookingState } = lessonBookingSlice.actions;

export const selectLessonBookingState = (state: AppState) =>
  state.lesson_booking?.lessonBookingState;

export default lessonBookingSlice.reducer;

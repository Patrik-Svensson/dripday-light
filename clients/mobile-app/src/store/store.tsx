import { configureStore } from "@reduxjs/toolkit";
import likesReducer from "./features/likes/likesSlice";
import styleboardReducer from "./features/styleboards/styleboardSlice";

export const store = configureStore({
  reducer: {
    likes: likesReducer,
    styleboards: styleboardReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

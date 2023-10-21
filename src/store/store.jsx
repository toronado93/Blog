import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../slices/postsSlice";
import userReducer from "../slices/usersSlice";

export const store = configureStore({
  reducer: {
    posts: postReducer,
    users: userReducer,
  },
});

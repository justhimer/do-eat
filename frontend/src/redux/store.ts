import { configureStore, createSlice } from "@reduxjs/toolkit";
import foodSlice from "./foodSlice";
import gymSlice from "./gymSlice";
import userSlice from "./userSlice";
import userGymSlice from "./userGymSlice";
import userDateSlice from "./userDateSlice";
import userCourseSlice from "./userCourseSlice";
import gymCourseSlice from "./gymCourseSlice";



// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

export const store = configureStore({
    reducer: {
        user: userSlice,
        gym: gymSlice,
        food: foodSlice,
        userDate: userDateSlice,
        userGym: userGymSlice,
        userCourse: userCourseSlice,
        gymCourse: gymCourseSlice
    }
});

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch
import { configureStore, createSlice } from "@reduxjs/toolkit";
import foodSlice from "./foodSlice";
import userSlice from "./userSlice";



// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

export const store = configureStore({
    reducer: {
        users: userSlice,
        foods: foodSlice,
    }
});

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch
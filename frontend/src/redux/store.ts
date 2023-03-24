import { configureStore } from "@reduxjs/toolkit";
import foodSlice from "./foodSlice";
import userSlice from "./userSlice";

export const store = configureStore({
    reducer: {
        users: userSlice,
        foods: foodSlice,
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch
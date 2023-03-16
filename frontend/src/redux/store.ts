import { configureStore } from "@reduxjs/toolkit";
import foodSlice, { FoodSliceState } from "./foodSlice";
import userSlice, { UserSliceState } from "./userSlice";

export interface IRootState {
    users: UserSliceState[];
    foods: FoodSliceState[];
}

export const store = configureStore({
    reducer: {
        users: userSlice,
        foods: foodSlice,
    }
});
import { createSlice } from "@reduxjs/toolkit";

export interface FoodSliceState {
    map(arg0: (food: any, index: any) => JSX.Element): import("react").ReactNode;
    id: number;
    name: string;
    description: string;
    calories: number;
}

const foodSlice = createSlice({
    name: "foods",
    initialState: [] as FoodSliceState[],
    reducers: {},
})

const initstate = {
    cartItems: [],
}





export default foodSlice.reducer;
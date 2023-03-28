import { createSlice } from "@reduxjs/toolkit";

export interface FoodSliceState {
    map(arg0: (food: any, index: any) => JSX.Element): import("react").ReactNode;
    id: number;
    name: string;
    description: string;
}

const foodSlice = createSlice({
    name: "foods",
    initialState: [
        {
            id: 1,
            name: "pizza",
            description: "pizza is so delicous!",
        },
        {
            id: 2,
            name: "noodles",
            description: "noodles with nice soup!",
        },
    ] as FoodSliceState[],
    reducers: {},
})

export default foodSlice.reducer;
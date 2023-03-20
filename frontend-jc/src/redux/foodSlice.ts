import { createSlice } from "@reduxjs/toolkit";

export interface FoodSliceState {
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
            description: "pizza is so delicous!"
        },
        {
            id: 2,
            name: "noodles",
            description: "noodles with nice soup!"
        },
    ] as FoodSliceState[],
    reducers: {},
})

export default foodSlice.reducer;
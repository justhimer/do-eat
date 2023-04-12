import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwt_decode from 'jwt-decode';

export interface FoodSliceState {
    isAuthenticated: boolean;
    id: number;
    username: string;
    food_id: number;
    description: string;
    calories: number;
    gym_id: number;
}

interface FoodToken {
    id?: number,
    username?: string,
    food_id?: number,
    description?: string,
    calories?: number,
    gym_id?: number,
}

const isLoggedIn = () => {
    const token = localStorage.getItem("food_token");
    return !!token
}

const getFoodInfo = () => {
    const token = localStorage.getItem("food_token");
    let data = {
        id: 0,
        username: "",
        food_id: 0,
        description: "",
        calories: 0,
        gym_id: 0,
    }
    if (!!token) {
        const decoded = jwt_decode<FoodToken>(token);
        return {
            id: decoded.id,
            username: decoded.username,
            food_id: decoded.food_id,
            description: decoded.description,
            calories: decoded.calories,
            gym_id: decoded.gym_id,
        }
    }
    return data;
}


const foodSlice = createSlice({

    name: "foods",

    initialState: {
        isAuthenticated: isLoggedIn(),
        id: getFoodInfo().id,
        username: getFoodInfo().username,
        food_id: getFoodInfo().food_id,
        description: getFoodInfo().description,
        calories: getFoodInfo().calories,
        gym_id: getFoodInfo().gym_id,
    } as FoodSliceState,

    reducers: {

        login: (state: FoodSliceState, action: PayloadAction<any>) => {
            const payload = action.payload;

            state.isAuthenticated = true;
            state.id = payload.id;
            state.username = payload.username;
            state.food_id = payload.food_id;
            state.description = payload.description;
            state.calories = payload.calories;
            state.gym_id = payload.gym_id;

            localStorage.setItem("food_token", payload.token);
        },

        logout: (state: FoodSliceState) => {
            state.isAuthenticated = false;
            state.id = 0;
            state.username = "";
            state.food_id = 0;
            state.description = "";
            state.calories = 0;
            state.gym_id = 0;

            localStorage.removeItem("food_token");
        }
    },
})





export const foodAction = foodSlice.actions;
export default foodSlice.reducer;
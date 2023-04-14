import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwt_decode from 'jwt-decode';

export interface GymSliceState {
    isAuthenticated: boolean;
    id: number;
    username: string;
    name: string;
    franchise_id: number,
    district_id: number,
}

interface GymToken {
    id?: number,
    username?: string,
    name?: string,
    franchise_id?: number,
    district_id?: number,
    iat?: number,
    exp?: number
}

const isLoggedIn = () => {
    const token = localStorage.getItem("gym_token");
    console.log("gym token: ",token)
    return !!token
}

const getGymInfo = () => {
    const token = localStorage.getItem("gym_token");
    let data = {
        id: 0,
        username: "",
        name: "",
        franchise_id: 0,
        district_id: 0,
    }
    if (!!token) {
        const decoded = jwt_decode<GymToken>(token);
        return {
            id: decoded.id,
            username: decoded.username,
            name: decoded.name,
            franchise_id: decoded.franchise_id,
            district_id: decoded.district_id,
        }
    }
    return data;
}


const gymSlice = createSlice({

    name: "gyms",

    initialState: {
        isAuthenticated: isLoggedIn(),
        id: getGymInfo().id,
        username: getGymInfo().username,
        name: getGymInfo().name,
        franchise_id: getGymInfo().franchise_id,
        district_id: getGymInfo().district_id,
    } as GymSliceState,

    reducers: {

        login: (state: GymSliceState, action: PayloadAction<any>) => {
            const payload = action.payload;

            state.isAuthenticated = true;
            state.id = payload.id;
            state.username = payload.username;
            state.name = payload.name;
            state.franchise_id = payload.franchise_id;
            state.district_id = payload.district_id;

            localStorage.setItem("gym_token", payload.token);
        },

        logout: (state: GymSliceState) => {
            state.isAuthenticated = false;
            state.id = 0;
            state.username = "";
            state.name="";
            state.franchise_id = 0;
            state.district_id = 0;

            localStorage.removeItem("gym_token");
        }
    },

})

export const gymAction = gymSlice.actions;
export default gymSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwt_decode from 'jwt-decode';

export interface UserSliceState {
    isAuthenticated: boolean;
    id: number;
    email: string;
    username: string;
}

interface Token {
    id?: number,
    email?: string,
    username?: string,
    iat?: number,
    exp?: number
}

const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    console.log("user token: ",token)
    return !!token
}

const getUserInfo = () => {
    let data = {
        id: 0,
        email: "",
        username: "",
    }
    const token = localStorage.getItem("token");
    
    if (!!token) {
        const decoded = jwt_decode<Token>(token);
        return {
            id: decoded.id,
            email: decoded.email,
            username: decoded.username
        }
    }
    return data;
}


const userSlice = createSlice({

    name: "users",

    initialState: {
        isAuthenticated: isLoggedIn(),
        id: getUserInfo().id,
        email: getUserInfo().email,
        username: getUserInfo().username,
    } as UserSliceState,

    reducers: {

        login: (state: UserSliceState, action: PayloadAction<any>) => {
            const payload = action.payload;

            state.isAuthenticated = true;
            state.id = payload.id;
            state.email = payload.email;
            state.username = payload.username;

            localStorage.setItem("token", payload.token);
        },

        logout: (state: UserSliceState) => {
            state.isAuthenticated = false;
            state.id = 0;
            state.email = "";
            state.username = "";

            localStorage.removeItem("token");
        }
    },

})

export const userAction = userSlice.actions;
export default userSlice.reducer;
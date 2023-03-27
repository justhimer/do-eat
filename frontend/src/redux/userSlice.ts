import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserSliceState {
    isAuthenticated: boolean;
    id: number;
    email: string;
    username: string;
}

const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    return !!token
}

const userSlice = createSlice({

    name: "users",

    initialState: {
        isAuthenticated: isLoggedIn(),
        id: 0,
        email: "",
        username: "",
    } as UserSliceState,

    reducers: {

        fbLogin: (state: UserSliceState, action: PayloadAction<any>) => {

            const payload = action.payload;
            console.log('payload = ', payload);

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
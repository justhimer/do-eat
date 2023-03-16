import { createSlice } from "@reduxjs/toolkit";

export interface UserSliceState {
    id: number;
    email: string;
    username: string;
    icon: string;
}

const userSlice = createSlice({
    name: "users",
    initialState: [{
        id: 1,
        email: "haha@haha.com",
        username: "haha",
        icon: "haha.jpg"
    }] as UserSliceState[],
    reducers: {},
})

export default userSlice.reducer;
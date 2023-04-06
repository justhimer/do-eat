import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import format from "date-fns/format";

interface SelectedDistrictsInterface{
    date: string
}

const initialState : SelectedDistrictsInterface = {date:format(new Date, "yyyy-MM-dd")}

const userDateSlice = createSlice({
    name: "userDate",
    initialState,
    reducers: {
        replaceDateSelection: (state, action:PayloadAction<string>) =>{
            state.date = format(new Date(action.payload), "yyyy-MM-dd")
        },
    },
})

export const {replaceDateSelection} = userDateSlice.actions

export default userDateSlice.reducer;
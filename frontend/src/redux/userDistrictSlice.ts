import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface UserDistrictInterface {
    id: number,
    name: string
}

const initialState : UserDistrictInterface[] = []

const userDistrictSlice = createSlice({
    name: "userDistrict",
    initialState,
    reducers: {
        add: (state, action:PayloadAction<UserDistrictInterface>)=>{
            if (!state.find(elem => elem.id === action.payload.id)){
                state.push(action.payload)
            }
        },
        remove: (state, action:PayloadAction<number>) =>{
            let newArr = state.filter((item:UserDistrictInterface) => item.id !== action.payload)
            state = newArr
        },
        reset:(state)=>{
            state = []
        }
    },
})

export const {add,remove,reset} = userDistrictSlice.actions

export default userDistrictSlice.reducer;
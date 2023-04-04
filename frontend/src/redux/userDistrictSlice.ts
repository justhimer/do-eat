import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SelectedDistrictsInterface{
    districts: number[]
}

const initialState : SelectedDistrictsInterface = {districts:[]}

const userDistrictSlice = createSlice({
    name: "userDistrict",
    initialState,
    reducers: {
        replaceDistrictSelection: (state, action:PayloadAction<number[]>) =>{
            console.log("replacing")
            console.log({state, action});
            
            let newArr = [...action.payload]
            state.districts = newArr
        },
        resetDistrictSelection:(state)=>{
            state.districts = []
        }
    },
})

export const {replaceDistrictSelection,resetDistrictSelection} = userDistrictSlice.actions

export default userDistrictSlice.reducer;
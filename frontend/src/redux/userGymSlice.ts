import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export interface SelectedGymInterface {
    id: number
    name: string
}

const initialState: SelectedGymInterface[] = []

const userGymSlice = createSlice({
    name: "userGym",
    initialState,
    reducers: {
        toggleGymSelection: (state, action: PayloadAction<SelectedGymInterface>) => {

            if (state.filter((elem) => { return elem.id === action.payload.id }).length > 0) {
                const newState = state.findIndex((elem) => { return elem.id === action.payload.id })
                state.splice(newState,1)
            } else {
                if (state.length < 3) {
                    const newState = [...state, action.payload]
                    state.push(action.payload)

                }else{
                    console.log('error more than 3 gyms selected')
                }
                
            }
        },
        removeGymSelection: (state, action: PayloadAction<number>) => {
            const newState = state.findIndex((elem) => { return elem.id === action.payload })
                state.splice(newState,1)
        },
        refreshGymSelection: (state)=>{
            state.length = 0
        }
    },
})

export const { toggleGymSelection, removeGymSelection , refreshGymSelection } = userGymSlice.actions

export default userGymSlice.reducer;
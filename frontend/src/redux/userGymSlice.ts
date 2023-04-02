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
            console.log('togglegymselection received')
            if (state.filter((elem) => { return elem.id === action.payload.id })) {
                const newState = state.filter((elem) => { return elem.id !== action.payload.id })
                state = newState
            } else {
                if (state.length < 3) {
                    const newState = [...state, action.payload]
                    state = newState
                }
                console.log('error more than 3 gyms selected')
            }
        },
        removeGymSelection: (state, action: PayloadAction<number>) => {
            const newState = state.filter((elem) => { return elem.id !== action.payload })
            state = newState
        }
    },
})

export const { toggleGymSelection, removeGymSelection } = userGymSlice.actions

export default userGymSlice.reducer;
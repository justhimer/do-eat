import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CoursesInterface {
    this_id: number;
    filled: number;
    calories: number;
    course_id: number;
    course_type_id: number;
    course_type_name: string;
    credits: number;
    duration: number;
    franchise: string;
    gym: string;
    level: string;
    name: string;
    quota: number;
    time: string;
    trainer_icon: string;
    trainer_name: string;
}

const initialState: CoursesInterface = {
    this_id: NaN,
    filled: NaN,
    calories: NaN,
    course_id: NaN,
    course_type_id: NaN,
    course_type_name: "",
    credits: NaN,
    duration: NaN,
    franchise: "",
    gym: "",
    level: "",
    name: "",
    quota: NaN,
    time: "",
    trainer_icon: "",
    trainer_name: "",
}

const userCourseSlice = createSlice({
    name: "userGym",
    initialState,
    reducers: {
        changeSelectedCourse: (state, action: PayloadAction<CoursesInterface>) => {
            state.this_id =action.payload.this_id
            state.filled = action.payload.filled
            state.calories = action.payload.calories
            state.course_id = action.payload.course_id
            state.course_type_id = action.payload.course_type_id
            state.course_type_name = action.payload.course_type_name
            state.credits = action.payload.credits
            state.duration = action.payload.duration
            state.franchise = action.payload.franchise
            state.gym = action.payload.gym
            state.level = action.payload.level
            state.name = action.payload.name
            state.quota = action.payload.quota
            state.time = action.payload.time
            state.trainer_icon = action.payload.trainer_icon
            state.trainer_name = action.payload.trainer_name            
        },
        refreshCourseSelection: (state) => {
            return Object.assign(state, {
                this_id: NaN,
                filled: NaN,
                calories: NaN,
                course_id: NaN,
                course_type_id: NaN,
                course_type_name: "",
                credits: NaN,
                duration: NaN,
                franchise: "",
                gym: "",
                level: "",
                name: "",
                quota: NaN,
                time: "",
                trainer_icon: "",
                trainer_name: "",
            })
        }
    },
})

export const { changeSelectedCourse, refreshCourseSelection } = userCourseSlice.actions

export default userCourseSlice.reducer;